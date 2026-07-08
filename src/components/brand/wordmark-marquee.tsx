import { cn } from "@/lib/utils";

/**
 * WordmarkMarquee — a slow horizontal rail of the wordmark, echoing the
 * woven silk scarf pattern from the brand board. Purely decorative.
 */
export function WordmarkMarquee({
  className,
  tone = "onyx",
}: {
  className?: string;
  tone?: "onyx" | "gold" | "ivory";
}) {
  const color =
    tone === "gold"
      ? "text-gold-deep"
      : tone === "ivory"
        ? "text-ivory"
        : "text-onyx";

  const items = Array.from({ length: 8 });

  return (
    <div
      className={cn("flex w-full overflow-hidden select-none", color, className)}
      aria-hidden="true"
    >
      <div className="flex shrink-0 animate-marquee">
        {items.map((_, i) => (
          <span
            key={`a-${i}`}
            className="wordmark flex items-center gap-6 px-6 text-2xl tracking-[0.3em] opacity-90"
          >
            NOLA TOUCH
            <span className="text-gold">◆</span>
          </span>
        ))}
      </div>
      <div className="flex shrink-0 animate-marquee" aria-hidden="true">
        {items.map((_, i) => (
          <span
            key={`b-${i}`}
            className="wordmark flex items-center gap-6 px-6 text-2xl tracking-[0.3em] opacity-90"
          >
            NOLA TOUCH
            <span className="text-gold">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
