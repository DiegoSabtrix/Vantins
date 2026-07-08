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
            {/* Scrim that darkens only the left third (behind the copy) and
                clears toward the right so the person stays visible. */}
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(to_right,rgba(2,6,23,0.9)_0%,rgba(2,6,23,0.55)_38%,rgba(2,6,23,0.1)_68%,rgba(2,6,23,0)_100%)]"
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
