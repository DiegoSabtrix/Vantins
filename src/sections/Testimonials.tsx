import { motion } from 'framer-motion';
import { Container, SectionHeading, StarRating } from '@/components/ui';
import { TESTIMONIALS } from '@/utils/constants';
import { staggerContainer, staggerItem, viewportOnce } from '@/utils/motion';
import type { Testimonial } from '@/types';

export function Testimonials() {
  return (
    <section className="bg-surface py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Loved by business owners"
          title="Don't just take our word for it"
          description="See why millions of business owners trust QuickBooks to keep their finances on track."
        />

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-6 md:grid-cols-3"
        >
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <motion.li
      variants={staggerItem}
      className="flex h-full flex-col rounded-2xl border border-ink/10 bg-surface-sand p-7 shadow-sm"
    >
      <StarRating />
      <blockquote className="mt-4 flex-1 text-[1.05rem] leading-relaxed text-ink">
        “{testimonial.quote}”
      </blockquote>
      <div className="mt-6 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-500/15 text-sm font-bold text-brand-700">
          {testimonial.initials}
        </span>
        <div>
          <p className="text-sm font-bold text-ink">{testimonial.name}</p>
          <p className="text-xs text-ink-muted">{testimonial.role}</p>
        </div>
      </div>
    </motion.li>
  );
}
