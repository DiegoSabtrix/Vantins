import { cn } from '@/utils/cn';

interface LogoProps {
  className?: string;
  /** Renders the wordmark in white for use on dark backgrounds. */
  invert?: boolean;
}

/** The Vantins shield emblem — amber line-art on a 48×48 grid. */
function VantinsShield({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      {/* outer shield */}
      <path
        d="M24 3.5c-4.2 2-11 3.3-16 3.8 0 13 1 24.6 16 36.7 15-12.1 16-23.7 16-36.7-5-.5-11.8-1.8-16-3.8Z"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      {/* inner shield */}
      <path
        d="M24 8.2c-3.4 1.6-8.9 2.6-12.9 3.1 0 10.7.8 19.9 12.9 30.1 12.1-10.2 12.9-19.4 12.9-30.1-4-.5-9.5-1.5-12.9-3.1Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        opacity="0.85"
      />
      {/* the "A" triangle */}
      <path
        d="M24 14.5 31.5 30.5 16.5 30.5Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* arc bowl */}
      <path
        d="M15 30c2.8 3 15.2 3 18 0"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Vantins logo — the amber shield emblem plus the "VANTINS" wordmark.
 * On dark backgrounds the wordmark is white; the shield stays amber.
 */
export function Logo({ className, invert = false }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <VantinsShield className="h-9 w-9 text-brand-500" />
      <span
        className={cn(
          'text-lg font-extrabold uppercase tracking-[0.18em]',
          invert ? 'text-white' : 'text-ink',
        )}
      >
        Vantins
      </span>
    </span>
  );
}
