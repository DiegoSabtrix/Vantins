import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { ReactNode } from 'react';

export type Lang = 'en' | 'es';

export interface NavEntry {
  label: string;
  href: string;
  /** Optional dropdown links. */
  menu?: { label: string; href: string }[];
  /** Render as an accent button (Free Quote). */
  cta?: boolean;
}

export interface SiteContent {
  promo: { pre: string; highlight: string; post: string; cta: string };
  common: {
    signIn: string;
    sales: string;
    languageName: string;
    languageCode: string;
    switchLanguageLabel: string;
  };
  nav: NavEntry[];
  hero: {
    pill: string;
    eyebrow: string;
    words: string[];
    headline: string;
    subtitle: string;
    cta: string;
  };
  highlight: {
    quote: string;
    name: string;
    role: string;
    statHighlight: string;
    statRest: string;
    cta: string;
  };
  features: {
    eyebrow: string;
    title: string;
    description: string;
    items: { title: string; description: string }[];
  };
  products: {
    title: string;
    subtitle: string;
    cta: string;
    coveragesLabel: string;
    panelCta: string;
    items: { tab: string; title: string; description: string; bullets: string[] }[];
  };
  stats: { value: string; label: string }[];
  testimonials: {
    eyebrow: string;
    title: string;
    description: string;
    items: { quote: string; name: string; role: string; initials: string }[];
  };
  carriers: { title: string; description: string; cta: string };
  pricing: {
    eyebrow: string;
    title: string;
    description: string;
    cta: string;
    recommended: string;
    items: { name: string; tagline: string; features: string[]; featured?: boolean }[];
  };
  faq: { eyebrow: string; title: string; items: { question: string; answer: string }[] };
  finalCta: { title: string; subtitle: string; cta: string };
  footer: {
    tagline: string;
    columns: { heading: string; links: { label: string; href: string }[] }[];
    copyright: string;
  };
}

