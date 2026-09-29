"use client";

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Footer, Navbar, PromoBar } from '@/components/layout';
import { IconArrowRight, IconCheck, IconInvoice, IconMinus, IconPlus, IconReceipt, IconShield, IconUsers } from '@/components/icons';
import { Container, LinkButton } from '@/components/ui';
import { LanguageProvider, useLang } from '@/i18n';
import type { Lang } from '@/i18n';
import { SALES_PHONE, SALES_PHONE_TEL } from '@/utils/constants';
import { EASE_OUT_EXPO, fadeUp, staggerContainer, staggerItem, viewportOnce } from '@/utils/motion';

const SUPPORT_EMAIL = 'support@vantins.com';

interface SupportCopy {
  hero: { eyebrow: string; title: string; accent: string; description: string; call: string; email: string; note: string };
  options: { eyebrow: string; title: string; description: string; cards: { title: string; description: string; action: string; href: string }[] };
  claims: { eyebrow: string; title: string; description: string; steps: string[]; call: string };
  contact: { eyebrow: string; title: string; description: string; phoneLabel: string; emailLabel: string; hoursLabel: string; hours: string; addressLabel: string; address: string; response: string };
  faq: { eyebrow: string; title: string; items: { question: string; answer: string }[] };
  cta: { title: string; description: string; quote: string; call: string };
}

