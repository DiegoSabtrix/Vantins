"use client";

import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Footer, Navbar, PromoBar } from '@/components/layout';
import { Container, LinkButton } from '@/components/ui';
import {
  IconArrowRight,
  IconBank,
  IconChart,
  IconCheck,
  IconGlobe,
  IconInvoice,
  IconReceipt,
  IconShield,
  IconUsers,
} from '@/components/icons';
import { LanguageProvider, useLang } from '@/i18n';
import type { Lang } from '@/i18n';
import { SALES_PHONE_TEL } from '@/utils/constants';
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from '@/utils/motion';

type Service = {
  title: string;
  description: string;
  bullets: string[];
  cta: string;
  href?: string;
  sourceLabel?: string;
  sourceHref?: string;
  extraSourceLabel?: string;
  extraSourceHref?: string;
  comingSoon?: string;
};

const SERVICE_ICONS = [IconBank, IconGlobe, IconChart, IconInvoice, IconReceipt, IconUsers, IconShield, IconArrowRight];

const CONTENT: Record<Lang, {
  hero: { eyebrow: string; title: string; accent: string; description: string; primary: string; secondary: string; note: string; noteBody: string; imageAlt: string };
  services: { eyebrow: string; title: string; description: string; items: Service[] };
  start: { eyebrow: string; title: string; description: string; steps: string[]; cta: string };
  client: { eyebrow: string; title: string; description: string; benefits: string[]; costNote: string };
  form: {
    eyebrow: string; title: string; description: string; submit: string; emailNote: string;
    fields: Record<string, string>; options: string[]; yes: string; no: string; unsure: string;
  };
  final: { title: string; description: string; primary: string; secondary: string };
  legal: string;
}> = {
  en: {
    hero: {
      eyebrow: 'Vantins Truck Services',
      title: 'Much more than insurance for',
      accent: 'your truck.',
      description: 'We help you protect your business and find the services you need to start, register, and keep your transportation operation active—from company formation and federal registrations to commercial insurance, vehicle registration, and plates—with guidance in English or Spanish.',
      primary: 'Book a Free Consultation',
      secondary: 'Explore Services',
      note: 'Free 15-minute initial consultation.',
      noteBody: 'Tell us where your business stands, and we will help you identify the next steps.',
      imageAlt: 'Smiling truck driver standing in front of his commercial truck',
    },
    services: {
      eyebrow: 'One trusted point of contact',
      title: 'Services to keep your business moving.',
      description: 'Clear guidance, organized next steps, and connections with specialized providers when a service must be completed by a third party.',
      items: [
        { title: 'LLC Formation', description: 'Guidance to legally establish your transportation company and start with an organized foundation.', bullets: ['LLC registration', 'EIN application guidance', 'Basic business information', 'Specialized provider coordination'], cta: 'I need to form my company' },
        { title: 'USDOT Number', description: 'We help determine whether your operation needs a USDOT Number and guide you through registration.', bullets: ['New applications', 'Information review', 'Company data updates', 'Guidance for new operations'], cta: 'I need my USDOT', sourceLabel: 'Official FMCSA guidance', sourceHref: 'https://www.fmcsa.dot.gov/registration/move-motus' },
        { title: 'MC Number & Operating Authority', description: 'Support for new companies that may need interstate for-hire operating authority.', bullets: ['Initial operation review', 'Operating Authority application', 'Pending requirement follow-up', 'Insurance filing coordination', 'Authority activation guidance'], cta: 'Check if I need an MC Number' },
        { title: 'BOC-3', description: 'We connect you with an authorized process agent to complete the filing required for your authority.', bullets: ['Requirement guidance', 'Authorized process-agent connection', 'Filing follow-up', 'Authority status verification'], cta: 'Get BOC-3 assistance' },
        { title: 'UCR Registration', description: 'We help determine whether your business must register annually under the Unified Carrier Registration program.', bullets: ['Initial registration', 'Annual renewal', 'Information verification', 'Guidance by fleet size'], cta: 'Register or renew UCR', sourceLabel: 'Official UCR website', sourceHref: 'https://plan.ucr.gov/' },
        { title: 'Motus & FMCSA Updates', description: 'Help organizing and updating your company information in Motus, the FMCSA registration system. FMCSA has temporarily suspended enforcement of overdue biennial updates during the platform transition, but records should still be kept accurate.', bullets: ['Account setup', 'Claim an existing USDOT', 'Business information updates', 'Vehicle and driver review', 'Biennial updates', 'Reactivation and registration changes'], cta: 'I need help with Motus', sourceLabel: 'FMCSA Motus information', sourceHref: 'https://www.fmcsa.dot.gov/registration/move-motus', extraSourceLabel: 'Current FMCSA notice', extraSourceHref: 'https://www.fmcsa.dot.gov/registration/temporary-suspension-biennial-update-requirement' },
        { title: 'Vehicle Registration & Plates', description: 'We coordinate support for commercial vehicle registration, titles, tags, and related documentation.', bullets: ['Commercial vehicle registration', 'Plates and tags', 'Title transfers', 'Document review', 'Required-policy coordination', 'Connection with qualified local providers'], cta: 'Register my vehicle' },
        { title: 'Trailer Hitches & Towing Equipment', description: 'Connections for pickup and truck owners looking for towing equipment and installation support.', bullets: ['Trailer hitches', 'Ball mounts and accessories', 'Equipment installation', 'Trailer rentals, when available', 'Verified local providers'], cta: 'Request a provider', comingSoon: 'Coming soon' },
      ],
    },
    start: {
      eyebrow: 'Built for new ventures',
      title: 'Starting a trucking company?',
      description: 'The order matters. We help you organize the process and connect with the right services at each stage.',
      steps: ['Form the company', 'Obtain the EIN', 'Apply for USDOT and, when required, MC Number', 'Complete BOC-3 and UCR', 'Secure commercial insurance', 'Register vehicles and obtain plates', 'Keep information current in Motus', 'Begin operating with greater confidence'],
      cta: 'I am starting a new company',
    },
    client: {
      eyebrow: 'The Vantins difference',
      title: 'If your policy is with Vantins, we stay with you.',
      description: 'Our work does not end when your policy is issued. We help clients understand requirements, organize documents, and connect with providers who support their operation.',
      benefits: ['Priority attention', 'Initial document review', 'Insurance and vehicle-registration coordination', 'Important renewal reminders', 'Specialized provider referrals', 'Bilingual assistance'],
      costNote: 'Some services may involve government fees or charges paid directly to independent providers. We will explain known costs before work begins.',
    },
    form: {
      eyebrow: 'Free consultation',
      title: 'Not sure where to start? Let’s talk.',
      description: 'Request a free 15-minute orientation. We will review your situation and explain which services you may need.',
      submit: 'Book My 15 Minutes',
      emailNote: 'Submitting opens your email app with the completed request so you can send it directly to Vantins.',
      fields: { name: 'Full name', phone: 'Phone', email: 'Email', state: 'State', company: 'Do you already have a company?', usdot: 'Do you have a USDOT Number?', mc: 'Do you have an MC Number?', vehicles: 'Number of vehicles', vehicleType: 'Vehicle type', service: 'Service needed', date: 'Best date and time to contact you' },
      options: ['Commercial Truck Insurance', 'LLC Formation', 'USDOT Number', 'MC Number', 'BOC-3', 'UCR', 'Motus Update', 'Vehicle Registration or Plates', 'Trailer or Hitch Services', 'I am not sure'],
      yes: 'Yes', no: 'No', unsure: 'Not sure',
    },
    final: { title: 'Your business moves freight. Vantins helps you keep moving.', description: 'Commercial insurance, registration support, and practical guidance for truckers, owner-operators, and new companies.', primary: 'Talk to an Advisor', secondary: 'Request an Insurance Quote' },
    legal: 'Vantins is an insurance agency and is not a government agency or affiliated with FMCSA, USDOT, UCR, or any Department of Motor Vehicles. Some registration, business formation, and compliance services are provided or managed by independent third parties. The information on this page is general and is not legal, tax, or regulatory advice. Requirements and costs may vary by state, vehicle type, and commercial operation.',
  },
  es: {
    hero: {
      eyebrow: 'Vantins Truck Services',
      title: 'Mucho más que un seguro para',
      accent: 'tu truck.',
      description: 'Te ayudamos a proteger tu negocio y a encontrar los servicios que necesitas para comenzar, registrar y mantener activa tu operación de transporte. Desde la creación de tu compañía y los registros federales hasta el seguro comercial, las placas y el registro de tus vehículos, cuentas con orientación en español durante todo el proceso.',
      primary: 'Agenda una Consulta Gratis',
      secondary: 'Explorar Servicios',
      note: 'Consulta inicial gratuita de 15 minutos.',
      noteBody: 'Cuéntanos en qué etapa se encuentra tu negocio y te ayudaremos a identificar los próximos pasos.',
      imageAlt: 'Camionero sonriente frente a su camión comercial',
    },
    services: {
      eyebrow: 'Un solo aliado para tu operación',
      title: 'Servicios para mantener tu negocio en movimiento.',
      description: 'Orientación clara, próximos pasos organizados y conexión con proveedores especializados cuando el servicio deba ser realizado por un tercero.',
      items: [
        { title: 'Creación de LLC', description: 'Orientación para establecer legalmente tu compañía de transporte y comenzar con una operación organizada.', bullets: ['Registro de la LLC', 'Orientación para solicitar el EIN', 'Información comercial básica', 'Coordinación con proveedores especializados'], cta: 'Necesito crear mi compañía' },
        { title: 'USDOT Number', description: 'Te orientamos para determinar si tu operación necesita un número USDOT y te acompañamos durante el proceso de registro.', bullets: ['Nuevas solicitudes', 'Revisión de información', 'Actualización de datos de la compañía', 'Orientación para nuevas operaciones'], cta: 'Necesito mi USDOT', sourceLabel: 'Guía oficial de FMCSA', sourceHref: 'https://www.fmcsa.dot.gov/registration/move-motus' },
        { title: 'MC Number y Operating Authority', description: 'Asistencia para compañías que podrían necesitar autorización para operar como transportistas interestatales for-hire.', bullets: ['Evaluación inicial de la operación', 'Solicitud de Operating Authority', 'Seguimiento de requisitos pendientes', 'Coordinación del seguro requerido', 'Orientación sobre activación'], cta: 'Revisar si necesito MC Number' },
        { title: 'BOC-3', description: 'Te conectamos con un process agent autorizado para completar el filing requerido para tu autoridad.', bullets: ['Orientación sobre el requisito', 'Conexión con process agent autorizado', 'Seguimiento del filing', 'Verificación del estado de la autoridad'], cta: 'Solicitar asistencia con BOC-3' },
        { title: 'UCR Registration', description: 'Ayudamos a identificar si tu compañía debe registrarse anualmente en el programa Unified Carrier Registration.', bullets: ['Registro inicial', 'Renovación anual', 'Verificación de información', 'Orientación según la cantidad de vehículos'], cta: 'Registrar o renovar mi UCR', sourceLabel: 'Sitio oficial de UCR', sourceHref: 'https://plan.ucr.gov/' },
        { title: 'Motus y actualizaciones de FMCSA', description: 'Te ayudamos a organizar y actualizar la información de tu compañía en Motus. La FMCSA suspendió temporalmente la aplicación de actualizaciones bienales vencidas durante la transición de la plataforma, pero los registros deben mantenerse correctos.', bullets: ['Creación y configuración de la cuenta', 'Claim de un USDOT existente', 'Actualización de datos comerciales', 'Revisión de vehículos y conductores', 'Actualización bienal', 'Reactivación y cambios del registro'], cta: 'Necesito ayuda con Motus', sourceLabel: 'Información oficial de Motus', sourceHref: 'https://www.fmcsa.dot.gov/registration/move-motus', extraSourceLabel: 'Aviso vigente de FMCSA', extraSourceHref: 'https://www.fmcsa.dot.gov/registration/temporary-suspension-biennial-update-requirement' },
        { title: 'Registro de vehículos y placas', description: 'Coordinamos asistencia para registrar vehículos comerciales y completar procesos de títulos, placas o tags.', bullets: ['Registro de vehículos comerciales', 'Placas y tags', 'Transferencias de título', 'Revisión de documentos', 'Coordinación de la póliza requerida', 'Conexión con proveedores locales calificados'], cta: 'Registrar mi vehículo' },
        { title: 'Trailer hitches y equipos de remolque', description: 'Conectamos a propietarios de pickups y camiones con proveedores de equipos de remolque e instalación.', bullets: ['Trailer hitches', 'Ball mounts y accesorios', 'Instalación de equipos', 'Renta de trailers, cuando esté disponible', 'Proveedores locales verificados'], cta: 'Solicitar un proveedor', comingSoon: 'Próximamente' },
      ],
    },
    start: {
      eyebrow: 'Pensado para nuevas compañías',
      title: '¿Estás comenzando tu compañía de trucking?',
      description: 'El orden importa. Te ayudamos a organizar el proceso y a conectarte con los servicios adecuados en cada etapa.',
      steps: ['Crear la compañía', 'Obtener el EIN', 'Solicitar el USDOT y, si corresponde, el MC Number', 'Completar BOC-3 y UCR', 'Conseguir el seguro comercial', 'Registrar los vehículos y obtener las placas', 'Mantener la información actualizada en Motus', 'Comenzar a operar con mayor confianza'],
      cta: 'Soy una compañía nueva',
    },
    client: {
      eyebrow: 'La diferencia Vantins',
      title: 'Si tienes tu póliza con Vantins, seguimos acompañándote.',
      description: 'Nuestro trabajo no termina cuando recibes la póliza. Te ayudamos a entender requisitos, organizar documentos y conectarte con proveedores que apoyan tu operación.',
      benefits: ['Atención prioritaria', 'Revisión inicial de documentos', 'Coordinación entre seguro y registro', 'Recordatorios de renovaciones importantes', 'Referidos a proveedores especializados', 'Asistencia en español'],
      costNote: 'Algunos servicios pueden tener costos gubernamentales o tarifas cobradas directamente por proveedores externos. Te informaremos los costos conocidos antes de comenzar.',
    },
    form: {
      eyebrow: 'Consulta gratuita',
      title: '¿No sabes por dónde comenzar? Hablemos.',
      description: 'Solicita una orientación gratuita de 15 minutos. Revisaremos tu situación y te explicaremos qué servicios podrías necesitar.',
      submit: 'Agendar mis 15 minutos',
      emailNote: 'Al enviar, se abrirá tu correo con la solicitud completada para que puedas enviarla directamente a Vantins.',
      fields: { name: 'Nombre completo', phone: 'Teléfono', email: 'Correo electrónico', state: 'Estado', company: '¿Ya tienes una compañía?', usdot: '¿Tienes USDOT Number?', mc: '¿Tienes MC Number?', vehicles: 'Número de vehículos', vehicleType: 'Tipo de vehículo', service: 'Servicio que necesitas', date: 'Mejor fecha y hora para contactarte' },
      options: ['Commercial Truck Insurance', 'LLC Formation', 'USDOT Number', 'MC Number', 'BOC-3', 'UCR', 'Motus Update', 'Vehicle Registration or Plates', 'Trailer or Hitch Services', 'No estoy seguro'],
      yes: 'Sí', no: 'No', unsure: 'No estoy seguro',
    },
    final: { title: 'Tu negocio mueve cargas. Vantins te ayuda a seguir avanzando.', description: 'Seguro comercial, registros y orientación para camioneros, owner-operators y nuevas compañías.', primary: 'Hablar con un Asesor', secondary: 'Solicitar Cotización de Seguro' },
    legal: 'Vantins es una agencia de seguros y no es una agencia gubernamental ni está afiliada con FMCSA, USDOT, UCR o el Department of Motor Vehicles. Algunos servicios de registro, formación comercial y cumplimiento son proporcionados o gestionados por terceros independientes. La información presentada es de carácter general y no constituye asesoría legal, fiscal o regulatoria. Los requisitos y costos pueden variar según el estado, el tipo de vehículo y la operación comercial.',
  },
};

