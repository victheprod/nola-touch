import { ShieldCheck, Truck, RefreshCw } from "lucide-react";

const props = [
  { Icon: ShieldCheck, title: "Quality guarantee", sub: "Vetted, stylist-approved" },
  { Icon: Truck, title: "Ships in 1–3 days", sub: "Tracked to your door" },
  { Icon: RefreshCw, title: "Easy returns", sub: "30 days, unopened items" },
];

export function ValueProps() {
  return (
    <section className="border-y border-border bg-champagne" aria-label="Store benefits">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-px px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
        {props.map(({ Icon, title, sub }) => (
          <div
            key={title}
            className="flex items-center gap-3 py-5 lg:justify-center"
          >
            <Icon className="h-5 w-5 shrink-0 text-gold-deep" strokeWidth={1.5} />
            <div>
              <p className="text-[0.8rem] font-medium text-onyx">{title}</p>
              <p className="text-xs text-muted">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
