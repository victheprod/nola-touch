"use client";

import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Sparkles } from "lucide-react";
import { BrandMark } from "@/components/brand/brand-mark";
import { easeLux } from "@/lib/motion";
import { cn } from "@/lib/utils";

function RibbonChain() {
  return (
    <svg
      viewBox="0 0 36 52"
      className="match-guide-chain -mt-0.5 h-[3.25rem] w-9 shrink-0"
      aria-hidden
    >
      <defs>
        <linearGradient id="chainGold" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fcd76b" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#b8912e" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <path
        d="M11 0 C 8 18, 14 32, 12 52"
        fill="none"
        stroke="url(#chainGold)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M25 0 C 28 18, 22 32, 24 52"
        fill="none"
        stroke="url(#chainGold)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M14 8 C 18 22, 18 30, 16 44"
        fill="none"
        stroke="rgba(252,215,107,0.25)"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BookmarkTail({ expanded }: { expanded: boolean }) {
  return (
    <div className="relative flex flex-col items-center">
      <div
        className={cn(
          "match-guide-ribbon-tail w-7 bg-gradient-to-b from-gold/90 via-gold to-gold-deep/80 transition-all duration-500",
          expanded ? "h-14" : "h-10",
        )}
      />
      <div className="match-guide-ribbon-notch h-2 w-10 bg-gold-deep/90" aria-hidden />
    </div>
  );
}

export function GuideTrigger({ onOpen }: { onOpen: () => void }) {
  const [cueDismissed, setCueDismissed] = useState(false);
  const [hovered, setHovered] = useState(false);

  const pointerX = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 120, damping: 18 });
  const sway = useTransform(springX, [-80, 80], [-7, 7]);

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
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.6, ease: easeLux }}
      className={cn(
        "fixed z-[35] flex items-end justify-end gap-2",
        "bottom-0 right-3",
        "max-sm:bottom-[max(4.5rem,env(safe-area-inset-bottom))]",
        "sm:right-5",
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        pointerX.set(0);
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        pointerX.set(e.clientX - center);
      }}
    >
      {/* Handwritten invitation */}
      <AnimatePresence>
        {!cueDismissed && (
          <motion.button
            type="button"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.45, ease: easeLux, delay: 0.5 }}
            onClick={dismissCue}
            className="group/cue relative mb-16 hidden max-w-[10.5rem] cursor-pointer text-right md:block"
            aria-label="Dismiss hint"
          >
            <p className="font-display text-[1rem] italic leading-snug text-gold/95">
              Not sure what you need?
              <br />
              Pull the charm.
            </p>
            <svg viewBox="0 0 72 28" className="ml-auto mt-1 h-5 w-14 text-gold/75" aria-hidden>
              <path
                d="M2 18 C 20 6, 40 22, 70 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-onyx/80 text-[0.55rem] text-stone opacity-0 transition-opacity group-hover/cue:opacity-100">
              ×
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Pendant + ribbon bookmark */}
      <div className="relative flex flex-col items-center pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <motion.div
          style={{
            rotate: hovered ? sway : undefined,
            transformOrigin: "50% 0%",
          }}
          animate={hovered ? undefined : { rotate: [-3.5, 3.5, -3.5] }}
          transition={
            hovered
              ? { type: "spring", stiffness: 120, damping: 18 }
              : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
          }
          className="flex flex-col items-center"
        >
          {/* Unfurl banner on hover */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.95 }}
                transition={{ duration: 0.35, ease: easeLux }}
                className="match-guide-silk-banner mb-2 whitespace-nowrap px-4 py-2 text-center"
              >
                <p className="text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-gold">
                  Beauty Match
                </p>
                <p className="mt-0.5 text-[0.65rem] text-ivory/80">60 seconds · free</p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="button"
            onClick={onOpen}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="match-guide-medallion group relative z-10 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full cursor-pointer sm:h-[4.75rem] sm:w-[4.75rem]"
            aria-label="Open Beauty Match Guide"
          >
            <span className="match-guide-medallion-ring pointer-events-none absolute inset-0 rounded-full" aria-hidden />
            <span className="match-guide-medallion-ring match-guide-medallion-ring-delay pointer-events-none absolute inset-0 rounded-full" aria-hidden />
            <span className="relative flex h-full w-full items-center justify-center rounded-full border-2 border-gold/60 bg-onyx shadow-[0_16px_48px_rgba(0,0,0,0.5)]">
              <BrandMark asset="icon" variant="gold" className="h-9 w-9 transition-transform duration-500 group-hover:scale-110 sm:h-10 sm:w-10" />
            </span>
            <span className="absolute -right-0.5 -top-0.5 flex h-6 w-6 items-center justify-center rounded-full border border-gold/40 bg-onyx shadow-lg">
              <Sparkles className="h-3 w-3 text-gold" strokeWidth={2} />
            </span>
          </motion.button>

          <RibbonChain />
          <BookmarkTail expanded={hovered} />
        </motion.div>
      </div>
    </motion.div>
  );
}
