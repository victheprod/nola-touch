import type { Variants, Transition } from "framer-motion";

// Apple-inspired easing — smooth, weighted deceleration.
export const easeLux: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const easeSoft: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const transitionLux: Transition = {
  duration: 0.8,
  ease: easeLux,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeLux },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: easeSoft } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: easeLux },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

// Viewport config for scroll-reveal — reveal once, slightly before fully in view.
export const revealViewport = { once: true, margin: "-80px" } as const;

export const crossfade: Variants = {
  enter: { opacity: 0, scale: 1.02 },
  center: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: easeLux },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.4, ease: easeSoft },
  },
};

export const gridItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeLux },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.25, ease: easeSoft },
  },
};
