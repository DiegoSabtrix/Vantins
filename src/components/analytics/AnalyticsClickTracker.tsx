'use client';

import { useEffect } from 'react';
import { classifyCta, trackEvent } from '@/analytics';

/** Tracks CTA/link intent without ever sending form values or other PII. */
export function AnalyticsClickTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const node = event.target instanceof Element ? event.target.closest('a,button') : null;
      if (!(node instanceof HTMLAnchorElement) && !(node instanceof HTMLButtonElement)) return;

      const destination = node instanceof HTMLAnchorElement ? node.href : node.dataset.analyticsDestination || '';
      const isFormSubmit = node instanceof HTMLButtonElement && node.type === 'submit';
      const isExplicitCta = node.dataset.analyticsCta !== undefined;
      const isKnownDestination = Boolean(destination) && (/\/get-quote|^tel:|wa\.me|whatsapp|\/payment/.test(destination));
      if (!isFormSubmit && !isExplicitCta && !isKnownDestination) return;

      const label = (node.textContent || node.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim().slice(0, 120);
      trackEvent('cta_click', {
        cta_label: label || 'Unnamed CTA',
        cta_type: isFormSubmit ? 'form_submit' : classifyCta(destination),
        cta_destination: destination || undefined,
        page_path: window.location.pathname,
      });
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
