import { createHmac } from 'node:crypto';

const [reference, type, amount, days = '7'] = process.argv.slice(2);
const secret = process.env.PAYMENT_LINK_SIGNING_SECRET;
const origin = process.env.PAYMENT_PUBLIC_ORIGIN || 'https://www.vantins.com';
if (!secret || secret.length < 32) throw new Error('Set PAYMENT_LINK_SIGNING_SECRET in the environment first.');
if (!reference || !['Down Payment', 'Invoice Payment', 'Policy Payment', 'Other'].includes(type) ||
    !/^(?:0|[1-9]\d{0,7})(?:\.\d{1,2})?$/.test(amount || '') || !/^[1-9]\d?$/.test(days)) {
  throw new Error('Usage: node scripts/create-payment-link.mjs REFERENCE "Invoice Payment" 149.00 [days]');
}
const expires = Math.floor(Date.now() / 1000) + Number(days) * 86400;
const sig = createHmac('sha256', secret).update([reference, type, amount, expires].join('\n')).digest('hex');
const url = new URL('/payment', origin);
url.searchParams.set('ref', reference);
url.searchParams.set('type', type);
url.searchParams.set('amount', amount);
url.searchParams.set('link', JSON.stringify({ ref: reference, type, amount, expires, sig }));
process.stdout.write(url.toString() + '\n');
