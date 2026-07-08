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
          eyebrow="Intuit platform"
          title="More accuracy, better financial outcomes"
          description="Intelligent tools handle the busywork — categorizing transactions, chasing payments, and surfacing insights — so your books stay accurate and your decisions get sharper."
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
      className="group rounded-2xl bg-panel p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/10 text-brand-300 transition-colors group-hover:bg-brand-500 group-hover:text-white">
        <Icon className="h-6 w-6" />
      </span>
      <h3 className="mt-5 text-lg font-bold text-brand-300">{title}</h3>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-white/65">
        {description}
      </p>
    </motion.li>
  );
}
