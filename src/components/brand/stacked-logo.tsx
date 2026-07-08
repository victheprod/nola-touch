import { cn } from "@/lib/utils";

type StackedLogoProps = {
  className?: string;
  /** Color treatment via currentColor / text color. */
  variant?: "onyx" | "ivory" | "gold";
  /** Overall scale of the lockup. */
  size?: "sm" | "md" | "lg";
};

const colorByVariant: Record<NonNullable<StackedLogoProps["variant"]>, string> = {
  onyx: "text-onyx",
  ivory: "text-ivory",
  gold: "text-gold",
};

const sizeByScale: Record<
  NonNullable<StackedLogoProps["size"]>,
  { block: string; touch: string }
> = {
  sm: { block: "text-4xl sm:text-5xl", touch: "text-[0.55rem] sm:text-[0.62rem]" },
  md: { block: "text-5xl sm:text-6xl", touch: "text-[0.65rem] sm:text-[0.72rem]" },
  lg: { block: "text-6xl sm:text-7xl", touch: "text-[0.72rem] sm:text-[0.82rem]" },
};

/**
 * StackedLogo — the primary stacked "NOLA" lockup.
 *
 * Sculptural 2×2 block: "NO" over "LA" in the brand display serif,
 * with letter-spaced "TOUCH" centered beneath. Color is driven by
 * currentColor via the variant text class so it can sit on onyx,
 * ivory, or gold surfaces.
 */
export function StackedLogo({
  className,
  variant = "gold",
  size = "md",
}: StackedLogoProps) {
  const scale = sizeByScale[size];

  return (
    <div
      role="img"
      aria-label="Nola Touch"
      className={cn(
        "inline-flex flex-col items-center leading-none",
        colorByVariant[variant],
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "font-display font-semibold leading-[0.82] tracking-[0.02em]",
          scale.block,
        )}
      >
        <span className="block">NO</span>
        <span className="block">LA</span>
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "mt-3 font-medium uppercase tracking-[0.62em] text-current/85",
          "pl-[0.62em]", // optical centering for the trailing letter-spacing
          scale.touch,
        )}
      >
        Touch
      </span>
    </div>
  );
}
