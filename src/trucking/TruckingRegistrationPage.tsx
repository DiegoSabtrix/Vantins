"use client";

import { useState, type FormEvent, type ReactNode } from 'react';
import { Footer, Navbar } from '@/components/layout';
import { Container } from '@/components/ui';
import { IconArrowRight, IconCheck, IconShield } from '@/components/icons';
import { LanguageProvider, useLang } from '@/i18n';
import { SALES_PHONE, SALES_PHONE_TEL } from '@/utils/constants';

type Kind = '' | 'starting' | 'renewing' | 'adding';
type FieldName = 'kind' | 'name' | 'phone' | 'state' | 'contactConsent';
type FormValues = { kind: Kind; coverages: string[]; trucks: string; name: string; phone: string; state: string; contactConsent: boolean };

const STATES = ['FL', 'TX'] as const;
const COVERAGES = ['liability', 'motor_truck_cargo', 'physical_damage', 'trailer_interchange', 'reefer_breakdown', 'not_sure'] as const;
const initial: FormValues = { kind: '', coverages: [], trucks: '', name: '', phone: '', state: '', contactConsent: false };

const copy = {
  es: {
    mobileEyebrow: 'SEGURO COMERCIAL PARA CAMIONES',
    mobileTitle: 'Cotiza tu seguro de camión con alguien que entiende tu operación.',
    mobileIntro: 'Compara opciones de cobertura y precio con un asesor de Vantins. Déjanos tu número y te llamamos en español.',
    mobileCta: 'Quiero revisar mis opciones',
    mobileNote: 'Para owner-operators y flotas · Sin compromiso',
    mobileFormTitle: 'Te llamamos para revisar tu seguro',
    mobileFormIntro: 'Completa tus datos en menos de un minuto.',
    eyebrow: 'OBTÉN TU SEGURO · ATENCIÓN PERSONALIZADA',
    title: 'Tu operación cambia.',
    accent: 'Tu seguro debe ajustarse a ella.',
    intro: '¿Estás comenzando, renovando o agregando camiones? Déjanos tus datos. Un asesor de Vantins te llamará para conocer tu operación y explicarte los próximos pasos.',
    bullets: ['Atención en español e inglés.', 'Revisión para owner-operators y flotas.', 'Orientación sobre liability, cargo, physical damage y otras coberturas según tu operación.'],
    cta: 'Quiero que me llamen',
    formEyebrow: 'COMENCEMOS',
    formTitle: 'Hablemos de tu seguro comercial',
    formIntro: 'Déjanos tus datos y un asesor de Vantins te llamará para conocer tu operación y explicarte los próximos pasos. Toma menos de un minuto.',
    labels: { kind: '¿En qué etapa estás?', coverages: '¿Qué coberturas quieres revisar? (Opcional)', trucks: '¿Cuántos camiones tienes? (Opcional)', name: 'Nombre', phone: 'Teléfono', state: 'Estado donde operas' },
    placeholders: { name: 'Tu nombre', phone: '(555) 555-5555', state: 'Selecciona un estado' },
    kinds: { starting: 'Estoy comenzando', renewing: 'Voy a renovar', adding: 'Quiero agregar camiones' },
    coverages: { liability: 'Liability', motor_truck_cargo: 'Motor Truck Cargo', physical_damage: 'Physical Damage', trailer_interchange: 'Trailer Interchange', reefer_breakdown: 'Reefer Breakdown', not_sure: 'No estoy seguro' },
    trucks: { one: '1', two_to_four: '2–4', five_plus: '5 o más', no_truck: 'Aún no tengo camión' },
    coverageHint: 'Puedes elegir varias. Si no sabes cuáles necesitas, nosotros te orientamos.',
    consent: 'Autorizo a Vantins a llamarme para responder a esta solicitud. No acepto recibir campañas promocionales por SMS.',
    disclaimer: 'No necesitas conocer las coberturas ni tener documentos listos para solicitar la llamada. El registro no activa una póliza ni garantiza un precio.',
    required: 'Completa este campo.',
    invalidPhone: 'Ingresa un teléfono válido (mínimo 10 dígitos).',
    consentError: 'Confirma que podemos llamarte sobre tu solicitud.',
    submitting: 'Enviando solicitud…',
    error: 'No pudimos enviar tu solicitud. Inténtalo de nuevo o llámanos.',
    successTitle: 'Recibimos tu solicitud.',
    success: 'Un asesor de Vantins revisará tus datos y te llamará. No necesitas tener documentos listos para esta primera conversación.',
    call: '¿Prefieres hablar ahora?',
    stepsEyebrow: 'UN PROCESO SENCILLO',
    stepsTitle: 'Una conversación clara antes de cotizar.',
    steps: [
      ['01', 'Pide tu llamada', 'Elige tu etapa y déjanos nombre, teléfono y estado.'],
      ['02', 'Revisamos tus necesidades', 'Un asesor identifica las coberturas y datos necesarios para avanzar.'],
      ['03', 'Hablamos contigo', 'Te explicamos los próximos pasos y, si aplica, cómo solicitar opciones.'],
    ],
  },
  en: {
    mobileEyebrow: 'COMMERCIAL TRUCK INSURANCE',
    mobileTitle: 'Get a truck insurance quote with someone who understands your operation.',
    mobileIntro: 'Compare coverage and pricing options with a Vantins advisor. Leave your number and we will call you.',
    mobileCta: 'Review my options',
    mobileNote: 'For owner-operators and fleets · No obligation',
    mobileFormTitle: 'We will call to review your insurance',
    mobileFormIntro: 'Leave your details in under a minute.',
    eyebrow: 'GET INSURED · PERSONAL GUIDANCE',
    title: 'Your operation changes.',
    accent: 'Your insurance should keep up.',
    intro: 'Starting out, renewing, or adding trucks? Leave your details. A Vantins advisor will call to learn about your operation and explain the next steps.',
    bullets: ['Support in English and Spanish.', 'Guidance for owner-operators and fleets.', 'Help reviewing liability, cargo, physical damage, and other coverage for your operation.'],
    cta: 'Request a call',
    formEyebrow: 'LET’S GET STARTED',
    formTitle: 'Let’s talk about your commercial insurance',
    formIntro: 'Leave your details and a Vantins advisor will call to learn about your operation and explain the next steps. It takes less than a minute.',
    labels: { kind: 'Where are you in the process?', coverages: 'Which coverages would you like to review? (Optional)', trucks: 'How many trucks do you have? (Optional)', name: 'Name', phone: 'Phone number', state: 'State of operation' },
    placeholders: { name: 'Your name', phone: '(555) 555-5555', state: 'Select a state' },
    kinds: { starting: 'I am starting out', renewing: 'I am renewing', adding: 'I am adding trucks' },
    coverages: { liability: 'Liability', motor_truck_cargo: 'Motor Truck Cargo', physical_damage: 'Physical Damage', trailer_interchange: 'Trailer Interchange', reefer_breakdown: 'Reefer Breakdown', not_sure: 'Not sure' },
    trucks: { one: '1', two_to_four: '2–4', five_plus: '5 or more', no_truck: 'I do not have a truck yet' },
    coverageHint: 'Choose as many as you like. If you are unsure, we will guide you.',
    consent: 'I authorize Vantins to call me about this request. I am not subscribing to promotional SMS campaigns.',
    disclaimer: 'You do not need to know your coverages or have documents ready to request a call. Registration does not activate a policy or guarantee a price.',
    required: 'Please complete this field.',
    invalidPhone: 'Enter a valid phone number (at least 10 digits).',
    consentError: 'Please confirm we may call you about your request.',
    submitting: 'Sending request…',
    error: 'We could not send your request. Please try again or call us.',
    successTitle: 'We received your request.',
    success: 'A Vantins advisor will review your details and call you. You do not need documents ready for this first conversation.',
    call: 'Prefer to talk now?',
    stepsEyebrow: 'A SIMPLE PROCESS',
    stepsTitle: 'A clear conversation before the quote.',
    steps: [
      ['01', 'Request a call', 'Choose your stage and leave your name, phone, and state.'],
      ['02', 'We review your needs', 'An advisor identifies the coverage and details needed to move forward.'],
      ['03', 'We connect with you', 'We explain the next steps and, when appropriate, how to request options.'],
    ],
  },
} as const;

