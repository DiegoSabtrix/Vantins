import { motion } from 'framer-motion';
import { Container, LinkButton } from '@/components/ui';
import { IconArrowRight, IconCheck } from '@/components/icons';
import { fadeUp, viewportOnce } from '@/utils/motion';

const POINTS = ['30-day free trial', 'No credit card needed', 'Cancel anytime'];

export function CtaBanner() {
  return (
    <section className="bg-surface pb-20 lg:pb-28">
      <Container>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative overflow-hidden rounded-4xl bg-brand-600 px-6 py-14 text-center text-white sm:px-12 lg:py-20"
        >
          {/* Decorative glows */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-0 opacity-60"
            style={{
              backgroundImage:
                'radial-gradient(600px 300px at 15% 0%, rgba(255,255,255,0.22), transparent 60%), radial-gradient(600px 400px at 90% 100%, rgba(11,46,8,0.5), transparent 60%)',
            }}
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-display-md text-balance">
              Ready to take control of your business finances?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/85 text-pretty">
              Get set up in minutes and see why 7 million businesses choose
              QuickBooks to save time and grow with confidence.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <LinkButton
                href="#pricing"
                size="lg"
                variant="secondary"
                className="group !bg-white !text-brand-700 hover:!bg-white/90"
              >
                Start free trial
                <IconArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
              </LinkButton>
              <LinkButton
                href="#"
                size="lg"
                variant="outline"
                className="!border-white/40 !bg-transparent !text-white hover:!bg-white/10"
              >
                Talk to sales
              </LinkButton>
            </div>

            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {POINTS.map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm text-white/85">
                  <IconCheck className="h-4 w-4" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