const en: SiteContent = {
  promo: {
    pre: 'Get your',
    highlight: 'free insurance quote',
    post: 'today',
    cta: 'Free Quote',
  },
  common: {
    signIn: 'Sign in',
    sales: 'Sales',
    languageName: 'English',
    languageCode: 'EN',
    switchLanguageLabel: 'Switch language to Spanish',
  },
  nav: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about-us' },
    { label: 'Insurance', href: '/#products' },
    { label: 'Services', href: '/services' },
    { label: 'Help & Support', href: '/help-support' },
  ],
  hero: {
    pill: 'How much can I save on coverage?',
    eyebrow: 'Smart Insurance Made Simple',
    words: ['Trucks', 'Fleets', 'Cargo', 'Operators', 'Routes'],
    headline: 'Smarter Coverage. Better Protection.',
    subtitle:
      'Compare trusted insurance carriers, receive expert guidance, and find the right coverage for your family or business — all in one place.',
    cta: 'Get Your Free Quote',
  },
  highlight: {
    quote:
      'Vantins helped me compare multiple insurance companies and explained every option before I made a decision. The process was simple and stress-free.',
    name: 'Vantins Client',
    role: 'Verified customer',
    statHighlight: 'Thousands',
    statRest:
      'of families and businesses trust Vantins to simplify insurance with expert guidance and access to leading insurance carriers.',
    cta: 'Get Your Free Quote',
  },
  features: {
    eyebrow: 'Why truckers choose Vantins',
    title: 'Trucking Insurance Made Simple.',
    description:
      'Choosing trucking insurance shouldn\'t be overwhelming. Our licensed advisors compare multiple carriers, explain your options, and help you find coverage built for your truck, your cargo, and your business.',
    items: [
      { title: 'Owner-Operator Insurance', description: 'Coverage built for independent truckers hauling on their own or under a carrier.' },
      { title: 'Fleet Insurance', description: 'Protect two trucks or two hundred with coverage that scales as your fleet grows.' },
      { title: 'Cargo Insurance', description: 'Protect what you haul, from produce to freight, mile after mile.' },
      { title: 'Physical Damage Coverage', description: 'Repair or replace your truck and trailer after a collision, fire, or theft.' },
      { title: 'General Liability', description: 'Protect your trucking business from third-party claims and lawsuits.' },
      { title: 'Workers\' Comp', description: 'Coverage for your drivers and staff if they\'re injured on the job.' },
    ],
  },
  products: {
    title: 'One Agency. Every Trucking Coverage You Need.',
    subtitle:
      'Whether you\'re an owner-operator with one truck or running a growing fleet, Vantins makes trucking insurance simple by bringing every coverage together under one trusted agency.',
    cta: 'Get Your Free Quote',
    coveragesLabel: 'Included Coverages',
    panelCta: 'Request Free Quote',
    items: [
      { tab: 'Owner-Operator', title: 'Owner-Operator Insurance', description: 'Drive with confidence with affordable coverage from top-rated carriers who specialize in independent truckers.', bullets: ['Liability Coverage', 'Physical Damage', 'Multiple Carriers', 'Personalized Quotes'] },
      { tab: 'Fleet', title: 'Fleet Insurance', description: 'Coverage that scales with your business, from a two-truck operation to a growing fleet.', bullets: ['Fleet Liability', 'Multi-Vehicle Discounts', 'Multiple Carriers', 'Personalized Quotes'] },
      { tab: 'Cargo', title: 'Cargo Insurance', description: 'Protect the freight you haul against loss, theft, and damage in transit.', bullets: ['Cargo Coverage', 'Reefer Breakdown', 'Multiple Carriers', 'Personalized Quotes'] },
      { tab: 'Physical Damage', title: 'Physical Damage Coverage', description: 'Get your truck and trailer back on the road after a collision, fire, or theft.', bullets: ['Collision', 'Comprehensive', 'Multiple Carriers', 'Personalized Quotes'] },
      { tab: 'General Liability', title: 'General Liability', description: 'Protect your trucking business from third-party claims, property damage, and lawsuits.', bullets: ['Third-Party Liability', 'Property Damage', 'Multiple Carriers', 'Personalized Quotes'] },
      { tab: 'Workers\' Comp', title: 'Workers\' Comp', description: 'Coverage for your drivers and staff if they\'re injured while on the job.', bullets: ['Medical Coverage', 'Lost Wages', 'Multiple Carriers', 'Personalized Quotes'] },
    ],
  },
  stats: [
    { value: '5,000+', label: 'Clients Protected' },
    { value: 'FL • TX • NJ', label: 'Licensed Offices' },
    { value: 'Multiple', label: 'Top-Rated Insurance Carriers' },
    { value: 'Personalized', label: 'Insurance Guidance' },
  ],
  testimonials: {
    eyebrow: 'Trusted by our clients',
    title: 'Protection Starts With Confidence',
    description: 'See why families and businesses choose Vantins for their insurance needs.',
    items: [
      { quote: 'They compared multiple companies and found better coverage for less than I expected.', name: 'Maria G.', role: 'Auto & Home client', initials: 'MG' },
      { quote: 'The team made the entire process easy and explained every detail clearly.', name: 'James T.', role: 'Small business owner', initials: 'JT' },
      { quote: 'Fast, professional, and always available whenever I have questions.', name: 'David R.', role: 'Commercial client', initials: 'DR' },
    ],
  },
  carriers: {
    title: 'Trusted Insurance Carriers',
    description:
      'We work with leading insurance companies so you can compare coverage, pricing, and protection — all through one trusted agency.',
    cta: 'See all carriers',
  },
  pricing: {
    eyebrow: 'Explore our coverage',
    title: 'Find the Coverage That Fits Your Needs',
    description:
      'Whether you’re protecting your family, your home, your vehicle, or your business, our licensed advisors help you compare options and choose with confidence.',
    cta: 'Get Quote',
    recommended: 'Recommended',
    items: [
      { name: 'Auto Insurance', tagline: 'Coverage that fits your needs and budget.', features: ['Liability Coverage', 'Full Coverage', 'Multiple Carriers', 'Personalized Quotes'] },
      { name: 'Commercial Insurance', tagline: 'Protection for businesses of every size.', featured: true, features: ['General Liability', 'Business Owners Policy', 'Workers Compensation', 'Commercial Auto'] },
      { name: 'Life & Health Insurance', tagline: 'Security for you and your family.', features: ['Individual Plans', 'Family Coverage', 'Long-Term Protection', 'Flexible Options'] },
    ],
  },
  faq: {
    eyebrow: 'Questions & answers',
    title: 'Frequently Asked Questions',
    items: [
      { question: 'How do I get a quote?', answer: 'Request a free quote online or speak with one of our licensed insurance advisors.' },
      { question: 'Can you compare multiple insurance companies?', answer: 'Yes. We work with multiple top-rated insurance carriers to help you find the right coverage.' },
      { question: 'Can I bundle my policies?', answer: 'Absolutely. Many clients save money by combining home, auto, and other insurance policies.' },
      { question: 'Do you work with businesses?', answer: 'Yes. We provide commercial insurance solutions for businesses across multiple industries, including trucking companies.' },
      { question: 'Can I get assistance in Spanish?', answer: 'Yes. Our bilingual team is ready to assist you in English and Spanish.' },
    ],
  },
  finalCta: {
    title: 'Protection Starts Here',
    subtitle:
      'Whether you’re looking for personal insurance or business coverage, Vantins helps you compare trusted carriers, understand your options, and choose with confidence.',
    cta: 'Get Your Free Quote',
  },
  footer: {
    tagline:
      'Compare trusted insurance carriers, get expert guidance, and find the right coverage for your family or business — all in one place.',
    columns: [
      { heading: 'Insurance', links: [{ label: 'Owner-Operator Insurance', href: '#products' }, { label: 'Fleet Insurance', href: '#products' }, { label: 'Cargo Insurance', href: '#products' }, { label: 'Physical Damage Coverage', href: '#products' }, /* TODO: create specific page. */ { label: 'Non-Trucking Liability', href: '#products' }] },
      { heading: 'For Business', links: [{ label: 'Commercial Trucking', href: '#features' }, { label: 'General Liability', href: '#features' }, { label: 'Workers’ Comp', href: '#features' }, /* TODO: create specific page. */ { label: 'Fleet Management', href: '#features' }] },
      { heading: 'Resources', links: [{ label: 'Blog', href: '/help-support#faq' }, { label: 'Guides & tools', href: '/help-support#support-options' }, { label: 'Support center', href: '/help-support' }, { label: 'Contact us', href: '/help-support#contact' }] },
      { heading: 'Company', links: [{ label: 'About us', href: '/about-us' }, { label: 'Licensed offices', href: '#' }, { label: 'Careers', href: '#' }, { label: 'Free Quote', href: '/#pricing' }] },
    ],
    copyright:
      '© {year} Vantins. Insurance made simple — compare trusted carriers and choose coverage with confidence.',
  },
};

