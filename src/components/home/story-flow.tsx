import { cn } from "@/lib/utils";
import { Ribbon } from "@/components/brand/ribbon";
import { EditorialDivider } from "@/components/home/editorial-divider";

type StoryTone = "onyx" | "dark" | "champagne" | "ivory";

const gradientClass: Partial<Record<`${StoryTone}-${StoryTone}`, string>> = {
  "onyx-champagne": "story-gradient-onyx-champagne",
  "champagne-onyx": "story-gradient-champagne-onyx",
  "dark-ivory": "story-gradient-dark-ivory",
  "onyx-ivory": "story-gradient-dark-ivory",
  "ivory-champagne": "story-gradient-ivory-champagne",
  "champagne-ivory": "story-gradient-champagne-ivory",
  "ivory-onyx": "story-gradient-ivory-onyx",
};

const ribbonTone = (tone: StoryTone) =>
  tone === "onyx" || tone === "dark" ? "ivory" : tone === "ivory" ? "gold" : "onyx";

const marqueeTone = (tone: StoryTone): "champagne" | "onyx" | "ivory" => {
  if (tone === "dark") return "onyx";
  return tone;
};

/** Gradient seam between two section tones — replaces hard color cuts. */
export function StoryBridge({
  from,
  to,
  height = "md",
  ribbon = false,
  marquee = false,
  className,
}: {
  from: StoryTone;
  to: StoryTone;
  height?: "sm" | "md" | "lg";
  ribbon?: boolean;
  marquee?: boolean;
  className?: string;
}) {
  const gradient = gradientClass[`${from}-${to}`];
  const h = { sm: "h-14 sm:h-20", md: "h-20 sm:h-28", lg: "h-28 sm:h-36" }[height];

  return (
    <div
      className={cn("story-bridge relative -my-px w-full", gradient, h, className)}
      aria-hidden="true"
    >
      {ribbon && (
        <Ribbon tone={ribbonTone(to)} animated={false} className="opacity-50" />
      )}
      {marquee && (
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
          <EditorialDivider
            tone={marqueeTone(from === "dark" ? "onyx" : from)}
            variant="ghost"
          />
        </div>
      )}
    </div>
  );
}

/** In-section rhythm — marquee band woven into the same tone, not a bordered break. */
export function StoryWeave({
  tone = "onyx",
  className,
}: {
  tone?: StoryTone;
  className?: string;
}) {
  return (
    <div className={cn("story-weave relative z-10 -my-2 sm:-my-3", className)}>
      <EditorialDivider tone={marqueeTone(tone)} variant="ghost" />
    </div>
  );
}

/** Optional wrapper — consistent relative stacking for overlapping children. */
export function StorySection({
  children,
  className,
  tone,
  pad = "default",
  id,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: StoryTone;
  pad?: "none" | "tight" | "default" | "loose";
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}) {
  const tones: Record<StoryTone, string> = {
    onyx: "bg-onyx text-ivory",
    dark: "bg-[#0D0D0D] text-ivory",
    champagne: "bg-champagne text-onyx",
    ivory: "bg-ivory text-onyx",
  };
  const pads = {
    none: "",
    tight: "py-12 sm:py-16",
    default: "py-16 sm:py-24",
    loose: "py-20 sm:py-28",
  };

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={cn(
        "relative",
        tone && tones[tone],
        tone && pads[pad],
        className,
      )}
    >
      {children}
    </section>
  );
}
