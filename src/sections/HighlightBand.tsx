import { motion } from 'framer-motion';
import { Container, LinkButton } from '@/components/ui';
import { staggerContainer, staggerItem, viewportOnce } from '@/utils/motion';
import { useT } from '@/i18n';

/**
 * Dark two-card band directly under the hero: a customer testimonial
 * alongside a stat card.
 */
export function HighlightBand() {
  const t = useT();

  return (
    <section className="bg-black pb-16 pt-4 lg:pb-24" aria-label="Highlights">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-5 lg:grid-cols-2"
        >
          {/* Testimonial card */}
          <motion.figure
            variants={staggerItem}
            className="flex flex-col justify-between rounded-3xl border border-white/10 bg-panel p-8 lg:p-10"
          >
            <blockquote className="text-xl font-semibold leading-snug text-white text-balance lg:text-2xl">
              “{t.highlight.quote}”
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-500/20 text-sm font-bold text-brand-300">
                VC
              </span>
              <div>
                <p className="text-sm font-bold text-white">{t.highlight.name}</p>
                <p className="text-xs text-white/50">{t.highlight.role}</p>
              </div>
            </figcaption>
          </motion.figure>

          {/* Stat card with image background */}
          <motion.div
            variants={staggerItem}
            className="relative min-h-[340px] overflow-hidden rounded-3xl border border-white/10 bg-slate-900"
          >
            {/* Photo */}
            <img
              src={`${import.meta.env.BASE_URL}trucker.jpg`}
              alt="Insurance professional"
              className="absolute inset-0 h-full w-full object-cover object-right"
            />
            {/* Dark scrims: horizontal for the copy on the left, extra at the
                bottom so the button stays legible over the photo. */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/25"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent"
            />
            {/* Content */}
            <div className="relative flex h-full flex-col justify-between p-8 lg:p-10">
              <p className="max-w-sm text-xl font-semibold leading-snug text-white text-balance lg:text-2xl">
                <span className="text-gradient-qb">{t.highlight.statHighlight}</span>{' '}
                {t.highlight.statRest}
              </p>
              <div className="mt-8">
                <LinkButton href="#pricing" size="lg">
                  {t.highlight.cta}
                </LinkButton>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
