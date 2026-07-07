import { motion } from 'framer-motion';
import { Badge } from './Badge';
import { fadeUp, staggerContainer, viewportOnce } from '@/utils/motion';
import { cn } from '@/utils/cn';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  /** Constrains the description width for readability. */
  descriptionClassName?: string;
}

/** Reusable, animated section header (eyebrow + title + description). */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
  descriptionClassName,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow && (
        <motion.div variants={fadeUp}>
          <Badge>{eyebrow}</Badge>
        </motion.div>
      )}
      <motion.h2
        variants={fadeUp}
        className="max-w-2xl text-display-md text-balance text-ink"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeUp}
          className={cn(
            'max-w-2xl text-lg leading-relaxed text-ink-soft text-pretty',
            descriptionClassName,
          )}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
