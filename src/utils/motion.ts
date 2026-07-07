import type { Variants } from 'framer-motion';

/** Shared easing that matches the marketing-site feel (soft, decelerating). */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** Fade-and-rise, used for most on-scroll reveals. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
};

/** Container that staggers its direct children into view. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

/** Item variant designed to be nested inside `staggerContainer`. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT_EXPO },
  },
};

/** Standard viewport config so reveals fire once, slightly before fully visible. */
export const viewportOnce = { once: true, amount: 0.25 } as const;
