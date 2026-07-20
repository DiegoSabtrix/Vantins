import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Container, LinkButton } from '@/components/ui';
import { IconArrowRight, IconCheck } from '@/components/icons';
import { EASE_OUT_EXPO, fadeUp, viewportOnce } from '@/utils/motion';
import { useT } from '@/i18n';

export function ProductShowcase() {
  const t = useT();
  const items = t.products.items;
  const [active, setActive] = useState(0);
  const item = items[active] ?? items[0];

  return (
    <section id="products" className="bg-surface-dark py-20 text-white lg:py-28">
      <Container>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-display-md text-balance">{t.products.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/65 text-pretty">
            {t.products.subtitle}
          </p>
          <LinkButton href="/get-quote" size="lg" className="group mt-7">
            {t.products.cta}
            <IconArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </LinkButton>
        </motion.div>

        {/* Dark panel: vertical tab rail + content */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-6 rounded-3xl border border-white/10 bg-panel p-4 sm:p-6 lg:grid-cols-[15rem_1fr] lg:gap-8 lg:p-8"
        >
          {/* Tab rail */}
          <ul className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
            {items.map((h, i) => {
              const isActive = i === active;
              return (
                <li key={i} className="shrink-0 lg:shrink">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    className={
                      'w-full whitespace-nowrap rounded-xl px-4 py-3 text-left text-sm font-semibold transition-colors ' +
                      (isActive
                        ? 'bg-white/10 text-white'
                        : 'text-white/55 hover:bg-white/5 hover:text-white')
                    }
                  >
                    {h.tab}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Content */}
          <div className="rounded-2xl bg-black/40 p-6 lg:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                className="grid items-start gap-8 lg:grid-cols-2"
              >
                <div>
                  <h3 className="text-2xl font-bold text-balance">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-white/65 text-pretty">
                    {item.description}
                  </p>
                  <LinkButton href="#pricing" size="lg" className="group mt-7">
                    {t.products.panelCta}
                    <IconArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                  </LinkButton>
                </div>

                {/* Included coverages */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <p className="text-sm font-semibold text-brand-300">
                    {t.products.coveragesLabel}
                  </p>
                  <ul className="mt-4 space-y-3">
                    {item.bullets.map((bullet, bi) => (
                      <li key={bi} className="flex items-center gap-3">
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-500/20 text-brand-300">
                          <IconCheck className="h-3.5 w-3.5" />
                        </span>
                        <span className="text-sm font-medium text-white/85">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
