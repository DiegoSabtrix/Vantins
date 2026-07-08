import { cn } from '@/utils/cn';

interface LogoProps {
  className?: string;
  /** Renders the wordmark in white for use on dark backgrounds. */
  invert?: boolean;
}

/** Path to the logo emblem file. Swap `public/logo.svg` to change it site-wide. */
const LOGO_SRC = `${import.meta.env.BASE_URL}logo.svg`;

/**
 * Vantins logo — the shield emblem loaded from `public/logo.svg` plus the
 * "VANTINS" wordmark. Replace the SVG file to use a different logo.
 */
export function Logo({ className, invert = false }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <img src={LOGO_SRC} alt="Vantins" className="h-9 w-9" width={36} height={36} />
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
