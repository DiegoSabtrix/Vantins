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
 * Vantins coverage photos paired by index with FEATURE_ICONS and
 * `useT().features.items`. The filenames intentionally describe the coverage
 * and the commercial trucking search intent they support.
 */
export const FEATURE_IMAGES: string[] = [
  'assets/vantins-owner-operator-truck-insurance.webp', // Owner-Operator Insurance
  'assets/vantins-fleet-truck-insurance.webp', // Fleet Insurance
  'assets/vantins-motor-truck-cargo-insurance.webp', // Cargo Insurance
  'assets/vantins-physical-damage-truck-insurance.webp', // Physical Damage Coverage
  'assets/vantins-general-liability-commercial-auto-insurance.webp', // General Liability
  'assets/vantins-workers-compensation-trucking-insurance.webp', // Workers' Comp
];

/** Descriptive alt text keeps each coverage image useful to search and screen readers. */
export const FEATURE_IMAGE_ALTS: string[] = [
  'Vantins owner-operator truck insurance — driver standing beside a commercial semi truck',
  'Vantins fleet truck insurance — multiple commercial trucks lined up at a loading dock',
  'Vantins motor truck cargo insurance — commercial truck hauling shipping containers',
  'Vantins physical damage truck insurance — close-up of a commercial semi-truck headlight',
  'Vantins general liability insurance — commercial delivery van outside a business',
  'Vantins workers compensation insurance — commercial truck driver beside a fleet vehicle',
];
