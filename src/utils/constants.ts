import {
  IconBank,
  IconChart,
  IconInvoice,
  IconReceipt,
  IconShield,
  IconUsers,
} from '@/components/icons';
import type { IconComponent } from '@/types';

/** Sales phone shown in the navbar (display form). */
export const SALES_PHONE = '+1 (754) 290-0308';
/** Same number in a dialable form for `tel:` links. */
export const SALES_PHONE_TEL = '+17542900308';

/**
 * Icons paired by index with the localized feature list (see `useT().features`).
 * Kept here because icon components can't live in the translation data.
 */
export const FEATURE_ICONS: IconComponent[] = [
  IconChart, // Owner-Operator Insurance
  IconShield, // Fleet Insurance
  IconBank, // Cargo Insurance
  IconInvoice, // Physical Damage Coverage
  IconUsers, // General Liability
  IconReceipt, // Workers' Comp
];

/**
 * Background photo for each feature card, paired by index with FEATURE_ICONS
 * and `useT().features.items`. Files live in `public/` — drop a matching image
 * in to light up a card; if a file is missing the card gracefully falls back to
 * the dark panel background.
 */
export const FEATURE_IMAGES: string[] = [
  'feature-auto.jpg', // Owner-Operator Insurance
  'feature-home.jpg', // Fleet Insurance
  'feature-commercial.jpg', // Cargo Insurance
  'feature-truck.jpg', // Physical Damage Coverage
  'feature-life.jpg', // General Liability
  'feature-health.jpg', // Workers' Comp
];

/** Original color marks supplied by Vantins; viewBox trims source-image padding. */
export const TRUST_LOGOS = [
  { name: 'Progressive Commercial', src: '/assets/carriers/progressive-commercial.png', viewBox: '86 58 574 115', width: 738, height: 210 },
  { name: 'Diesel Insurance', src: '/assets/carriers/diesel-insurance.png', viewBox: '0 47 363 123', width: 363, height: 216 },
  { name: 'THREE by Berkshire Hathaway', src: '/assets/carriers/three-berkshire.png', viewBox: '2 33 404 150', width: 406, height: 216 },
  { name: 'Bristol West', src: '/assets/carriers/bristol-west.png', viewBox: '0 45 510 126', width: 510, height: 216 },
  { name: 'Cover Whale', src: '/assets/carriers/cover-whale.jpg', viewBox: '47 368 1955 336', width: 2048, height: 1072 },
];
