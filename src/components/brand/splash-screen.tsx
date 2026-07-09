"use client";

import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Ribbon } from "@/components/brand/ribbon";
import { StackedLogo } from "@/components/brand/stacked-logo";
import { easeLux } from "@/lib/motion";
import { useMounted } from "@/lib/use-mounted";

type SplashVariant = "intro" | "transition";

const SPLASH_CONFIG = {
  intro: { minMs: 3800, exitMs: 1000 },
  transition: { minMs: 1200, exitMs: 450 },
} as const;

function SplashOverlay({
  variant,
  onComplete,
}: {
  variant: SplashVariant;
  onComplete: () => void;
}) {
  const { minMs, exitMs } = SPLASH_CONFIG[variant];
  const isIntro = variant === "intro";

  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    document.body.classList.add("splash-active");
    document.body.style.overflow = "hidden";

    const start = Date.now();
    let frame = 0;

    const tick = () => {
      const elapsed = Date.now() - start;
      setProgress(Math.min(100, Math.round((elapsed / minMs) * 100)));
      if (elapsed < minMs) {
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
  }, [minMs]);

  useEffect(() => {
    if (!exiting) return;
    const t = setTimeout(onComplete, exitMs);
    return () => clearTimeout(t);
  }, [exiting, exitMs, onComplete]);

  return (
    <motion.div
      className="splash-screen fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-onyx"
      role="status"
      aria-live="polite"
      aria-label={isIntro ? "Loading Nola Touch" : "Loading page"}
      initial={false}
      animate={exiting ? "exit" : "visible"}
      variants={{ visible: {}, exit: {} }}
    >
      {isIntro ? (
        <>
          <motion.div
            className="splash-curtain absolute inset-y-0 left-0 z-20 w-1/2 bg-onyx"
            variants={{
              visible: { x: 0 },
              exit: { x: "-100%", transition: { duration: exitMs / 1000, ease: easeLux } },
            }}
          />
          <motion.div
            className="splash-curtain absolute inset-y-0 right-0 z-20 w-1/2 bg-onyx"
            variants={{
              visible: { x: 0 },
              exit: { x: "100%", transition: { duration: exitMs / 1000, ease: easeLux } },
            }}
          />
        </>
      ) : (
        <motion.div
          className="absolute inset-0 z-20 bg-onyx"
          variants={{
            visible: { opacity: 1 },
            exit: { opacity: 0, transition: { duration: exitMs / 1000, ease: easeLux } },
          }}
        />
      )}

      <motion.div
        className="relative z-30 flex flex-col items-center px-6"
        animate={exiting ? { opacity: 0, scale: isIntro ? 1.04 : 1.02 } : { opacity: 1, scale: 1 }}
        transition={{ duration: isIntro ? 0.5 : 0.3, ease: easeLux }}
      >
        {isIntro && <Ribbon tone="ivory" animated className="opacity-30" />}

        <div
          className={
            isIntro
              ? "relative flex h-48 w-48 items-center justify-center sm:h-56 sm:w-56"
              : "relative flex h-28 w-28 items-center justify-center sm:h-32 sm:w-32"
          }
        >
          <motion.span
            className="absolute inset-0 rounded-full border border-gold/30"
            animate={{ rotate: 360 }}
            transition={{ duration: isIntro ? 7 : 4, repeat: Infinity, ease: "linear" }}
          />
          {isIntro && (
            <motion.span
              className="splash-ring-dashed absolute inset-4 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
            />
          )}
          <motion.span
            className={
              isIntro
                ? "absolute inset-8 rounded-full border-2 border-gold/50"
                : "absolute inset-3 rounded-full border border-gold/45"
            }
            animate={{ scale: [1, 1.08, 1], opacity: [0.35, 1, 0.35] }}
            transition={{ duration: isIntro ? 2.2 : 1.4, repeat: Infinity, ease: "easeInOut" }}
          />

          {isIntro && (
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
          )}

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: isIntro ? 1 : 0.45, ease: easeLux, delay: isIntro ? 0.1 : 0 }}
            className="relative z-10"
          >
            <BrandMarkImage compact={!isIntro} />
          </motion.div>
        </div>

        {isIntro ? (
          <>
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
          </>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="mt-5 text-[0.6rem] font-medium uppercase tracking-[0.28em] text-gold/90"
          >
            Nola Touch
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: isIntro ? 0.55 : 0.3, delay: isIntro ? 0.7 : 0.1 }}
          className={`origin-center overflow-hidden rounded-full bg-white/10 ${
            isIntro ? "mt-10 h-0.5 w-52" : "mt-6 h-px w-36"
          }`}
        >
          <div className="h-full rounded-full bg-gold" style={{ width: `${progress}%` }} />
        </motion.div>

        {isIntro && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
            className="mt-2 text-[0.55rem] font-medium uppercase tracking-[0.22em] text-gold"
          >
            Loading {progress}%
          </motion.p>
        )}
      </motion.div>

      {isIntro &&
        [0, 1, 2, 3, 4].map((i) => (
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

function BrandMarkImage({ compact }: { compact?: boolean }) {
  return (
    <Image
      src="/images/brand/icon-gold.png"
      alt=""
      width={compact ? 64 : 96}
      height={compact ? 64 : 96}
      priority
      className={
        compact
          ? "h-14 w-14 drop-shadow-[0_0_20px_rgba(252,215,107,0.45)] sm:h-16 sm:w-16"
          : "h-20 w-20 drop-shadow-[0_0_32px_rgba(252,215,107,0.55)] sm:h-24 sm:w-24"
      }
    />
  );
}

function SplashPortal({
  variant,
  splashKey,
  onComplete,
}: {
  variant: SplashVariant;
  splashKey: number;
  onComplete: () => void;
}) {
  const mounted = useMounted();
  const [portal, setPortal] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortal(document.body);
  }, []);

  if (!mounted || !portal) return null;
  return createPortal(
    <SplashOverlay key={splashKey} variant={variant} onComplete={onComplete} />,
    portal,
  );
}

export function SplashGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  const [introDone, setIntroDone] = useState(false);
  const [navigating, setNavigating] = useState(false);
  const [splashKey, setSplashKey] = useState(0);

  useEffect(() => {
    if (pathname === prevPathname.current) return;
    prevPathname.current = pathname;

    if (!introDone) return;

    setSplashKey((k) => k + 1);
    setNavigating(true);
  }, [pathname, introDone]);

  const showSplash = !introDone || navigating;
  const variant: SplashVariant = introDone ? "transition" : "intro";

  const onComplete = useCallback(() => {
    if (!introDone) {
      setIntroDone(true);
    }
    setNavigating(false);
  }, [introDone]);

  return (
    <>
      {showSplash && (
        <SplashPortal
          variant={variant}
          splashKey={splashKey}
          onComplete={onComplete}
        />
      )}
      <div className={showSplash ? "splash-pending" : "splash-revealed"}>{children}</div>
    </>
  );
}
