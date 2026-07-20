import { motion } from 'framer-motion';
import { Container, LinkButton } from '@/components/ui';
import { IconArrowRight } from '@/components/icons';
import { fadeUp, viewportOnce } from '@/utils/motion';
import { useT } from '@/i18n';

export function CtaBanner() {
  const t = useT();

  return (
    <section className="relative isolate overflow-hidden bg-navy-deep text-white">
      <video
        aria-hidden
        className="absolute inset-0 -z-30 h-full w-full object-cover opacity-65"
        src="/assets/protection-truck-background.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[#0a2b50]/60"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(35,88,137,.12),rgba(3,22,43,.38)_78%)]"
      />

      <Container className="relative py-20 text-center lg:py-28">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-2xl drop-shadow-[0_2px_18px_rgba(0,0,0,0.35)]"
        >
          <h2 className="text-display-md text-balance">{t.finalCta.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/70 text-pretty">
            {t.finalCta.subtitle}
          </p>

          <div className="mt-8 flex justify-center">
            <LinkButton href="/get-quote" size="lg" className="group">
              {t.finalCta.cta}
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
