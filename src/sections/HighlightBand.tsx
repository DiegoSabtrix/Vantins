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

          {/* Stat card: copy on a solid dark panel, bright photo alongside */}
          <motion.div
            variants={staggerItem}
            className="flex min-h-[340px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-panel-teal sm:flex-row"
          >
            {/* Copy */}
            <div className="flex flex-col justify-between p-8 sm:w-[58%] lg:p-10">
              <p className="text-xl font-semibold leading-snug text-white text-balance lg:text-2xl">
                <span className="text-gradient-qb">{t.highlight.statHighlight}</span>{' '}
                {t.highlight.statRest}
              </p>
              <div className="mt-8">
                <LinkButton href="#pricing" size="lg">
                  {t.highlight.cta}
                </LinkButton>
              </div>
            </div>
            {/* Bright photo — no dark overlay */}
            <div className="relative min-h-[180px] flex-1">
              <img
                src={`${import.meta.env.BASE_URL}trucker.jpg`}
                alt="Insurance professional"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