const COPY: Record<Lang, SupportCopy> = {
  en: {
    hero: {
      eyebrow: 'Help & Support',
      title: 'Real help, right when',
      accent: 'you need it.',
      description: 'Questions about a quote, an existing policy, a certificate, or a claim? Our team gives you clear answers and practical next steps—in English or Spanish.',
      call: 'Call Our Team',
      email: 'Email Support',
      note: 'Monday–Friday · 8 AM–5 PM Eastern',
    },
    options: {
      eyebrow: 'How can we help?',
      title: 'Choose the support you need.',
      description: 'Start with the option that best matches your request. Every path connects you with a real Vantins advisor.',
      cards: [
        { title: 'Get a New Quote', description: 'Compare coverage from trusted carriers for commercial trucking, health, or life insurance.', action: 'Start your quote', href: '/get-quote' },
        { title: 'Policy Support', description: 'Ask about coverage, billing, renewals, policy changes, or documents for an active policy.', action: 'Email support', href: `mailto:${SUPPORT_EMAIL}?subject=Policy%20Support` },
        { title: 'Certificate of Insurance', description: 'Request COI guidance and help keeping broker, shipper, or terminal requirements moving.', action: 'Request COI help', href: `mailto:${SUPPORT_EMAIL}?subject=Certificate%20of%20Insurance%20Support` },
        { title: 'Claims Guidance', description: 'Get practical help understanding the claim process and what information to prepare.', action: 'View claim steps', href: '#claims' },
      ],
    },
    claims: {
      eyebrow: 'Claims guidance',
      title: 'When something happens, start here.',
      description: 'If anyone is in immediate danger, contact emergency services first. Then document the incident and notify the insurance carrier listed on your policy. Vantins can help you understand the next steps.',
      steps: ['Prioritize safety and call 911 when necessary.', 'Photograph the scene, damage, and relevant documents.', 'Collect names, contact details, and incident information.', 'Report the claim to your carrier and keep the claim number.', 'Contact Vantins if you need help navigating the process.'],
      call: 'Call for guidance',
    },
    contact: {
      eyebrow: 'Contact Vantins',
      title: 'A real person is ready to help.',
      description: 'Contact our support team for policy questions, documentation, COIs, claims guidance, or help choosing the right next step.',
      phoneLabel: 'Phone',
      emailLabel: 'Email',
      hoursLabel: 'Business hours',
      hours: 'Monday–Friday · 8 AM–5 PM Eastern',
      addressLabel: 'Mailing address',
      address: '28 W Flagler St, Suite 300B #336, Miami, FL 33130',
      response: 'Messages received during business hours are typically answered the same day.',
    },
    faq: {
      eyebrow: 'Frequently asked questions',
      title: 'Quick answers before you contact us.',
      items: [
        { question: 'How do I request a free quote?', answer: 'Open the Get a Quote page and select commercial truck, health, or life insurance. Complete the secure form and a Vantins advisor will follow up with you.' },
        { question: 'Can Vantins help me understand my current policy?', answer: 'Yes. Contact support with your name, carrier, and policy number if available. We can explain coverage and help identify the correct next step.' },
        { question: 'How do I request help with a certificate of insurance?', answer: 'Email support@vantins.com with your policy information and the certificate holder requirements. Include any deadline so our team can prioritize the request correctly.' },
        { question: 'What should I do first after an accident or loss?', answer: 'Make sure everyone is safe, contact emergency services when needed, document the incident, and report the claim to the carrier shown on your policy. Vantins can then help you navigate the process.' },
        { question: 'Is support available in Spanish?', answer: 'Yes. Our bilingual team can assist you in English or Spanish with quotes, policy questions, documents, and general guidance.' },
        { question: 'How quickly will I receive a response?', answer: 'Messages received during normal business hours are typically answered the same day. Urgent claim events should also be reported directly to your insurance carrier.' },
      ],
    },
    cta: { title: 'Need coverage instead of support?', description: 'Start a free, no-obligation quote and let our advisors compare options for you.', quote: 'Get Your Free Quote', call: 'Talk With Our Team' },
  },
  es: {
    hero: {
      eyebrow: 'Ayuda y Soporte',
      title: 'Ayuda real, justo cuando',
      accent: 'la necesitas.',
      description: '¿Tienes preguntas sobre una cotización, una póliza, un certificado o una reclamación? Nuestro equipo te ofrece respuestas claras y próximos pasos prácticos, en español o inglés.',
      call: 'Llama a Nuestro Equipo',
      email: 'Escribe a Soporte',
      note: 'Lunes a viernes · 8 AM–5 PM hora del Este',
    },
    options: {
      eyebrow: '¿Cómo podemos ayudarte?',
      title: 'Elige el soporte que necesitas.',
      description: 'Comienza con la opción que mejor describa tu solicitud. Cada camino te conecta con un asesor real de Vantins.',
      cards: [
        { title: 'Nueva Cotización', description: 'Compara coberturas de aseguradoras confiables para camiones comerciales, salud o vida.', action: 'Inicia tu cotización', href: '/get-quote' },
        { title: 'Soporte de Póliza', description: 'Consulta sobre cobertura, pagos, renovaciones, cambios o documentos de una póliza activa.', action: 'Escribe a soporte', href: `mailto:${SUPPORT_EMAIL}?subject=Soporte%20de%20P%C3%B3liza` },
        { title: 'Certificado de Seguro', description: 'Solicita orientación sobre COI y requisitos de brokers, embarcadores o terminales.', action: 'Solicita ayuda con COI', href: `mailto:${SUPPORT_EMAIL}?subject=Soporte%20de%20Certificado%20de%20Seguro` },
        { title: 'Orientación de Reclamaciones', description: 'Recibe ayuda para entender el proceso y la información que debes preparar.', action: 'Ver pasos', href: '#claims' },
      ],
    },
    claims: {
      eyebrow: 'Orientación de reclamaciones',
      title: 'Cuando ocurre algo, comienza aquí.',
      description: 'Si alguien está en peligro inmediato, llama primero a los servicios de emergencia. Luego documenta el incidente y avisa a la aseguradora indicada en tu póliza. Vantins puede ayudarte a entender los próximos pasos.',
      steps: ['Prioriza la seguridad y llama al 911 cuando sea necesario.', 'Fotografía el lugar, los daños y los documentos relevantes.', 'Recopila nombres, contactos e información del incidente.', 'Reporta la reclamación a tu aseguradora y conserva el número del caso.', 'Contacta a Vantins si necesitas orientación durante el proceso.'],
      call: 'Llama para recibir orientación',
    },
    contact: {
      eyebrow: 'Contacta a Vantins',
      title: 'Una persona real está lista para ayudarte.',
      description: 'Habla con nuestro equipo sobre pólizas, documentos, COI, reclamaciones o el siguiente paso adecuado.',
      phoneLabel: 'Teléfono',
      emailLabel: 'Correo',
      hoursLabel: 'Horario',
      hours: 'Lunes a viernes · 8 AM–5 PM hora del Este',
      addressLabel: 'Dirección postal',
      address: '28 W Flagler St, Suite 300B #336, Miami, FL 33130',
      response: 'Los mensajes recibidos durante el horario laboral normalmente se responden el mismo día.',
    },
    faq: {
      eyebrow: 'Preguntas frecuentes',
      title: 'Respuestas rápidas antes de contactarnos.',
      items: [
        { question: '¿Cómo solicito una cotización gratis?', answer: 'Abre la página Cotiza Gratis y selecciona seguro para camiones comerciales, salud o vida. Completa el formulario seguro y un asesor de Vantins se comunicará contigo.' },
        { question: '¿Vantins puede ayudarme a entender mi póliza actual?', answer: 'Sí. Contacta a soporte con tu nombre, aseguradora y número de póliza si lo tienes. Podemos explicar la cobertura y ayudarte a identificar el próximo paso.' },
        { question: '¿Cómo solicito ayuda con un certificado de seguro?', answer: 'Escribe a support@vantins.com con la información de tu póliza y los requisitos del titular del certificado. Incluye la fecha límite para que el equipo pueda priorizar correctamente.' },
        { question: '¿Qué debo hacer primero después de un accidente o pérdida?', answer: 'Asegúrate de que todos estén a salvo, llama a emergencias cuando sea necesario, documenta el incidente y reporta la reclamación a la aseguradora indicada en tu póliza.' },
        { question: '¿Ofrecen soporte en español?', answer: 'Sí. Nuestro equipo bilingüe puede ayudarte en español o inglés con cotizaciones, pólizas, documentos y orientación general.' },
        { question: '¿Cuándo recibiré una respuesta?', answer: 'Los mensajes recibidos durante el horario laboral normalmente se responden el mismo día. Los eventos urgentes también deben reportarse directamente a tu aseguradora.' },
      ],
    },
    cta: { title: '¿Necesitas cobertura en lugar de soporte?', description: 'Inicia una cotización gratis y sin compromiso para que nuestros asesores comparen opciones por ti.', quote: 'Cotiza Gratis', call: 'Habla con Nuestro Equipo' },
  },
};

