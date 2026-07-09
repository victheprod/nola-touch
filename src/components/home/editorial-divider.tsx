import { cn } from "@/lib/utils";

/**
 * Thin editorial marquee band — pacing between major homepage sections.
 * Inspired by luxury lookbook rails; uses existing brand wordmark motion.
 */
export function EditorialDivider({
  className,
  tone = "champagne",
  variant = "default",
}: {
  className?: string;
  tone?: "champagne" | "onyx" | "ivory";
  variant?: "default" | "ghost";
}) {
  const bg =
    variant === "ghost"
      ? "bg-transparent"
      : tone === "onyx"
        ? "bg-onyx"
        : tone === "ivory"
          ? "bg-ivory"
          : "bg-champagne";

  const text =
    tone === "onyx" ? "text-ivory/35" : "text-onyx/30";

  const items = Array.from({ length: 10 });

  return (
    <div
      className={cn(
        "marquee-fade overflow-hidden py-3.5",
        variant === "default" && "border-y border-stone-line/60",
        bg,
        className,
      )}
      aria-hidden="true"
    >
      <div className={cn("flex w-max", text)}>
        <div className="flex shrink-0 animate-marquee">
          {items.map((_, i) => (
            <span
              key={`a-${i}`}
              className="wordmark flex items-center gap-5 px-5 text-[0.72rem] tracking-[0.42em] sm:text-xs"
            >
              NOLA TOUCH
              <span className="text-gold-deep/80">·</span>
            </span>
          ))}
        </div>
        <div className="flex shrink-0 animate-marquee">
          {items.map((_, i) => (
            <span
              key={`b-${i}`}
              className="wordmark flex items-center gap-5 px-5 text-[0.72rem] tracking-[0.42em] sm:text-xs"
            >
              NOLA TOUCH
              <span className="text-gold-deep/80">·</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
