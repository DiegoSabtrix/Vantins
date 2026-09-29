import { config, json, PaymentError, quote, ready, stripePost, validatePayer, type Payer } from '@/payment/server';

type ConfirmInput = Payer & { confirmationTokenId: string; requestId: string };
type PaymentRow = { id: string; stripe_intent_id: string | null; status: string };

export async function POST(request: Request) {
  const e = config();
  if (!ready(e) || !e.DB) return json({ error: 'Online payments are not available yet.' }, 503);
  let rowId = '';
  try {
    const raw = await request.text();
    if (raw.length > 5000) throw new PaymentError('Request is too large.');
    const input = JSON.parse(raw) as ConfirmInput;
    if (!/^ct_[A-Za-z0-9_]+$/.test(input.confirmationTokenId || '') || !/^[0-9a-f-]{36}$/i.test(input.requestId || '')) {
      throw new PaymentError('Payment details could not be verified.');
    }
    const payer = validatePayer(input);
    const pricing = await quote(input, e);
    const existing = await e.DB.prepare('SELECT id, stripe_intent_id, status FROM payments WHERE request_id = ?')
      .bind(input.requestId).first<PaymentRow>();
    if (existing) {
      if (!existing.stripe_intent_id) throw new PaymentError('This payment is being processed. Please wait before trying again.', 409);
      const response = await fetch(`https://api.stripe.com/v1/payment_intents/${existing.stripe_intent_id}`, {
        headers: { Authorization: `Bearer ${e.STRIPE_SECRET_KEY}` },
      });
      if (!response.ok) throw new PaymentError('Unable to check this payment. Contact support.', 503);
      const intent = await response.json() as { id: string; status: string; client_secret: string };
      return json({ paymentId: existing.id, status: intent.status, clientSecret: intent.client_secret });
    }
    rowId = crypto.randomUUID();
    const now = new Date().toISOString();
    await e.DB.prepare(`INSERT INTO payments
      (id, request_id, reference, payment_type, full_name, email, phone, notes, amount_cents, fee_cents, total_cents, status, consent_at, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'creating', ?, ?, ?)`)
      .bind(rowId, input.requestId, pricing.reference, pricing.paymentType, payer.fullName, payer.email, payer.phone,
        payer.notes || null, pricing.amountCents, pricing.feeCents, pricing.totalCents, now, now, now).run();
    const params = new URLSearchParams();
    params.set('amount', String(pricing.totalCents));
    params.set('currency', 'usd');
    params.set('confirm', 'true');
    params.set('automatic_payment_methods[enabled]', 'true');
    params.set('confirmation_token', input.confirmationTokenId);
    params.set('receipt_email', payer.email);
    params.set('description', `Vantins ${pricing.paymentType} - ${pricing.reference}`);
    params.set('metadata[payment_id]', rowId);
    params.set('metadata[reference]', pricing.reference);
    params.set('metadata[payment_type]', pricing.paymentType);
    const origin = e.PAYMENT_PUBLIC_ORIGIN || 'https://www.vantins.com';
    params.set('return_url', `${origin}/payment/result?request=${encodeURIComponent(input.requestId)}`);
    const intent = await stripePost(e, 'payment_intents', params, `vantins-payment-${input.requestId}`);
    if (!intent.id || !intent.client_secret || !intent.status) throw new PaymentError('Stripe did not return payment details.', 503);
    await e.DB.prepare(`UPDATE payments SET stripe_intent_id = ?, status = CASE WHEN status = 'creating' THEN ? ELSE status END,
      updated_at = ? WHERE id = ?`).bind(intent.id, intent.status, new Date().toISOString(), rowId).run();
    return json({ paymentId: rowId, status: intent.status, clientSecret: intent.client_secret });
  } catch (error) {
    if (rowId && e.DB) {
      await e.DB.prepare("UPDATE payments SET status = 'failed', updated_at = ? WHERE id = ? AND status = 'creating'")
        .bind(new Date().toISOString(), rowId).run().catch(() => {});
    }
    return json({ error: error instanceof PaymentError ? error.message : 'Payment could not be processed. Please contact support if you were charged.' },
      error instanceof PaymentError ? error.status : 503);
  }
}
