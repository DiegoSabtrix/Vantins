import { motion } from 'framer-motion';
import { Container, SectionHeading } from '@/components/ui';
import { FEATURE_ICONS } from '@/utils/constants';
import { staggerContainer, staggerItem, viewportOnce } from '@/utils/motion';
import { useT } from '@/i18n';
import type { IconComponent } from '@/types';

export function Features() {
  const t = useT();

  return (
    <section id="features" className="bg-surface py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow={t.features.eyebrow}
          title={t.features.title}
          description={t.features.description}
        />

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {t.features.items.map((feature, i) => (
            <FeatureCard
              key={i}
              title={feature.title}
              description={feature.description}
              icon={FEATURE_ICONS[i % FEATURE_ICONS.length]}
            />
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}

function FeatureCard({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: IconComponent;
}) {
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
