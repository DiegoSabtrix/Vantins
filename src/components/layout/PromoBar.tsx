import { LinkButton } from '@/components/ui';
import { useT } from '@/i18n';
import { LanguageToggle } from './LanguageToggle';

/**
 * Deep-navy announcement bar pinned above the navbar, with the promo copy
 * and the EN/ES language switch on the right.
 */
export function PromoBar() {
  const t = useT();

  return (
    <div className="bg-navy text-white">
      <div className="container-px relative flex flex-wrap items-center justify-center gap-x-5 gap-y-2 py-2.5 text-center text-sm sm:text-[0.95rem]">
        <p className="font-semibold">
          {t.promo.pre}{' '}
          <span className="text-brand-400">{t.promo.highlight}</span> {t.promo.post}
        </p>
        <LinkButton href="#pricing" variant="primary" size="sm">
          {t.promo.cta}
        </LinkButton>

        <LanguageToggle className="sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2" />
      </div>
    </div>
  );
}
