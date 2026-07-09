"use client";

import Image from "next/image";
import { Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuestionLayout, QuestionOption } from "@/lib/beauty-match/questions";
import {
  lookGoalImages,
  shoppingGoalImages,
} from "@/data/guide-images";
import { TextureSwatch } from "@/components/beauty-match/texture-swatch";

function optionImage(stepId: string, optId: string) {
  if (stepId === "shoppingGoal") return shoppingGoalImages[optId];
  if (stepId === "lookGoal") return lookGoalImages[optId];
  return undefined;
}

export function ChoiceSelector({
  layout,
  stepId,
  options,
  value,
  onChange,
  unsureId = "unsure",
}: {
  layout: QuestionLayout;
  stepId: string;
  options: QuestionOption[];
  value: string;
  onChange: (id: string) => void;
  unsureId?: string;
}) {
  const main = options.filter((o) => o.id !== unsureId);
  const unsure = options.find((o) => o.id === unsureId);

  if (layout === "image-grid") {
    return (
      <>
        <div className="grid grid-cols-2 gap-2.5">
          {main.map((opt) => {
            const img = optionImage(stepId, opt.id);
            const selected = value === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onChange(opt.id)}
                className={cn(
                  "group relative aspect-[4/5] overflow-hidden rounded-xl text-left transition-all duration-300 cursor-pointer",
                  selected && "ring-2 ring-gold ring-offset-2 ring-offset-[#0a0a0b]",
                )}
              >
                {img ? (
                  <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="200px" />
                ) : (
                  <div className="surface-onyx h-full w-full" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <p className="font-display text-sm leading-tight text-ivory">{opt.label}</p>
                  {opt.description && (
                    <p className="mt-0.5 text-[0.65rem] text-stone">{opt.description}</p>
                  )}
                </div>
                {selected && (
                  <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gold text-onyx">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
        {unsure && <UnsureLink label={unsure.label} selected={value === unsure.id} onClick={() => onChange(unsure.id)} />}
      </>
    );
  }

  if (layout === "vibe-grid") {
    return (
      <>
        <div className="grid grid-cols-2 gap-2.5">
          {main.map((opt) => {
            const img = optionImage(stepId, opt.id);
            const selected = value === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onChange(opt.id)}
                className={cn(
                  "group relative aspect-[3/4] overflow-hidden rounded-2xl text-left cursor-pointer",
                  selected && "ring-2 ring-gold ring-offset-2 ring-offset-[#0a0a0b]",
                )}
              >
                {img && (
                  <Image src={img.src} alt={img.alt} fill className="object-cover object-top transition-transform duration-500 group-hover:scale-105" sizes="200px" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <p className="absolute inset-x-0 bottom-0 p-3 font-display text-sm text-ivory">{opt.label}</p>
                {selected && (
                  <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gold text-onyx">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                )}
              </button>
            );
          })}
          {unsure && (
            <button
              type="button"
              onClick={() => onChange(unsure.id)}
              className={cn(
                "flex aspect-[3/4] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/25 text-stone transition-colors hover:border-gold/50 hover:text-ivory cursor-pointer",
                value === unsure.id && "border-gold bg-gold/10 text-gold",
              )}
            >
              <Plus className="h-6 w-6" strokeWidth={1.5} />
              <span className="text-xs">{unsure.label}</span>
            </button>
          )}
        </div>
      </>
    );
  }

  if (layout === "swatch-grid") {
    return (
      <>
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {main.map((opt) => {
            const selected = value === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onChange(opt.id)}
                className={cn(
                  "group flex flex-col items-center gap-2.5 rounded-xl p-2 transition-all cursor-pointer",
                  selected ? "bg-gold/15 ring-1 ring-gold" : "hover:bg-white/5",
                )}
              >
                <TextureSwatch
                  id={opt.id}
                  selected={selected}
                  className="h-[4.5rem] w-[4.5rem] sm:h-20 sm:w-20"
                />
                <span
                  className={cn(
                    "text-center text-[0.65rem] leading-tight",
                    selected ? "text-gold" : "text-stone",
                  )}
                >
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>
        {unsure && <UnsureLink label={unsure.label} selected={value === unsure.id} onClick={() => onChange(unsure.id)} />}
      </>
    );
  }

  // pill-list
  return (
    <>
      <div className="space-y-2">
        {main.map((opt) => {
          const selected = value === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              className={cn(
                "flex w-full items-center justify-between rounded-full border px-5 py-3.5 text-left transition-all duration-300 cursor-pointer",
                selected
                  ? "border-gold bg-gold/10 text-ivory"
                  : "border-white/15 text-stone hover:border-white/30 hover:text-ivory",
              )}
            >
              <span className="text-sm font-medium">{opt.label}</span>
              {selected && (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-onyx">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
              )}
            </button>
          );
        })}
      </div>
      {unsure && <UnsureLink label={unsure.label} selected={value === unsure.id} onClick={() => onChange(unsure.id)} />}
    </>
  );
}

export function MultiChoiceSelector({
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
              "rounded-full border px-4 py-2 text-xs font-medium transition-all cursor-pointer",
              selected
                ? "border-gold bg-gold text-onyx"
                : "border-white/20 text-stone hover:border-white/40 hover:text-ivory",
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

function UnsureLink({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "mt-4 w-full py-2 text-center text-xs transition-colors cursor-pointer",
        selected ? "text-gold" : "text-stone hover:text-ivory",
      )}
    >
      {label}
    </button>
  );
}
