import { motion } from 'framer-motion';
import { Container, LinkButton, SectionHeading } from '@/components/ui';
import { IconArrowRight } from '@/components/icons';
import { FEATURE_ICONS, FEATURE_IMAGES } from '@/utils/constants';
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

        <div className="mt-7 flex justify-center">
          <LinkButton href="/about-us" variant="outline" className="group">
            Learn about Vantins
            <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </LinkButton>
        </div>

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
              image={FEATURE_IMAGES[i % FEATURE_IMAGES.length]}
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
  image,
}: {
  title: string;
  description: string;
  icon: IconComponent;
  image?: string;
}) {
  return (
    <motion.li
      variants={staggerItem}
      className="group relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-panel p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >
      {/* Industry photo (CSS background so a missing file just falls back to
          the dark panel — no broken-image icon). */}
      {image && (
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${import.meta.env.BASE_URL}${image})` }}
        />
      )}
      {/* Dark scrim: fully dark at the bottom (behind the copy) fading up so the
          photo shows through the top — same treatment as the trust cards. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(2,6,23,0.96)_0%,rgba(2,6,23,0.82)_42%,rgba(2,6,23,0.35)_100%)]"
      />

      <span className="relative grid h-12 w-12 place-items-center rounded-xl bg-white/10 text-brand-300 backdrop-blur-sm transition-colors group-hover:bg-brand-500 group-hover:text-white">
        <Icon className="h-6 w-6" />
      </span>
      <div className="relative mt-5">
        <h3 className="text-lg font-bold text-brand-300">{title}</h3>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-white/75">
          {description}
        </p>
      </div>
    </motion.li>
  );
}
