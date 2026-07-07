import { motion } from 'framer-motion';
import { Container, SectionHeading } from '@/components/ui';
import { FEATURES } from '@/utils/constants';
import { staggerContainer, staggerItem, viewportOnce } from '@/utils/motion';
import type { Feature } from '@/types';

export function Features() {
  return (
    <section id="features" className="bg-surface py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Everything you need"
          title="One place to manage all the moving parts"
          description="From your first invoice to payroll and taxes, QuickBooks brings your finances together so nothing slips through the cracks."
        />

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  const { icon: Icon, title, description } = feature;
  return (
    <motion.li
      variants={staggerItem}
      className="group rounded-2xl border border-ink/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-card-hover"
    >
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent-mint text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
        <Icon className="h-6 w-6" />
      </span>
      <h3 className="mt-5 text-lg font-bold text-ink">{title}</h3>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">
        {description}
      </p>
    </motion.li>
  );
}
