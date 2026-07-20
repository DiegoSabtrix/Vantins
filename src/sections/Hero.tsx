import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Container, LinkButton } from '@/components/ui';
import { IconArrowRight, IconSparkle } from '@/components/icons';
import { EASE_OUT_EXPO } from '@/utils/motion';
import { useMediaQuery } from '@/hooks';
import { useT } from '@/i18n';

const heroVideos = [
  {
    src: '/assets/hero-trucks-rest-area.mp4',
    label: 'Freight operations',
  },
  {
    src: '/assets/hero-truck-aerial.mp4',
    label: 'Transportation in motion',
  },
];

export function Hero() {
  const t = useT();
  const words = t.hero.words;
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [index, setIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      2200,
    );
    return () => window.clearInterval(id);
  }, [reduceMotion, words.length]);

  const word = words[index % words.length];
  const showNextVideo = () => {
    setActiveVideo((current) => (current + 1) % heroVideos.length);
  };

  return (
    <section
      id="top"
      className="relative isolate min-h-[72vh] overflow-hidden bg-[#050706] text-white"
    >
      <div className="absolute inset-0 -z-30 bg-black" aria-hidden>
        <AnimatePresence initial={false}>
          <motion.video
            key={heroVideos[activeVideo].src}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.1 }, scale: { duration: 8 } }}
            src={heroVideos[activeVideo].src}
            autoPlay={!reduceMotion}
            muted
            playsInline
            preload="auto"
            onEnded={showNextVideo}
          />
        </AnimatePresence>
      </div>

      <div
        className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(2,5,4,.94)_0%,rgba(2,5,4,.76)_40%,rgba(2,5,4,.34)_72%,rgba(2,5,4,.58)_100%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,0,0,.56)_0%,transparent_35%,rgba(0,0,0,.82)_100%)]"
        aria-hidden
      />

      <Container className="flex min-h-[72vh] flex-col items-start justify-center gap-6 pb-24 pt-28 text-left lg:min-h-[78vh] lg:pb-28 lg:pt-32">
        {/* AI assistant prompt pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          className="flex items-center gap-3 rounded-full border border-white/20 bg-black/20 py-2 pl-4 pr-2 text-sm text-white/85 shadow-lg backdrop-blur-md"
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
        <h1 className="max-w-5xl font-extrabold leading-[0.95] tracking-tight">
          <span className="sr-only">Vantins — {word}</span>
          <span
            aria-hidden
            className="block text-[clamp(3.2rem,8vw,7.5rem)]"
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
          <p className="max-w-xl text-lg text-white/75 text-pretty">
            {t.hero.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE_OUT_EXPO }}
        >
          <LinkButton href="/get-quote" size="lg" className="group">
            {t.hero.cta}
            <IconArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </LinkButton>
        </motion.div>
      </Container>

      <div className="absolute bottom-7 right-5 z-10 flex items-center gap-3 sm:right-8 lg:right-12">
        <span className="hidden text-xs font-semibold uppercase tracking-[0.16em] text-white/60 sm:block">
          {heroVideos[activeVideo].label}
        </span>
        <div className="flex gap-2" role="tablist" aria-label="Hero videos">
          {heroVideos.map((video, videoIndex) => (
            <button
              key={video.src}
              type="button"
              role="tab"
              aria-selected={activeVideo === videoIndex}
              aria-label={`Show ${video.label}`}
              onClick={() => setActiveVideo(videoIndex)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                activeVideo === videoIndex
                  ? 'w-10 bg-brand-400'
                  : 'w-5 bg-white/35 hover:bg-white/65'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
