'use client';

import { useCallback, useEffect, useState } from 'react';
import { Logo } from '@/components/ui/Logo';
import { money } from './shared';

type Result = { status: string; reference: string; paymentType: string; totalCents: number; createdAt: string };
export function PaymentResult() {
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const refresh = useCallback(async () => {
    const request = new URLSearchParams(window.location.search).get('request');
    if (!request) { setError('No payment reference was provided.'); setLoading(false); return; }
    try {
      const response = await fetch(`/api/payments/status?request=${encodeURIComponent(request)}`, { cache: 'no-store' });
      const data = await response.json() as Result & { error?: string };
      if (!response.ok || data.error) throw new Error(data.error || 'Payment status unavailable.');
      setResult(data); setError('');
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Payment status unavailable.'); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void refresh(); }, [refresh]);
  const status = result?.status;
  const completed = status === 'succeeded';
  const pending = status === 'processing' || status === 'creating';
  const actionNeeded = status === 'requires_action' || status === 'requires_confirmation';
  const declined = status === 'requires_payment_method' || status === 'payment_failed' || status === 'canceled' || status === 'failed';
  return <div className="min-h-screen bg-[#f4f6f8]">
    <header className="bg-black px-5 py-4"><div className="mx-auto flex max-w-3xl items-center justify-between"><a href="/" aria-label="Vantins home"><Logo invert /></a><a href="/help-support#contact" className="text-sm font-semibold text-white">Contact support</a></div></header>
    <main className="mx-auto max-w-3xl px-5 py-12 sm:py-20">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        {loading ? <p role="status" className="text-lg">Checking payment status…</p> : error ? <>
          <h1 className="text-2xl font-bold">We could not check this payment</h1>
          <p className="mt-3 text-slate-600">{error} If you submitted a payment, contact support before trying again.</p>
        </> : <>
          <span aria-hidden="true" className={`grid h-14 w-14 place-items-center rounded-full text-2xl ${completed ? 'bg-green-100 text-green-700' : declined ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-800'}`}>{completed ? '✓' : declined ? '!' : '…'}</span>
          <h1 className="mt-5 text-3xl font-bold text-slate-950">{completed ? 'Payment confirmed' : declined ? 'Payment not completed' : actionNeeded ? 'Payment needs verification' : 'Payment processing'}</h1>
          <p className="mt-3 text-base leading-relaxed text-slate-600">
            {completed ? 'Stripe has confirmed your payment. A confirmation will be sent to your email.' :
              declined ? 'Your payment was declined or could not be completed. No confirmation has been issued. Contact support if you need help.' :
              actionNeeded ? 'Additional verification is needed before this payment can complete. Please contact Vantins support if you were redirected here unexpectedly.' :
              'Your bank or payment provider is still processing this payment. We will email you after Stripe confirms the final result. Do not submit another payment while this one is pending.'}
          </p>
          <dl className="mt-8 divide-y divide-slate-200 rounded-xl bg-slate-50 px-5 text-base">
            <div className="flex justify-between gap-4 py-4"><dt className="text-slate-600">Reference</dt><dd className="font-semibold">{result?.reference}</dd></div>
            <div className="flex justify-between gap-4 py-4"><dt className="text-slate-600">Payment type</dt><dd className="font-semibold">{result?.paymentType}</dd></div>
            <div className="flex justify-between gap-4 py-4"><dt className="text-slate-600">Total</dt><dd className="font-semibold">{money(result?.totalCents || 0)}</dd></div>
          </dl>
          <p className="mt-6 text-sm text-slate-600">Payment does not, by itself, bind or activate insurance coverage.</p>
          {(pending || actionNeeded || !completed && !declined) && <button onClick={() => { setLoading(true); void refresh(); }} className="mt-6 rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white hover:bg-slate-800">Refresh status</button>}
        </>}
        <p className="mt-8 text-sm"><a className="font-semibold text-amber-800 underline" href="/help-support#contact">Contact Vantins support</a></p>
      </div>
    </main>
  </div>;
}
