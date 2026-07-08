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
  common: { signIn: string; sales: string; toggleTo: string; toggleLabel: string };
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
  common: { signIn: 'Sign in', sales: 'Sales', toggleTo: 'Español', toggleLabel: 'EN' },
  nav: [
    { label: 'Home', href: '#top' },
    { label: 'About Us', href: '#features' },
    {
      label: 'Insurances',
      href: '#products',
      menu: [
        { label: 'Auto Insurance', href: '#products' },
        { label: 'Home Insurance', href: '#products' },
        { label: 'Commercial Insurance', href: '#products' },
        { label: 'Trucking Insurance', href: '#products' },
        { label: 'Life Insurance', href: '#products' },
        { label: 'Health Insurance', href: '#products' },
      ],
    },
    { label: 'Other Services', href: '#products' },
    { label: 'Help & Support', href: '#faq' },
  ],
  hero: {
    pill: 'How much can I save on coverage?',
    eyebrow: 'Smart Insurance Made Simple',
    words: ['Auto', 'Home', 'Commercial', 'Trucking', 'Life', 'Health'],
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
    eyebrow: 'Why choose Vantins',
    title: 'Insurance Made Simple.',
    description:
      'Choosing insurance shouldn’t be overwhelming. Our licensed advisors compare multiple insurance carriers, explain your options, and help you choose coverage that protects what matters most.',
    items: [
      { title: 'Auto Insurance', description: 'Protect your vehicle with coverage that fits your needs and budget.' },
      { title: 'Home Insurance', description: 'Safeguard your home, condo, or rental property against life’s unexpected moments.' },
      { title: 'Commercial Insurance', description: 'Customized protection designed for businesses of every size.' },
      { title: 'Commercial Truck Insurance', description: 'Specialized insurance solutions for owner-operators and trucking companies.' },
      { title: 'Life Insurance', description: 'Help secure your family’s future with flexible life insurance options.' },
      { title: 'Health Insurance', description: 'Individual and family health plans from trusted providers.' },
    ],
  },
  products: {
    title: 'One Agency. Every Coverage You Need.',
    subtitle:
      'Whether you’re protecting your vehicle, home, business, trucking company, or family, Vantins makes insurance simple by bringing everything together under one trusted agency.',
    cta: 'Get Your Free Quote',
    coveragesLabel: 'Included Coverages',
    panelCta: 'Request Free Quote',
    items: [
      { tab: 'Auto', title: 'Auto Insurance', description: 'Drive with confidence with affordable coverage from top-rated insurance carriers.', bullets: ['Liability Coverage', 'Full Coverage', 'Multiple Carriers', 'Personalized Quotes'] },
      { tab: 'Home', title: 'Home Insurance', description: 'Coverage designed for homeowners, renters, and condos to protect what matters most.', bullets: ['Homeowners Coverage', 'Renters & Condo', 'Dwelling & Property', 'Personalized Quotes'] },
      { tab: 'Commercial', title: 'Commercial Insurance', description: 'Customized protection for every stage of your company.', bullets: ['General Liability', 'Business Owners Policy', 'Workers’ Compensation', 'Commercial Auto'] },
      { tab: 'Trucking', title: 'Commercial Truck Insurance', description: 'Helping trucking businesses stay protected from day one.', bullets: ['Physical Damage', 'Motor Truck Cargo', 'General Liability', 'Workers’ Compensation', 'Trailer Interchange', 'Bobtail Insurance', 'Non-Trucking Liability'] },
      { tab: 'Life', title: 'Life Insurance', description: 'Protect your family’s future with long-term financial security.', bullets: ['Individual Plans', 'Family Coverage', 'Long-Term Protection', 'Flexible Options'] },
      { tab: 'Health', title: 'Health Insurance', description: 'Flexible health insurance plans that fit your lifestyle and budget.', bullets: ['Individual Plans', 'Family Coverage', 'Trusted Providers', 'Flexible Options'] },
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
      { heading: 'Insurance', links: [{ label: 'Auto Insurance', href: '#products' }, { label: 'Home Insurance', href: '#products' }, { label: 'Commercial Insurance', href: '#products' }, { label: 'Trucking Insurance', href: '#products' }, { label: 'Life & Health', href: '#products' }] },
      { heading: 'For Business', links: [{ label: 'Commercial', href: '#features' }, { label: 'Commercial Truck', href: '#features' }, { label: 'General Liability', href: '#features' }, { label: 'Workers’ Comp', href: '#features' }] },
      { heading: 'Resources', links: [{ label: 'Blog', href: '#faq' }, { label: 'Guides & tools', href: '#faq' }, { label: 'Support center', href: '#faq' }, { label: 'Contact us', href: '#faq' }] },
      { heading: 'Company', links: [{ label: 'About us', href: '#features' }, { label: 'Licensed offices', href: '#' }, { label: 'Careers', href: '#' }, { label: 'Free Quote', href: '#pricing' }] },
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
  common: { signIn: 'Ingresar', sales: 'Ventas', toggleTo: 'English', toggleLabel: 'ES' },
  nav: [
    { label: 'Inicio', href: '#top' },
    { label: 'Nosotros', href: '#features' },
    {
      label: 'Seguros',
      href: '#products',
      menu: [
        { label: 'Seguro de Auto', href: '#products' },
        { label: 'Seguro de Hogar', href: '#products' },
        { label: 'Seguro Comercial', href: '#products' },
        { label: 'Seguro de Camiones', href: '#products' },
        { label: 'Seguro de Vida', href: '#products' },
        { label: 'Seguro de Salud', href: '#products' },
      ],
    },
    { label: 'Otros Servicios', href: '#products' },
    { label: 'Ayuda y Soporte', href: '#faq' },
  ],
  hero: {
    pill: '¿Cuánto puedo ahorrar en mi cobertura?',
    eyebrow: 'Seguros inteligentes, sin complicaciones',
    words: ['Auto', 'Hogar', 'Comercial', 'Camiones', 'Vida', 'Salud'],
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
    eyebrow: 'Por qué elegir Vantins',
    title: 'Seguros, Simplificados.',
    description:
      'Contratar un seguro no debería ser abrumador. Nuestros asesores con licencia comparan múltiples aseguradoras, explican tus opciones y te ayudan a elegir la cobertura que protege lo que más importa.',
    items: [
      { title: 'Seguro de Auto', description: 'Protege tu vehículo con una cobertura que se ajusta a tus necesidades y presupuesto.' },
      { title: 'Seguro de Hogar', description: 'Protege tu casa, condominio o propiedad en renta ante los imprevistos de la vida.' },
      { title: 'Seguro Comercial', description: 'Protección personalizada diseñada para negocios de todos los tamaños.' },
      { title: 'Seguro de Camiones', description: 'Soluciones especializadas para propietarios-operadores y empresas de transporte.' },
      { title: 'Seguro de Vida', description: 'Ayuda a asegurar el futuro de tu familia con opciones de vida flexibles.' },
      { title: 'Seguro de Salud', description: 'Planes de salud individuales y familiares de proveedores de confianza.' },
    ],
  },
  products: {
    title: 'Una Agencia. Toda la Cobertura que Necesitas.',
    subtitle:
      'Ya sea que protejas tu vehículo, tu hogar, tu negocio, tu empresa de transporte o tu familia, Vantins simplifica los seguros reuniéndolo todo bajo una agencia de confianza.',
    cta: 'Cotiza Gratis',
    coveragesLabel: 'Coberturas Incluidas',
    panelCta: 'Solicitar Cotización',
    items: [
      { tab: 'Auto', title: 'Seguro de Auto', description: 'Conduce con confianza con cobertura accesible de aseguradoras de primer nivel.', bullets: ['Responsabilidad Civil', 'Cobertura Amplia', 'Múltiples Aseguradoras', 'Cotizaciones Personalizadas'] },
      { tab: 'Hogar', title: 'Seguro de Hogar', description: 'Cobertura diseñada para propietarios, inquilinos y condominios para proteger lo que más importa.', bullets: ['Cobertura de Vivienda', 'Inquilinos y Condominio', 'Vivienda y Propiedad', 'Cotizaciones Personalizadas'] },
      { tab: 'Comercial', title: 'Seguro Comercial', description: 'Protección personalizada para cada etapa de tu empresa.', bullets: ['Responsabilidad General', 'Póliza para Negocios', 'Compensación Laboral', 'Auto Comercial'] },
      { tab: 'Camiones', title: 'Seguro de Camiones Comercial', description: 'Ayudamos a las empresas de transporte a estar protegidas desde el primer día.', bullets: ['Daños Físicos', 'Carga del Camión', 'Responsabilidad General', 'Compensación Laboral', 'Intercambio de Remolque', 'Seguro Bobtail', 'Responsabilidad No Comercial'] },
      { tab: 'Vida', title: 'Seguro de Vida', description: 'Protege el futuro de tu familia con seguridad financiera a largo plazo.', bullets: ['Planes Individuales', 'Cobertura Familiar', 'Protección a Largo Plazo', 'Opciones Flexibles'] },
      { tab: 'Salud', title: 'Seguro de Salud', description: 'Planes de salud flexibles que se ajustan a tu estilo de vida y presupuesto.', bullets: ['Planes Individuales', 'Cobertura Familiar', 'Proveedores de Confianza', 'Opciones Flexibles'] },
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
      { heading: 'Seguros', links: [{ label: 'Seguro de Auto', href: '#products' }, { label: 'Seguro de Hogar', href: '#products' }, { label: 'Seguro Comercial', href: '#products' }, { label: 'Seguro de Camiones', href: '#products' }, { label: 'Vida y Salud', href: '#products' }] },
      { heading: 'Para Empresas', links: [{ label: 'Comercial', href: '#features' }, { label: 'Camiones Comercial', href: '#features' }, { label: 'Responsabilidad General', href: '#features' }, { label: 'Compensación Laboral', href: '#features' }] },
      { heading: 'Recursos', links: [{ label: 'Blog', href: '#faq' }, { label: 'Guías y herramientas', href: '#faq' }, { label: 'Centro de ayuda', href: '#faq' }, { label: 'Contáctanos', href: '#faq' }] },
      { heading: 'Compañía', links: [{ label: 'Nosotros', href: '#features' }, { label: 'Oficinas con licencia', href: '#' }, { label: 'Empleo', href: '#' }, { label: 'Cotiza Gratis', href: '#pricing' }] },
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
