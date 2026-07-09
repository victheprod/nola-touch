"use client";

import { cn } from "@/lib/utils";
import type { QuestionOption } from "@/lib/beauty-match/questions";
import { Check } from "lucide-react";

export function ChoiceCards({
  options,
  value,
  onChange,
  unsureId = "unsure",
}: {
  options: QuestionOption[];
  value: string;
  onChange: (id: string) => void;
  unsureId?: string;
}) {
  const main = options.filter((o) => o.id !== unsureId);
  const unsure = options.find((o) => o.id === unsureId);

  return (
    <div className="space-y-2.5">
      <div className="grid gap-2 sm:grid-cols-2">
        {main.map((opt) => {
          const selected = value === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              className={cn(
                "group relative flex flex-col items-start border px-4 py-3.5 text-left transition-all duration-300 cursor-pointer",
                selected
                  ? "border-gold-deep bg-champagne/80 shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
                  : "border-stone-line bg-ivory hover:border-charcoal/40 hover:bg-champagne/40",
              )}
            >
              {selected && (
                <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center bg-gold text-onyx">
                  <Check className="h-3 w-3" strokeWidth={2.5} />
                </span>
              )}
              <span className="font-display text-[0.95rem] leading-snug text-onyx pr-6">
                {opt.label}
              </span>
              {opt.description && (
                <span className="mt-1 text-xs leading-relaxed text-muted">
                  {opt.description}
                </span>
              )}
            </button>
          );
        })}
      </div>
      {unsure && (
        <button
          type="button"
          onClick={() => onChange(unsure.id)}
          className={cn(
            "w-full border px-4 py-2.5 text-center text-xs font-medium uppercase tracking-[0.12em] transition-colors cursor-pointer",
            value === unsure.id
              ? "border-gold-deep bg-gold/15 text-onyx"
              : "border-dashed border-stone-line text-muted hover:border-charcoal/30 hover:text-charcoal",
          )}
        >
          {unsure.label}
        </button>
      )}
    </div>
  );
}

export function MultiChoiceCards({
  options,
  values,
  onChange,
  unsureId = "unsure",
}: {
  options: QuestionOption[];
  values: string[];
  onChange: (ids: string[]) => void;
  unsureId?: string;
}) {
  const toggle = (id: string) => {
    if (id === unsureId) {
      onChange(values.includes(unsureId) ? [] : [unsureId]);
      return;
    }
    if (id === "none") {
      onChange(values.includes("none") ? [] : ["none"]);
      return;
    }
    let next = values.filter((v) => v !== unsureId && v !== "none");
    if (next.includes(id)) next = next.filter((v) => v !== id);
    else next = [...next, id];
    onChange(next);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const selected = values.includes(opt.id);
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => toggle(opt.id)}
            className={cn(
              "border px-3.5 py-2 text-xs font-medium uppercase tracking-[0.1em] transition-all duration-300 cursor-pointer",
              selected
                ? "border-onyx bg-onyx text-ivory"
                : "border-stone-line bg-ivory text-charcoal hover:border-charcoal",
              opt.id === unsureId && "border-dashed",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
