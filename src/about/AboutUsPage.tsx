"use client";

import { motion, useReducedMotion } from 'framer-motion';
import { Footer, Navbar, PromoBar } from '@/components/layout';
import { Container, LinkButton } from '@/components/ui';
import { IconArrowRight, IconCheck, IconGlobe, IconShield, IconUsers } from '@/components/icons';
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from '@/utils/motion';
import { LanguageProvider, useLang } from '@/i18n';
import type { Lang } from '@/i18n';

interface AboutContent {
  hero: { eyebrow: string; title: string; accent: string; description: string; quote: string; approach: string };
  story: { eyebrow: string; title: string; paragraphs: string[]; calloutTitle: string; calloutText: string; imageAlt: string; badgeTitle: string; badgeText: string };
  advantagesSection: { eyebrow: string; title: string; description: string; items: string[]; imageAlt: string };
  specialtiesSection: { eyebrow: string; title: string; description: string; items: [string, string][] };
  service: { imageAlt: string; badgeTitle: string; badgeText: string; eyebrow: string; title: string; description: string; items: string[] };
  standard: { eyebrow: string; title: string; description: string; items: string[] };
  cta: { title: string; description: string; button: string };
}

const ABOUT_CONTENT: Record<Lang, AboutContent> = {
  en: {
    hero: {
      eyebrow: 'About Vantins',
      title: 'Insurance built around',
      accent: 'you.',
      description: 'Clear advice, smarter coverage, and real people who understand your life, your business, and the risks that matter.',
      quote: 'Get Your Free Quote',
      approach: 'Our approach',
    },
    story: {
      eyebrow: 'More than insurance',
      title: 'We’re your risk strategy partner.',
      paragraphs: [
        'At Vantins Insurance Group, we believe insurance shouldn’t feel complicated, slow, or transactional. It should feel clear, strategic, and truly built around your life or your business.',
        'We take time to understand your real risks, compare options intelligently, and build better-structured coverage—without pushing unnecessary protection or letting you overpay.',
      ],
      calloutTitle: 'Most people don’t need more insurance.',
      calloutText: 'They need smarter, more efficient protection.',
      imageAlt: 'Vantins advisors reviewing coverage options with a client',
      badgeTitle: 'Strategy partner',
      badgeText: 'smarter protection, clear advice',
    },
    advantagesSection: {
      eyebrow: 'Speed, clarity & results',
      title: 'Traditional agencies move slowly. We don’t.',
      description: 'Our process combines powerful carrier access with licensed advisors who move quickly, explain clearly, and stay involved after the policy is issued.',
      items: ['Access to top-rated insurance carriers', 'Multi-quote comparison', 'Licensed advisors with deep industry expertise', 'A fully digital experience with real human support'],
      imageAlt: 'Vantins insurance team collaborating around a conference table',
    },
    specialtiesSection: {
      eyebrow: 'Specialized where it matters',
      title: 'Protection for every part of your journey.',
      description: 'From your first rig to your family’s future, we help structure coverage that grows with you.',
      items: [
        ['Commercial Auto & Trucking', 'Protection for owner-operators, fleets, and growing transportation businesses.'],
        ['Business Insurance', 'Coverage structured around the risks, people, and operations that keep your company moving.'],
        ['Personal Auto & Home', 'Thoughtful protection for your vehicles, property, family, and everyday life.'],
        ['Life & Health', 'Flexible options that support every life stage and the people who matter most.'],
      ],
    },
    service: {
      imageAlt: 'A Vantins advisor providing personalized insurance guidance',
      badgeTitle: 'Nationwide',
      badgeText: 'coverage, personal attention',
      eyebrow: 'High-touch service',
      title: 'You’re never just a policy number.',
      description: 'Licensed across the United States, we serve clients in multiple states while keeping every relationship responsive, personal, and human.',
      items: ['Real advisors who understand your industry', 'Fast responses—often the same day', 'Ongoing support, not just renewal reminders', 'Claims and COI guidance when timing matters'],
    },
    standard: {
      eyebrow: 'The Vantins standard',
      title: 'What you can expect from us.',
      description: 'We measure success by how well our clients are protected—and how long they choose to stay with us.',
      items: ['Transparent, easy-to-understand recommendations', 'Coverage structured for your actual needs—without fluff', 'Fast quotes and Certificates of Insurance', 'Advice tailored to your budget and risk profile', 'A responsive team built for long-term relationships'],
    },
    cta: { title: 'Ready to get covered the smart way?', description: 'Let’s simplify your insurance and build protection that actually fits.', button: 'Get Your Free Quote' },
  },
  es: {
    hero: {
      eyebrow: 'Sobre Vantins',
      title: 'Seguros diseñados pensando en',
      accent: 'ti.',
      description: 'Asesoría clara, coberturas más inteligentes y personas reales que entienden tu vida, tu negocio y los riesgos que de verdad importan.',
      quote: 'Cotiza Gratis',
      approach: 'Nuestro enfoque',
    },
    story: {
      eyebrow: 'Más que seguros',
      title: 'Somos tu aliado estratégico en riesgos.',
      paragraphs: [
        'En Vantins Insurance Group creemos que contratar un seguro no debería sentirse complicado, lento ni transaccional. Debe ser claro, estratégico y realmente adaptado a tu vida o a tu negocio.',
        'Nos tomamos el tiempo para entender tus riesgos reales, comparar opciones de manera inteligente y crear una cobertura mejor estructurada, sin ofrecerte protección innecesaria ni hacerte pagar de más.',
      ],
      calloutTitle: 'La mayoría de las personas no necesita más seguros.',
      calloutText: 'Necesita una protección más inteligente y eficiente.',
      imageAlt: 'Asesores de Vantins revisando opciones de cobertura con un cliente',
      badgeTitle: 'Aliado estratégico',
      badgeText: 'protección inteligente, asesoría clara',
    },
    advantagesSection: {
      eyebrow: 'Rapidez, claridad y resultados',
      title: 'Las agencias tradicionales avanzan lento. Nosotros no.',
      description: 'Nuestro proceso combina acceso a aseguradoras líderes con asesores autorizados que actúan con rapidez, explican todo con claridad y continúan acompañándote después de emitir la póliza.',
      items: ['Acceso a aseguradoras de primer nivel', 'Comparación de múltiples cotizaciones', 'Asesores autorizados con amplia experiencia en la industria', 'Una experiencia completamente digital con atención humana real'],
      imageAlt: 'Equipo de seguros de Vantins colaborando en una mesa de trabajo',
    },
    specialtiesSection: {
      eyebrow: 'Especialistas donde más importa',
      title: 'Protección para cada etapa de tu camino.',
      description: 'Desde tu primer camión hasta el futuro de tu familia, estructuramos coberturas que crecen contigo.',
      items: [
        ['Autos Comerciales y Camiones', 'Protección para propietarios-operadores, flotas y empresas de transporte en crecimiento.'],
        ['Seguros para Negocios', 'Cobertura estructurada según los riesgos, las personas y las operaciones que mantienen tu empresa en movimiento.'],
        ['Auto y Hogar Personal', 'Protección pensada para tus vehículos, propiedad, familia y vida cotidiana.'],
        ['Vida y Salud', 'Opciones flexibles que te acompañan en cada etapa de la vida y protegen a quienes más importan.'],
      ],
    },
    service: {
      imageAlt: 'Asesor de Vantins brindando orientación personalizada sobre seguros',
      badgeTitle: 'Cobertura nacional',
      badgeText: 'con atención personalizada',
      eyebrow: 'Servicio personalizado',
      title: 'Nunca eres solo un número de póliza.',
      description: 'Con licencias para operar en Estados Unidos, atendemos a clientes en varios estados sin perder una relación cercana, ágil y humana.',
      items: ['Asesores reales que entienden tu industria', 'Respuestas rápidas, con frecuencia el mismo día', 'Acompañamiento continuo, no solo recordatorios de renovación', 'Orientación en reclamaciones y certificados de seguro cuando el tiempo importa'],
    },
    standard: {
      eyebrow: 'El estándar Vantins',
      title: 'Lo que puedes esperar de nosotros.',
      description: 'Medimos nuestro éxito por qué tan bien protegidos están nuestros clientes y por cuánto tiempo eligen permanecer con nosotros.',
      items: ['Recomendaciones transparentes y fáciles de entender', 'Cobertura estructurada según tus necesidades reales, sin extras innecesarios', 'Cotizaciones y certificados de seguro rápidos', 'Asesoría adaptada a tu presupuesto y perfil de riesgo', 'Un equipo ágil enfocado en relaciones a largo plazo'],
    },
    cta: { title: '¿Listo para protegerte de forma inteligente?', description: 'Simplifiquemos tus seguros y construyamos una protección que realmente se ajuste a ti.', button: 'Cotiza Gratis' },
  },
};

