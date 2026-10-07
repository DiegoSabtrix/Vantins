'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import type { Stripe } from '@stripe/stripe-js';
import { Logo } from '@/components/ui/Logo';
import { money, PAYMENT_TYPES, type Payer } from './shared';
import { trackEvent } from '@/analytics';

type Form = Payer & { consent: boolean };
type Config = { available: boolean; publishableKey: string | null; minCents: number; maxCents: number };
type Quote = { amountCents: number; feeCents: number; totalCents: number; locked: boolean };
const badge = 'https://images.stripeassets.com/fzn2n1nzq965/4M6d6BSWzlgsrJx8rdZb0I/733f37ef69b5ca1d3d33e127184f4ce4/Powered_by_Stripe.svg?q=80&w=1082';
const empty: Form = { fullName: '', email: '', phone: '', reference: '', paymentType: 'Down Payment', amount: '', notes: '', consent: false };
const fieldStyle = 'mt-2 h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-base text-slate-950 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200 disabled:bg-slate-100';

function validate(form: Form, cfg: Config | null) {
  const errors: Record<string, string> = {};
  if (form.fullName.trim().length < 2) errors.fullName = 'Enter your full name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = 'Enter a valid email.';
  if (!/^[+\d ()\-.]{7,25}$/.test(form.phone.trim())) errors.phone = 'Enter a valid phone number.';
  if (!/^[\w\-./ ]{2,80}$/.test(form.reference.trim())) errors.reference = 'Enter a reference number.';
  if (!PAYMENT_TYPES.includes(form.paymentType)) errors.paymentType = 'Choose a payment type.';
  if (!/^(?:0|[1-9]\d{0,7})(?:\.\d{1,2})?$/.test(form.amount)) errors.amount = 'Enter an amount in USD.';
  else if (cfg) {
    const amount = Math.round(Number(form.amount) * 100);
    if (amount < cfg.minCents || amount > cfg.maxCents) errors.amount = `Enter ${money(cfg.minCents)}–${money(cfg.maxCents)}.`;
  }
  if (form.notes && form.notes.length > 500) errors.notes = 'Use 500 characters or fewer.';
  if (!form.consent) errors.consent = 'Please accept the authorization.';
  return errors;
}

function Field({ name, label, value, onChange, error, type = 'text', required = true, disabled = false, hint, ...props }:
  { name: string; label: string; value: string; onChange: (value: string) => void; error?: string; type?: string; required?: boolean; disabled?: boolean; hint?: string; autoComplete?: string; inputMode?: 'decimal' | 'tel' }) {
  return <label className="block text-sm font-semibold text-slate-800" htmlFor={name}>
    {label}{required && <span className="ml-1 text-amber-700">*</span>}
    <input {...props} id={name} name={name} type={type} value={value} onChange={(event) => onChange(event.target.value)}
      required={required} disabled={disabled} aria-invalid={!!error} aria-describedby={error ? `${name}-error` : hint ? `${name}-hint` : undefined}
      className={fieldStyle} />
    {hint && <span id={`${name}-hint`} className="mt-1 block text-xs font-normal text-slate-500">{hint}</span>}
    {error && <span id={`${name}-error`} className="mt-1 block text-sm font-medium text-red-700">{error}</span>}
  </label>;
}

function PaymentControls({ form, quote, requestId }: { form: Form; quote: Quote; requestId: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const busyRef = useRef(false);
  async function complete() {
    if (!stripe || !elements || busyRef.current) return;
    busyRef.current = true; setBusy(true); setError('');
    try {
      trackEvent('payment_submit', { payment_type: form.paymentType });
      const submitted = await elements.submit();
      if (submitted.error) throw new Error(submitted.error.message);
      const token = await stripe.createConfirmationToken({
        elements,
        params: { return_url: `${window.location.origin}/payment/result?request=${encodeURIComponent(requestId)}`,
          payment_method_data: { billing_details: { name: form.fullName, email: form.email, phone: form.phone } } },
      });
      if (token.error || !token.confirmationToken) throw new Error(token.error?.message || 'Check the payment details.');
      const response = await fetch('/api/payments/confirm', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, confirmationTokenId: token.confirmationToken.id, requestId }),
      });
      const result = await response.json() as { error?: string; status?: string; clientSecret?: string };
      if (!response.ok || result.error) throw new Error(result.error || 'Payment could not be processed.');
      if (result.status === 'requires_action' && result.clientSecret) {
        const next = await stripe.handleNextAction({ clientSecret: result.clientSecret });
        if (next.error) throw new Error(next.error.message);
      }
      window.location.assign(`/payment/result?request=${encodeURIComponent(requestId)}`);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Please try again or contact support.');
      busyRef.current = false; setBusy(false);
    }
  }
  return <div className="mt-6">
    <button type="button" data-analytics-cta="payment_submit" onClick={complete} disabled={!stripe || busy} className="w-full rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-4 text-base font-bold text-slate-950 shadow-md transition hover:brightness-105 focus-visible:ring-2 focus-visible:ring-amber-500 disabled:cursor-wait disabled:opacity-60">
      {busy ? 'Processing payment…' : `Complete Payment · ${money(quote.totalCents)}`}
    </button>
    <p className="mt-3 text-sm leading-relaxed text-slate-600">Submitting a payment does not, by itself, bind or activate insurance coverage.</p>
    {error && <p role="alert" className="mt-3 rounded-xl bg-red-50 p-3 text-sm text-red-800">{error}</p>}
  </div>;
}

