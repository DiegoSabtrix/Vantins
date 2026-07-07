import { motion } from 'framer-motion';
import { Container, Badge, LinkButton } from '@/components/ui';
import { ProductVisual } from '@/components/visuals/ProductVisual';
import { IconArrowRight, IconCheck } from '@/components/icons';
import { PRODUCT_HIGHLIGHTS } from '@/utils/constants';
import { EASE_OUT_EXPO, viewportOnce } from '@/utils/motion';
import type { ProductHighlight } from '@/types';
import { cn } from '@/utils/cn';

export function ProductShowcase() {
  return (
    <section id="products" className="bg-surface-sand py-20 lg:py-28">
      <Container className="flex flex-col gap-20 lg:gap-28">
        {PRODUCT_HIGHLIGHTS.map((item) => (
          <ProductRow key={item.id} item={item} />
        ))}
      </Container>
    </section>
  );
}

function ProductRow({ item }: { item: ProductHighlight }) {
  const mediaOnRight = item.align === 'right';

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      {/* Copy */}
      <motion.div
        initial={{ opacity: 0, x: mediaOnRight ? -32 : 32 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        className={cn('max-w-xl', mediaOnRight ? 'lg:order-1' : 'lg:order-2')}
      >
        <Badge>{item.eyebrow}</Badge>
        <h2 className="mt-4 text-display-md text-balance text-ink">{item.title}</h2>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft text-pretty">
          {item.description}
        </p>
        <ul className="mt-6 space-y-3">
          {item.bullets.map((bullet) => (
            <li key={bullet} className="flex items-center gap-3 text-ink">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-500/15 text-brand-600">
                <IconCheck className="h-3.5 w-3.5" />
              </span>
              <span className="font-medium">{bullet}</span>
            </li>
          ))}
        </ul>
        <LinkButton href="#pricing" variant="ghost" className="mt-7 !px-0 group text-brand-600">
          Learn more
          <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </LinkButton>
      </motion.div>

      {/* Visual */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.1 }}
        className={cn('relative', mediaOnRight ? 'lg:order-2' : 'lg:order-1')}
      >
        <div
          aria-hidden
          className="absolute inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-100/70 to-accent-sky/60 blur-2xl"
        />
        <ProductVisual visual={item.visual} />
      </motion.div>
    </div>
  );
}
