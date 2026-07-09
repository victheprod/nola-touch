"use client";

import { useEffect, useRef, useState } from "react";

export function useCountUp(
  target: number,
  active: boolean,
  { duration = 1400, decimals = 0 }: { duration?: number; decimals?: number } = {},
) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setValue(target);
      return;
    }

    let frame = 0;
    const start = performance.now();

    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = target * eased;
      setValue(decimals ? Number(next.toFixed(decimals)) : Math.round(next));
      if (t < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration, decimals]);

  return value;
}
