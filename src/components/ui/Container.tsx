import type { ElementType, ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface ContainerProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/** Centered, max-width content wrapper with responsive horizontal padding. */
export function Container({ as: Tag = 'div', className, children }: ContainerProps) {
  return <Tag className={cn('container-px', className)}>{children}</Tag>;
}
