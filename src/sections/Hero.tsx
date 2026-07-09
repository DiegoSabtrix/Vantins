import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Container, LinkButton } from '@/components/ui';
import { IconArrowRight, IconSparkle } from '@/components/icons';
import { EASE_OUT_EXPO } from '@/utils/motion';
import { useMediaQuery } from '@/hooks';
import { useT } from '@/i18n';

export function Hero() {
  const t = useT();
  const words = t.hero.words;
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      2200,
    );
    return () => window.clearInterval(id);
  }, [reduceMotion, words.length]);

  const word = words[index % words.length];

  return (
    <section id="top" className="bg-hero-dark text-white">
      {/* Extra bottom padding leaves dark room for the floating cards that the
          next section pulls up into via negative margin. */}
      <Container className="flex min-h-[56vh] flex-col items-center justify-center gap-8 pt-20 pb-56 text-center lg:pt-24 lg:pb-64">
        {/* AI assistant prompt pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          className="flex items-center gap-3 rounded-full border border-white/15 bg-white/5 py-2 pl-4 pr-2 text-sm text-white/80 backdrop-blur"
        >
          <IconSparkle className="h-4 w-4 text-brand-300" />
          <span>{t.hero.pill}</span>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white">
            <IconArrowRight className="h-4 w-4" />
          </span>
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-300"
        >
          {t.hero.eyebrow}
        </motion.p>

        {/* Cycling gradient headline (line of coverage) */}
        <h1 className="font-extrabold leading-[0.95] tracking-tight">
          <span className="sr-only">Vantins — {word}</span>
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

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT_EXPO }}
          className="max-w-2xl space-y-3"
        >
          <p className="text-2xl font-bold text-white sm:text-3xl">
            {t.hero.headline}
          </p>
          <p className="mx-auto max-w-xl text-lg text-white/70 text-pretty">
            {t.hero.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE_OUT_EXPO }}
        >
          <LinkButton href="#pricing" size="lg" className="group">
            {t.hero.cta}
            <IconArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </LinkButton>
        </motion.div>
      </Container>
    </section>
  );
}
