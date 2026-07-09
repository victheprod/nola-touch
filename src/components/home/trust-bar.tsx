"use client";

import { useRef } from "react";
import { ShieldCheck, Truck, RefreshCw, Lock } from "lucide-react";
import { useInView } from "framer-motion";
import { useCountUp } from "@/lib/use-count-up";

const items = [
  { Icon: ShieldCheck, label: "Quality guarantee", stat: 100, suffix: "%", detail: "authentic brands" },
  { Icon: Truck, label: "Ships in 1–3 days", stat: 3, suffix: " days", detail: "avg. delivery" },
  { Icon: RefreshCw, label: "Easy 30-day returns", stat: 30, suffix: "", detail: "day window" },
  { Icon: Lock, label: "Secure checkout", stat: 4.9, suffix: "★", detail: "shopper rating", decimals: 1 },
];

function TrustMetric({
  Icon,
  label,
  stat,
  suffix,
  detail,
  decimals = 0,
}: (typeof items)[number]) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const value = useCountUp(stat, inView, { decimals });

  return (
    <div
      ref={ref}
      className="group flex flex-col items-center justify-center gap-2 bg-champagne px-4 py-5 transition-colors hover:bg-ivory sm:py-6"
    >
      <span className="glass-chip flex h-9 w-9 items-center justify-center">
        <Icon className="h-3.5 w-3.5 text-gold-deep" strokeWidth={1.75} />
      </span>
      <p className="font-display text-2xl tracking-tight text-onyx sm:text-[1.65rem]">
        {value}
        <span className="text-gold-deep">{suffix}</span>
      </p>
      <div className="text-center">
        <p className="text-[0.68rem] font-medium uppercase tracking-[0.1em] text-charcoal sm:text-xs">
          {label}
        </p>
        <p className="mt-0.5 text-[0.6rem] text-muted-soft">{detail}</p>
      </div>
    </div>
  );
}

export function TrustBar() {
  return (
    <section
      className="border-y border-stone-line bg-champagne"
      aria-label="Store guarantees"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-stone-line sm:grid-cols-4">
        {items.map((item) => (
          <TrustMetric key={item.label} {...item} />
        ))}
      </div>
    </section>
  );
}
