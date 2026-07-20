"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Footer, Navbar, PromoBar } from '@/components/layout';
import { Container, LinkButton } from '@/components/ui';
import { IconArrowRight, IconChart, IconCheck, IconGlobe, IconShield, IconUsers } from '@/components/icons';
import { LanguageProvider, useLang } from '@/i18n';
import type { Lang } from '@/i18n';
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from '@/utils/motion';

type QuoteKind = 'truck' | 'health' | 'life';

const FORMS: Record<QuoteKind, { src: string; height: number }> = {
  truck: { src: 'https://api.leadconnectorhq.com/widget/form/hbBmmB4OhgFELZAWBIQZ', height: 1551 },
  health: { src: 'https://api.leadconnectorhq.com/widget/form/1jy41jVzhRSi27hCtksl', height: 1129 },
  life: { src: 'https://api.leadconnectorhq.com/widget/form/5yyWaaLDRI08otDNt0LX', height: 1108 },
};

interface QuoteCopy {
  hero: { eyebrow: string; title: string; accent: string; types: string; description: string; cta: string; note: string };
  selector: { eyebrow: string; title: string; description: string; options: Record<QuoteKind, string>; frameTitles: Record<QuoteKind, string> };
  why: { eyebrow: string; title: string; description: string; items: { title: string; description: string }[] };
  contact: { eyebrow: string; title: string; description: string; call: string; email: string; hours: string; address: string };
}

const COPY: Record<Lang, QuoteCopy> = {
  en: {
    hero: {
      eyebrow: 'Free personalized quote',
      title: 'Protect what matters with a quote built for',
      accent: 'you.',
      types: 'Commercial Truck Insurance • Health Insurance • Life Insurance',
      description: 'At Vantins, we believe protecting what matters most should be simple, transparent, and stress-free. Our experienced insurance advisors compare options from more than 35 top-rated carriers to deliver coverage that fits your business or personal needs at the best possible value.',
      cta: 'Get Started',
      note: 'No obligation. No sales pressure. Just clear, expert guidance tailored to you.',
    },
    selector: {
      eyebrow: 'Start your quote',
      title: 'Choose Your Insurance Type',
      description: 'Select the type of insurance you need and complete the secure form below.',
      options: { truck: 'Commercial Truck', health: 'Health Insurance', life: 'Life Insurance' },
      frameTitles: { truck: 'Commercial Truck Insurance quote form', health: 'Health Insurance quote form', life: 'Life Insurance quote form' },
    },
    why: {
      eyebrow: 'The Vantins difference',
      title: 'Why choose Vantins?',
      description: 'Traditional agencies move slowly. We don’t. Our process is built to make insurance clearer and faster.',
      items: [
        { title: 'Top-Rated Carriers', description: 'Access to more than 35 respected national insurance carriers.' },
        { title: 'Fast Comparison', description: 'A multi-quote comparison system built to find the right value.' },
        { title: 'Expert Advisors', description: 'Licensed advisors with deep industry expertise and clear answers.' },
        { title: 'Digital-First', description: 'A fully digital experience, always human when you need it.' },
      ],
    },
    contact: {
      eyebrow: 'We are here to help',
      title: 'Still have questions?',
      description: 'Talk with our team before you begin or whenever you need help with the form.',
      call: 'Call (713) 332-1286',
      email: 'support@vantins.com',
      hours: 'Monday–Friday · 8 AM–5 PM Eastern',
      address: '28 W Flagler St, Suite 300B #336, Miami, FL 33130',
    },
  },
  es: {
    hero: {
      eyebrow: 'Cotización personalizada gratis',
      title: 'Protege lo que más importa con una cotización hecha para',
      accent: 'ti.',
      types: 'Seguro de Camiones Comerciales • Seguro de Salud • Seguro de Vida',
      description: 'En Vantins creemos que proteger lo que más importa debe ser simple, transparente y sin estrés. Nuestros asesores comparan opciones de más de 35 aseguradoras de primer nivel para ofrecerte una cobertura que se ajuste a las necesidades de tu negocio o familia al mejor valor posible.',
      cta: 'Comenzar',
      note: 'Sin compromiso. Sin presión de ventas. Solo orientación clara y experta, pensada para ti.',
    },
    selector: {
      eyebrow: 'Inicia tu cotización',
      title: 'Elige el tipo de seguro',
      description: 'Selecciona el seguro que necesitas y completa el formulario seguro a continuación.',
      options: { truck: 'Camiones Comerciales', health: 'Seguro de Salud', life: 'Seguro de Vida' },
      frameTitles: { truck: 'Formulario de cotización de seguro para camiones comerciales', health: 'Formulario de cotización de seguro de salud', life: 'Formulario de cotización de seguro de vida' },
    },
    why: {
      eyebrow: 'La diferencia Vantins',
      title: '¿Por qué elegir Vantins?',
      description: 'Las agencias tradicionales avanzan lento. Nosotros no. Nuestro proceso hace que contratar un seguro sea más claro y rápido.',
      items: [
        { title: 'Aseguradoras de Primer Nivel', description: 'Acceso a más de 35 aseguradoras nacionales reconocidas.' },
        { title: 'Comparación Rápida', description: 'Un sistema de múltiples cotizaciones diseñado para encontrar el valor ideal.' },
        { title: 'Asesores Expertos', description: 'Asesores autorizados con experiencia profunda y respuestas claras.' },
        { title: 'Experiencia Digital', description: 'Un proceso completamente digital, siempre humano cuando lo necesitas.' },
      ],
    },
    contact: {
      eyebrow: 'Estamos para ayudarte',
      title: '¿Aún tienes preguntas?',
      description: 'Habla con nuestro equipo antes de comenzar o cuando necesites ayuda con el formulario.',
      call: 'Llama al (713) 332-1286',
      email: 'support@vantins.com',
      hours: 'Lunes a viernes · 8 AM–5 PM hora del Este',
      address: '28 W Flagler St, Suite 300B #336, Miami, FL 33130',
    },
  },
};

