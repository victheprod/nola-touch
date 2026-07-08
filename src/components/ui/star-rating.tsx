import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRating({
  rating,
  size = 14,
  className,
  showValue = false,
}: {
  rating: number;
  size?: number;
  className?: string;
  showValue?: boolean;
}) {
  const rounded = Math.round(rating);
  return (
    <span
      className={cn("inline-flex items-center gap-1", className)}
      aria-label={`${rating} out of 5 stars`}
    >
      <span className="inline-flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            width={size}
            height={size}
            className={cn(
              i < rounded ? "fill-gold text-gold" : "fill-transparent text-stone-line",
            )}
            strokeWidth={1.5}
          />
        ))}
      </span>
      {showValue && (
        <span className="text-xs font-medium text-muted">{rating.toFixed(1)}</span>
      )}
    </span>
  );
}
