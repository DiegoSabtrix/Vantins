import { config, json, PaymentError, quote, ready, type Payer } from '@/payment/server';

export async function POST(request: Request) {
  const e = config();
  if (!ready(e)) return json({ error: 'Online payments are not available yet. Please contact Vantins support.' }, 503);
  try {
    const body = await request.text();
    if (body.length > 3000) throw new PaymentError('Request is too large.');
    const details = await quote(JSON.parse(body) as Payer, e);
    return json(details);
  } catch (error) {
    return json({ error: error instanceof PaymentError ? error.message : 'Check the payment details and try again.' }, error instanceof PaymentError ? error.status : 400);
  }
}
