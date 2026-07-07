import { cn } from '@/utils/cn';

interface LogoProps {
  className?: string;
  /** Renders the wordmark in white for use on dark backgrounds. */
  invert?: boolean;
}

/**
 * Original wordmark placeholder — a rounded brand badge plus "QuickBooks"
 * text. Intentionally does not reproduce Intuit's trademarked logo.
 */
export function Logo({ className, invert = false }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span
        aria-hidden
        className="grid h-9 w-9 place-items-center rounded-xl bg-brand-500 text-white shadow-sm"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" />
          <path
            d="M12 7v10"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M15 9a3.5 3.5 0 0 0-3-1.6"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span
        className={cn(
          'text-lg font-extrabold tracking-tight',
          invert ? 'text-white' : 'text-ink',
        )}
      >
        Quick<span className="text-brand-500">Books</span>
      </span>
    </span>
  );
}
