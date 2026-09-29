import { config, hmac, json, money } from '@/payment/server';

type Intent = {
  id: string; amount: number; currency: string; status: string; livemode: boolean;
  metadata?: { payment_id?: string };
};
type StripeEvent = { id: string; type: string; data: { object: Intent } };
type Payment = { id: string; stripe_intent_id: string | null; email: string; full_name: string;
  reference: string; payment_type: string; total_cents: number; status: string };

async function verified(raw: string, header: string, secret: string) {
  const parts = header.split(',').map((part) => part.trim().split('='));
  const timestamp = parts.find(([key]) => key === 't')?.[1];
  const signatures = parts.filter(([key]) => key === 'v1').map(([, value]) => value);
  if (!timestamp || !/^\d+$/.test(timestamp) || Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) return false;
  const expected = await hmac(`${timestamp}.${raw}`, secret);
  return signatures.some((signature) => {
    if (signature.length !== expected.length || !/^[a-f0-9]+$/i.test(signature)) return false;
    let diff = 0;
    for (let i = 0; i < expected.length; i++) diff |= signature.charCodeAt(i) ^ expected.charCodeAt(i);
    return diff === 0;
  });
}

async function notify(e: ReturnType<typeof config>, payment: Payment, kind: 'processing' | 'succeeded' | 'payment_failed') {
  if (!e.DB || !e.RESEND_API_KEY || !e.PAYMENT_FROM_EMAIL || !e.PAYMENT_INTERNAL_EMAIL) throw new Error('Email delivery is not configured');
  const recipients = kind === 'succeeded' ? [payment.email, e.PAYMENT_INTERNAL_EMAIL] : [payment.email];
  for (const recipient of recipients) {
    const id = `${payment.id}:${kind}:${recipient.toLowerCase()}`;
    await e.DB.prepare('INSERT OR IGNORE INTO payment_notifications (id, payment_id, kind, recipient) VALUES (?, ?, ?, ?)')
      .bind(id, payment.id, kind, recipient).run();
    const row = await e.DB.prepare('SELECT sent_at FROM payment_notifications WHERE id = ?')
      .bind(id).first<{ sent_at: string | null }>();
    if (row?.sent_at) continue;
    const internal = recipient.toLowerCase() === e.PAYMENT_INTERNAL_EMAIL.toLowerCase();
    const title = kind === 'processing' ? 'Your Vantins payment is processing' : kind === 'payment_failed' ? 'Your Vantins payment was not completed' : 'Vantins payment confirmed';
    const text = internal
      ? `Payment completed. Reference: ${payment.reference}. Type: ${payment.payment_type}. Amount: ${money(payment.total_cents)}. Payer: ${payment.full_name} (${payment.email}). Stripe ID: ${payment.stripe_intent_id}.`
      : kind === 'processing'
        ? `Hi ${payment.full_name}, your payment of ${money(payment.total_cents)} for reference ${payment.reference} is processing. We will email you when Stripe confirms the result. A payment does not, by itself, bind or activate insurance coverage. Contact support@vantins.com with questions.`
        : kind === 'payment_failed'
          ? `Hi ${payment.full_name}, your payment for reference ${payment.reference} was not completed. Contact support@vantins.com if you need help or are unsure whether your bank withdrew funds. No insurance coverage is activated by a payment attempt.`
        : `Hi ${payment.full_name}, your payment of ${money(payment.total_cents)} for reference ${payment.reference} has been confirmed. This payment does not, by itself, bind or activate insurance coverage. Contact support@vantins.com with questions.`;
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${e.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': id },
      body: JSON.stringify({ from: e.PAYMENT_FROM_EMAIL, to: [recipient], subject: title, text }),
    });
    if (!response.ok) throw new Error('Email provider rejected notification');
    const delivered = await response.json() as { id: string };
    await e.DB.prepare('UPDATE payment_notifications SET provider_id = ?, sent_at = ? WHERE id = ?')
      .bind(delivered.id, new Date().toISOString(), id).run();
  }
}

export async function POST(request: Request) {
  const e = config();
  if (!e.STRIPE_WEBHOOK_SECRET || !e.DB) return json({ error: 'Webhook unavailable' }, 503);
  const raw = await request.text();
  if (raw.length > 200000) return json({ error: 'Payload too large' }, 413);
  if (!(await verified(raw, request.headers.get('stripe-signature') || '', e.STRIPE_WEBHOOK_SECRET))) {
    return json({ error: 'Invalid signature' }, 400);
  }
  let event: StripeEvent;
  try { event = JSON.parse(raw) as StripeEvent; } catch { return json({ error: 'Invalid payload' }, 400); }
  if (!['payment_intent.processing', 'payment_intent.succeeded', 'payment_intent.payment_failed'].includes(event.type)) return json({ received: true });
  const intent = event.data?.object;
  if (!event.id?.startsWith('evt_') || !intent?.id?.startsWith('pi_') ||
      intent.livemode !== /^(?:sk|rk)_live_/.test(e.STRIPE_SECRET_KEY || '')) return json({ error: 'Invalid event' }, 400);
  const payment = await e.DB.prepare('SELECT id, stripe_intent_id, email, full_name, reference, payment_type, total_cents, status FROM payments WHERE id = ?')
    .bind(intent.metadata?.payment_id || '').first<Payment>();
  if (!payment || (payment.stripe_intent_id && payment.stripe_intent_id !== intent.id) ||
      payment.total_cents !== intent.amount || intent.currency !== 'usd') return json({ error: 'Payment mismatch' }, 400);
  try {
    const result = await e.DB.prepare('INSERT OR IGNORE INTO stripe_events (id, payment_id, type, received_at) VALUES (?, ?, ?, ?)')
      .bind(event.id, payment.id, event.type, new Date().toISOString()).run();
    if (result.meta.changes) {
      const next = event.type === 'payment_intent.succeeded' ? 'succeeded' :
        event.type === 'payment_intent.processing' ? 'processing' : 'payment_failed';
      await e.DB.prepare(`UPDATE payments SET stripe_intent_id = COALESCE(stripe_intent_id, ?),
        status = CASE WHEN status = 'succeeded' THEN 'succeeded' ELSE ? END,
        updated_at = ? WHERE id = ?`)
        .bind(intent.id, next, new Date().toISOString(), payment.id).run();
    }
    const latest = await e.DB.prepare('SELECT id, stripe_intent_id, email, full_name, reference, payment_type, total_cents, status FROM payments WHERE id = ?')
      .bind(payment.id).first<Payment>();
    if (latest?.status === 'processing' || latest?.status === 'succeeded' || latest?.status === 'payment_failed') {
      await notify(e, latest, latest.status);
    }
    return json({ received: true });
  } catch {
    // Stripe retries non-2xx deliveries; recorded events and email ids are idempotent.
    return json({ error: 'Webhook processing failed' }, 503);
  }
}
