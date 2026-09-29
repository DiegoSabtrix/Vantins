import { postgresDB, type PaymentDB } from './postgres';
import { PAYMENT_TYPES, money, type Payer } from './shared';
export { PAYMENT_TYPES, money, type Payer } from './shared';

export type PaymentEnv = {
  DB?: PaymentDB;
  DATABASE_URL?: string;
  STRIPE_SECRET_KEY?: string;
  STRIPE_PUBLISHABLE_KEY?: string;
  STRIPE_WEBHOOK_SECRET?: string;
  PAYMENT_LINK_SIGNING_SECRET?: string;
  PAYMENT_MIN_CENTS?: string;
  PAYMENT_MAX_CENTS?: string;
  PAYMENT_CHECKOUT_ENABLED?: string;
  PAYMENT_AUTHORIZATION_APPROVED?: string;
  RESEND_API_KEY?: string;
  PAYMENT_FROM_EMAIL?: string;
  PAYMENT_INTERNAL_EMAIL?: string;
  PAYMENT_PUBLIC_ORIGIN?: string;
};

export function config(): PaymentEnv {
  const values = process.env as PaymentEnv;
  return { ...values, DB: values.DATABASE_URL ? postgresDB(values.DATABASE_URL) : undefined };
}

export function ready(e: PaymentEnv): boolean {
  const secretMode = e.STRIPE_SECRET_KEY?.match(/^(?:sk|rk)_(test|live)_/)?.[1];
  const publishableMode = e.STRIPE_PUBLISHABLE_KEY?.match(/^pk_(test|live)_/)?.[1];
  return !!(
    e.DB && e.STRIPE_SECRET_KEY && e.STRIPE_PUBLISHABLE_KEY &&
    e.STRIPE_WEBHOOK_SECRET && e.PAYMENT_LINK_SIGNING_SECRET && e.PAYMENT_LINK_SIGNING_SECRET.length >= 32 &&
    e.RESEND_API_KEY && e.PAYMENT_FROM_EMAIL && e.PAYMENT_INTERNAL_EMAIL &&
    e.PAYMENT_CHECKOUT_ENABLED === 'true' && e.PAYMENT_AUTHORIZATION_APPROVED === 'true' &&
    secretMode && secretMode === publishableMode
  );
}

export class PaymentError extends Error {
  constructor(message: string, public status = 400) { super(message); }
}

export async function hmac(value: string, key: string): Promise<string> {
  const signingKey = await crypto.subtle.importKey('raw', new TextEncoder().encode(key), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const signature = await crypto.subtle.sign('HMAC', signingKey, new TextEncoder().encode(value));
  return [...new Uint8Array(signature)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function equalHex(a: string, b: string): boolean {
  if (a.length !== b.length || !/^[a-f0-9]+$/i.test(a)) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return mismatch === 0;
}

export async function quote(input: Payer, e: PaymentEnv) {
  const reference = String(input.reference || '').trim();
  const paymentType = String(input.paymentType || '');
  if (!/^[\w\-./ ]{2,80}$/.test(reference)) throw new PaymentError('Enter a valid reference number (2–80 characters).');
  if (!PAYMENT_TYPES.includes(paymentType)) throw new PaymentError('Choose a payment type.');
  let amountText = String(input.amount || '');
  let locked = false;
  if (input.link) {
    let link: { ref: string; type: string; amount: string; expires: number; sig: string };
    try { link = JSON.parse(input.link); } catch { throw new PaymentError('This payment link is invalid. Contact Vantins.'); }
    if (!e.PAYMENT_LINK_SIGNING_SECRET || !Number.isSafeInteger(link.expires) || link.expires < Date.now() / 1000) {
      throw new PaymentError('This payment link has expired or is unavailable. Contact Vantins.');
    }
    const canonical = [link.ref, link.type, link.amount, link.expires].join('\n');
    const expected = await hmac(canonical, e.PAYMENT_LINK_SIGNING_SECRET);
    if (!equalHex(expected, link.sig) || link.ref !== reference || link.type !== paymentType || link.amount !== amountText) {
      throw new PaymentError('This payment link does not match the payment details.');
    }
    locked = true;
    amountText = link.amount;
  }
  if (!/^(?:0|[1-9]\d{0,7})(?:\.\d{1,2})?$/.test(amountText)) throw new PaymentError('Enter a valid USD amount with up to two decimal places.');
  const [dollars, cents = ''] = amountText.split('.');
  const amountCents = Number(dollars) * 100 + Number(cents.padEnd(2, '0'));
  const min = Number(e.PAYMENT_MIN_CENTS || '50');
  const max = Number(e.PAYMENT_MAX_CENTS || '10000000');
  if (!Number.isSafeInteger(min) || !Number.isSafeInteger(max) || min < 50 || max < min) throw new PaymentError('Payment limits are not configured.', 503);
  if (amountCents < min || amountCents > max) throw new PaymentError(`Amount must be between ${money(min)} and ${money(max)}.`);
  // Fees are intentionally zero until Vantins configures and reviews an authorized server-side policy.
  const feeCents = 0;
  return { reference, paymentType, amountCents, feeCents, totalCents: amountCents + feeCents, locked, min, max };
}

export function validatePayer(input: Payer) {
  const fullName = String(input.fullName || '').trim();
  const email = String(input.email || '').trim().toLowerCase();
  const phone = String(input.phone || '').trim();
  const notes = String(input.notes || '').trim();
  if (fullName.length < 2 || fullName.length > 120) throw new PaymentError('Enter your full name.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) throw new PaymentError('Enter a valid email address.');
  if (!/^[+\d ()\-.]{7,25}$/.test(phone)) throw new PaymentError('Enter a valid phone number.');
  if (notes.length > 500) throw new PaymentError('Notes must be 500 characters or fewer.');
  if (input.consent !== true) throw new PaymentError('Please accept the payment authorization.');
  return { fullName, email, phone, notes };
}

export async function stripePost(e: PaymentEnv, path: string, fields: URLSearchParams, key?: string) {
  const result = await fetch(`https://api.stripe.com/v1/${path}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${e.STRIPE_SECRET_KEY}`, 'Content-Type': 'application/x-www-form-urlencoded', ...(key ? { 'Idempotency-Key': key } : {}) },
    body: fields,
  });
  const data = await result.json() as { id?: string; status?: string; client_secret?: string; error?: { message?: string } };
  if (!result.ok) throw new PaymentError(data.error?.message || 'Stripe could not process the payment. Please try again.', result.status >= 500 ? 503 : 400);
  return data;
}

export const noStore = { 'Cache-Control': 'no-store', 'Content-Type': 'application/json' };
export function json(data: unknown, status = 200) { return new Response(JSON.stringify(data), { status, headers: noStore }); }
