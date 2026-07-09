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
          {/* Testimonial card: full-bleed photo with the copy over a dark
              left-to-right gradient (photo stays bright on the right). */}
          <motion.figure
            variants={staggerItem}
            className="relative min-h-[360px] overflow-hidden rounded-3xl border border-white/10 bg-slate-950"
          >
            <img
              src={`${import.meta.env.BASE_URL}driver.jpg`}
              alt="Professional truck driver"
              className="absolute inset-0 h-full w-full -scale-x-100 object-cover object-center"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.72)_34%,rgba(0,0,0,0.32)_58%,rgba(0,0,0,0)_80%)]"
            />
            <div className="relative flex h-full flex-col justify-between p-8 lg:p-10">
              <blockquote className="max-w-[62%] text-xl font-semibold leading-snug text-white text-balance lg:text-2xl">
                “{t.highlight.quote}”
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-500/20 text-sm font-bold text-brand-300">
                  VC
                </span>
                <div>
                  <p className="text-sm font-bold text-white">{t.highlight.name}</p>
                  <p className="text-xs text-white/60">{t.highlight.role}</p>
                </div>
              </figcaption>
            </div>
          </motion.figure>

          {/* Stat card: same full-bleed photo + dark left gradient treatment. */}
          <motion.div
            variants={staggerItem}
            className="relative min-h-[360px] overflow-hidden rounded-3xl border border-white/10 bg-slate-950"
          >
            <img
              src={`${import.meta.env.BASE_URL}trucker.jpg`}
              alt="Insurance professional"
              className="absolute inset-0 h-full w-full object-cover object-[72%_center]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.72)_34%,rgba(0,0,0,0.32)_58%,rgba(0,0,0,0)_80%)]"
            />
            <div className="relative flex h-full flex-col justify-between p-8 lg:p-10">
              <p className="max-w-[62%] text-xl font-semibold leading-snug text-white text-balance lg:text-2xl">
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
