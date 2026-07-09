"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { easeLux } from "@/lib/motion";
import { cn } from "@/lib/utils";

const CHECKLIST = [
  "Hair type & texture",
  "Lifestyle & occasion",
  "Budget preferences",
  "Care concerns",
  "Expert recommendations",
];

export function GuideLoading({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [checkedCount, setCheckedCount] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const duration = 2800;
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      setCheckedCount(Math.min(CHECKLIST.length, Math.floor((pct / 100) * CHECKLIST.length) + 1));
      if (pct < 100) requestAnimationFrame(tick);
      else setTimeout(onDone, 400);
    };
    requestAnimationFrame(tick);
  }, [onDone]);

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center">
      <div className="relative">
        <svg width="140" height="140" className="-rotate-90">
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="6"
          />
          <motion.circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="#FCD76B"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.3, ease: easeLux }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-3xl text-gold">{progress}%</span>
        </div>
      </div>

      <p className="mt-8 font-display text-xl text-ivory">Building your match</p>
      <p className="mt-2 max-w-[16rem] text-sm text-stone">
        Analyzing your preferences to find the perfect products.
      </p>

      <ul className="mt-8 w-full max-w-[16rem] space-y-2.5 text-left">
        {CHECKLIST.map((item, i) => (
          <li
            key={item}
            className={cn(
              "flex items-center gap-2.5 text-sm transition-colors duration-300",
              i < checkedCount ? "text-ivory" : "text-white/25",
            )}
          >
            <span
              className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                i < checkedCount
                  ? "border-gold bg-gold text-onyx"
                  : "border-white/20 bg-transparent",
              )}
            >
              {i < checkedCount && <Check className="h-3 w-3" strokeWidth={2.5} />}
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
