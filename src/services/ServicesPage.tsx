"use client";

import { motion, useReducedMotion } from 'framer-motion';
import { Footer, Navbar, PromoBar } from '@/components/layout';
import { Container, LinkButton } from '@/components/ui';
import { IconArrowRight, IconCheck, IconShield } from '@/components/icons';
import { LanguageProvider, useLang } from '@/i18n';
import type { Lang } from '@/i18n';
import { SALES_PHONE_TEL } from '@/utils/constants';
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from '@/utils/motion';

interface ServiceCard {
  title: string;
  description: string;
  image: string;
  alt: string;
}

interface ServicesContent {
  hero: { eyebrow: string; title: string; accent: string; description: string; quote: string; talk: string; stat: string; statLabel: string; imageAlt: string };
  why: { eyebrow: string; title: string; paragraphs: string[] };
  coverage: { eyebrow: string; title: string; description: string; cards: ServiceCard[] };
  additional: { title: string; items: string[] };
  fleet: { eyebrow: string; title: string; paragraphs: string[]; imageAlt: string; badge: string };
  support: { eyebrow: string; title: string; description: string; cards: ServiceCard[] };
  commitment: { eyebrow: string; title: string; paragraphs: string[]; quote: string };
  cta: { title: string; description: string; quote: string; talk: string; note: string };
}

