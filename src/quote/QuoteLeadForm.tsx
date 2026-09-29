"use client";

import { useState, type FormEvent } from 'react';
import type { Lang } from '@/i18n';

type QuoteKind = 'truck' | 'health' | 'life';
type Values = {
  name: string; phone: string; email: string; state: string; companyName: string; operationType: string;
  fleetSize: string; coverages: string[]; householdSize: string; coverageAmount: string;
  contactTime: string; contactMethod: string; language: string; contactConsent: boolean;
};
const empty: Values = { name: '', phone: '', email: '', state: '', companyName: '', operationType: '', fleetSize: '', coverages: [], householdSize: '', coverageAmount: '', contactTime: '', contactMethod: '', language: '', contactConsent: false };
const coverageOptions = ['Liability', 'Motor Truck Cargo (MTC)', 'Bobtail / Non-Trucking Liability', 'Umbrella / Excess', 'Physical Damage (PD)', 'Trailer Interchange (TI)', 'General Liability', "Workers' Compensation"];
const inputClass = 'mt-2 min-h-12 w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-base text-ink outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20';

export function QuoteLeadForm({ kind, lang }: { kind: QuoteKind; lang: Lang }) {
  const [values, setValues] = useState<Values>(empty);
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [error, setError] = useState('');
  const es = lang === 'es';
  const set = (key: keyof Values, value: string | boolean | string[]) => setValues(current => ({ ...current, [key]: value }));
  const label = (text: string, child: React.ReactNode) => <label className="block text-sm font-bold text-ink">{text}{child}</label>;
  const text = (key: keyof Values, title: string, type = 'text', required = false) => label(title, <input className={inputClass} type={type} required={required} value={values[key] as string} onChange={e => set(key, e.target.value)} />);
  const select = (key: keyof Values, title: string, options: string[], required = false) => label(title, <select className={inputClass} required={required} value={values[key] as string} onChange={e => set(key, e.target.value)}><option value="">{es ? 'Selecciona una opción' : 'Select an option'}</option>{options.map(option => <option key={option}>{option}</option>)}</select>);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status !== 'idle') return;
    setStatus('sending'); setError('');
    try {
      const params = new URLSearchParams(window.location.search);
      const response = await fetch('/api/leads', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, website, formId: `get_quote_${kind}`, utm: { source: params.get('utm_source'), medium: params.get('utm_medium'), campaign: params.get('utm_campaign'), content: params.get('utm_content'), term: params.get('utm_term'), segment: params.get('utm_segment') } }),
      });
      if (!response.ok) throw new Error();
      setStatus('sent');
    } catch { setStatus('idle'); setError(es ? 'No pudimos enviar tu solicitud. Inténtalo de nuevo o llámanos.' : 'We could not send your request. Please try again or call us.'); }
  }

  if (status === 'sent') return <div role="status" className="p-8 sm:p-12"><h3 className="text-2xl font-extrabold text-ink">{es ? 'Recibimos tu solicitud.' : 'We received your request.'}</h3><p className="mt-3 text-ink/70">{es ? 'Un asesor de Vantins revisará tus datos y se comunicará contigo para hablar sobre los próximos pasos.' : 'A Vantins advisor will review your details and contact you about the next steps.'}</p></div>;

  return <form onSubmit={submit} className="p-6 sm:p-8">
    <div className="absolute -left-[9999px]" aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" value={website} onChange={e => setWebsite(e.target.value)} /></label></div>
    <div className="grid gap-5 sm:grid-cols-2">
      {text('name', es ? 'Nombre completo *' : 'Full name *', 'text', true)}
      {text('phone', es ? 'Teléfono *' : 'Phone number *', 'tel', true)}
      {text('email', es ? 'Correo electrónico *' : 'Email address *', 'email', true)}
      {select('state', es ? 'Estado donde operas *' : 'State of operation *', ['FL', 'TX'], true)}
      {kind === 'truck' && <>
        {text('companyName', es ? 'Nombre de la compañía (opcional)' : 'Company name (optional)')}
        {select('operationType', es ? 'Tipo de operación *' : 'Type of operation *', ['Owner-operator', 'Fleet', 'New Venture'], true)}
        {select('fleetSize', es ? 'Número de camiones / trailers *' : 'Number of trucks / trailers *', ['1', '2–4', '5–10', es ? '11 o más' : '11 or more'], true)}
        {select('language', es ? 'Idioma preferido' : 'Preferred language', ['Español', 'English'])}
      </>}
      {kind === 'health' && select('householdSize', es ? 'Personas en el hogar *' : 'Household size *', ['1', '2', '3', '4', es ? '5 o más' : '5 or more'], true)}
      {kind === 'life' && select('coverageAmount', es ? 'Cobertura deseada *' : 'Desired coverage amount *', ['$50,000–$100,000', '$100,001–$250,000', '$250,001–$500,000', es ? '$500,001 o más' : '$500,001 or more'], true)}
      {select('contactTime', es ? 'Mejor momento para contactarte' : 'Best time to contact you', [es ? 'Mañana' : 'Morning', es ? 'Tarde' : 'Afternoon', es ? 'Noche' : 'Evening'])}
      {select('contactMethod', es ? 'Método de contacto preferido' : 'Preferred contact method', [es ? 'Llamada' : 'Phone call', 'Email'])}
    </div>
    {kind === 'truck' && <fieldset className="mt-6"><legend className="text-sm font-bold text-ink">{es ? 'Coberturas que quieres revisar (opcional)' : 'Coverages to review (optional)'}</legend><div className="mt-3 grid gap-2 sm:grid-cols-2">{coverageOptions.map(option => <label key={option} className="flex min-h-11 items-center gap-3 rounded-xl border border-ink/15 px-3 py-2 text-sm text-ink"><input type="checkbox" checked={values.coverages.includes(option)} onChange={e => set('coverages', e.target.checked ? [...values.coverages, option] : values.coverages.filter(item => item !== option))} className="h-4 w-4 accent-brand-500" />{option}</label>)}</div></fieldset>}
    <label className="mt-6 flex items-start gap-3 text-sm leading-relaxed text-ink/70"><input type="checkbox" required checked={values.contactConsent} onChange={e => set('contactConsent', e.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-brand-500" /><span>{es ? 'Autorizo a Vantins a contactarme para responder a esta solicitud de cotización. No me suscribo a campañas promocionales por SMS.' : 'I authorize Vantins to contact me about this quote request. I am not subscribing to promotional SMS campaigns.'}</span></label>
    {error && <p role="alert" className="mt-4 text-sm font-semibold text-red-700">{error}</p>}
    <button type="submit" disabled={status === 'sending'} className="mt-6 min-h-12 w-full rounded-xl bg-brand-500 px-6 py-3 font-bold text-white hover:bg-brand-600 disabled:opacity-60">{status === 'sending' ? (es ? 'Enviando…' : 'Sending…') : (es ? 'Solicitar mi cotización' : 'Request my quote')}</button>
    <p className="mt-4 text-xs leading-relaxed text-ink/55">{es ? 'Enviar este formulario no activa una póliza ni garantiza un precio.' : 'Submitting this form does not activate a policy or guarantee a price.'} <a href="/privacy-policy" className="underline">{es ? 'Política de privacidad' : 'Privacy Policy'}</a></p>
  </form>;
}
