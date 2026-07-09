"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Ribbon } from "@/components/brand/ribbon";
import { StackedLogo } from "@/components/brand/stacked-logo";
import { easeLux } from "@/lib/motion";

/** Intentional minimum splash duration (ms) — visible on every refresh. */
const MIN_SPLASH_MS = 3600;
const EXIT_MS = 900;

const shellVariants = {
  visible: {},
  exit: {},
} as const;

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const start = Date.now();

    const tick = () => {
      const elapsed = Date.now() - start;
      setProgress(Math.min(100, Math.round((elapsed / MIN_SPLASH_MS) * 100)));
      if (elapsed < MIN_SPLASH_MS) requestAnimationFrame(tick);
      else setExiting(true);
    };
    requestAnimationFrame(tick);

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!exiting) return;
    const t = setTimeout(onComplete, EXIT_MS);
    return () => clearTimeout(t);
  }, [exiting, onComplete]);

  return (
    <motion.div
      className="splash-screen fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-onyx"
      role="status"
      aria-live="polite"
      aria-label="Loading Nola Touch"
      initial="visible"
      animate={exiting ? "exit" : "visible"}
      variants={shellVariants}
    >
      <motion.div
        className="splash-curtain absolute inset-y-0 left-0 w-1/2 bg-onyx"
        variants={{
          visible: { x: 0 },
          exit: { x: "-100%", transition: { duration: EXIT_MS / 1000, ease: easeLux } },
        }}
      />
      <motion.div
        className="splash-curtain absolute inset-y-0 right-0 w-1/2 bg-onyx"
        variants={{
          visible: { x: 0 },
          exit: { x: "100%", transition: { duration: EXIT_MS / 1000, ease: easeLux } },
        }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center px-6"
        animate={exiting ? { opacity: 0, scale: 1.05 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: easeLux }}
      >
        <Ribbon tone="ivory" animated className="opacity-30" />

        <div className="relative flex h-44 w-44 items-center justify-center sm:h-52 sm:w-52">
          <motion.span
            className="splash-ring absolute inset-0 rounded-full border border-gold/25"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <motion.span
            className="splash-ring splash-ring-dashed absolute inset-3 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
          <motion.span
            className="absolute inset-6 rounded-full border border-gold/40"
            animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
            aria-hidden
          >
            <motion.div
              className="h-full w-1/2 bg-gradient-to-r from-transparent via-gold/35 to-transparent"
              animate={{ x: ["-120%", "220%"] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.6 }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -12 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.1, ease: easeLux, delay: 0.15 }}
            className="relative z-10"
          >
            <Image
              src="/images/brand/icon-gold.png"
              alt=""
              width={96}
              height={96}
              priority
              className="h-[4.5rem] w-[4.5rem] drop-shadow-[0_0_28px_rgba(252,215,107,0.45)] sm:h-24 sm:w-24"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: easeLux, delay: 0.55 }}
          className="mt-8"
        >
          <StackedLogo variant="gold" size="md" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-5 text-center font-display text-sm italic text-stone sm:text-base"
        >
          Beauty, right when you need it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 h-px w-48 origin-left overflow-hidden bg-white/10"
        >
          <div className="h-full bg-gold transition-[width] duration-150" style={{ width: `${progress}%` }} />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-2 text-[0.55rem] font-medium uppercase tracking-[0.22em] text-gold/80"
        >
          {progress}%
        </motion.p>
      </motion.div>

      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute h-1 w-1 rounded-full bg-gold"
          style={{
            top: `${20 + i * 18}%`,
            left: i % 2 === 0 ? "12%" : "86%",
          }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.4, 0.8] }}
          transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.4 }}
          aria-hidden
        />
      ))}
    </motion.div>
  );
}

export function SplashGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  return (
    <>
      <AnimatePresence>{!ready && <SplashScreen onComplete={() => setReady(true)} />}</AnimatePresence>
      {children}
    </>
  );
}
