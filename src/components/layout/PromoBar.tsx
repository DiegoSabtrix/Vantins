import { LinkButton } from '@/components/ui';

/**
 * Deep-navy announcement bar pinned above the navbar, matching the
 * "Get 50% OFF …" promo strip on quickbooks.intuit.com.
 */
export function PromoBar() {
  return (
    <div className="bg-navy text-white">
      <div className="container-px flex flex-wrap items-center justify-center gap-x-5 gap-y-2 py-2.5 text-center text-sm sm:text-[0.95rem]">
        <p className="font-semibold">
          Get your <span className="text-brand-400">free insurance quote</span> today
        </p>
        <LinkButton href="#pricing" variant="primary" size="sm">
          Get a quote
        </LinkButton>
      </div>
    </div>
  );
}