const inputClass = 'mt-2 block h-12 w-full rounded-xl border border-[#d8dde5] bg-white px-4 text-[15px] text-[#10213a] outline-none transition placeholder:text-[#98a1ad] focus:border-[#e39a18] focus:ring-2 focus:ring-[#f9b431]/20';
const choiceClass = (active: boolean) => `min-h-12 rounded-xl border px-3 py-3 text-center text-sm font-bold leading-snug transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d17b00] ${active ? 'border-[#db8a0c] bg-[#fff3da] text-[#754300] shadow-sm' : 'border-[#d8dde5] bg-white text-[#344359] hover:border-[#dfa134] hover:bg-[#fffaf0]'}`;

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return <div><label className="block text-sm font-bold text-[#23344a]">{label}{children}</label>{error && <p role="alert" className="mt-1 text-xs font-semibold text-red-700">{error}</p>}</div>;
}

export function TruckingRegistrationPage() {
  return <LanguageProvider defaultLang="es"><RegistrationContent /></LanguageProvider>;
}

function RegistrationContent() {
  const { lang } = useLang();
  const t = copy[lang];
  const [values, setValues] = useState<FormValues>(initial);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [submitError, setSubmitError] = useState('');
  const [website, setWebsite] = useState('');
  const update = (field: 'kind' | 'name' | 'phone' | 'state', value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };
  const toggleCoverage = (coverage: string) => {
    setValues((current) => ({
      ...current,
      coverages: coverage === 'not_sure'
        ? (current.coverages.includes('not_sure') ? [] : ['not_sure'])
        : current.coverages.includes(coverage)
          ? current.coverages.filter((item) => item !== coverage)
          : [...current.coverages.filter((item) => item !== 'not_sure'), coverage],
    }));
  };
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status !== 'idle') return;
    const next: Partial<Record<FieldName, string>> = {};
    for (const key of ['kind', 'name', 'phone', 'state'] as FieldName[]) {
      if (!String(values[key]).trim()) next[key] = t.required;
    }
    if (values.name.trim() && values.name.trim().length < 2) next.name = t.required;
    if (values.phone.trim() && (!/^\+?[\d\s().-]{10,30}$/.test(values.phone) || values.phone.replace(/\D/g, '').length < 10)) next.phone = t.invalidPhone;
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
          website,
          utm: { source: params.get('utm_source'), medium: params.get('utm_medium'), campaign: params.get('utm_campaign'), content: params.get('utm_content'), term: params.get('utm_term'), segment: params.get('utm_segment') },
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
    <Navbar compactMobile />
    <main>
      <section className="relative isolate overflow-hidden bg-[#071a30] text-white">
        <img src="/assets/services-truck-clean.webp" alt="" aria-hidden="true" className="absolute inset-0 -z-20 hidden h-full w-full object-cover object-[50%_65%] opacity-35 lg:block" />
        <div className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-[#06162c]/95 via-[#06162c]/88 to-[#06162c]/75 lg:block" />
        <Container className="grid gap-0 px-0 py-0 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.88fr)] lg:items-start lg:gap-14 lg:px-8 lg:py-20">
          <div className="relative isolate overflow-hidden px-5 pb-8 pt-8 lg:max-w-2xl lg:overflow-visible lg:px-0 lg:pb-0 lg:pt-10">
            <img src="/assets/services-truck-clean.webp" alt="" aria-hidden="true" className="absolute inset-0 -z-20 h-full w-full object-cover object-left lg:hidden" />
            <div className="absolute inset-0 -z-10 lg:hidden" style={{ background: 'linear-gradient(180deg, rgba(4, 18, 38, .97) 0%, rgba(4, 18, 38, .90) 44%, rgba(4, 18, 38, .62) 100%)' }} />
            <div className="lg:hidden">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.13em] text-[#ffc04c]">{t.mobileEyebrow}</p>
              <h1 className="mt-4 max-w-[25rem] text-[clamp(2.125rem,9.2vw,2.375rem)] font-extrabold leading-[1.08] tracking-tight">{t.mobileTitle}</h1>
              <p className="mt-4 max-w-[25rem] text-base leading-[1.45] text-white/95">{t.mobileIntro}</p>
              <a href="#registro" className="mt-6 flex min-h-14 w-full items-center justify-center rounded-xl bg-[#f6a51b] px-4 py-3 text-center text-base font-extrabold text-[#111b2a] shadow-lg transition hover:bg-[#ffbc43]">{t.mobileCta}</a>
              <p className="mt-3 text-center text-xs font-medium leading-snug text-white/90">{t.mobileNote}</p>
            </div>
            <div className="hidden lg:block">
            <p className="text-xs font-extrabold uppercase tracking-[0.19em] text-[#ffba34]">{t.eyebrow}</p>
            <h1 className="mt-5 text-[clamp(2.65rem,5vw,4.5rem)] font-extrabold leading-[1.04] tracking-tight">{t.title}<br/><span className="text-[#ffb324]">{t.accent}</span></h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/82">{t.intro}</p>
            <ul className="mt-8 space-y-4">{t.bullets.map((bullet) => <li key={bullet} className="flex items-start gap-3 text-[15px] font-medium leading-relaxed text-white/90"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#ffac1c]/20 text-[#ffc24e]"><IconCheck className="h-4 w-4" /></span>{bullet}</li>)}</ul>
            <a href="#registro" className="mt-9 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#f6a51b] px-6 py-3 font-bold text-[#111b2a] shadow-lg transition hover:bg-[#ffbc43]">{t.cta}<IconArrowRight className="h-5 w-5" /></a>
            <div className="mt-12 hidden items-center gap-3 border-t border-white/20 pt-6 text-sm text-white/70 lg:flex"><IconShield className="h-5 w-5 text-[#ffc24e]" /> Vantins · {lang === 'es' ? 'Orientación humana para tu negocio' : 'Personal guidance for your business'}</div>
            </div>
          </div>
          <div id="registro" className="scroll-mt-14 rounded-t-[1.5rem] border border-white/15 bg-white p-5 text-[#18283d] shadow-[0_28px_80px_rgba(2,13,30,0.32)] sm:p-8 lg:scroll-mt-24 lg:rounded-[1.75rem]">
            {status === 'sent' ? (
              <div role="status" className="flex min-h-[24rem] flex-col justify-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-[#ecf8ee] text-[#16834b]"><IconCheck className="h-9 w-9" /></span>
                <h2 className="mt-7 text-3xl font-extrabold">{t.successTitle}</h2>
                <p className="mt-4 text-lg leading-relaxed text-[#58667a]">{t.success}</p>
                <a className="mt-7 font-bold text-[#b46b00] underline underline-offset-4" href={`tel:${SALES_PHONE_TEL}`}>{t.call} {SALES_PHONE}</a>
              </div>
            ) : (
              <>
                <p className="hidden text-xs font-extrabold tracking-[0.16em] text-[#bc7200] lg:block">{t.formEyebrow}</p>
                <h2 className="text-2xl font-extrabold lg:mt-2 lg:text-[1.7rem]"><span className="lg:hidden">{t.mobileFormTitle}</span><span className="hidden lg:inline">{t.formTitle}</span></h2>
                <p className="mt-2 text-sm leading-relaxed text-[#68768a]"><span className="lg:hidden">{t.mobileFormIntro}</span><span className="hidden lg:inline">{t.formIntro}</span></p>
                <form onSubmit={onSubmit} noValidate className="mt-6">
                  <div className="absolute -left-[9999px]" aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} /></label></div>
                  <div className="space-y-5">
                    <fieldset>
                      <legend className="text-sm font-bold text-[#23344a]">{t.labels.kind}</legend>
                      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">{(Object.keys(t.kinds) as Array<keyof typeof t.kinds>).map((kind) => <button key={kind} type="button" aria-pressed={values.kind === kind} onClick={() => update('kind', kind)} className={choiceClass(values.kind === kind)}>{t.kinds[kind]}</button>)}</div>
                      {errors.kind && <p role="alert" className="mt-1 text-xs font-semibold text-red-700">{errors.kind}</p>}
                    </fieldset>
                    <fieldset>
                      <legend className="text-sm font-bold text-[#23344a]">{t.labels.coverages}</legend>
                      <p className="mt-1 text-xs leading-relaxed text-[#68768a]">{t.coverageHint}</p>
                      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">{COVERAGES.map((coverage) => <button key={coverage} type="button" aria-pressed={values.coverages.includes(coverage)} onClick={() => toggleCoverage(coverage)} className={choiceClass(values.coverages.includes(coverage))}>{t.coverages[coverage]}</button>)}</div>
                    </fieldset>
                    <fieldset>
                      <legend className="text-sm font-bold text-[#23344a]">{t.labels.trucks}</legend>
                      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">{(Object.keys(t.trucks) as Array<keyof typeof t.trucks>).map((range) => <button key={range} type="button" aria-pressed={values.trucks === range} onClick={() => setValues((current) => ({ ...current, trucks: current.trucks === range ? '' : range }))} className={choiceClass(values.trucks === range)}>{t.trucks[range]}</button>)}</div>
                    </fieldset>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label={t.labels.name} error={errors.name}><input className={inputClass} autoComplete="name" placeholder={t.placeholders.name} value={values.name} onChange={(e) => update('name', e.target.value)} /></Field>
                      <Field label={t.labels.phone} error={errors.phone}><input className={inputClass} type="tel" autoComplete="tel" inputMode="tel" placeholder={t.placeholders.phone} value={values.phone} onChange={(e) => update('phone', e.target.value)} /></Field>
                      <Field label={t.labels.state} error={errors.state}><select className={inputClass} value={values.state} onChange={(e) => update('state', e.target.value)}><option value="">{t.placeholders.state}</option>{STATES.map((state) => <option key={state} value={state}>{state}</option>)}</select></Field>
                    </div>
                    <div><label className="flex items-start gap-3 text-xs leading-relaxed text-[#5f6e80]"><input type="checkbox" checked={values.contactConsent} onChange={(e) => { setValues((current) => ({ ...current, contactConsent: e.target.checked })); setErrors((current) => ({ ...current, contactConsent: undefined })); }} className="mt-0.5 h-4 w-4 shrink-0 accent-[#d77e05]" /><span>{t.consent}</span></label>{errors.contactConsent && <p role="alert" className="mt-1 text-xs font-semibold text-red-700">{errors.contactConsent}</p>}</div>
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
      <section className="bg-[#f5f7fa] py-10 lg:py-20">
        <Container>
          <div className="text-center"><p className="text-xs font-extrabold tracking-[0.18em] text-[#b8750d]">{t.stepsEyebrow}</p><h2 className="mt-3 text-3xl font-extrabold text-[#263347]">{t.stepsTitle}</h2></div>
          <div className="mt-6 grid gap-3 md:mt-9 md:grid-cols-3 md:gap-5">{t.steps.map(([number, title, description]) => <article key={number} className="rounded-2xl border border-[#e3e9ef] bg-white p-5 lg:p-6"><span className="text-2xl font-extrabold text-[#e29819]">{number}</span><h3 className="mt-3 text-lg font-bold text-[#243348] lg:mt-4">{title}</h3><p className="mt-2 text-sm leading-relaxed text-[#68768a]">{description}</p></article>)}</div>
          <div className="relative mt-9 h-60 overflow-hidden rounded-[1.75rem] bg-[#092344] sm:h-72">
            <img src="/assets/truck-driver-services.jpg" alt={lang === 'es' ? 'Conductor junto a su camión de carga' : 'Driver beside a commercial truck'} loading="lazy" className="h-full w-full object-cover object-[50%_38%]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#061b35]/80 via-[#061b35]/30 to-transparent" />
            <p className="absolute bottom-6 left-6 max-w-xs text-2xl font-extrabold leading-tight text-white sm:bottom-8 sm:left-9 sm:text-3xl">{lang === 'es' ? 'Tu operación merece atención personal.' : 'Your operation deserves personal attention.'}</p>
          </div>
        </Container>
      </section>
    </main>
    <Footer showConsentDisclaimer={false} />
  </>;
}
