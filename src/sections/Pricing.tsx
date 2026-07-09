import { useId } from 'react';
import { motion } from 'framer-motion';
import { Container, SectionHeading, LinkButton } from '@/components/ui';
import { IconCheck } from '@/components/icons';
import { staggerContainer, staggerItem, viewportOnce } from '@/utils/motion';
import { useT } from '@/i18n';
import { cn } from '@/utils/cn';

interface CoverageProduct {
  name: string;
  tagline: string;
  features: string[];
  featured?: boolean;
}

export function Pricing() {
  const t = useT();

  return (
    <section id="pricing" className="bg-surface-subtle py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow={t.pricing.eyebrow}
          title={t.pricing.title}
          description={t.pricing.description}
        />

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-3"
        >
          {t.pricing.items.map((tier, i) => (
            <PricingCard
              key={i}
              tier={tier}
              cta={t.pricing.cta}
              recommended={t.pricing.recommended}
            />
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}

function PricingCard({
  tier,
  cta,
  recommended,
}: {
  tier: CoverageProduct;
  cta: string;
  recommended: string;
}) {
  const headingId = useId();

  return (
    <motion.li
      variants={staggerItem}
      aria-labelledby={headingId}
      className={cn(
        'relative flex h-full flex-col rounded-3xl border bg-white p-7 shadow-sm transition-shadow',
        tier.featured
          ? 'border-brand-500 shadow-card ring-1 ring-brand-500'
          : 'border-ink/10 hover:shadow-card',
      )}
    >
      {tier.featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-sm">
          {recommended}
        </span>
      )}

      <h3 id={headingId} className="text-lg font-bold text-ink">
        {tier.name}
      </h3>
      <p className="mt-1 text-sm text-ink-soft">{tier.tagline}</p>

      <ul className="mt-6 space-y-3">
        {tier.features.map((feature, fi) => (
          <li key={fi} className="flex items-start gap-2.5 text-sm text-ink">
            <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <LinkButton
        href="#"
        variant={tier.featured ? 'primary' : 'outline'}
        fullWidth
        className="mt-7"
      >
        {cta}
      </LinkButton>
    </motion.li>
  );
}
