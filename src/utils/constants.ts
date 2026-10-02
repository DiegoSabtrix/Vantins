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
/** Company WhatsApp deep link used by the Help & Support page. */
export const WHATSAPP_HREF = 'https://wa.me/14704724895';

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
  'assets/services-truck-clean.webp', // Owner-Operator Insurance
  'truck-driver-services.jpg', // Fleet Insurance
  'trucker.jpg', // Cargo Insurance
  'assets/services-dashboard.jpg', // Physical Damage Coverage
  'driver.jpg', // General Liability
  'assets/about-advisors.webp', // Workers' Comp
];
