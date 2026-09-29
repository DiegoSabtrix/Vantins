import type { Metadata } from 'next';
import { Logo } from '@/components/ui/Logo';

export const metadata: Metadata = { title: 'Terms of Payment | Vantins', robots: { index: false, follow: false } };
export default function Page() {
  return <div className="min-h-screen bg-[#f4f6f8] text-slate-900">
    <header className="bg-black px-5 py-4"><div className="mx-auto max-w-3xl"><a href="/" aria-label="Vantins home"><Logo invert /></a></div></header>
    <main className="mx-auto max-w-3xl px-5 py-12">
      <article className="rounded-2xl border border-slate-200 bg-white p-6 leading-relaxed shadow-sm sm:p-10">
        <p className="text-sm font-bold uppercase tracking-wider text-amber-700">Vantins review required before payments are enabled</p>
        <h1 className="mt-3 text-3xl font-bold">Terms of Payment</h1>
        <p className="mt-6">By submitting a payment, you authorize Vantins to charge the selected payment method for the total displayed before submission. Your payment may be a down payment, invoice payment, policy payment, or other payment identified by the reference you enter.</p>
        <h2 className="mt-7 text-xl font-bold">Processing and confirmation</h2>
        <p className="mt-2">Card payments may complete immediately. US bank account payments may take additional time. A payment marked “processing” is not complete; Vantins will send a confirmation after Stripe reports a successful payment. If a payment is declined, contact Vantins before trying again if you are unsure whether money was withdrawn.</p>
        <h2 className="mt-7 text-xl font-bold">Insurance coverage</h2>
        <p className="mt-2">Submitting or completing a payment does not, by itself, bind, issue, reinstate, or activate insurance coverage. Coverage is subject to the insurer’s underwriting, approval, policy documents, and any applicable effective date communicated separately.</p>
        <h2 className="mt-7 text-xl font-bold">Questions and corrections</h2>
        <p className="mt-2">If the amount or reference is incorrect, do not pay. Contact <a className="underline" href="mailto:support@vantins.com">support@vantins.com</a> before submitting. For questions about a completed payment, provide your name and reference number. Do not email card or bank details.</p>
        <p className="mt-7 text-sm text-slate-600">Draft authorization and terms: Vantins must review and approve this language, its refund handling, and any applicable carrier requirements before enabling payments.</p>
        <div className="mt-8 flex flex-wrap gap-5 text-sm font-semibold"><a href="/payment" className="text-amber-800 underline">Back to payment</a><a href="/privacy-policy" className="text-amber-800 underline">Privacy Policy</a></div>
      </article>
    </main>
  </div>;
}
