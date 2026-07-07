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

/** Primary navigation with mega-menu content. */
export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Products',
    href: '#products',
    menu: [
      {
        heading: 'Run your business',
        links: [
          { label: 'Accounting', href: '#products' },
          { label: 'Invoicing', href: '#products' },
          { label: 'Expenses', href: '#products' },
          { label: 'Reports & insights', href: '#products' },
        ],
      },
      {
        heading: 'Get paid & pay others',
        links: [
          { label: 'Payments', href: '#products' },
          { label: 'Payroll', href: '#products' },
          { label: 'Bill pay', href: '#products' },
          { label: 'Time tracking', href: '#products' },
        ],
      },
    ],
  },
  {
    label: 'Features',
    href: '#features',
  },
  {
    label: 'Pricing',
    href: '#pricing',
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
          { label: 'Community', href: '#faq' },
        ],
      },
    ],
  },
];

export const FEATURES: Feature[] = [
  {
    id: 'invoicing',
    title: 'Invoicing',
    description:
      'Create custom invoices in seconds and get paid up to twice as fast with built-in online payments.',
    icon: IconInvoice,
  },
  {
    id: 'expenses',
    title: 'Expense tracking',
    description:
      'Snap a photo of a receipt and let QuickBooks sort, match, and categorize every transaction automatically.',
    icon: IconReceipt,
  },
  {
    id: 'reports',
    title: 'Reports & insights',
    description:
      'See profit and loss, cash flow, and balance sheets update in real time so you always know where you stand.',
    icon: IconChart,
  },
  {
    id: 'banking',
    title: 'Connected banking',
    description:
      'Securely link your bank and credit cards to import and reconcile transactions without manual entry.',
    icon: IconBank,
  },
  {
    id: 'payroll',
    title: 'Payroll',
    description:
      'Run payroll in minutes, pay your team by direct deposit, and file taxes automatically with confidence.',
    icon: IconUsers,
  },
  {
    id: 'security',
    title: 'Bank-grade security',
    description:
      'Your data is protected with 128-bit encryption, multi-factor authentication, and continuous monitoring.',
    icon: IconShield,
  },
];

export const PRODUCT_HIGHLIGHTS: ProductHighlight[] = [
  {
    id: 'invoicing',
    eyebrow: 'Get paid faster',
    title: 'Send professional invoices and get paid on time',
    description:
      'Customize invoices with your logo, schedule automatic reminders, and accept credit cards, ACH, and Apple Pay — all in one place.',
    bullets: [
      'Automatic payment reminders',
      'Accept every major payment method',
      'Track status from sent to paid',
    ],
    visual: 'invoice',
    align: 'right',
  },
  {
    id: 'reports',
    eyebrow: 'Know your numbers',
    title: 'Real-time insights that help you make smarter decisions',
    description:
      'Dozens of built-in reports refresh as money moves, so you can spot trends, forecast cash flow, and stay ready for tax time.',
    bullets: [
      'Live profit & loss and cash flow',
      'Customizable dashboards',
      'Export and share in a click',
    ],
    visual: 'reports',
    align: 'left',
  },
  {
    id: 'expenses',
    eyebrow: 'Stay organized',
    title: 'Track every expense without the paperwork',
    description:
      'Connect your accounts, capture receipts on the go, and let smart categorization keep your books accurate and audit-ready.',
    bullets: [
      'Auto-import bank transactions',
      'Snap and store receipts',
      'Maximize every deduction',
    ],
    visual: 'expenses',
    align: 'right',
  },
];