const optionIcons = { truck: IconShield, health: IconGlobe, life: IconUsers };
const whyIcons = [IconShield, IconChart, IconUsers, IconGlobe];

export function GetQuotePage() {
  return <LanguageProvider><GetQuoteContent /></LanguageProvider>;
}

function GetQuoteContent() {
  const { lang } = useLang();
  const copy = COPY[lang];
  const [selected, setSelected] = useState<QuoteKind>('truck');
  const form = FORMS[selected];

  return (
    <>
      <PromoBar />
      <Navbar />
      <main>
        <section className="relative isolate overflow-hidden bg-[#06182d] text-white">
          <div aria-hidden className="absolute -right-40 -top-40 -z-10 h-[36rem] w-[36rem] rounded-full bg-brand-500/20 blur-3xl" />
          <div aria-hidden className="absolute -bottom-56 -left-48 -z-10 h-[30rem] w-[30rem] rounded-full bg-[#dc5a0d]/15 blur-3xl" />
          <Container className="grid items-center gap-12 py-20 lg:grid-cols-[1.08fr_0.92fr] lg:py-28">
            <motion.div variants={fadeUp} initial="hidden" animate="visible">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-300">{copy.hero.eyebrow}</p>
              <h1 className="mt-5 text-[clamp(2.75rem,5vw,60px)] font-extrabold leading-[1.02] tracking-tight text-balance">
                {copy.hero.title} <span className="text-gradient-qb">{copy.hero.accent}</span>
              </h1>
              <p className="mt-6 text-sm font-bold uppercase tracking-[0.08em] text-white/72">{copy.hero.types}</p>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">{copy.hero.description}</p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <LinkButton href="#quote-form" size="lg" className="group">{copy.hero.cta}<IconArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" /></LinkButton>
                <p className="max-w-sm text-sm leading-relaxed text-white/55">{copy.hero.note}</p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" animate="visible" className="rounded-[2rem] border border-white/12 bg-white/[0.07] p-5 shadow-float backdrop-blur-xl sm:p-7">
              <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-6 sm:p-8">
                <IconShield className="h-14 w-14 text-brand-300" />
                <p className="mt-8 text-5xl font-extrabold text-gradient-qb">35+</p>
                <p className="mt-2 text-xl font-bold text-white">{lang === 'en' ? 'trusted carriers' : 'aseguradoras de confianza'}</p>
                <p className="mt-3 leading-relaxed text-white/60">{lang === 'en' ? 'One experienced team comparing options for your business and your family.' : 'Un equipo experto que compara opciones para tu negocio y tu familia.'}</p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {Object.keys(FORMS).map((kind) => <span key={kind} className="rounded-full border border-white/12 bg-white/8 px-3 py-1.5 text-xs font-semibold text-white/75">{copy.selector.options[kind as QuoteKind]}</span>)}
                </div>
              </div>
            </motion.div>
          </Container>
        </section>

        <section id="quote-form" className="scroll-mt-8 bg-[#f5f7fa] py-20 lg:py-28">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">{copy.selector.eyebrow}</p>
              <h2 className="mt-4 text-display-md text-balance text-ink">{copy.selector.title}</h2>
              <p className="mt-5 text-lg text-ink/65">{copy.selector.description}</p>
            </div>

            <div className="mx-auto mt-10 max-w-5xl">
              <div className="grid gap-3 rounded-3xl bg-[#071f3d] p-3 sm:grid-cols-3" role="tablist" aria-label={copy.selector.title}>
                {(Object.keys(FORMS) as QuoteKind[]).map((kind) => {
                  const Icon = optionIcons[kind];
                  const active = selected === kind;
                  return (
                    <button key={kind} type="button" role="tab" aria-selected={active} aria-controls="selected-quote-form" onClick={() => setSelected(kind)} className={`flex min-h-16 items-center justify-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition-all ${active ? 'bg-brand-500 text-white shadow-lg' : 'text-white/65 hover:bg-white/8 hover:text-white'}`}>
                      <Icon className="h-5 w-5" />{copy.selector.options[kind]}
                    </button>
                  );
                })}
              </div>

              <div id="selected-quote-form" role="tabpanel" className="mt-5 overflow-hidden rounded-[2rem] border border-ink/10 bg-white shadow-float">
                <div className="border-b border-ink/8 px-6 py-5 sm:px-8">
                  <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-brand-100 text-brand-700"><IconCheck className="h-5 w-5" /></span><p className="font-bold text-ink">{copy.selector.options[selected]}</p></div>
                </div>
                <iframe key={selected} src={form.src} title={copy.selector.frameTitles[selected]} className="block w-full border-0" style={{ height: `${form.height}px` }} loading="lazy" />
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-white py-20 lg:py-28">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
              <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">{copy.why.eyebrow}</p><h2 className="mt-4 text-display-md text-balance text-ink">{copy.why.title}</h2><p className="mt-5 text-lg leading-relaxed text-ink/65">{copy.why.description}</p></div>
              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="grid gap-4 sm:grid-cols-2">
                {copy.why.items.map((item, index) => { const Icon = whyIcons[index]; return <motion.article key={item.title} variants={staggerItem} className="rounded-3xl border border-ink/10 bg-[#f7f8fa] p-6"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#071f3d] text-brand-300"><Icon className="h-5 w-5" /></span><h3 className="mt-5 text-lg font-bold text-ink">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-ink/62">{item.description}</p></motion.article>; })}
              </motion.div>
            </div>
          </Container>
        </section>

        <section className="bg-[#071f3d] py-16 text-white lg:py-20">
          <Container className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-300">{copy.contact.eyebrow}</p><h2 className="mt-4 text-display-md text-balance">{copy.contact.title}</h2><p className="mt-4 max-w-2xl text-lg text-white/65">{copy.contact.description}</p></div>
            <div className="grid gap-3 sm:grid-cols-2 lg:w-[34rem]">
              <a href="tel:+17133321286" className="rounded-2xl border border-white/12 bg-white/6 p-4 font-bold text-white transition-colors hover:bg-white/10">{copy.contact.call}</a>
              <a href="mailto:support@vantins.com" className="rounded-2xl border border-white/12 bg-white/6 p-4 font-bold text-white transition-colors hover:bg-white/10">{copy.contact.email}</a>
              <p className="rounded-2xl border border-white/12 bg-white/6 p-4 text-sm text-white/70">{copy.contact.hours}</p>
              <p className="rounded-2xl border border-white/12 bg-white/6 p-4 text-sm text-white/70">{copy.contact.address}</p>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
