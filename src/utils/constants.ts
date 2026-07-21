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
