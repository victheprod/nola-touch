"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Ribbon } from "@/components/brand/ribbon";
import { easeLux } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/use-mounted";

export function GuideShell({
  open,
  onClose,
  children,
  stepIndex,
  totalSteps,
  phase,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  stepIndex: number;
  totalSteps: number;
  phase: "intro" | "questions" | "loading" | "reveal" | "results";
}) {
  const mounted = useMounted();
  const [portal, setPortal] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortal(document.body);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!mounted || !portal) return null;

  const showProgress = phase === "questions";

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close guide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Beauty Match Guide"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.55, ease: easeLux }}
            className={cn(
              "match-guide-frame fixed z-[61] flex flex-col overflow-hidden bg-[#0a0a0b] text-ivory shadow-[0_0_80px_rgba(252,215,107,0.08)]",
              "inset-0 sm:inset-4 sm:mx-auto sm:max-w-[420px] sm:rounded-[2rem] sm:border sm:border-white/10",
              "lg:inset-y-6 lg:max-h-[900px]",
            )}
          >
            <Ribbon tone="ivory" animated className="opacity-40" />

            {phase !== "intro" && phase !== "reveal" && (
              <GuideHeader
                stepIndex={stepIndex}
                totalSteps={totalSteps}
                phase={phase}
                showProgress={showProgress}
                onClose={onClose}
              />
            )}

            <div className="relative flex min-h-0 flex-1 flex-col">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    portal,
  );
}

function GuideHeader({
  stepIndex,
  totalSteps,
  phase,
  showProgress,
  onClose,
}: {
  stepIndex: number;
  totalSteps: number;
  phase: "questions" | "loading" | "results";
  showProgress: boolean;
  onClose: () => void;
}) {
  return (
    <header className="relative z-10 shrink-0 px-5 pb-4 pt-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[0.58rem] font-medium uppercase tracking-[0.2em] text-gold">
          Nola Touch
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex h-8 w-8 items-center justify-center text-stone transition-colors hover:text-ivory cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {showProgress && (
        <div className="mt-4 flex items-center gap-1.5">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1 flex-1 rounded-full transition-all duration-500",
                i <= stepIndex ? "bg-gold" : "bg-white/15",
              )}
            />
          ))}
        </div>
      )}

      {phase === "loading" && (
        <p className="mt-3 font-display text-lg text-ivory">Building your match</p>
      )}
      {phase === "results" && (
        <p className="mt-3 font-display text-lg text-ivory">Your beauty match</p>
      )}
    </header>
  );
}
