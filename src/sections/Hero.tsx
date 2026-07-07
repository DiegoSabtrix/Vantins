import { motion } from 'framer-motion';
import { Container, LinkButton, Badge } from '@/components/ui';
import { BrowserFrame } from '@/components/visuals/BrowserFrame';
import { DashboardMock } from '@/components/visuals/DashboardMock';
import { IconArrowRight, IconCheck, IconSparkle } from '@/components/icons';
import { fadeUp, staggerContainer, staggerItem, EASE_OUT_EXPO } from '@/utils/motion';

const HERO_PROOF = [
  'No credit card required',
  '30-day free trial',
  'Cancel anytime',
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-brand-radial">
      <Container className="grid items-center gap-12 py-16 lg:grid-cols-2 lg:gap-8 lg:py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-xl"
        >
          <motion.div variants={staggerItem}>
            <Badge icon={<IconSparkle className="h-3.5 w-3.5" />}>
              New · AI-powered insights
            </Badge>
          </motion.div>

          <motion.h1
            variants={staggerItem}
            className="mt-5 text-display-xl text-balance text-ink"
          >
            Smart tools to{' '}
            <span className="text-brand-500">run your business</span>, all in one
            place
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="mt-5 text-lg leading-relaxed text-ink-soft text-pretty sm:text-xl"
          >
            Track income and expenses, send invoices, manage payroll, and see how
            your business is doing — anytime, anywhere. Join over 7 million
            businesses growing with QuickBooks.
          </motion.p>

          <motion.div
            variants={staggerItem}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <LinkButton href="#pricing" size="lg" className="group">
              Start free trial
              <IconArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </LinkButton>
            <LinkButton href="#products" size="lg" variant="outline">
              See how it works
            </LinkButton>
          </motion.div>

          <motion.ul
            variants={staggerItem}
            className="mt-7 flex flex-wrap gap-x-6 gap-y-2"
          >
            {HERO_PROOF.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-ink-soft">
                <IconCheck className="h-4 w-4 text-brand-500" />
                {item}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Hero visual */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.15 }}
          className="relative"
        >
          <div
            aria-hidden
            className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-brand-100/60 to-accent-sky/50 blur-2xl"
          />
          <BrowserFrame>
            <DashboardMock />
          </BrowserFrame>

          {/* Floating accent chip */}
          <motion.div
            className="absolute -bottom-5 -left-4 hidden items-center gap-2.5 rounded-2xl border border-ink/10 bg-white px-4 py-3 shadow-float sm:flex"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6, ease: EASE_OUT_EXPO }}
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-500 text-white">
              <IconCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-ink">$26,310 profit</p>
              <p className="text-xs text-ink-muted">Up 18% this month</p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