const es: SiteContent = {
  promo: {
    pre: 'Obtén tu',
    highlight: 'cotización de seguro gratis',
    post: 'hoy',
    cta: 'Cotiza gratis',
  },
  common: {
    signIn: 'Ingresar',
    sales: 'Ventas',
    languageName: 'Español',
    languageCode: 'ES',
    switchLanguageLabel: 'Cambiar idioma a inglés',
  },
  nav: [
    { label: 'Inicio', href: '/' },
    { label: 'Nosotros', href: '/about-us' },
    { label: 'Seguros', href: '/#products' },
    { label: 'Servicios', href: '/services' },
    { label: 'Ayuda y Soporte', href: '/help-support' },
  ],
  hero: {
    pill: '¿Cuánto puedo ahorrar en mi cobertura?',
    eyebrow: 'Seguros inteligentes, sin complicaciones',
    words: ['Camiones', 'Flotas', 'Carga', 'Operadores', 'Rutas'],
    headline: 'Mejor Cobertura. Mejor Protección.',
    subtitle:
      'Compara aseguradoras de confianza, recibe asesoría experta y encuentra la cobertura ideal para tu familia o negocio — todo en un solo lugar.',
    cta: 'Cotiza Gratis',
  },
  highlight: {
    quote:
      'Vantins me ayudó a comparar varias aseguradoras y me explicó cada opción antes de decidir. El proceso fue simple y sin estrés.',
    name: 'Cliente Vantins',
    role: 'Cliente verificado',
    statHighlight: 'Miles',
    statRest:
      'de familias y negocios confían en Vantins para simplificar sus seguros con asesoría experta y acceso a las principales aseguradoras.',
    cta: 'Cotiza Gratis',
  },
  features: {
    eyebrow: 'Por qué los transportistas eligen Vantins',
    title: 'Seguro de Camiones, Simplificado.',
    description:
      'Elegir un seguro para camiones no debería ser abrumador. Nuestros asesores con licencia comparan múltiples aseguradoras, explican tus opciones y te ayudan a encontrar cobertura para tu camión, tu carga y tu negocio.',
    items: [
      { title: 'Seguro para Owner-Operators', description: 'Cobertura para camioneros independientes que trabajan por cuenta propia o bajo una empresa transportista.' },
      { title: 'Seguro de Flotas', description: 'Protege dos camiones o doscientos con cobertura que escala a medida que crece tu flota.' },
      { title: 'Seguro de Carga', description: 'Protege lo que transportas, desde productos frescos hasta carga general, milla tras milla.' },
      { title: 'Cobertura de Daño Físico', description: 'Repara o reemplaza tu camión y remolque después de una colisión, incendio o robo.' },
      { title: 'Responsabilidad Civil General', description: 'Protege tu empresa de transporte frente a reclamaciones y demandas de terceros.' },
      { title: 'Compensación Laboral', description: 'Cobertura para tus conductores y equipo si se lesionan mientras trabajan.' },
    ],
  },
  products: {
    title: 'Una Agencia. Toda la Cobertura de Transporte que Necesitas.',
    subtitle:
      'Ya seas owner-operator con un solo camión o manejes una flota en crecimiento, Vantins simplifica el seguro de transporte reuniendo cada cobertura bajo una agencia de confianza.',
    cta: 'Cotiza Gratis',
    coveragesLabel: 'Coberturas Incluidas',
    panelCta: 'Solicitar Cotización',
    items: [
      { tab: 'Owner-Operator', title: 'Seguro para Owner-Operators', description: 'Conduce con confianza con cobertura accesible de aseguradoras especializadas en camioneros independientes.', bullets: ['Responsabilidad Civil', 'Daño Físico', 'Múltiples Aseguradoras', 'Cotizaciones Personalizadas'] },
      { tab: 'Flotas', title: 'Seguro de Flotas', description: 'Cobertura que escala con tu negocio, desde dos camiones hasta una flota en crecimiento.', bullets: ['Responsabilidad de Flota', 'Descuentos Multi-Vehículo', 'Múltiples Aseguradoras', 'Cotizaciones Personalizadas'] },
      { tab: 'Carga', title: 'Seguro de Carga', description: 'Protege la carga que transportas contra pérdida, robo y daño durante el trayecto.', bullets: ['Cobertura de Carga', 'Avería de Refrigeración', 'Múltiples Aseguradoras', 'Cotizaciones Personalizadas'] },
      { tab: 'Daño Físico', title: 'Cobertura de Daño Físico', description: 'Vuelve a poner tu camión y remolque en la carretera después de una colisión, incendio o robo.', bullets: ['Colisión', 'Cobertura Integral', 'Múltiples Aseguradoras', 'Cotizaciones Personalizadas'] },
      { tab: 'Responsabilidad', title: 'Responsabilidad Civil General', description: 'Protege tu empresa de transporte frente a reclamaciones de terceros, daños a propiedad y demandas.', bullets: ['Responsabilidad ante Terceros', 'Daños a Propiedad', 'Múltiples Aseguradoras', 'Cotizaciones Personalizadas'] },
      { tab: 'Comp. Laboral', title: 'Compensación Laboral', description: 'Cobertura para tus conductores y equipo si se lesionan mientras están trabajando.', bullets: ['Cobertura Médica', 'Salarios Perdidos', 'Múltiples Aseguradoras', 'Cotizaciones Personalizadas'] },
    ],
  },
  stats: [
    { value: '5,000+', label: 'Clientes Protegidos' },
    { value: 'FL • TX • NJ', label: 'Oficinas con Licencia' },
    { value: 'Múltiples', label: 'Aseguradoras de Primer Nivel' },
    { value: 'Personalizada', label: 'Asesoría en Seguros' },
  ],
  testimonials: {
    eyebrow: 'La confianza de nuestros clientes',
    title: 'La Protección Empieza con Confianza',
    description: 'Descubre por qué familias y negocios eligen a Vantins para sus seguros.',
    items: [
      { quote: 'Compararon varias compañías y encontraron mejor cobertura por menos de lo que esperaba.', name: 'Maria G.', role: 'Cliente Auto y Hogar', initials: 'MG' },
      { quote: 'El equipo hizo todo el proceso muy fácil y me explicó cada detalle con claridad.', name: 'James T.', role: 'Dueño de pequeño negocio', initials: 'JT' },
      { quote: 'Rápidos, profesionales y siempre disponibles cuando tengo preguntas.', name: 'David R.', role: 'Cliente comercial', initials: 'DR' },
    ],
  },
  carriers: {
    title: 'Aseguradoras de Confianza',
    description:
      'Trabajamos con las principales compañías de seguros para que compares cobertura, precio y protección — todo a través de una agencia de confianza.',
    cta: 'Ver todas las aseguradoras',
  },
  pricing: {
    eyebrow: 'Explora nuestra cobertura',
    title: 'Encuentra la Cobertura que se Ajusta a Ti',
    description:
      'Ya sea que protejas a tu familia, tu hogar, tu vehículo o tu negocio, nuestros asesores con licencia te ayudan a comparar opciones y elegir con confianza.',
    cta: 'Cotizar',
    recommended: 'Recomendado',
    items: [
      { name: 'Seguro de Auto', tagline: 'Cobertura que se ajusta a tus necesidades y presupuesto.', features: ['Responsabilidad Civil', 'Cobertura Amplia', 'Múltiples Aseguradoras', 'Cotizaciones Personalizadas'] },
      { name: 'Seguro Comercial', tagline: 'Protección para negocios de todos los tamaños.', featured: true, features: ['Responsabilidad General', 'Póliza para Negocios', 'Compensación Laboral', 'Auto Comercial'] },
      { name: 'Seguro de Vida y Salud', tagline: 'Seguridad para ti y tu familia.', features: ['Planes Individuales', 'Cobertura Familiar', 'Protección a Largo Plazo', 'Opciones Flexibles'] },
    ],
  },
  faq: {
    eyebrow: 'Preguntas y respuestas',
    title: 'Preguntas Frecuentes',
    items: [
      { question: '¿Cómo obtengo una cotización?', answer: 'Solicita una cotización gratis en línea o habla con uno de nuestros asesores con licencia.' },
      { question: '¿Pueden comparar varias compañías de seguros?', answer: 'Sí. Trabajamos con múltiples aseguradoras de primer nivel para ayudarte a encontrar la cobertura ideal.' },
      { question: '¿Puedo combinar mis pólizas?', answer: 'Por supuesto. Muchos clientes ahorran al combinar sus seguros de hogar, auto y otros.' },
      { question: '¿Trabajan con empresas?', answer: 'Sí. Ofrecemos soluciones de seguro comercial para empresas de múltiples industrias, incluidas las de transporte.' },
      { question: '¿Puedo recibir atención en español?', answer: 'Sí. Nuestro equipo bilingüe está listo para ayudarte en inglés y español.' },
    ],
  },
  finalCta: {
    title: 'Tu Protección Empieza Aquí',
    subtitle:
      'Ya sea que busques un seguro personal o cobertura para tu negocio, Vantins te ayuda a comparar aseguradoras de confianza, entender tus opciones y elegir con seguridad.',
    cta: 'Cotiza Gratis',
  },
  footer: {
    tagline:
      'Compara aseguradoras de confianza, recibe asesoría experta y encuentra la cobertura ideal para tu familia o negocio — todo en un solo lugar.',
    columns: [
      { heading: 'Seguros', links: [{ label: 'Seguro para Owner-Operators', href: '#products' }, { label: 'Seguro de Flotas', href: '#products' }, { label: 'Seguro de Carga', href: '#products' }, { label: 'Cobertura de Daño Físico', href: '#products' }, /* TODO: crear página específica. */ { label: 'Responsabilidad Civil No Comercial', href: '#products' }] },
      { heading: 'Para Empresas', links: [{ label: 'Transporte Comercial', href: '#features' }, { label: 'Responsabilidad Civil General', href: '#features' }, { label: 'Compensación Laboral', href: '#features' }, /* TODO: crear página específica. */ { label: 'Gestión de Flotas', href: '#features' }] },
      { heading: 'Recursos', links: [{ label: 'Blog', href: '/help-support#faq' }, { label: 'Guías y herramientas', href: '/help-support#support-options' }, { label: 'Centro de ayuda', href: '/help-support' }, { label: 'Contáctanos', href: '/help-support#contact' }] },
      { heading: 'Compañía', links: [{ label: 'Nosotros', href: '/about-us' }, { label: 'Oficinas con licencia', href: '#' }, { label: 'Empleo', href: '#' }, { label: 'Cotiza Gratis', href: '/#pricing' }] },
    ],
    copyright:
      '© {year} Vantins. Seguros simplificados — compara aseguradoras de confianza y elige con seguridad.',
  },
};

const CONTENT: Record<Lang, SiteContent> = { en, es };

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
  t: SiteContent;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'en';
    const fromUrl = new URLSearchParams(window.location.search).get('lang');
    if (fromUrl === 'es' || fromUrl === 'en') return fromUrl;
    const stored = window.localStorage.getItem('vantins-lang');
    return stored === 'es' ? 'es' : 'en';
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem('vantins-lang', lang);
  }, [lang]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);
  const toggle = useCallback(
    () => setLangState((cur) => (cur === 'en' ? 'es' : 'en')),
    [],
  );

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, toggle, t: CONTENT[lang] }),
    [lang, setLang, toggle],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within a LanguageProvider');
  return ctx;
}

/** Shorthand for the active language's content. */
export function useT(): SiteContent {
  return useLang().t;
}
