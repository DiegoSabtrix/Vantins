import { config, json, ready } from '@/payment/server';

export async function GET() {
  const e = config();
  return json({
    available: ready(e),
    publishableKey: ready(e) ? e.STRIPE_PUBLISHABLE_KEY : null,
    minCents: Number(e.PAYMENT_MIN_CENTS || 50),
    maxCents: Number(e.PAYMENT_MAX_CENTS || 10000000),
  });
}
