import { config, json } from '@/payment/server';

export async function GET(request: Request) {
  const e = config();
  const id = new URL(request.url).searchParams.get('request');
  if (!e.DB || !id || !/^[0-9a-f-]{36}$/i.test(id)) return json({ error: 'Payment not found.' }, 404);
  const row = await e.DB.prepare('SELECT stripe_intent_id, status, reference, payment_type, amount_cents, fee_cents, total_cents, created_at FROM payments WHERE request_id = ?')
    .bind(id).first<{ stripe_intent_id: string | null; status: string; reference: string; payment_type: string; amount_cents: number; fee_cents: number; total_cents: number; created_at: string }>();
  if (!row) return json({ error: 'Payment not found.' }, 404);
  let status = row.status;
  if (row.stripe_intent_id && e.STRIPE_SECRET_KEY) {
    const response = await fetch(`https://api.stripe.com/v1/payment_intents/${row.stripe_intent_id}`, {
      headers: { Authorization: `Bearer ${e.STRIPE_SECRET_KEY}` },
    });
    if (response.ok) status = ((await response.json()) as { status: string }).status;
  }
  return json({ status, reference: row.reference, paymentType: row.payment_type, amountCents: row.amount_cents,
    feeCents: row.fee_cents, totalCents: row.total_cents, createdAt: row.created_at });
}
