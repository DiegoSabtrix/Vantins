import type {
  Feature,
  FaqItem,
  FooterColumn,
  NavItem,
  PricingTier,
  ProductHighlight,
  Stat,
  Testimonial,
} from '@/types';
import {
  IconBank,
  IconChart,
  IconInvoice,
  IconReceipt,
  IconShield,
  IconUsers,
} from '@/components/icons';

/** Sales phone + promo copy shown in the top bar / navbar. */
export const SALES_PHONE = '1-844-463-1636';
export const PROMO_TEXT = 'Get Your Free Insurance Quote Today';

/** Gradient words that cycle in the hero — the lines of coverage we offer. */
export const HERO_WORDS = [
  'Auto',
  'Home',
  'Commercial',
  'Trucking',
  'Life',
  'Health',
];

/** Primary navigation with mega-menu content. */
export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Insurance',
    href: '#products',
    menu: [
      {
        heading: 'Personal',
        links: [
          { label: 'Auto Insurance', href: '#products' },
          { label: 'Home Insurance', href: '#products' },
          { label: 'Life Insurance', href: '#products' },
          { label: 'Health Insurance', href: '#products' },
        ],
      },
      {
        heading: 'Business',
        links: [
          { label: 'Commercial Insurance', href: '#products' },
          { label: 'Commercial Truck', href: '#products' },
          { label: 'Workers’ Comp', href: '#products' },
          { label: 'Commercial Auto', href: '#products' },
        ],
      },
    ],
  },
  {
    label: 'Get a Quote',
    href: '#pricing',
  },
  {
    label: 'Why Vantins',
    href: '#features',
  },
  {
    label: 'For Business',
    href: '#products',
    menu: [
      {
        heading: 'Business coverage',
        links: [
          { label: 'Commercial Insurance', href: '#products' },
          { label: 'Commercial Truck', href: '#products' },
          { label: 'General Liability', href: '#products' },
          { label: 'Workers’ Compensation', href: '#products' },
        ],
      },
    ],
  },
  {
    label: 'Resources',
    href: '#faq',
    menu: [
      {
        heading: 'Learn',
        links: [
          { label: 'Blog', href: '#faq' },
          { label: 'Guides & tools', href: '#faq' },
          { label: 'Support', href: '#faq' },
          { label: 'Contact us', href: '#faq' },
        ],
      },
    ],
  },
];

export const FEATURES: Feature[] = [
  {
    id: 'auto',
    title: 'Auto Insurance',
    description:
      'Protect your vehicle with coverage that fits your needs and budget.',
    icon: IconChart,
  },
  {
    id: 'home',
    title: 'Home Insurance',
    description:
      'Safeguard your home, condo, or rental property against life’s unexpected moments.',
    icon: IconShield,
  },
  {
    id: 'commercial',
    title: 'Commercial Insurance',
    description:
      'Customized protection designed for businesses of every size.',
    icon: IconBank,
  },
  {
    id: 'truck',
    title: 'Commercial Truck Insurance',
    description:
      'Specialized insurance solutions for owner-operators and trucking companies.',
    icon: IconInvoice,
  },
  {
    id: 'life',
    title: 'Life Insurance',
    description:
      'Help secure your family’s future with flexible life insurance options.',
    icon: IconUsers,
  },
  {
    id: 'health',
    title: 'Health Insurance',
    description:
      'Individual and family health plans from trusted providers.',
    icon: IconReceipt,
  },
];

export const PRODUCT_HIGHLIGHTS: ProductHighlight[] = [
  {
    id: 'auto',
    eyebrow: 'Auto',
    title: 'Auto Insurance',
    description:
      'Drive with confidence with affordable coverage from top-rated insurance carriers.',
    bullets: [
      'Liability Coverage',
      'Full Coverage',
      'Multiple Carriers',
      'Personalized Quotes',
    ],
  },
  {
    id: 'home',
    eyebrow: 'Home',
    title: 'Home Insurance',
    description:
      'Coverage designed for homeowners, renters, and condos to protect what matters most.',
    bullets: [
      'Homeowners Coverage',
      'Renters & Condo',
      'Dwelling & Property',
      'Personalized Quotes',
    ],
  },
  {
    id: 'commercial',
    eyebrow: 'Commercial',
    title: 'Commercial Insurance',
    description:
      'Customized protection for every stage of your company.',
    bullets: [
      'General Liability',
      'Business Owners Policy',
      'Workers’ Compensation',
      'Commercial Auto',
    ],
  },
  {
    id: 'trucking',
    eyebrow: 'Trucking',
    title: 'Commercial Truck Insurance',
    description:
      'Helping trucking businesses stay protected from day one.',
    bullets: [
      'Physical Damage',
      'Motor Truck Cargo',
      'General Liability',
      'Workers’ Compensation',
      'Trailer Interchange',
      'Bobtail Insurance',
      'Non-Trucking Liability',
    ],
  },
  {
    id: 'life',
    eyebrow: 'Life',
    title: 'Life Insurance',
    description:
      'Protect your family’s future with long-term financial security.',
    bullets: [
      'Individual Plans',
      'Family Coverage',
      'Long-Term Protection',
      'Flexible Options',
    ],
  },
  {
    id: 'health',
    eyebrow: 'Health',
    title: 'Health Insurance',
    description:
      'Flexible health insurance plans that fit your lifestyle and budget.',
    bullets: [
      'Individual Plans',
      'Family Coverage',
      'Trusted Providers',
      'Flexible Options',
    ],
  },
];

