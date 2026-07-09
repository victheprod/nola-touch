import { cn } from "@/lib/utils";

const SWATCH_IDS = ["straight", "wavy", "curly", "kinky-coily", "yaki", "unsure"] as const;
export type TextureSwatchId = (typeof SWATCH_IDS)[number] | string;

/** Illustrated hair texture swatch — pattern only, no faces. */
export function TextureSwatch({
  id,
  className,
  selected,
}: {
  id: string;
  className?: string;
  selected?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-full border bg-[#141210]",
        selected ? "border-gold ring-2 ring-gold/40" : "border-white/20",
        className,
      )}
      aria-hidden
    >
      <svg viewBox="0 0 80 80" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <rect width="80" height="80" fill="#141210" />
        {id === "straight" && <StraightStrands />}
        {id === "wavy" && <WavyStrands />}
        {id === "curly" && <CurlyStrands />}
        {id === "kinky-coily" && <CoilyStrands />}
        {id === "yaki" && <YakiStrands />}
        {id === "unsure" && <UnsureStrands />}
      </svg>
    </div>
  );
}

function strand(color: string, opacity = 0.9) {
  return { stroke: color, strokeWidth: 2.2, fill: "none", strokeLinecap: "round", opacity };
}

const gold = "#d4a853";
const honey = "#c9956a";
const deep = "#8b6914";

function StraightStrands() {
  const s = strand(gold);
  return (
    <>
      {[18, 28, 38, 48, 58].map((x) => (
        <line key={x} x1={x} y1={8} x2={x} y2={72} {...s} />
      ))}
    </>
  );
}

function WavyStrands() {
  const s = strand(honey);
  return (
    <>
      <path d="M16 8 C 10 24, 22 40, 16 56 C 10 72, 22 72, 16 72" {...s} />
      <path d="M30 8 C 36 22, 24 38, 30 54 C 36 68, 24 72, 30 72" {...s} />
      <path d="M44 8 C 38 24, 50 40, 44 56 C 38 72, 50 72, 44 72" {...s} />
      <path d="M58 8 C 64 22, 52 38, 58 54 C 64 68, 52 72, 58 72" {...s} />
    </>
  );
}

function CurlyStrands() {
  const s = strand(gold);
  return (
    <>
      {[
        "M20 12 C 8 20, 8 32, 20 40 C 32 48, 32 60, 20 68",
        "M40 10 C 28 18, 28 30, 40 38 C 52 46, 52 58, 40 66",
        "M60 12 C 48 20, 48 32, 60 40 C 72 48, 72 60, 60 68",
      ].map((d, i) => (
        <path key={i} d={d} {...s} />
      ))}
    </>
  );
}

function CoilyStrands() {
  const s = { ...strand(deep, 1), strokeWidth: 2 };
  const coils = [
    [14, 16],
    [26, 14],
    [38, 18],
    [50, 14],
    [62, 16],
    [20, 34],
    [32, 38],
    [44, 34],
    [56, 38],
    [16, 52],
    [28, 56],
    [40, 52],
    [52, 56],
    [64, 52],
  ] as const;
  return (
    <>
      {coils.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={5} {...s} />
      ))}
    </>
  );
}

function YakiStrands() {
  const s = strand(honey, 0.85);
  return (
    <>
      {[16, 26, 36, 46, 56, 66].map((x, i) => (
        <path
          key={x}
          d={`M${x} 8 Q ${x + (i % 2 ? 3 : -3)} 28 ${x} 48 Q ${x + (i % 2 ? -2 : 2)} 62 ${x} 72`}
          {...s}
          strokeWidth={2.4}
        />
      ))}
      {/* blown-out volume at ends */}
      {[20, 40, 60].map((x) => (
        <ellipse key={x} cx={x} cy={66} rx={6} ry={3} fill={gold} opacity={0.15} />
      ))}
    </>
  );
}

function UnsureStrands() {
  return (
    <>
      <WavyStrands />
      <circle cx={40} cy={40} r={14} fill="#141210" opacity={0.65} />
      <text
        x={40}
        y={45}
        textAnchor="middle"
        fill={gold}
        fontSize={18}
        fontFamily="Georgia, serif"
      >
        ?
      </text>
    </>
  );
}
