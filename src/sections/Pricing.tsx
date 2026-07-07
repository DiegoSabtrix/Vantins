import { useId, useState } from 'react';
import { motion } from 'framer-motion';
import { Container, SectionHeading, LinkButton } from '@/components/ui';
import { IconCheck } from '@/components/icons';
import { PRICING_TIERS } from '@/utils/constants';
import { staggerContainer, staggerItem, viewportOnce } from '@/utils/motion';
import type { PricingTier } from '@/types';
import { cn } from '@/utils/cn';

type BillingMode = 'promo' | 'standard';

export function Pricing() {
  const [mode, setMode] = useState<BillingMode>('promo');

  return (
    <section id="pricing" className="bg-surface-subtle py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Simple, transparent pricing"
          title="Choose the plan that fits your business"
          description="Start with a 30-day free trial or save big with promotional pricing. Switch plans or cancel anytime."
        />

        <div className="mt-8 flex justify-center">
          <BillingToggle mode={mode} onChange={setMode} />
        </div>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-3"
        >
          {PRICING_TIERS.map((tier) => (
            <PricingCard key={tier.id} tier={tier} mode={mode} />
          ))}
        </motion.ul>

        <p className="mt-8 text-center text-sm text-ink-muted">
          Prices shown in USD. Promotional pricing applies for the first 3 months,
          then the standard monthly rate applies.
        </p>
      </Container>
    </section>
  );
}

function BillingToggle({
  mode,
  onChange,
}: {
  mode: BillingMode;
  onChange: (mode: BillingMode) => void;
}) {
  const options: { value: BillingMode; label: string }[] = [
    { value: 'promo', label: 'Promo (save 70%)' },
    { value: 'standard', label: 'Standard' },
  ];

  return (
    <div
      role="tablist"
      aria-label="Billing option"
      className="relative inline-flex rounded-full border border-ink/10 bg-white p-1 shadow-sm"
    >
      {options.map((opt) => {
        const active = mode === opt.value;
        return (
          <button
            key={opt.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.value)}
            className={cn(
              'relative z-10 rounded-full px-4 py-2 text-sm font-semibold transition-colors',
              active ? 'text-white' : 'text-ink-soft hover:text-ink',
            )}
          >
            {active && (
              <motion.span
                layoutId="billing-pill"
                className="absolute inset-0 -z-10 rounded-full bg-brand-500"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function PricingCard({ tier, mode }: { tier: PricingTier; mode: BillingMode }) {
  const headingId = useId();
  const price = mode === 'promo' ? tier.promoPrice : tier.price;

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
          Most popular
        </span>
      )}

      <h3 id={headingId} className="text-lg font-bold text-ink">
        {tier.name}
      </h3>
      <p className="mt-1 text-sm text-ink-soft">{tier.tagline}</p>

      <div className="mt-5 flex items-end gap-1">
        <span className="text-4xl font-extrabold tracking-tight text-ink">
          ${price}
        </span>
        <span className="mb-1 text-sm text-ink-muted">/mo</span>
      </div>
      {mode === 'promo' && (
        <p className="mt-1 text-sm text-ink-muted">
          <span className="line-through">${tier.price}</span> for the first 3 months
        </p>
      )}

      <LinkButton
        href="#"
        variant={tier.featured ? 'primary' : 'outline'}
        fullWidth
        className="mt-6"
      >
        Start free trial
      </LinkButton>

      <ul className="mt-7 space-y-3">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-ink">
            <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </motion.li>
  );
}
