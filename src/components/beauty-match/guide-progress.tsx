"use client";

import { cn } from "@/lib/utils";

export function GuideProgress({
  step,
  total,
  className,
}: {
  step: number;
  total: number;
  className?: string;
}) {
  const pct = Math.min(100, Math.round(((step + 1) / total) * 100));

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between text-[0.6rem] font-medium uppercase tracking-[0.14em] text-muted">
        <span>Beauty Match Guide</span>
        <span className="text-gold-deep">{pct}%</span>
      </div>
      <div className="h-px w-full overflow-hidden bg-stone-line">
        <div
          className="h-px bg-gold transition-all duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