export const STATS: Stat[] = [
  { id: 'customers', value: '7M+', label: 'Customers worldwide' },
  { id: 'saved', value: '$5,600', label: 'Average yearly savings' },
  { id: 'faster', value: '2×', label: 'Faster payments with invoicing' },
  { id: 'uptime', value: '99.9%', label: 'Platform uptime' },
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'simple-start',
    name: 'Simple Start',
    tagline: 'For new businesses getting organized.',
    price: 35,
    promoPrice: 9,
    features: [
      'Track income & expenses',
      'Send unlimited invoices',
      'Capture & organize receipts',
      'Run general reports',
      '1 user + your accountant',
    ],
  },
  {
    id: 'essentials',
    name: 'Essentials',
    tagline: 'For growing teams managing bills.',
    price: 65,
    promoPrice: 18,
    featured: true,
    features: [
      'Everything in Simple Start',
      'Manage & pay bills',
      'Track time',
      'Multi-currency support',
      'Up to 3 users',
    ],
  },
  {
    id: 'plus',
    name: 'Plus',
    tagline: 'For businesses tracking projects.',
    price: 99,
    promoPrice: 27,
    features: [
      'Everything in Essentials',
      'Track inventory',
      'Track project profitability',
      'Comprehensive reporting',
      'Up to 5 users',
    ],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    quote:
      'QuickBooks gives me back hours every week. Invoicing and reconciliation that used to take a full day now happen almost on their own.',
    name: 'Maya Robinson',
    role: 'Founder, Fernleaf Studio',
    initials: 'MR',
  },
  {
    id: 't2',
    quote:
      'The real-time reports are a game changer. I can see exactly how the business is doing before I make any big decision.',
    name: 'Daniel Okafor',
    role: 'Owner, Northside Coffee',
    initials: 'DO',
  },
  {
    id: 't3',
    quote:
      'Payroll used to keep me up at night. Now it runs in a few clicks and the taxes are filed for me. I finally trust my books.',
    name: 'Priya Nair',
    role: 'Director, Bright Path Consulting',
    initials: 'PN',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'q1',
    question: 'Can I try QuickBooks before I buy?',
    answer:
      'Yes. Start a free 30-day trial with full access to every feature in your plan — no credit card required. You can also choose promotional pricing instead of the trial.',
  },
  {
    id: 'q2',
    question: 'Is my financial data secure?',
    answer:
      'Absolutely. Your data is protected with 128-bit SSL encryption, multi-factor authentication, and around-the-clock monitoring, the same standards trusted by leading financial institutions.',
  },
  {
    id: 'q3',
    question: 'Can I switch plans later?',
    answer:
      'You can upgrade or downgrade at any time from your account settings. Changes take effect immediately and your billing is prorated automatically.',
  },
  {
    id: 'q4',
    question: 'Does QuickBooks work on mobile?',
    answer:
      'Yes. The QuickBooks mobile app for iOS and Android lets you invoice, capture receipts, and check reports from anywhere, and everything syncs instantly with the web app.',
  },
  {
    id: 'q5',
    question: 'Do you offer support?',
    answer:
      'Every plan includes access to our help center, community, and product experts. Higher tiers add priority support and a dedicated onboarding specialist.',
  },
];

/** Brand names shown in the "trusted by" marquee (generic placeholders). */
export const TRUST_LOGOS: string[] = [
  'Northwind',
  'Fernleaf',
  'Brightpath',
  'Harborline',
  'Meadowbrook',
  'Cedar & Co',
  'Lumen',
  'Trailhead',
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: 'Products',
    links: [
      { label: 'Accounting', href: '#products' },
      { label: 'Invoicing', href: '#products' },
      { label: 'Payments', href: '#products' },
      { label: 'Payroll', href: '#products' },
      { label: 'Expenses', href: '#products' },
    ],
  },
  {
    heading: 'Solutions',
    links: [
      { label: 'For small business', href: '#features' },
      { label: 'For freelancers', href: '#features' },
      { label: 'For accountants', href: '#features' },
      { label: 'For nonprofits', href: '#features' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Blog', href: '#faq' },
      { label: 'Guides & tools', href: '#faq' },
      { label: 'Support center', href: '#faq' },
      { label: 'Community', href: '#faq' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Newsroom', href: '#' },
      { label: 'Contact', href: '#' },
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
