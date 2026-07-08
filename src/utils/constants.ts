import {
  IconBank,
  IconChart,
  IconInvoice,
  IconReceipt,
  IconShield,
  IconUsers,
} from '@/components/icons';
import type { IconComponent } from '@/types';

/** Sales phone shown in the navbar. */
export const SALES_PHONE = '1-844-463-1636';

/**
 * Icons paired by index with the localized feature list (see `useT().features`).
 * Kept here because icon components can't live in the translation data.
 */
export const FEATURE_ICONS: IconComponent[] = [
  IconChart, // Auto
  IconShield, // Home
  IconBank, // Commercial
  IconInvoice, // Commercial Truck
  IconUsers, // Life
  IconReceipt, // Health
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
