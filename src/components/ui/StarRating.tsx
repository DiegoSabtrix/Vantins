import { IconStar } from '@/components/icons';
import { cn } from '@/utils/cn';

interface StarRatingProps {
  rating?: number;
  className?: string;
}

/** Row of five stars used in testimonials and trust signals. */
export function StarRating({ rating = 5, className }: StarRatingProps) {
  return (
    <div
      className={cn('flex items-center gap-0.5 text-amber-400', className)}
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <IconStar
          key={i}
          className={cn('h-4 w-4', i < rating ? 'text-amber-400' : 'text-ink/15')}
        />
      ))}
    </div>
  );
}
