import { motion } from 'framer-motion';
import { Container, LinkButton } from '@/components/ui';
import { staggerContainer, staggerItem, viewportOnce } from '@/utils/motion';

/**
 * Dark two-card band directly under the hero, mirroring the real homepage:
 * a customer testimonial alongside a teal stat card.
 */
export function HighlightBand() {
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
              “Vantins helped me compare multiple insurance companies and explained
              every option before I made a decision. The process was simple and
              stress-free.”
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-500/20 text-sm font-bold text-brand-300">
                VC
              </span>
              <div>
                <p className="text-sm font-bold text-white">Vantins Client</p>
                <p className="text-xs text-white/50">Verified customer</p>
              </div>
            </figcaption>
          </motion.figure>

          {/* Stat card */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col justify-between rounded-3xl bg-panel-teal p-8 lg:p-10"
          >
            <p className="text-xl font-semibold leading-snug text-white text-balance lg:text-2xl">
              <span className="text-gradient-qb">Thousands</span> of families and
              businesses trust Vantins to simplify insurance with expert guidance
              and access to leading insurance carriers.
            </p>
            <div className="mt-8">
              <LinkButton href="#pricing" size="lg">
                Get Your Free Quote
              </LinkButton>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
