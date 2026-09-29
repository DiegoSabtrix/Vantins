"use client";

import { useState, type FormEvent, type ReactNode } from 'react';
import { Footer, Navbar, PromoBar } from '@/components/layout';
import { Container } from '@/components/ui';
import { IconArrowRight, IconCheck, IconShield } from '@/components/icons';
import { CarrierMarquee } from '@/sections/TrustBar';
import { LanguageProvider, useLang } from '@/i18n';
import { SALES_PHONE, SALES_PHONE_TEL } from '@/utils/constants';

type Kind = '' | 'starting' | 'renewing' | 'adding';
type FieldName = 'name' | 'phone' | 'email' | 'state' | 'kind' | 'trucks' | 'cargo' | 'timing' | 'renewalDate' | 'startDate' | 'preferredContact' | 'contactConsent';
type FormValues = Record<FieldName, string | boolean>;

const STATES = 'AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY DC'.split(' ');
const initial: FormValues = { name: '', phone: '', email: '', state: '', kind: '', trucks: '', cargo: '', timing: '', renewalDate: '', startDate: '', preferredContact: 'phone', contactConsent: false };

const copy = {
  es: {
    eyebrow: 'OBTÉN TU SEGURO · ATENCIÓN PERSONALIZADA',
    title: 'Tu operación cambia.',
    accent: 'Tu seguro debe ajustarse a ella.',
    intro: '¿Estás comenzando, renovando o agregando camiones? Cuéntanos qué transportas y cómo operas. Un asesor de Vantins revisará contigo las coberturas y los próximos pasos para solicitar una cotización.',
    bullets: ['Atención en español e inglés.', 'Revisión para owner-operators y flotas.', 'Orientación sobre liability, cargo, physical damage y otras coberturas según tu operación.'],
    cta: 'Solicitar revisión de mi seguro',
    formEyebrow: 'COMENCEMOS',
    formTitle: 'Cuéntanos sobre tu operación',
    formIntro: 'Solo lo esencial para que un asesor pueda comunicarse contigo.',
    labels: { name: 'Nombre completo', phone: 'Teléfono', email: 'Correo electrónico', state: 'Estado donde operas', kind: '¿Qué necesitas?', trucks: 'Cantidad de camiones', cargo: 'Tipo principal de carga', timing: '¿Cuándo necesitas cobertura?', renewalDate: 'Fecha de vencimiento de tu póliza', startDate: 'Fecha estimada de inicio', preferredContact: 'Prefiero que me contacten por' },
    placeholders: { name: 'Tu nombre y apellido', phone: '(555) 555-5555', email: 'tu@empresa.com', state: 'Selecciona un estado', kind: 'Selecciona una opción', trucks: 'Ej. 2', cargo: 'Ej. carga general, alimentos, autos', timing: 'Selecciona una opción' },
    kinds: { starting: 'Estoy comenzando', renewing: 'Voy a renovar', adding: 'Quiero agregar camiones' },
    timings: { asap: 'Lo antes posible', two_weeks: 'En 1–2 semanas', this_month: 'Este mes', later: 'Más adelante' },
    channels: { phone: 'Llamada telefónica', email: 'Correo electrónico' },
    consent: 'Autorizo a Vantins a contactarme sobre esta solicitud por el medio elegido. Esto no es una suscripción a mensajes promocionales.',
    disclaimer: 'Enviar este registro no activa una póliza ni garantiza un precio. Las opciones, primas y pagos iniciales dependen de la información de tu operación y de la evaluación de la aseguradora.',
    required: 'Completa este campo.',
    invalidEmail: 'Ingresa un correo válido.',
    invalidPhone: 'Ingresa un teléfono válido (mínimo 10 dígitos).',
    invalidTrucks: 'Ingresa una cantidad entre 1 y 9,999.',
    consentError: 'Confirma que podemos contactarte sobre tu solicitud.',
    submitting: 'Enviando solicitud…',
    error: 'No pudimos enviar tu solicitud. Inténtalo de nuevo o llámanos.',
    successTitle: 'Recibimos tu solicitud.',
    success: 'Un asesor de Vantins revisará tus datos y se comunicará contigo. Si ya tienes una cotización o un COI, puedes tenerlo a mano para la conversación.',
    call: '¿Prefieres hablar ahora?',
    carriersEyebrow: 'ASEGURADORAS',
    carriersTitle: 'Más opciones para encontrar la cobertura adecuada.',
    carriersDescription: 'Trabajamos con aseguradoras especializadas para revisar opciones según tu operación. La disponibilidad depende de tu perfil y de cada aseguradora.',
    stepsEyebrow: 'UN PROCESO SENCILLO',
    stepsTitle: 'Una conversación clara antes de cotizar.',
    steps: [
      ['01', 'Cuéntanos lo básico', 'Comparte tu tipo de operación, carga y cuándo necesitas cobertura.'],
      ['02', 'Revisamos tus necesidades', 'Un asesor identifica las coberturas y datos necesarios para avanzar.'],
      ['03', 'Hablamos contigo', 'Te explicamos los próximos pasos y, si aplica, cómo solicitar opciones.'],
    ],
  },
  en: {
    eyebrow: 'GET INSURED · PERSONAL GUIDANCE',
    title: 'Your operation changes.',
    accent: 'Your insurance should keep up.',
    intro: 'Starting out, renewing, or adding trucks? Tell us what you haul and how you operate. A Vantins advisor will review your coverage needs and the next steps toward requesting a quote.',
    bullets: ['Support in English and Spanish.', 'Guidance for owner-operators and fleets.', 'Help reviewing liability, cargo, physical damage, and other coverage for your operation.'],
    cta: 'Request an insurance review',
    formEyebrow: 'LET’S GET STARTED',
    formTitle: 'Tell us about your operation',
    formIntro: 'Just the essentials so an advisor can reach you.',
    labels: { name: 'Full name', phone: 'Phone number', email: 'Email address', state: 'State of operation', kind: 'What do you need?', trucks: 'Number of trucks', cargo: 'Primary cargo', timing: 'When do you need coverage?', renewalDate: 'Policy expiration date', startDate: 'Estimated start date', preferredContact: 'Preferred contact method' },
    placeholders: { name: 'First and last name', phone: '(555) 555-5555', email: 'you@company.com', state: 'Select a state', kind: 'Select one', trucks: 'E.g. 2', cargo: 'E.g. general freight, food, autos', timing: 'Select one' },
    kinds: { starting: 'I am starting out', renewing: 'I am renewing', adding: 'I am adding trucks' },
    timings: { asap: 'As soon as possible', two_weeks: 'In 1–2 weeks', this_month: 'This month', later: 'Later' },
    channels: { phone: 'Phone call', email: 'Email' },
    consent: 'I authorize Vantins to contact me about this request through my selected method. This does not subscribe me to promotional messages.',
    disclaimer: 'Submitting this registration does not activate a policy or guarantee a price. Coverage options, premiums, and down payments depend on your operation and the insurer’s review.',
    required: 'Please complete this field.',
    invalidEmail: 'Enter a valid email address.',
    invalidPhone: 'Enter a valid phone number (at least 10 digits).',
    invalidTrucks: 'Enter a number from 1 to 9,999.',
    consentError: 'Please confirm we may contact you about your request.',
    submitting: 'Sending request…',
    error: 'We could not send your request. Please try again or call us.',
    successTitle: 'We received your request.',
    success: 'A Vantins advisor will review your details and contact you. If you already have a quote or COI, you can have it ready for the conversation.',
    call: 'Prefer to talk now?',
    carriersEyebrow: 'CARRIERS',
    carriersTitle: 'More options for coverage that fits.',
    carriersDescription: 'We work with specialist insurers to review options for your operation. Availability depends on your profile and each insurer.',
    stepsEyebrow: 'A SIMPLE PROCESS',
    stepsTitle: 'A clear conversation before the quote.',
    steps: [
      ['01', 'Tell us the basics', 'Share your operation, main cargo, and when you need coverage.'],
      ['02', 'We review your needs', 'An advisor identifies the coverage and details needed to move forward.'],
      ['03', 'We connect with you', 'We explain the next steps and, when appropriate, how to request options.'],
    ],
  },
} as const;

