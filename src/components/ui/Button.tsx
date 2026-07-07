import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-brand-500 text-white shadow-sm hover:bg-brand-600 active:bg-brand-700',
  secondary:
    'bg-ink text-white shadow-sm hover:bg-ink/90 active:bg-ink/80',
  outline:
    'border border-ink/20 bg-white text-ink hover:border-ink/40 hover:bg-surface-subtle',
  ghost: 'text-ink hover:bg-ink/5',
};

const sizeClasses: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-[0.95rem]',
  lg: 'h-14 px-7 text-base',
};

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold leading-none transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60';

function composeClasses(
  variant: Variant,
  size: Size,
  fullWidth: boolean,
  className?: string,
) {
  return cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && 'w-full',
    className,
  );
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', fullWidth = false, className, children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={composeClasses(variant, size, fullWidth, className)}
      {...rest}
    >
      {children}
    </button>
  );
});

type LinkButtonProps = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

/** Anchor styled as a button — used for CTAs that navigate. */
export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  function LinkButton(
    { variant = 'primary', size = 'md', fullWidth = false, className, children, ...rest },
    ref,
  ) {
    return (
      <a
        ref={ref}
        className={composeClasses(variant, size, fullWidth, className)}
        {...rest}
      >
        {children}
      </a>
    );
  },
);
