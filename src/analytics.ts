export const GA_MEASUREMENT_ID = 'G-8E0Z9TD179';

type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Sends a privacy-safe event only after GA4 has loaded in the browser. */
export function trackEvent(name: string, params: AnalyticsParams = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}

export function classifyCta(destination: string) {
  const value = destination.toLowerCase();
  if (value.includes('/get-quote')) return 'quote';
  if (value.startsWith('tel:')) return 'phone';
  if (value.includes('wa.me') || value.includes('whatsapp')) return 'whatsapp';
  if (value.includes('/payment')) return 'payment';
  return 'other';
}
