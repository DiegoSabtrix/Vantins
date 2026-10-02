import { cn } from '@/utils/cn';

interface LogoProps {
  className?: string;
  /** Kept for compatibility with existing dark-background placements. */
  invert?: boolean;
}

const LOGO_SRC = '/vantins-insurance-logo.png';

export function Logo({ className }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center', className)}>
      <img
        src={LOGO_SRC}
        alt="Vantins commercial truck insurance agency"
        className="h-11 w-auto object-contain sm:h-12 lg:h-[3.3rem]"
        width={2047}
        height={512}
      />
    </span>
  );
}
