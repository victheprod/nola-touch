"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, staggerContainer, revealViewport } from "@/lib/motion";
import { useMounted } from "@/lib/use-mounted";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
  as?: "div" | "section" | "li" | "span";
};

/** Reveals children on scroll with a smooth, weighted fade-up. */
export function Reveal({
  children,
  className,
  delay = 0,
  variants = fadeUp,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as];
  const mounted = useMounted();
  return (
    <MotionTag
      className={className}
      initial={mounted ? "hidden" : false}
      whileInView="visible"
      viewport={revealViewport}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

/** Container that staggers the reveal of its RevealItem children. */
export function RevealGroup({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "ul";
}) {
  const MotionTag = motion[as];
  const mounted = useMounted();
  return (
    <MotionTag
      className={className}
      initial={mounted ? "hidden" : false}
      whileInView="visible"
      viewport={revealViewport}
      variants={staggerContainer}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  variants = fadeUp,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  as?: "div" | "li";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag className={className} variants={variants}>
      {children}
    </MotionTag>
  );
}