const inputClass = 'mt-2 block h-12 w-full rounded-xl border border-[#d8dde5] bg-white px-4 text-[15px] text-[#10213a] outline-none transition placeholder:text-[#98a1ad] focus:border-[#e39a18] focus:ring-2 focus:ring-[#f9b431]/20';

function Field({ label, error, children, full = false }: { label: string; error?: string; children: ReactNode; full?: boolean }) {
  return <div className={full ? 'sm:col-span-2' : ''}><label className="block text-sm font-bold text-[#23344a]">{label}{children}</label>{error && <p role="alert" className="mt-1 text-xs font-semibold text-red-700">{error}</p>}</div>;
}

export function TruckingRegistrationPage() {
  return <LanguageProvider><RegistrationContent /></LanguageProvider>;
}

function RegistrationContent() {
  const { lang } = useLang();
  const t = copy[lang];
  const [values, setValues] = useState<FormValues>(initial);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [submitError, setSubmitError] = useState('');
  const [website, setWebsite] = useState('');
  const update = (field: FieldName, value: string | boolean) => {
    setValues((current) => ({ ...current, [field]: value, ...(field === 'kind' ? { renewalDate: '', startDate: '' } : {}) }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };
  const kind = values.kind as Kind;
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status !== 'idle') return;
    const next: Partial<Record<FieldName, string>> = {};
    for (const key of ['name', 'phone', 'email', 'state', 'kind', 'trucks', 'cargo', 'timing'] as FieldName[]) {
      if (!String(values[key]).trim()) next[key] = t.required;
    }
    if (String(values.name).trim() && String(values.name).trim().length < 2) next.name = t.required;
    if (String(values.cargo).trim() && String(values.cargo).trim().length < 2) next.cargo = t.required;
    if (String(values.email).trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(values.email))) next.email = t.invalidEmail;
    if (String(values.phone).trim() && String(values.phone).replace(/\D/g, '').length < 10) next.phone = t.invalidPhone;
    if (String(values.trucks).trim() && (!Number.isInteger(Number(values.trucks)) || Number(values.trucks) < 1 || Number(values.trucks) > 9999)) next.trucks = t.invalidTrucks;
    if (kind === 'renewing' && !values.renewalDate) next.renewalDate = t.required;
    if (kind === 'starting' && !values.startDate) next.startDate = t.required;
    if (!values.contactConsent) next.contactConsent = t.consentError;
    if (Object.keys(next).length) { setErrors(next); return; }
    setStatus('sending');
    setSubmitError('');
    try {
      const params = new URLSearchParams(window.location.search);
      const response = await fetch('/api/trucking/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          trucks: Number(values.trucks),
          website,
          utm: { source: params.get('utm_source'), medium: params.get('utm_medium'), campaign: params.get('utm_campaign'), content: params.get('utm_content') },
        }),
      });
      if (!response.ok) throw new Error();
      setStatus('sent');
    } catch {
      setSubmitError(t.error);
      setStatus('idle');
    }
  };

  return <>
    <PromoBar />
    <Navbar />
    <main>
      <section className="relative isolate overflow-hidden bg-[#071a30] text-white">
        <img src="/assets/services-truck-clean.webp" alt="" aria-hidden="true" className="absolute inset-0 -z-20 h-full w-full object-cover object-[50%_65%] opacity-35" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#06162c]/95 via-[#06162c]/88 to-[#06162c]/75" />
        <Container className="grid gap-10 py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.88fr)] lg:items-start lg:gap-14 lg:py-20">
          <div className="max-w-2xl lg:pt-10">
            <p className="text-xs font-extrabold uppercase tracking-[0.19em] text-[#ffba34]">{t.eyebrow}</p>
            <h1 className="mt-5 text-[clamp(2.65rem,5vw,4.5rem)] font-extrabold leading-[1.04] tracking-tight">{t.title}<br/><span className="text-[#ffb324]">{t.accent}</span></h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/82">{t.intro}</p>
            <ul className="mt-8 space-y-4">{t.bullets.map((bullet) => <li key={bullet} className="flex items-start gap-3 text-[15px] font-medium leading-relaxed text-white/90"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#ffac1c]/20 text-[#ffc24e]"><IconCheck className="h-4 w-4" /></span>{bullet}</li>)}</ul>
            <a href="#registro" className="mt-9 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#f6a51b] px-6 py-3 font-bold text-[#111b2a] shadow-lg transition hover:bg-[#ffbc43]">{t.cta}<IconArrowRight className="h-5 w-5" /></a>
            <div className="mt-12 hidden items-center gap-3 border-t border-white/20 pt-6 text-sm text-white/70 lg:flex"><IconShield className="h-5 w-5 text-[#ffc24e]" /> Vantins · {lang === 'es' ? 'Orientación humana para tu negocio' : 'Personal guidance for your business'}</div>
          </div>
          <div id="registro" className="scroll-mt-24 rounded-[1.75rem] border border-white/15 bg-white p-6 text-[#18283d] shadow-[0_28px_80px_rgba(2,13,30,0.32)] sm:p-8">
            {status === 'sent' ? (
              <div role="status" className="flex min-h-[28rem] flex-col justify-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-[#ecf8ee] text-[#16834b]"><IconCheck className="h-9 w-9" /></span>
                <h2 className="mt-7 text-3xl font-extrabold">{t.successTitle}</h2>
                <p className="mt-4 text-lg leading-relaxed text-[#58667a]">{t.success}</p>
                <a className="mt-7 font-bold text-[#b46b00] underline underline-offset-4" href={`tel:${SALES_PHONE_TEL}`}>{t.call} {SALES_PHONE}</a>
              </div>
            ) : (
              <>
                <p className="text-xs font-extrabold tracking-[0.16em] text-[#bc7200]">{t.formEyebrow}</p>
                <h2 className="mt-2 text-2xl font-extrabold sm:text-[1.7rem]">{t.formTitle}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#68768a]">{t.formIntro}</p>
                <form onSubmit={onSubmit} noValidate className="mt-6">
                  <div className="absolute -left-[9999px]" aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} /></label></div>
                  <div className="grid gap-x-4 gap-y-4 sm:grid-cols-2">
                    <Field label={t.labels.name} error={errors.name} full><input className={inputClass} autoComplete="name" placeholder={t.placeholders.name} value={String(values.name)} onChange={(e) => update('name', e.target.value)} /></Field>
                    <Field label={t.labels.phone} error={errors.phone}><input className={inputClass} type="tel" autoComplete="tel" placeholder={t.placeholders.phone} value={String(values.phone)} onChange={(e) => update('phone', e.target.value)} /></Field>
                    <Field label={t.labels.email} error={errors.email}><input className={inputClass} type="email" autoComplete="email" placeholder={t.placeholders.email} value={String(values.email)} onChange={(e) => update('email', e.target.value)} /></Field>
                    <Field label={t.labels.state} error={errors.state}><select className={inputClass} value={String(values.state)} onChange={(e) => update('state', e.target.value)}><option value="">{t.placeholders.state}</option>{STATES.map((state) => <option key={state} value={state}>{state}</option>)}</select></Field>
                    <Field label={t.labels.kind} error={errors.kind}><select className={inputClass} value={kind} onChange={(e) => update('kind', e.target.value)}><option value="">{t.placeholders.kind}</option>{(Object.keys(t.kinds) as Array<keyof typeof t.kinds>).map((value) => <option key={value} value={value}>{t.kinds[value]}</option>)}</select></Field>
                    {kind === 'renewing' && <Field label={t.labels.renewalDate} error={errors.renewalDate}><input className={inputClass} type="date" value={String(values.renewalDate)} onChange={(e) => update('renewalDate', e.target.value)} /></Field>}
                    {kind === 'starting' && <Field label={t.labels.startDate} error={errors.startDate}><input className={inputClass} type="date" value={String(values.startDate)} onChange={(e) => update('startDate', e.target.value)} /></Field>}
                    <Field label={t.labels.trucks} error={errors.trucks}><input className={inputClass} type="number" min="1" max="9999" inputMode="numeric" placeholder={t.placeholders.trucks} value={String(values.trucks)} onChange={(e) => update('trucks', e.target.value)} /></Field>
                    <Field label={t.labels.cargo} error={errors.cargo}><input className={inputClass} placeholder={t.placeholders.cargo} value={String(values.cargo)} onChange={(e) => update('cargo', e.target.value)} /></Field>
                    <Field label={t.labels.timing} error={errors.timing}><select className={inputClass} value={String(values.timing)} onChange={(e) => update('timing', e.target.value)}><option value="">{t.placeholders.timing}</option>{(Object.keys(t.timings) as Array<keyof typeof t.timings>).map((value) => <option key={value} value={value}>{t.timings[value]}</option>)}</select></Field>
                    <div className="sm:col-span-2"><p className="text-sm font-bold text-[#23344a]">{t.labels.preferredContact}</p><div className="mt-2 flex flex-wrap gap-5">{(Object.keys(t.channels) as Array<keyof typeof t.channels>).map((channel) => <label key={channel} className="flex items-center gap-2 text-sm text-[#425269]"><input type="radio" name="preferredContact" checked={values.preferredContact === channel} onChange={() => update('preferredContact', channel)} className="accent-[#e38b07]" />{t.channels[channel]}</label>)}</div></div>
                    <div className="sm:col-span-2"><label className="flex items-start gap-3 text-xs leading-relaxed text-[#5f6e80]"><input type="checkbox" checked={Boolean(values.contactConsent)} onChange={(e) => update('contactConsent', e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[#d77e05]" /><span>{t.consent}</span></label>{errors.contactConsent && <p role="alert" className="mt-1 text-xs font-semibold text-red-700">{errors.contactConsent}</p>}</div>
                  </div>
                  {submitError && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-800">{submitError} <a href={`tel:${SALES_PHONE_TEL}`} className="font-bold underline">{SALES_PHONE}</a></p>}
                  <button type="submit" disabled={status === 'sending'} className="mt-6 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[#f6a51b] px-5 py-3.5 text-base font-extrabold text-[#16253a] shadow-sm transition hover:bg-[#ffbb3d] disabled:cursor-wait disabled:opacity-60">{status === 'sending' ? t.submitting : t.cta}<IconArrowRight className="h-5 w-5" /></button>
                  <p className="mt-4 text-xs leading-relaxed text-[#738093]">{t.disclaimer}</p>
                  <p className="mt-3 text-xs text-[#738093]"><a href="/privacy-policy" className="underline underline-offset-2">{lang === 'es' ? 'Política de privacidad' : 'Privacy Policy'}</a> · <a href={`tel:${SALES_PHONE_TEL}`} className="underline underline-offset-2">{SALES_PHONE}</a></p>
                </form>
              </>
            )}
          </div>
        </Container>
      </section>

      <section className="border-b border-[#e5eaf0] bg-white py-16">
        <Container className="text-center"><p className="text-xs font-extrabold tracking-[0.18em] text-[#b8750d]">{t.carriersEyebrow}</p><h2 className="mt-3 text-3xl font-extrabold text-[#263347]">{t.carriersTitle}</h2><p className="mx-auto mt-3 max-w-2xl text-[#647184]">{t.carriersDescription}</p></Container>
        <div className="mt-9"><CarrierMarquee /></div>
      </section>
      <section className="bg-[#f5f7fa] py-16 lg:py-20">
        <Container><div className="text-center"><p className="text-xs font-extrabold tracking-[0.18em] text-[#b8750d]">{t.stepsEyebrow}</p><h2 className="mt-3 text-3xl font-extrabold text-[#263347]">{t.stepsTitle}</h2></div><div className="mt-9 grid gap-5 md:grid-cols-3">{t.steps.map(([number, title, description]) => <article key={number} className="rounded-2xl border border-[#e3e9ef] bg-white p-6"><span className="text-2xl font-extrabold text-[#e29819]">{number}</span><h3 className="mt-4 text-lg font-bold text-[#243348]">{title}</h3><p className="mt-2 text-sm leading-relaxed text-[#68768a]">{description}</p></article>)}</div></Container>
      </section>
    </main>
    <Footer />
  </>;
}
