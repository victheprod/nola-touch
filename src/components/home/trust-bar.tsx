import { ShieldCheck, Truck, RefreshCw, Lock } from "lucide-react";

const items = [
  { Icon: ShieldCheck, label: "Quality guarantee" },
  { Icon: Truck, label: "Ships in 1–3 days" },
  { Icon: RefreshCw, label: "Easy 30-day returns" },
  { Icon: Lock, label: "Secure checkout" },
];

export function TrustBar() {
  return (
    <section
      className="border-y border-stone-line bg-champagne"
      aria-label="Store guarantees"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-stone-line sm:grid-cols-4">
        {items.map(({ Icon, label }) => (
          <div
            key={label}
            className="flex items-center justify-center gap-2.5 bg-champagne px-4 py-4 sm:py-5"
          >
            <Icon className="h-4 w-4 shrink-0 text-gold-deep" strokeWidth={1.5} />
            <span className="text-[0.7rem] font-medium uppercase tracking-[0.1em] text-charcoal sm:text-xs">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
