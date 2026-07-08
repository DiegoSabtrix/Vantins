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
      {/* outer shield */}
      <path
        d="M50 7C38 12 22 14 12 14.5 12 40 13 66 50 94 87 66 88 40 88 14.5 78 14 62 12 50 7Z"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      {/* inner shield */}
      <path
        d="M50 13.5C39.5 18 25.5 20 17.5 20.5 17.5 41 18.5 64 50 87 81.5 64 82.5 41 82.5 20.5 74.5 20 60.5 18 50 13.5Z"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      {/* the "A" triangle */}
      <path
        d="M50 29 69 64 31 64Z"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      {/* rounded bowl below the triangle */}
      <path
        d="M31 64C40 78 60 78 69 64"
        stroke="currentColor"
        strokeWidth="5"
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
