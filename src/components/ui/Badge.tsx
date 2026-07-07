import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface BadgeProps {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}

/** Small pill used for eyebrows and tags above headings. */
export function Badge({ children, className, icon }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full bg-accent-mint px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700',
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}
