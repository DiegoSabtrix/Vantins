import { motion } from 'framer-motion';
import { Container, LinkButton } from '@/components/ui';
import { IconArrowRight } from '@/components/icons';
import { fadeUp, viewportOnce } from '@/utils/motion';

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-navy-deep text-white">
      <Container className="py-20 text-center lg:py-28">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-2xl"
        >
          <h2 className="text-display-md text-balance">
            Trusted by millions of businesses worldwide
            <span className="align-super text-base text-white/50">7</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/70 text-pretty">
            Join the businesses saving time and growing with confidence on the
            QuickBooks platform.
          </p>

          <div className="mt-8 flex justify-center">
            <LinkButton href="#pricing" size="lg" className="group">
              See plans &amp; pricing
              <IconArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </LinkButton>
          </div>
        </motion.div>
      </Container>

      {/* Blue → green divider bar, like the real page */}
      <div aria-hidden className="bg-gradient-bar h-1.5 w-full" />
    </section>
  );
}
