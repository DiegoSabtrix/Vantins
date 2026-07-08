import { motion } from 'framer-motion';
import { Container, SectionHeading, StarRating } from '@/components/ui';
import { staggerContainer, staggerItem, viewportOnce } from '@/utils/motion';
import { useT } from '@/i18n';

export function Testimonials() {
  const t = useT();

  return (
    <section className="bg-surface py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow={t.testimonials.eyebrow}
          title={t.testimonials.title}
          description={t.testimonials.description}
        />

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-6 md:grid-cols-3"
        >
          {t.testimonials.items.map((item) => (
            <motion.li
              key={item.name}
              variants={staggerItem}
              className="flex h-full flex-col rounded-2xl border border-ink/10 bg-surface-sand p-7 shadow-sm"
            >
              <StarRating />
              <blockquote className="mt-4 flex-1 text-[1.05rem] leading-relaxed text-ink">
                “{item.quote}”
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-500/15 text-sm font-bold text-brand-700">
                  {item.initials}
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">{item.name}</p>
                  <p className="text-xs text-ink-muted">{item.role}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