export function AboutUsPage() {
  return (
    <LanguageProvider>
      <AboutUsContent />
    </LanguageProvider>
  );
}

function AboutUsContent() {
  const { lang } = useLang();
  const copy = ABOUT_CONTENT[lang];
  const reduceMotion = useReducedMotion();

  return (
    <>
      <PromoBar />
      <Navbar />
      <main>
        <section className="relative isolate overflow-hidden bg-[#06182d] text-white">
          <div aria-hidden className="absolute -right-40 -top-40 -z-10 h-[34rem] w-[34rem] rounded-full bg-brand-500/20 blur-3xl" />
          <Container className="py-24 text-center lg:py-32">
            <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mx-auto max-w-4xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-300">{copy.hero.eyebrow}</p>
              <h1 className="mt-5 text-[clamp(2.75rem,5vw,60px)] font-extrabold leading-[1.02] tracking-tight text-balance">
                {copy.hero.title} <span className="text-gradient-qb">{copy.hero.accent}</span>
              </h1>
              <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-white/72 sm:text-xl">
                {copy.hero.description}
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <LinkButton href="/get-quote" size="lg" className="group">
                  {copy.hero.quote}
                  <IconArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                </LinkButton>
                <LinkButton href="#our-story" size="lg" variant="outline" className="!border-white/25 !bg-white/5 !text-white hover:!bg-white/10">
                  {copy.hero.approach}
                </LinkButton>
              </div>
            </motion.div>
          </Container>
        </section>

        <section id="our-story" className="bg-white py-20 lg:py-28">
          <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">{copy.story.eyebrow}</p>
              <h2 className="mt-4 text-display-md text-balance text-ink">{copy.story.title}</h2>
              <p className="mt-6 text-lg leading-relaxed text-ink/70">
                {copy.story.paragraphs[0]}
              </p>
              <p className="mt-4 leading-relaxed text-ink/65">
                {copy.story.paragraphs[1]}
              </p>
              <div className="mt-8 border-l-4 border-brand-500 pl-5">
                <p className="text-lg font-bold text-ink">{copy.story.calloutTitle}</p>
                <p className="mt-1 text-ink/65">{copy.story.calloutText}</p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="relative pb-10 sm:pb-0">
              <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-brand-100" />
              <div className="aspect-[16/10] w-full overflow-hidden rounded-3xl shadow-float">
                <img src="/assets/about-advisors.webp" alt={copy.story.imageAlt} className="h-full w-full object-cover" />
              </div>
              <motion.div
                animate={reduceMotion ? { y: 0 } : { y: [0, -8, 0] }}
                transition={reduceMotion ? undefined : { duration: 5.2, ease: 'easeInOut', repeat: Infinity }}
                className="absolute -bottom-1 right-3 flex w-[calc(100%-1.5rem)] max-w-[21rem] items-center gap-4 rounded-[1.35rem] border border-white/70 bg-white/55 p-4 text-[#071f3d] shadow-[0_18px_50px_rgba(2,12,27,0.22)] backdrop-blur-xl sm:-bottom-7 sm:-right-7 sm:p-5"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/80 bg-white/55 shadow-inner">
                  <IconCheck className="h-5 w-5 text-brand-600" />
                </span>
                <span>
                  <span className="block text-xl font-extrabold leading-tight">{copy.story.badgeTitle}</span>
                  <span className="mt-1 block text-sm font-medium text-[#071f3d]/65">{copy.story.badgeText}</span>
                </span>
              </motion.div>
            </motion.div>
          </Container>
        </section>

        <section className="relative overflow-hidden bg-[#071f3d] py-20 text-white lg:py-28">
          <div aria-hidden className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-brand-500/10 blur-3xl" />
          <Container>
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-400">{copy.advantagesSection.eyebrow}</p>
                <h2 className="mt-4 text-display-md text-white text-balance">{copy.advantagesSection.title}</h2>
              </div>
              <p className="max-w-2xl text-lg leading-relaxed text-white/65">
                {copy.advantagesSection.description}
              </p>
            </div>

            <motion.ul variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mt-12 grid gap-4 sm:grid-cols-2">
              {copy.advantagesSection.items.map((item) => (
                <motion.li key={item} variants={staggerItem} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-white/85">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-500 text-white"><IconCheck className="h-5 w-5" /></span>
                  <span className="font-semibold">{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            <div className="mt-12 aspect-[21/8] w-full overflow-hidden rounded-3xl shadow-float">
              <img src="/assets/about-team.webp" alt={copy.advantagesSection.imageAlt} className="h-full w-full object-cover" />
            </div>
          </Container>
        </section>

        <section className="bg-white py-20 lg:py-28">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">{copy.specialtiesSection.eyebrow}</p>
              <h2 className="mt-4 text-display-md text-ink text-balance">{copy.specialtiesSection.title}</h2>
              <p className="mt-5 text-lg text-ink/65">{copy.specialtiesSection.description}</p>
            </div>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mt-12 grid gap-5 md:grid-cols-2">
              {copy.specialtiesSection.items.map(([title, description], index) => {
                const Icon = [IconShield, IconUsers, IconGlobe, IconShield][index];
                return (
                  <motion.article key={title} variants={staggerItem} className="rounded-3xl border border-ink/10 bg-[#f7f8fa] p-7 transition-transform duration-300 hover:-translate-y-1">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-500 text-white"><Icon className="h-6 w-6" /></span>
                    <h3 className="mt-6 text-xl font-bold text-ink">{title}</h3>
                    <p className="mt-3 leading-relaxed text-ink/62">{description}</p>
                  </motion.article>
                );
              })}
            </motion.div>
          </Container>
        </section>

        <section className="overflow-hidden bg-[#071f3d] py-20 text-white lg:py-28">
          <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="relative order-2 pb-10 sm:pb-0 lg:order-1">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-float">
                <img src="/assets/about-personal-advice.webp" alt={copy.service.imageAlt} className="h-full w-full object-cover" />
              </div>
              <motion.div
                animate={reduceMotion ? { y: 0 } : { y: [0, -9, 0] }}
                transition={reduceMotion ? undefined : { duration: 4.8, ease: 'easeInOut', repeat: Infinity, delay: 0.35 }}
                className="absolute -bottom-1 right-3 flex w-[calc(100%-1.5rem)] max-w-[22rem] items-center gap-4 rounded-[1.35rem] border border-white/65 bg-white/55 p-4 text-[#071f3d] shadow-[0_18px_50px_rgba(2,12,27,0.28)] backdrop-blur-xl sm:-bottom-7 sm:-right-7 sm:p-5"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/80 bg-white/55 shadow-inner">
                  <IconGlobe className="h-5 w-5 text-brand-600" />
                </span>
                <span>
                  <span className="block text-xl font-extrabold leading-tight">{copy.service.badgeTitle}</span>
                  <span className="mt-1 block text-sm font-medium text-[#071f3d]/65">{copy.service.badgeText}</span>
                </span>
              </motion.div>
            </div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="order-1 lg:order-2">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-300">{copy.service.eyebrow}</p>
              <h2 className="mt-4 text-display-md text-balance">{copy.service.title}</h2>
              <p className="mt-6 text-lg leading-relaxed text-white/70">
                {copy.service.description}
              </p>
              <ul className="mt-7 space-y-4">
                {copy.service.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white/82"><IconCheck className="h-5 w-5 shrink-0 text-brand-300" />{item}</li>
                ))}
              </ul>
            </motion.div>
          </Container>
        </section>

        <section className="bg-white py-20 lg:py-28">
          <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">{copy.standard.eyebrow}</p>
              <h2 className="mt-4 text-display-md text-ink text-balance">{copy.standard.title}</h2>
              <p className="mt-5 text-lg leading-relaxed text-ink/65">{copy.standard.description}</p>
            </div>
            <ul className="divide-y divide-ink/10 border-y border-ink/10">
              {copy.standard.items.map((item, index) => (
                <li key={item} className="flex items-center gap-5 py-5">
                  <span className="text-sm font-extrabold text-brand-500">0{index + 1}</span>
                  <span className="font-semibold text-ink">{item}</span>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <section className="bg-gradient-bar px-5 py-16 text-center text-white lg:py-20">
          <h2 className="text-display-md text-balance">{copy.cta.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">{copy.cta.description}</p>
          <LinkButton href="/get-quote" size="lg" className="mt-8 !bg-white !text-ink hover:!bg-white/90 group">
            {copy.cta.button}
            <IconArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </LinkButton>
        </section>
      </main>
      <Footer />
    </>
  );
}
