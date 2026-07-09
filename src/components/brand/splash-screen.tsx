"use client";

import { createPortal } from "react-dom";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Ribbon } from "@/components/brand/ribbon";
import { StackedLogo } from "@/components/brand/stacked-logo";
import { easeLux } from "@/lib/motion";
import { useMounted } from "@/lib/use-mounted";

/** Intentional minimum splash duration (ms) — visible on every hard refresh. */
const MIN_SPLASH_MS = 3800;
const EXIT_MS = 1000;

function SplashOverlay({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    document.body.classList.add("splash-active");
    document.body.style.overflow = "hidden";

    const start = Date.now();
    let frame = 0;

    const tick = () => {
      const elapsed = Date.now() - start;
      setProgress(Math.min(100, Math.round((elapsed / MIN_SPLASH_MS) * 100)));
      if (elapsed < MIN_SPLASH_MS) {
        frame = requestAnimationFrame(tick);
      } else {
        setExiting(true);
      }
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      document.body.classList.remove("splash-active");
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
      className="splash-screen fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-onyx"
      role="status"
      aria-live="polite"
      aria-label="Loading Nola Touch"
      initial={false}
      animate={exiting ? "exit" : "visible"}
      variants={{ visible: {}, exit: {} }}
    >
      <motion.div
        className="splash-curtain absolute inset-y-0 left-0 z-20 w-1/2 bg-onyx"
        variants={{
          visible: { x: 0 },
          exit: { x: "-100%", transition: { duration: EXIT_MS / 1000, ease: easeLux } },
        }}
      />
      <motion.div
        className="splash-curtain absolute inset-y-0 right-0 z-20 w-1/2 bg-onyx"
        variants={{
          visible: { x: 0 },
          exit: { x: "100%", transition: { duration: EXIT_MS / 1000, ease: easeLux } },
        }}
      />

      <motion.div
        className="relative z-30 flex flex-col items-center px-6"
        animate={exiting ? { opacity: 0, scale: 1.04 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: easeLux }}
      >
        <Ribbon tone="ivory" animated className="opacity-30" />

        <div className="relative flex h-48 w-48 items-center justify-center sm:h-56 sm:w-56">
          <motion.span
            className="absolute inset-0 rounded-full border border-gold/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          />
          <motion.span
            className="splash-ring-dashed absolute inset-4 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
          />
          <motion.span
            className="absolute inset-8 rounded-full border-2 border-gold/50"
            animate={{ scale: [1, 1.1, 1], opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
            aria-hidden
          >
            <motion.div
              className="h-full w-1/2 bg-gradient-to-r from-transparent via-gold/40 to-transparent"
              animate={{ x: ["-130%", "240%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.4, rotate: -18 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: easeLux, delay: 0.1 }}
            className="relative z-10"
          >
            <BrandMarkImage />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: easeLux, delay: 0.45 }}
          className="mt-8"
        >
          <StackedLogo variant="gold" size="md" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.95 }}
          className="mt-5 text-center font-display text-sm italic text-stone sm:text-base"
        >
          Beauty, right when you need it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.55, delay: 0.7 }}
          className="mt-10 h-0.5 w-52 origin-center overflow-hidden rounded-full bg-white/10"
        >
          <div className="h-full rounded-full bg-gold" style={{ width: `${progress}%` }} />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
          className="mt-2 text-[0.55rem] font-medium uppercase tracking-[0.22em] text-gold"
        >
          Loading {progress}%
        </motion.p>
      </motion.div>

      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-gold"
          style={{
            top: `${15 + i * 14}%`,
            left: i % 2 === 0 ? "10%" : "88%",
          }}
          animate={{ opacity: [0.15, 1, 0.15], scale: [0.6, 1.5, 0.6] }}
          transition={{ duration: 1.8 + i * 0.25, repeat: Infinity, delay: i * 0.35 }}
          aria-hidden
        />
      ))}
    </motion.div>
  );
}

function BrandMarkImage() {
  return (
    <Image
      src="/images/brand/icon-gold.png"
      alt=""
      width={96}
      height={96}
      priority
      className="h-20 w-20 drop-shadow-[0_0_32px_rgba(252,215,107,0.55)] sm:h-24 sm:w-24"
    />
  );
}

function SplashPortal({ onComplete }: { onComplete: () => void }) {
  const mounted = useMounted();
  const [portal, setPortal] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortal(document.body);
  }, []);

  if (!mounted || !portal) return null;
  return createPortal(<SplashOverlay onComplete={onComplete} />, portal);
}

export function SplashGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const onComplete = useCallback(() => setReady(true), []);

  return (
    <>
      {!ready && <SplashPortal onComplete={onComplete} />}
      <div className={ready ? "splash-revealed" : "splash-pending"}>{children}</div>
    </>
  );
}