export function PaymentPage() {
  const [config, setConfig] = useState<Config | null>(null);
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [quote, setQuote] = useState<Quote | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [requestId, setRequestId] = useState('');
  const stripe = useMemo<Promise<Stripe | null> | null>(() => config?.publishableKey ? loadStripe(config.publishableKey) : null, [config?.publishableKey]);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    setForm((current) => ({ ...current, reference: query.get('ref') || '', paymentType: query.get('type') || 'Down Payment',
      amount: query.get('amount') || '', link: query.get('link') || undefined }));
    fetch('/api/payments/config', { cache: 'no-store' }).then((res) => res.json() as Promise<Config>).then(setConfig).catch(() => setConfig({ available: false, publishableKey: null, minCents: 50, maxCents: 10000000 }));
  }, []);

  function update(name: keyof Form, value: string | boolean) {
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  }
  async function review() {
    const found = validate(form, config);
    setErrors(found);
    if (Object.keys(found).length) return;
    setLoading(true); setMessage('');
    try {
      const response = await fetch('/api/payments/quote', { method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form) });
      const data = await response.json() as Quote & { error?: string };
      if (!response.ok || data.error) throw new Error(data.error || 'Unable to review payment.');
      trackEvent('payment_review', { payment_type: form.paymentType });
      setQuote(data); setRequestId(crypto.randomUUID());
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Unable to review payment.'); }
    finally { setLoading(false); }
  }
  const previewAmount = /^(?:0|[1-9]\d{0,7})(?:\.\d{1,2})?$/.test(form.amount) ? Math.round(Number(form.amount) * 100) : 0;
  return <div className="min-h-screen bg-[#f4f6f8] text-slate-950">
    <header className="border-b border-white/10 bg-black">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <a href="/" aria-label="Vantins home"><Logo invert /></a>
        <a href="/help-support#contact" className="text-sm font-semibold text-white/85 underline-offset-4 hover:text-amber-300 hover:underline">Help & Contact</a>
      </div>
    </header>
    <main className="mx-auto max-w-6xl px-5 pb-16 pt-9 sm:px-8 sm:pt-12">
      <div className="mb-8"><p className="text-sm font-bold uppercase tracking-[0.16em] text-amber-700">Secure payment</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Make a payment to Vantins</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">Enter your details, review the amount, and choose an available payment method. Have your quote, invoice, or policy reference ready.</p></div>
      <div className="grid items-start gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
        <section aria-labelledby="payer-heading" className="order-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 lg:order-1">
          <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-amber-100 text-sm font-bold text-amber-900">1</span>
            <h2 id="payer-heading" className="text-xl font-bold">Payer Information</h2></div>
          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2"><Field name="fullName" label="Full name" value={form.fullName} onChange={(v) => update('fullName', v)} error={errors.fullName} autoComplete="name" disabled={!!quote} /></div>
            <Field name="email" label="Email address" value={form.email} onChange={(v) => update('email', v)} error={errors.email} type="email" autoComplete="email" disabled={!!quote} />
            <Field name="phone" label="Phone number" value={form.phone} onChange={(v) => update('phone', v)} error={errors.phone} type="tel" inputMode="tel" autoComplete="tel" disabled={!!quote} />
            <div className="sm:col-span-2"><Field name="reference" label="Reference number" value={form.reference} onChange={(v) => update('reference', v)} error={errors.reference} hint="Quote, invoice, or policy number" disabled={!!quote || !!form.link} /></div>
            <label htmlFor="paymentType" className="block text-sm font-semibold text-slate-800">Payment type <span className="text-amber-700">*</span>
              <select id="paymentType" value={form.paymentType} disabled={!!quote || !!form.link} onChange={(e) => update('paymentType', e.target.value)} aria-invalid={!!errors.paymentType} className={fieldStyle}>
                {PAYMENT_TYPES.map((type) => <option key={type}>{type}</option>)}
              </select>{errors.paymentType && <span className="mt-1 block text-sm text-red-700">{errors.paymentType}</span>}
            </label>
            <Field name="amount" label="Amount (USD)" value={form.amount} onChange={(v) => update('amount', v)} error={errors.amount} inputMode="decimal" hint={form.link ? 'Fixed amount from Vantins payment link' : 'Enter the amount shown on your invoice or quote'} disabled={!!quote || !!form.link} />
            <label htmlFor="notes" className="block text-sm font-semibold text-slate-800 sm:col-span-2">Notes <span className="font-normal text-slate-500">(optional)</span>
              <textarea id="notes" maxLength={500} rows={3} value={form.notes} disabled={!!quote} onChange={(e) => update('notes', e.target.value)}
                placeholder="Policy number, agency, invoice, or other details" className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 disabled:bg-slate-100" />
              {errors.notes && <span className="mt-1 block text-sm text-red-700">{errors.notes}</span>}
            </label>
          </div>
          <label className="mt-7 flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
            <input type="checkbox" checked={form.consent} disabled={!!quote} onChange={(event) => update('consent', event.target.checked)}
              className="mt-1 h-5 w-5 shrink-0 accent-amber-600" />
            <span>I authorize Vantins to charge the payment method I select for the total shown. I understand that payment does not bind or activate insurance coverage. I agree to the <a className="font-semibold underline" href="/terms-of-payment" target="_blank" rel="noopener noreferrer">Terms of Payment</a>.</span>
          </label>
          {errors.consent && <p role="alert" className="mt-1 text-sm text-red-700">{errors.consent}</p>}
          {!quote && <button type="button" data-analytics-cta="payment_review" onClick={review} disabled={!config?.available || loading}
            className="mt-6 w-full rounded-xl bg-slate-950 px-5 py-3.5 text-base font-bold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50">
            {loading ? 'Checking details…' : 'Review Payment'}
          </button>}
          {quote && <button type="button" onClick={() => { setQuote(null); setRequestId(''); }} className="mt-6 font-semibold text-amber-800 underline underline-offset-4">Edit payer details</button>}
          {message && <p role="alert" className="mt-3 text-sm text-red-700">{message}</p>}
          {config && !config.available && <p className="mt-4 rounded-xl bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">Online payments are being prepared. Please <a className="font-bold underline" href="/help-support#contact">contact Vantins support</a> to make a payment.</p>}
        </section>
        <aside aria-labelledby="details-heading" className="order-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 lg:order-2">
          <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-amber-100 text-sm font-bold text-amber-900">2</span>
            <h2 id="details-heading" className="text-xl font-bold">Payment Details</h2></div>
          <div className="mt-7 divide-y divide-slate-200 rounded-xl bg-slate-50 px-5">
            <div className="flex justify-between gap-4 py-4 text-base"><span className="text-slate-600">Amount</span><span className="font-semibold">{quote ? money(quote.amountCents) : previewAmount ? money(previewAmount) : '—'}</span></div>
            <div className="flex justify-between gap-4 py-4 text-base"><span className="text-slate-600">Fee</span><span className="font-semibold">{quote ? money(quote.feeCents) : '—'}</span></div>
            <div className="flex justify-between gap-4 py-4 text-lg font-bold"><span>Total</span><span>{quote ? money(quote.totalCents) : '—'}</span></div>
          </div>
          {!quote && <p className="mt-4 text-sm leading-relaxed text-slate-600">The total is confirmed by Vantins after you review your details. No fee is added by default.</p>}
          {quote && stripe && <div className="mt-8"><h3 className="mb-4 text-base font-bold">Choose a payment method</h3>
            <Elements stripe={stripe} options={{ mode: 'payment', amount: quote.totalCents, currency: 'usd', paymentMethodCreation: 'manual',
              appearance: { theme: 'stripe', variables: { colorPrimary: '#b45309', colorText: '#0f172a', borderRadius: '10px' } } }}>
              <PaymentElement options={{ layout: 'accordion' }} />
              <PaymentControls form={form} quote={quote} requestId={requestId} />
            </Elements>
          </div>}
          <div className="mt-7 border-t border-slate-200 pt-5">
            <p className="text-sm text-slate-600">Card and US bank account options appear when available for this payment in Stripe.</p>
            <a href="https://stripe.com" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block">
              <img src={badge} alt="Powered by Stripe" className="h-8 w-auto" loading="lazy" />
            </a>
          </div>
        </aside>
      </div>
    </main>
    <footer className="border-t border-slate-200 bg-white px-5 py-6 text-center text-sm text-slate-600">
      <a href="/privacy-policy" className="underline hover:text-slate-900">Privacy Policy</a>
      <span className="mx-3">·</span><a href="/terms-of-payment" className="underline hover:text-slate-900">Terms of Payment</a>
      <span className="mx-3">·</span><a href="/help-support#contact" className="underline hover:text-slate-900">Contact support</a>
    </footer>
  </div>;
}