const CONTENT: Record<Lang, ServicesContent> = {
  en: {
    hero: {
      eyebrow: 'Commercial Truck Insurance',
      title: 'Reliable protection for',
      accent: 'trucking companies.',
      description: 'Choosing the right insurance for your trucks should not feel overwhelming. Vantins guides you with clear explanations, honest advice, and coverage built for the road ahead.',
      quote: 'Get Your Free Quote',
      talk: 'Talk With Our Team',
      stat: '35+',
      statLabel: 'reputable insurance carriers, including A-rated companies',
      imageAlt: 'Commercial truck traveling on the highway',
    },
    why: {
      eyebrow: 'Why it matters',
      title: 'Protection that keeps your business moving.',
      paragraphs: [
        'Running a trucking business comes with daily risks—from road accidents and cargo damage to liability claims and strict broker requirements.',
        'The right policy does more than meet legal requirements. It protects your vehicles, cargo, business, and financial future.',
        'Whether you are an independent owner-operator or manage a large fleet, we help you secure the coverage you need at a fair price so you can move forward with confidence.',
      ],
    },
    coverage: {
      eyebrow: 'Core coverage',
      title: 'What commercial truck insurance typically covers.',
      description: 'Straightforward guidance on the protections that matter most to your operation.',
      cards: [
        { title: 'Liability Insurance', description: 'Covers bodily injury and property damage you may cause to others while operating your truck—one of the most critical protections for your company.', image: '/assets/services-liability.webp', alt: 'Liability insurance icon' },
        { title: 'Physical Damage Coverage', description: 'Protects your trucks and trailers against collisions, theft, vandalism, fire, and weather-related damage.', image: '/assets/services-physical-damage.webp', alt: 'Commercial truck icon' },
        { title: 'Cargo Insurance', description: 'Covers the goods you transport in case of loss, damage, or theft while they are in transit.', image: '/assets/services-cargo.webp', alt: 'Cargo box icon' },
        { title: 'Certificate of Insurance', description: 'Fast COI support for the official documents brokers, shippers, and terminals require to verify active coverage.', image: '/assets/services-coi.webp', alt: 'Certificate document icon' },
      ],
    },
    additional: { title: 'Additional coverage options', items: ['Non-Trucking Liability', 'Trailer Interchange', 'Uninsured Motorist'] },
    fleet: {
      eyebrow: 'From one truck to entire fleets',
      title: 'Carrier access and expertise that scale with you.',
      paragraphs: [
        'Vantins works with more than 35 reputable insurance carriers, including A-rated companies, to find the right balance of coverage and affordability for your trucking business.',
        'Whether you operate one truck or manage hundreds, our expertise and carrier relationships help protect what you have worked hard to build.',
      ],
      imageAlt: 'Inside the cab of a commercial truck',
      badge: 'Built for real trucking operations',
    },
    support: {
      eyebrow: 'How we support you',
      title: 'More than insurance. A trusted partner on the road.',
      description: 'Practical support before, during, and after your policy is issued.',
      cards: [
        { title: 'For COI Brokers', description: 'Fast and accurate certificate issuance to meet deadlines and keep loads moving.', image: '/assets/services-brokers.webp', alt: 'COI document icon' },
        { title: 'For COI Clients', description: 'Professional coverage documentation that gives your clients confidence in your reliability.', image: '/assets/services-clients.webp', alt: 'Coverage document icon' },
        { title: 'Claims Assistance', description: 'Guidance throughout the claims process to make it as smooth and stress-free as possible.', image: '/assets/services-claims.webp', alt: 'Protection shield icon' },
        { title: 'Flexible Down Payments', description: 'Affordable initial payment options designed around the cash flow of your operation.', image: '/assets/services-payments.webp', alt: 'Payment icon' },
      ],
    },
    commitment: {
      eyebrow: 'Our commitment to you',
      title: 'Advice you can understand. Protection you can trust.',
      paragraphs: [
        'We do not just sell policies—we educate, advise, and partner with you. Our experienced team explains every coverage in plain language so you can make confident decisions.',
        'From a single truck to an entire fleet, we are committed to protecting the business you have worked hard to build.',
      ],
      quote: 'Clear explanations. Honest advice. Protection you can count on.',
    },
    cta: { title: 'Ready to protect your trucking business with confidence?', description: 'Get a free, no-obligation quote and see how Vantins can help.', quote: 'Get Your Free Quote', talk: 'Talk With Our Team', note: 'Prefer to speak with an expert? We are here when you need us.' },
  },
  es: {
    hero: {
      eyebrow: 'Seguro para Camiones Comerciales',
      title: 'Protección confiable para',
      accent: 'empresas de transporte.',
      description: 'Elegir el seguro adecuado para tus camiones no debería ser complicado. Vantins te acompaña con explicaciones claras, asesoría honesta y coberturas diseñadas para el camino.',
      quote: 'Cotiza Gratis',
      talk: 'Habla con Nuestro Equipo',
      stat: '35+',
      statLabel: 'aseguradoras reconocidas, incluidas compañías con calificación A',
      imageAlt: 'Camión comercial transitando por la carretera',
    },
    why: {
      eyebrow: 'Por qué es importante',
      title: 'Protección que mantiene tu negocio en movimiento.',
      paragraphs: [
        'Operar una empresa de transporte implica riesgos diarios: accidentes en carretera, daños a la carga, reclamaciones de responsabilidad y requisitos estrictos de los brokers.',
        'La póliza adecuada hace más que cumplir la ley. Protege tus vehículos, tu carga, tu negocio y tu futuro financiero.',
        'Ya seas propietario-operador independiente o administres una gran flota, te ayudamos a conseguir la cobertura que necesitas a un precio justo para avanzar con confianza.',
      ],
    },
    coverage: {
      eyebrow: 'Coberturas principales',
      title: 'Qué cubre normalmente el seguro para camiones comerciales.',
      description: 'Orientación clara sobre las protecciones más importantes para tu operación.',
      cards: [
        { title: 'Seguro de Responsabilidad', description: 'Cubre lesiones corporales y daños a la propiedad que puedas causar a terceros al operar tu camión.', image: '/assets/services-liability.webp', alt: 'Ícono de seguro de responsabilidad' },
        { title: 'Cobertura de Daños Físicos', description: 'Protege camiones y remolques contra colisiones, robo, vandalismo, incendio y daños climáticos.', image: '/assets/services-physical-damage.webp', alt: 'Ícono de camión comercial' },
        { title: 'Seguro de Carga', description: 'Cubre los bienes transportados en caso de pérdida, daño o robo durante el trayecto.', image: '/assets/services-cargo.webp', alt: 'Ícono de caja de carga' },
        { title: 'Certificado de Seguro', description: 'Soporte rápido para generar los COI que brokers, embarcadores y terminales necesitan para verificar tu cobertura.', image: '/assets/services-coi.webp', alt: 'Ícono de certificado de seguro' },
      ],
    },
    additional: { title: 'Opciones de cobertura adicionales', items: ['Responsabilidad No Comercial', 'Intercambio de Remolque', 'Conductor Sin Seguro'] },
    fleet: {
      eyebrow: 'Desde un camión hasta flotas completas',
      title: 'Acceso a aseguradoras y experiencia que crecen contigo.',
      paragraphs: [
        'Vantins trabaja con más de 35 aseguradoras reconocidas, incluidas compañías con calificación A, para encontrar el equilibrio ideal entre cobertura y precio.',
        'Ya sea que operes un camión o administres cientos, nuestra experiencia y alianzas protegen lo que tanto te ha costado construir.',
      ],
      imageAlt: 'Interior de la cabina de un camión comercial',
      badge: 'Diseñado para operaciones reales de transporte',
    },
    support: {
      eyebrow: 'Cómo te apoyamos',
      title: 'Más que seguros. Tu aliado en el camino.',
      description: 'Apoyo práctico antes, durante y después de emitir tu póliza.',
      cards: [
        { title: 'Para Brokers de COI', description: 'Emisión rápida y precisa de certificados para cumplir plazos y mantener las cargas en movimiento.', image: '/assets/services-brokers.webp', alt: 'Ícono de documento COI' },
        { title: 'Para Clientes de COI', description: 'Documentación profesional que brinda a tus clientes confianza en tu operación.', image: '/assets/services-clients.webp', alt: 'Ícono de documento de cobertura' },
        { title: 'Asistencia en Reclamaciones', description: 'Te acompañamos durante todo el proceso para hacerlo más sencillo y menos estresante.', image: '/assets/services-claims.webp', alt: 'Ícono de escudo de protección' },
        { title: 'Pagos Iniciales Flexibles', description: 'Opciones de pago inicial accesibles diseñadas para el flujo de caja de tu operación.', image: '/assets/services-payments.webp', alt: 'Ícono de pago' },
      ],
    },
    commitment: {
      eyebrow: 'Nuestro compromiso contigo',
      title: 'Asesoría que entiendes. Protección en la que confías.',
      paragraphs: [
        'No solo vendemos pólizas: educamos, asesoramos y trabajamos a tu lado. Nuestro equipo explica cada cobertura en términos sencillos para que tomes decisiones con confianza.',
        'Desde un solo camión hasta una flota completa, protegemos el negocio que tanto te ha costado construir.',
      ],
      quote: 'Explicaciones claras. Asesoría honesta. Protección en la que puedes confiar.',
    },
    cta: { title: '¿Listo para proteger tu empresa de transporte con confianza?', description: 'Obtén una cotización gratis y sin compromiso para descubrir cómo puede ayudarte Vantins.', quote: 'Cotiza Gratis', talk: 'Habla con Nuestro Equipo', note: '¿Prefieres hablar con un experto? Estamos aquí cuando nos necesites.' },
  },
};

