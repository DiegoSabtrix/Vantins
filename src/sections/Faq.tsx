import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Container, SectionHeading } from '@/components/ui';
import { IconMinus, IconPlus } from '@/components/icons';
import { EASE_OUT_EXPO } from '@/utils/motion';
import { useT } from '@/i18n';

interface QA {
  question: string;
  answer: string;
}

export function Faq() {
  const t = useT();
  const [openId, setOpenId] = useState<number>(0);

  return (
    <section id="faq" className="bg-surface py-20 lg:py-28">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} />

        <div className="mt-12 divide-y divide-ink/10 border-y border-ink/10">
          {t.faq.items.map((item, i) => (
            <AccordionRow
              key={i}
              item={item}
              index={i}
              open={openId === i}
              onToggle={() => setOpenId((cur) => (cur === i ? -1 : i))}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function AccordionRow({
  item,
  index,
  open,
  onToggle,
}: {
  item: QA;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div>
      <h3>
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-center justify-between gap-4 py-5 text-left"
        >
          <span className="text-base font-semibold text-ink sm:text-lg">
            {item.question}
          </span>
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface-subtle text-ink-soft">
            {open ? (
              <IconMinus className="h-4 w-4" />
            ) : (
              <IconPlus className="h-4 w-4" />
            )}
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: EASE_OUT_EXPO }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-12 text-[0.95rem] leading-relaxed text-ink-soft">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
