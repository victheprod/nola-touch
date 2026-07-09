"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { BrandMark } from "@/components/brand/brand-mark";
import { easeLux } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function GuideTrigger({ onOpen }: { onOpen: () => void }) {
  const [cueDismissed, setCueDismissed] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    try {
      setCueDismissed(localStorage.getItem("nola_match_cue_dismissed") === "1");
    } catch {
      /* storage blocked */
    }
  }, []);

  const dismissCue = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCueDismissed(true);
    try {
      localStorage.setItem("nola_match_cue_dismissed", "1");
    } catch {
      /* storage blocked */
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.55, ease: easeLux }}
      className={cn(
        "fixed z-[35] flex items-end justify-end gap-3",
        "bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4",
        "max-sm:bottom-[max(5.5rem,env(safe-area-inset-bottom))]",
        "sm:right-6 sm:bottom-6",
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Handwritten invitation — desktop / tablet */}
      <AnimatePresence>
        {!cueDismissed && (
          <motion.button
            type="button"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.45, ease: easeLux, delay: 0.4 }}
            onClick={dismissCue}
            className="group/cue relative mb-3 hidden max-w-[11rem] cursor-pointer text-right sm:block"
            aria-label="Dismiss hint"
          >
            <p
              className={cn(
                "font-display text-[1.05rem] italic leading-snug text-gold transition-opacity",
                hovered ? "opacity-100" : "opacity-90",
              )}
            >
              Not sure what you need?
              <br />
              Let&apos;s find your perfect match.
            </p>
            <svg
              viewBox="0 0 80 32"
              className="ml-auto mt-1 h-6 w-16 text-gold/80"
              aria-hidden
            >
              <path
                d="M4 20 C 28 8, 48 24, 76 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M68 8 L76 12 L70 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-onyx/80 text-[0.55rem] text-stone opacity-0 transition-opacity group-hover/cue:opacity-100">
              ×
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Seal + pill stack */}
      <motion.button
        type="button"
        onClick={onOpen}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.98 }}
        className="match-guide-trigger flex flex-col items-center cursor-pointer"
        aria-label="Open Beauty Match Guide"
      >
        {/* Logo seal with gold aura */}
        <div className="relative">
          <span className="match-guide-aura pointer-events-none absolute inset-0 rounded-full" aria-hidden />
          <span className="match-guide-aura match-guide-aura-delay pointer-events-none absolute inset-0 rounded-full" aria-hidden />

          <span className="relative flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-full border-2 border-gold/70 bg-onyx shadow-[0_12px_40px_rgba(0,0,0,0.45)] sm:h-[4.75rem] sm:w-[4.75rem]">
            <BrandMark asset="icon" variant="gold" className="h-9 w-9 sm:h-10 sm:w-10" />
          </span>

          {/* Sparkle concierge badge */}
          <span className="absolute -right-0.5 -top-0.5 flex h-7 w-7 items-center justify-center rounded-full border border-gold/50 bg-onyx shadow-md">
            <Sparkles className="h-3.5 w-3.5 text-gold" strokeWidth={1.75} />
          </span>
        </div>

        {/* Pill label */}
        <span className="match-guide-pill -mt-1 flex min-w-[10.5rem] flex-col items-center rounded-full border border-gold/45 bg-onyx/90 px-4 py-2.5 text-center shadow-[0_8px_28px_rgba(0,0,0,0.35)] backdrop-blur-md sm:min-w-[11.5rem]">
          <span className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-gold">
            Beauty Match Guide
          </span>
          <span className="mt-0.5 text-[0.68rem] text-stone">Find your perfect match</span>
        </span>
      </motion.button>
    </motion.div>
  );
}