export function ServicesPage() {
  return <LanguageProvider><ServicesContent /></LanguageProvider>;
}

function ServicesContent() {
  const { lang } = useLang();
  const copy = CONTENT[lang];
  const reduceMotion = useReducedMotion();

  return (
    <>
      <PromoBar />
      <Navbar />
      <main>
        <section className="relative isolate overflow-hidden bg-[#06182d] text-white">
          <div aria-hidden className="absolute -right-32 -top-32 -z-10 h-[32rem] w-[32rem] rounded-full bg-brand-500/20 blur-3xl" />
          <Container className="grid items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
            <motion.div variants={fadeUp} initial="hidden" animate="visible">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-300">{copy.hero.eyebrow}</p>
              <h1 className="mt-5 text-[clamp(2.75rem,5vw,60px)] font-extrabold leading-[1.02] tracking-tight text-balance">
                {copy.hero.title} <span className="text-gradient-qb">{copy.hero.accent}</span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/72 sm:text-xl">{copy.hero.description}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <LinkButton href="/get-quote" size="lg" className="group">{copy.hero.quote}<IconArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" /></LinkButton>
                <LinkButton href={`tel:${SALES_PHONE_TEL}`} size="lg" variant="outline" className="!border-white/25 !bg-white/5 !text-white hover:!bg-white/10">{copy.hero.talk}</LinkButton>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" animate="visible" className="relative">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-float">
                <img src="/assets/services-truck-clean.webp" alt={copy.hero.imageAlt} className="h-full w-full scale-[1.12] object-cover object-[48%_60%]" />
              </div>
              <motion.div
                animate={reduceMotion ? { y: 0 } : { y: [0, -10, 0] }}
                transition={reduceMotion ? undefined : { duration: 4.8, ease: 'easeInOut', repeat: Infinity }}
                className="relative z-10 -mt-14 ml-auto mr-3 flex w-[calc(100%-1.5rem)] max-w-[19rem] items-center gap-4 rounded-[1.4rem] border border-white/[0.65] bg-white/[0.55] p-4 text-[#071f3d] shadow-[0_18px_50px_rgba(2,12,27,0.24)] backdrop-blur-xl sm:absolute sm:-right-8 sm:bottom-8 sm:mt-0 sm:mr-0 sm:p-5 lg:-right-12"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/[0.8] bg-white/[0.55] shadow-inner">
                  <IconCheck className="h-6 w-6 text-brand-600" />
                </span>
                <span>
                  <span className="block text-3xl font-extrabold leading-none text-[#071f3d]">{copy.hero.stat}</span>
                  <span className="mt-1.5 block text-sm font-semibold leading-snug text-[#071f3d]/75">{copy.hero.statLabel}</span>
                </span>
              </motion.div>
            </motion.div>
          </Container>
        </section>

        <section className="bg-white py-20 lg:py-28">
          <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">{copy.why.eyebrow}</p><h2 className="mt-4 text-display-md text-balance text-ink">{copy.why.title}</h2></div>
            <div className="space-y-5 text-lg leading-relaxed text-ink/68">{copy.why.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          </Container>
        </section>

        <section className="bg-[#f5f7fa] py-20 lg:py-28">
          <Container>
            <div className="mx-auto max-w-3xl text-center"><p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">{copy.coverage.eyebrow}</p><h2 className="mt-4 text-display-md text-balance text-ink">{copy.coverage.title}</h2><p className="mt-5 text-lg text-ink/65">{copy.coverage.description}</p></div>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mt-12 grid gap-5 md:grid-cols-2">
              {copy.coverage.cards.map((card) => <motion.article key={card.title} variants={staggerItem} className="rounded-3xl border border-ink/10 bg-white p-7 shadow-sm transition-transform duration-300 hover:-translate-y-1"><img src={card.image} alt={card.alt} className="h-16 w-16 rounded-2xl" /><h3 className="mt-6 text-xl font-bold text-ink">{card.title}</h3><p className="mt-3 leading-relaxed text-ink/62">{card.description}</p></motion.article>)}
            </motion.div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 rounded-3xl bg-[#071f3d] px-6 py-7 text-white"><strong className="mr-2 text-lg">{copy.additional.title}</strong>{copy.additional.items.map((item) => <span key={item} className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-semibold text-white/85">{item}</span>)}</div>
          </Container>
        </section>

        <section className="overflow-hidden bg-[#071f3d] py-20 text-white lg:py-28">
          <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="relative"><img src="/assets/services-dashboard.jpg" alt={copy.fleet.imageAlt} className="aspect-[4/3] w-full rounded-3xl object-cover shadow-float" /><div className="absolute -bottom-5 right-5 rounded-2xl border border-white/15 bg-[#071f3d]/90 px-5 py-4 text-sm font-bold text-brand-300 shadow-xl backdrop-blur">{copy.fleet.badge}</div></div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}><p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-300">{copy.fleet.eyebrow}</p><h2 className="mt-4 text-display-md text-balance">{copy.fleet.title}</h2><div className="mt-6 space-y-4 text-lg leading-relaxed text-white/70">{copy.fleet.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><LinkButton href="/get-quote" size="lg" className="mt-8 group">{copy.hero.quote}<IconArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" /></LinkButton></motion.div>
          </Container>
        </section>

        <section className="bg-white py-20 lg:py-28">
          <Container>
            <div className="mx-auto max-w-3xl text-center"><p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">{copy.support.eyebrow}</p><h2 className="mt-4 text-display-md text-balance text-ink">{copy.support.title}</h2><p className="mt-5 text-lg text-ink/65">{copy.support.description}</p></div>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{copy.support.cards.map((card) => <motion.article key={card.title} variants={staggerItem} className="rounded-3xl border border-ink/10 bg-[#f7f8fa] p-6"><img src={card.image} alt={card.alt} className="h-14 w-14 rounded-full" /><h3 className="mt-5 text-lg font-bold text-ink">{card.title}</h3><p className="mt-3 text-sm leading-relaxed text-ink/62">{card.description}</p></motion.article>)}</motion.div>
          </Container>
        </section>

        <section className="bg-[#f5f7fa] py-20 lg:py-28">
          <Container className="grid items-start gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
            <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">{copy.commitment.eyebrow}</p><h2 className="mt-4 text-display-md text-balance text-ink">{copy.commitment.title}</h2><div className="mt-6 space-y-4 text-lg leading-relaxed text-ink/68">{copy.commitment.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div>
            <blockquote className="rounded-3xl bg-[#071f3d] p-8 text-white shadow-float"><IconShield className="h-12 w-12 text-brand-300" /><p className="mt-8 text-2xl font-extrabold leading-snug text-balance">“{copy.commitment.quote}”</p><div className="mt-7 h-1 w-16 rounded-full bg-brand-500" /></blockquote>
          </Container>
        </section>

        <section className="bg-gradient-bar px-5 py-16 text-center text-white lg:py-20"><h2 className="mx-auto max-w-4xl text-display-md text-balance">{copy.cta.title}</h2><p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">{copy.cta.description}</p><div className="mt-8 flex flex-wrap justify-center gap-3"><LinkButton href="/get-quote" size="lg" className="!bg-white !text-ink hover:!bg-white/90 group">{copy.cta.quote}<IconArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" /></LinkButton><LinkButton href={`tel:${SALES_PHONE_TEL}`} size="lg" variant="outline" className="!border-white/35 !bg-transparent !text-white hover:!bg-white/10">{copy.cta.talk}</LinkButton></div><p className="mt-5 text-sm text-white/65">{copy.cta.note}</p></section>
      </main>
      <Footer />
    </>
  );
}