export const STATS: Stat[] = [
  { id: 'clients', value: '5,000+', label: 'Clients Protected' },
  { id: 'offices', value: 'FL • TX • NJ', label: 'Licensed Offices' },
  { id: 'carriers', value: 'Multiple', label: 'Top-Rated Insurance Carriers' },
  { id: 'guidance', value: 'Personalized', label: 'Insurance Guidance' },
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'auto',
    name: 'Auto Insurance',
    tagline: 'Coverage that fits your needs and budget.',
    features: [
      'Liability Coverage',
      'Full Coverage',
      'Multiple Carriers',
      'Personalized Quotes',
    ],
  },
  {
    id: 'commercial',
    name: 'Commercial Insurance',
    tagline: 'Protection for businesses of every size.',
    featured: true,
    features: [
      'General Liability',
      'Business Owners Policy',
      'Workers Compensation',
      'Commercial Auto',
    ],
  },
  {
    id: 'life-health',
    name: 'Life & Health Insurance',
    tagline: 'Security for you and your family.',
    features: [
      'Individual Plans',
      'Family Coverage',
      'Long-Term Protection',
      'Flexible Options',
    ],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    quote:
      'They compared multiple companies and found better coverage for less than I expected.',
    name: 'Maria G.',
    role: 'Auto & Home client',
    initials: 'MG',
  },
  {
    id: 't2',
    quote:
      'The team made the entire process easy and explained every detail clearly.',
    name: 'James T.',
    role: 'Small business owner',
    initials: 'JT',
  },
  {
    id: 't3',
    quote:
      'Fast, professional, and always available whenever I have questions.',
    name: 'David R.',
    role: 'Commercial client',
    initials: 'DR',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'q1',
    question: 'How do I get a quote?',
    answer:
      'Request a free quote online or speak with one of our licensed insurance advisors.',
  },
  {
    id: 'q2',
    question: 'Can you compare multiple insurance companies?',
    answer:
      'Yes. We work with multiple top-rated insurance carriers to help you find the right coverage.',
  },
  {
    id: 'q3',
    question: 'Can I bundle my policies?',
    answer:
      'Absolutely. Many clients save money by combining home, auto, and other insurance policies.',
  },
  {
    id: 'q4',
    question: 'Do you work with businesses?',
    answer:
      'Yes. We provide commercial insurance solutions for businesses across multiple industries, including trucking companies.',
  },
  {
    id: 'q5',
    question: 'Can I get assistance in Spanish?',
    answer:
      'Yes. Our bilingual team is ready to assist you in English and Spanish.',
  },
];

/** Partner insurance carriers shown in the marquee (generic placeholders). */
export const TRUST_LOGOS: string[] = [
  'Summit Mutual',
  'Liberty Point',
  'Guardian Line',
  'Cornerstone',
  'Beacon',
  'Evergreen',
  'Meridian',
  'Anchor',
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: 'Insurance',
    links: [
      { label: 'Auto Insurance', href: '#products' },
      { label: 'Home Insurance', href: '#products' },
      { label: 'Commercial Insurance', href: '#products' },
      { label: 'Trucking Insurance', href: '#products' },
      { label: 'Life & Health', href: '#products' },
    ],
  },
  {
    heading: 'For Business',
    links: [
      { label: 'Commercial', href: '#features' },
      { label: 'Commercial Truck', href: '#features' },
      { label: 'General Liability', href: '#features' },
      { label: 'Workers’ Comp', href: '#features' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Blog', href: '#faq' },
      { label: 'Guides & tools', href: '#faq' },
      { label: 'Support center', href: '#faq' },
      { label: 'Contact us', href: '#faq' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About us', href: '#' },
      { label: 'Licensed offices', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Get a Quote', href: '#pricing' },
    ],
  },
];

export const FOOTER_LEGAL_LINKS = [
  { label: 'Privacy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Security', href: '#' },
  { label: 'Accessibility', href: '#' },
  { label: 'Cookie preferences', href: '#' },
];