const optionIcons = [IconReceipt, IconUsers, IconInvoice, IconShield];

export function HelpSupportPage() {
  return <LanguageProvider><HelpSupportContent /></LanguageProvider>;
}

function HelpSupportContent() {
  const { lang } = useLang();
  const copy = COPY[lang];
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      <PromoBar />
      <Navbar />
      <main>
        <section className="relative isolate overflow-hidden bg-[#06182d] text-white">
          <div aria-hidden className="absolute -right-48 -top-48 -z-20 h-[38rem] w-[38rem] rounded-full bg-brand-500/20 blur-3xl" />
          <div aria-hidden className="absolute -bottom-48 -left-48 -z-20 h-[32rem] w-[32rem] rounded-full bg-[#235889]/35 blur-3xl" />
          <Container className="grid items-center gap-12 py-20 lg:grid-cols-[1.08fr_0.92fr] lg:py-28">
            <motion.div variants={fadeUp} initial="hidden" animate="visible">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-300">{copy.hero.eyebrow}</p>
              <h1 className="mt-5 max-w-4xl text-[clamp(2.75rem,5vw,60px)] font-extrabold leading-[1.02] tracking-tight text-balance">
                {copy.hero.title} <span className="text-gradient-qb">{copy.hero.accent}</span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/72 sm:text-xl">{copy.hero.description}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <LinkButton href={`tel:${SALES_PHONE_TEL}`} size="lg" className="group">{copy.hero.call}<IconArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" /></LinkButton>
                <LinkButton href={`mailto:${SUPPORT_EMAIL}`} size="lg" variant="outline" className="!border-white/25 !bg-white/5 !text-white hover:!bg-white/10">{copy.hero.email}</LinkButton>
              </div>
              <p className="mt-5 text-sm font-medium text-white/55">{copy.hero.note}</p>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" animate="visible" className="relative">
              <div className="rounded-[2rem] border border-white/20 bg-white/[0.08] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:p-8">
                <div className="flex items-center gap-4 border-b border-white/12 pb-6">
                  <span className="grid h-14 w-14 place-items-center rounded-full border border-white/20 bg-white/10 text-brand-300"><IconUsers className="h-7 w-7" /></span>
                  <div><p className="text-sm font-semibold text-white/55">{copy.contact.phoneLabel}</p><a href={`tel:${SALES_PHONE_TEL}`} className="mt-1 block text-2xl font-extrabold hover:text-brand-300">{SALES_PHONE}</a></div>
                </div>
                <div className="grid gap-4 pt-6 sm:grid-cols-2">
                  <a href={`mailto:${SUPPORT_EMAIL}`} className="rounded-2xl border border-white/12 bg-white/[0.07] p-5 transition hover:-translate-y-0.5 hover:border-brand-300/60 hover:bg-white/10"><span className="text-xs font-bold uppercase tracking-[0.16em] text-brand-300">{copy.contact.emailLabel}</span><span className="mt-2 block text-sm font-semibold sm:text-[0.95rem]">{SUPPORT_EMAIL}</span></a>
                  <div className="rounded-2xl border border-white/12 bg-white/[0.07] p-5"><span className="text-xs font-bold uppercase tracking-[0.16em] text-brand-300">{copy.contact.hoursLabel}</span><span className="mt-2 block text-sm font-semibold leading-relaxed">{copy.contact.hours}</span></div>
                </div>
              </div>
            </motion.div>
          </Container>
        </section>

        <section id="support-options" className="bg-white py-20 lg:py-28">
          <Container>
            <div className="mx-auto max-w-3xl text-center"><p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">{copy.options.eyebrow}</p><h2 className="mt-4 text-display-md text-balance text-ink">{copy.options.title}</h2><p className="mt-5 text-lg leading-relaxed text-ink/65">{copy.options.description}</p></div>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {copy.options.cards.map((card, index) => { const Icon = optionIcons[index]; return <motion.article key={card.title} variants={staggerItem} className="group flex min-h-[20rem] flex-col rounded-3xl border border-ink/10 bg-[#f7f8fa] p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-card"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#071f3d] text-brand-300"><Icon className="h-6 w-6" /></span><h3 className="mt-6 text-xl font-bold text-ink">{card.title}</h3><p className="mt-3 flex-1 leading-relaxed text-ink/62">{card.description}</p><a href={card.href} className="mt-6 inline-flex items-center gap-2 font-bold text-brand-600 hover:text-brand-700">{card.action}<IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></a></motion.article>; })}
            </motion.div>
          </Container>
        </section>

        <section id="claims" className="bg-[#071f3d] py-20 text-white lg:py-28">
          <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}><p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-300">{copy.claims.eyebrow}</p><h2 className="mt-4 text-display-md text-balance">{copy.claims.title}</h2><p className="mt-6 text-lg leading-relaxed text-white/68">{copy.claims.description}</p><LinkButton href={`tel:${SALES_PHONE_TEL}`} size="lg" className="mt-8">{copy.claims.call}</LinkButton></motion.div>
            <motion.ol variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="divide-y divide-white/12 rounded-3xl border border-white/14 bg-white/[0.06] px-6 backdrop-blur-lg sm:px-8">{copy.claims.steps.map((step, index) => <motion.li key={step} variants={staggerItem} className="flex items-start gap-5 py-5"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-500 font-extrabold text-white">{index + 1}</span><span className="pt-1.5 font-semibold leading-relaxed text-white/85">{step}</span></motion.li>)}</motion.ol>
          </Container>
        </section>

        <section id="contact" className="bg-[#f5f7fa] py-20 lg:py-28">
          <Container className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">{copy.contact.eyebrow}</p><h2 className="mt-4 text-display-md text-balance text-ink">{copy.contact.title}</h2><p className="mt-5 text-lg leading-relaxed text-ink/65">{copy.contact.description}</p><p className="mt-7 flex items-start gap-3 rounded-2xl border border-brand-200 bg-brand-50 p-4 text-sm font-semibold leading-relaxed text-ink"><IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />{copy.contact.response}</p></div>
            <div className="grid gap-4 sm:grid-cols-2"><a href={`tel:${SALES_PHONE_TEL}`} className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-card"><span className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">{copy.contact.phoneLabel}</span><strong className="mt-3 block text-xl text-ink">{SALES_PHONE}</strong></a><a href={`mailto:${SUPPORT_EMAIL}`} className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-card"><span className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">{copy.contact.emailLabel}</span><strong className="mt-3 block break-all text-xl text-ink">{SUPPORT_EMAIL}</strong></a><div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm"><span className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">{copy.contact.hoursLabel}</span><strong className="mt-3 block leading-relaxed text-ink">{copy.contact.hours}</strong></div><div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm"><span className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">{copy.contact.addressLabel}</span><strong className="mt-3 block leading-relaxed text-ink">{copy.contact.address}</strong></div></div>
          </Container>
        </section>

        <section id="faq" className="bg-white py-20 lg:py-28">
          <Container className="max-w-4xl"><div className="text-center"><p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">{copy.faq.eyebrow}</p><h2 className="mt-4 text-display-md text-balance text-ink">{copy.faq.title}</h2></div><div className="mt-12 divide-y divide-ink/10 border-y border-ink/10">{copy.faq.items.map((item, index) => { const open = openFaq === index; const panelId = `support-faq-panel-${index}`; const buttonId = `support-faq-button-${index}`; return <div key={item.question}><h3><button id={buttonId} type="button" onClick={() => setOpenFaq(open ? -1 : index)} aria-expanded={open} aria-controls={panelId} className="flex w-full items-center justify-between gap-5 py-6 text-left"><span className="text-base font-bold text-ink sm:text-lg">{item.question}</span><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-surface-subtle text-ink-soft">{open ? <IconMinus className="h-4 w-4" /> : <IconPlus className="h-4 w-4" />}</span></button></h3><AnimatePresence initial={false}>{open && <motion.div id={panelId} role="region" aria-labelledby={buttonId} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.32, ease: EASE_OUT_EXPO }} className="overflow-hidden"><p className="pb-6 pr-12 leading-relaxed text-ink/65">{item.answer}</p></motion.div>}</AnimatePresence></div>; })}</div></Container>
        </section>

        <section className="bg-gradient-bar px-5 py-16 text-center text-white lg:py-20"><h2 className="mx-auto max-w-4xl text-display-md text-balance">{copy.cta.title}</h2><p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">{copy.cta.description}</p><div className="mt-8 flex flex-wrap justify-center gap-3"><LinkButton href="/get-quote" size="lg" className="!bg-white !text-ink hover:!bg-white/90 group">{copy.cta.quote}<IconArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" /></LinkButton><LinkButton href={`tel:${SALES_PHONE_TEL}`} size="lg" variant="outline" className="!border-white/35 !bg-transparent !text-white hover:!bg-white/10">{copy.cta.call}</LinkButton></div></section>
      </main>
      <Footer />
    </>
  );
}
