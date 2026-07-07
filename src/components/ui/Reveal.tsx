import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { EASE_OUT_EXPO, viewportOnce } from '@/utils/motion';
import { cn } from '@/utils/cn';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds before the reveal animation begins. */
  delay?: number;
  as?: 'div' | 'li' | 'section';
}

/**
 * Convenience wrapper that fades + rises its children into view once,
 * respecting `prefers-reduced-motion` via the global CSS override.
 */
export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay }}
      className={cn(className)}
    >
      {children}
    </MotionTag>
  );
}