export function TruckServicesPage() {
  return <LanguageProvider><TruckServicesContent /></LanguageProvider>;
}

function TruckServicesContent() {
  const { lang } = useLang();
  const copy = CONTENT[lang];

  function submitConsultation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const lines = Array.from(form.entries()).map(([key, value]) => `${key}: ${value}`);
    const subject = lang === 'es' ? 'Solicitud de consulta — Truck Services' : 'Truck Services consultation request';
    window.location.href = `mailto:support@vantins.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
  }

  const inputClass = 'mt-2 min-h-12 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-base text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20';

  return (
    <>
      <PromoBar />
      <Navbar />
      <main>
        <section className="relative isolate overflow-hidden bg-[#06182d] text-white">
          <div aria-hidden className="absolute -right-32 -top-40 -z-10 h-[34rem] w-[34rem] rounded-full bg-brand-500/20 blur-3xl" />
          <Container className="grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
            <motion.div variants={fadeUp} initial="hidden" animate="visible">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-300">{copy.hero.eyebrow}</p>
              <h1 className="mt-5 text-[clamp(2.65rem,5vw,60px)] font-extrabold leading-[1.02] tracking-tight text-balance">{copy.hero.title} <span className="text-gradient-qb">{copy.hero.accent}</span></h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/72">{copy.hero.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton href="#consultation" size="lg" className="group">{copy.hero.primary}<IconArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" /></LinkButton>
                <LinkButton href="#services" size="lg" variant="outline" className="!border-white/30 !bg-transparent !text-white hover:!bg-white/10">{copy.hero.secondary}</LinkButton>
              </div>
              <div className="mt-8 border-l-2 border-brand-400 pl-5"><p className="font-bold text-white">{copy.hero.note}</p><p className="mt-1 max-w-xl text-sm leading-relaxed text-white/60">{copy.hero.noteBody}</p></div>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" animate="visible" className="relative isolate">
              <img src="/assets/truck-driver-services.jpg" alt={copy.hero.imageAlt} className="aspect-[4/3] w-full rounded-[2rem] border border-white/10 object-cover object-center shadow-float" />
              <div aria-hidden className="absolute inset-0 -z-0 rounded-[2rem] bg-gradient-to-t from-[#06182d]/55 via-transparent to-white/5" />
              <div className="absolute bottom-4 left-4 right-4 z-10 rounded-2xl border border-white/25 bg-[#071f3d]/45 px-4 py-3.5 shadow-[0_18px_50px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:bottom-5 sm:left-5 sm:right-5 sm:px-5 sm:py-4">
                <div className="flex items-center gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-brand-300/35 bg-brand-500/18 text-brand-300 shadow-inner">
                    <IconShield className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.18em] text-brand-300">{lang === 'es' ? 'Apoyo integral para truckers' : 'Complete support for truckers'}</p>
                    <p className="mt-1 text-sm font-semibold text-white/90">{lang === 'es' ? 'Seguro · Registros · Apoyo comercial' : 'Insurance · Registration · Business support'}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </Container>
        </section>

        <section id="services" className="scroll-mt-20 bg-[#f5f7fa] py-20 lg:py-28">
          <Container>
            <div className="mx-auto max-w-3xl text-center"><p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">{copy.services.eyebrow}</p><h2 className="mt-4 text-display-md text-balance text-ink">{copy.services.title}</h2><p className="mt-5 text-lg leading-relaxed text-ink/65">{copy.services.description}</p></div>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mt-12 grid gap-5 md:grid-cols-2">
              {copy.services.items.map((service, index) => {
                const Icon = SERVICE_ICONS[index];
                return (
                  <motion.article key={service.title} variants={staggerItem} className="flex flex-col rounded-3xl border border-ink/10 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                    <div className="flex items-start justify-between gap-4"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#071f3d] text-brand-300"><Icon className="h-6 w-6" /></span>{service.comingSoon && <span className="rounded-full bg-brand-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-800">{service.comingSoon}</span>}</div>
                    <h3 className="mt-6 text-xl font-extrabold text-ink">{service.title}</h3>
                    <p className="mt-3 leading-relaxed text-ink/65">{service.description}</p>
                    <ul className="mt-5 space-y-2.5">{service.bullets.map((bullet) => <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-ink/70"><IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />{bullet}</li>)}</ul>
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-7"><a href="#consultation" className="inline-flex items-center gap-2 text-sm font-bold text-[#071f3d] hover:text-brand-700">{service.cta}<IconArrowRight className="h-4 w-4" /></a><div className="flex flex-wrap gap-3">{service.sourceHref && <a href={service.sourceHref} target="_blank" rel="noreferrer" className="text-xs font-semibold text-ink/45 underline decoration-ink/20 underline-offset-4 hover:text-ink">{service.sourceLabel}</a>}{service.extraSourceHref && <a href={service.extraSourceHref} target="_blank" rel="noreferrer" className="text-xs font-semibold text-ink/45 underline decoration-ink/20 underline-offset-4 hover:text-ink">{service.extraSourceLabel}</a>}</div></div>
                  </motion.article>
                );
              })}
            </motion.div>
          </Container>
        </section>

        <section className="overflow-hidden bg-[#071f3d] py-20 text-white lg:py-28">
          <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-300">{copy.start.eyebrow}</p><h2 className="mt-4 text-display-md text-balance">{copy.start.title}</h2><p className="mt-5 text-lg leading-relaxed text-white/65">{copy.start.description}</p><LinkButton href="#consultation" size="lg" className="mt-8">{copy.start.cta}</LinkButton></div>
            <ol className="grid gap-3 sm:grid-cols-2">{copy.start.steps.map((step, index) => <li key={step} className="flex min-h-24 items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-5"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-500 text-sm font-extrabold text-white">{index + 1}</span><span className="font-semibold leading-snug text-white/88">{step}</span></li>)}</ol>
          </Container>
        </section>

        <section className="bg-white py-20 lg:py-28">
          <Container className="grid items-start gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
            <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">{copy.client.eyebrow}</p><h2 className="mt-4 text-display-md text-balance text-ink">{copy.client.title}</h2><p className="mt-6 text-lg leading-relaxed text-ink/65">{copy.client.description}</p><div className="mt-8 grid gap-3 sm:grid-cols-2">{copy.client.benefits.map((benefit) => <p key={benefit} className="flex items-center gap-3 rounded-2xl bg-[#f5f7fa] p-4 font-semibold text-ink"><IconCheck className="h-5 w-5 shrink-0 text-brand-600" />{benefit}</p>)}</div></div>
            <aside className="rounded-[2rem] bg-[#f5f7fa] p-8 shadow-card"><IconShield className="h-12 w-12 text-brand-600" /><p className="mt-7 text-xl font-extrabold leading-snug text-[#071f3d]">{lang === 'es' ? 'Transparencia desde el comienzo.' : 'Transparency from the start.'}</p><p className="mt-4 leading-relaxed text-ink/65">{copy.client.costNote}</p></aside>
          </Container>
        </section>

        <section id="consultation" className="scroll-mt-20 bg-[#f5f7fa] py-20 lg:py-28">
          <Container className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
            <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">{copy.form.eyebrow}</p><h2 className="mt-4 text-display-md text-balance text-ink">{copy.form.title}</h2><p className="mt-5 text-lg leading-relaxed text-ink/65">{copy.form.description}</p><div className="mt-8 rounded-3xl bg-[#071f3d] p-6 text-white"><p className="text-3xl font-extrabold text-brand-300">15 min</p><p className="mt-2 text-sm leading-relaxed text-white/65">{copy.hero.noteBody}</p></div></div>
            <form onSubmit={submitConsultation} className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label={copy.form.fields.name}><input required name={copy.form.fields.name} autoComplete="name" className={inputClass} /></Field>
                <Field label={copy.form.fields.phone}><input required name={copy.form.fields.phone} type="tel" autoComplete="tel" className={inputClass} /></Field>
                <Field label={copy.form.fields.email}><input required name={copy.form.fields.email} type="email" autoComplete="email" className={inputClass} /></Field>
                <Field label={copy.form.fields.state}><input required name={copy.form.fields.state} autoComplete="address-level1" className={inputClass} /></Field>
                {(['company', 'usdot', 'mc'] as const).map((key) => <Field key={key} label={copy.form.fields[key]}><select required name={copy.form.fields[key]} defaultValue="" className={inputClass}><option value="" disabled>—</option><option>{copy.form.yes}</option><option>{copy.form.no}</option><option>{copy.form.unsure}</option></select></Field>)}
                <Field label={copy.form.fields.vehicles}><input required name={copy.form.fields.vehicles} type="number" min="0" inputMode="numeric" className={inputClass} /></Field>
                <Field label={copy.form.fields.vehicleType}><input required name={copy.form.fields.vehicleType} className={inputClass} /></Field>
                <Field label={copy.form.fields.service}><select required name={copy.form.fields.service} defaultValue="" className={inputClass}><option value="" disabled>—</option>{copy.form.options.map((option) => <option key={option}>{option}</option>)}</select></Field>
                <Field label={copy.form.fields.date}><input required name={copy.form.fields.date} type="datetime-local" className={inputClass} /></Field>
              </div>
              <button type="submit" className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-6 py-3.5 text-base font-bold text-white shadow-lg transition hover:bg-brand-600 sm:w-auto">{copy.form.submit}<IconArrowRight className="h-5 w-5" /></button>
              <p className="mt-4 text-xs leading-relaxed text-ink/50">{copy.form.emailNote}</p>
            </form>
          </Container>
        </section>

        <section className="bg-gradient-bar px-5 py-16 text-center text-white lg:py-20"><h2 className="mx-auto max-w-4xl text-display-md text-balance">{copy.final.title}</h2><p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">{copy.final.description}</p><div className="mt-8 flex flex-wrap justify-center gap-3"><LinkButton href={`tel:${SALES_PHONE_TEL}`} size="lg" className="!bg-white !text-ink hover:!bg-white/90">{copy.final.primary}</LinkButton><LinkButton href="/get-quote" size="lg" variant="outline" className="!border-white/35 !bg-transparent !text-white hover:!bg-white/10">{copy.final.secondary}</LinkButton></div></section>

        <section className="bg-[#06182d] py-8 text-white"><Container><p className="text-xs leading-relaxed text-white/48">{copy.legal}</p></Container></section>
      </main>
      <Footer />
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="text-sm font-bold text-ink">{label}{children}</label>;
}
