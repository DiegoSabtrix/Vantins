import { cn } from '@/utils/cn';

interface LogoProps {
  className?: string;
  /** Renders the wordmark in white for use on dark backgrounds. */
  invert?: boolean;
}

/**
 * The Vantins shield emblem — amber line-art faithful to the supplied logo:
 * a double-outlined shield containing an "A" triangle over a rounded bowl.
 */
function VantinsShield({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden>
      {/* thin outer shield outline */}
      <path
        d="M50 6C37 11 21 13 11 13.5 11 40 12 67 50 95 88 67 89 40 89 13.5 79 13 63 11 50 6Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      {/* thick inner shield body */}
      <path
        d="M50 13C38.5 17.5 24 19.5 16 20 16 42 17 66 50 88 83 66 84 42 84 20 76 19.5 61.5 17.5 50 13Z"
        stroke="currentColor"
        strokeWidth="5.2"
        strokeLinejoin="round"
      />
      {/* the "A" triangle */}
      <path
        d="M50 27 69 62 31 62Z"
        stroke="currentColor"
        strokeWidth="5.2"
        strokeLinejoin="round"
      />
      {/* rounded bowl below the triangle */}
      <path
        d="M32 66C40 79 60 79 68 66"
        stroke="currentColor"
        strokeWidth="5.2"
        strokeLinecap="round"
        strokeLinejoin="round"
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
