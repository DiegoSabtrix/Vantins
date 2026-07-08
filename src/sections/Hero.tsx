import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Container, LinkButton } from '@/components/ui';
import { IconArrowRight, IconSparkle } from '@/components/icons';
import { HERO_WORDS } from '@/utils/constants';
import { EASE_OUT_EXPO } from '@/utils/motion';
import { useMediaQuery } from '@/hooks';

export function Hero() {
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % HERO_WORDS.length),
      2200,
    );
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const word = HERO_WORDS[index];

  return (
    <section id="top" className="bg-hero-dark text-white">
      <Container className="flex min-h-[75vh] flex-col items-center justify-center gap-8 py-20 text-center lg:py-28">
        {/* AI assistant prompt pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          className="flex items-center gap-3 rounded-full border border-white/15 bg-white/5 py-2 pl-4 pr-2 text-sm text-white/80 backdrop-blur"
        >
          <IconSparkle className="h-4 w-4 text-brand-300" />
          <span>How do I track my expenses?</span>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white">
            <IconArrowRight className="h-4 w-4" />
          </span>
        </motion.div>

        {/* Cycling gradient headline */}
        <h1 className="font-extrabold leading-[0.95] tracking-tight">
          <span className="sr-only">QuickBooks — {word}</span>
          <span
            aria-hidden
            className="block text-[clamp(3rem,9vw,8rem)]"
            style={{ minHeight: '1.1em' }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={word}
                initial={reduceMotion ? false : { opacity: 0, y: 24, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -24, filter: 'blur(8px)' }}
                transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                className="text-gradient-qb inline-block"
              >
                {word}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT_EXPO }}
          className="max-w-xl text-lg text-white/70 text-pretty"
        >
          Smart tools to run your business — accounting, payments, payroll, and
          insights, powered by intelligent automation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE_OUT_EXPO }}
        >
          <LinkButton href="#pricing" size="lg" className="group">
            See plans &amp; pricing
            <IconArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </LinkButton>
        </motion.div>
      </Container>
    </section>
  );
}
