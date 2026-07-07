import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface BrowserFrameProps {
  children: ReactNode;
  className?: string;
  /** Text shown in the fake address bar. */
  url?: string;
}

/** Decorative browser chrome wrapping a product screenshot placeholder. */
export function BrowserFrame({
  children,
  className,
  url = 'app.quickbooks.com/dashboard',
}: BrowserFrameProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-float',
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-ink/10 bg-surface-subtle px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400" />
        <span className="h-3 w-3 rounded-full bg-amber-400" />
        <span className="h-3 w-3 rounded-full bg-green-400" />
        <div className="ml-3 hidden flex-1 rounded-md bg-white px-3 py-1 text-xs text-ink-muted sm:block">
          {url}
        </div>
      </div>
      <div className="bg-surface-sand">{children}</div>
    </div>
  );
}
