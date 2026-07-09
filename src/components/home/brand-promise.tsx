import { ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

const promises = [
  {
    Icon: ShieldCheck,
    title: "Quality guarantee",
    body: "Every product is vetted for quality. If it's not right, we make it right — no questions asked.",
  },
  {
    Icon: Truck,
    title: "Ships in 1–3 days",
    body: "Fast, reliable shipping on every order from San Antonio, Texas. Free shipping on purchases over $75.",
  },
  {
    Icon: RefreshCw,
    title: "Easy returns",
    body: "30-day hassle-free returns on eligible items. Your satisfaction is non-negotiable.",
  },
];

export function BrandPromise() {
  return (
    <section
      className="border-y border-white/5 bg-onyx py-4 sm:py-0"
      aria-label="Our promise"
    >
      <RevealGroup className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-white/5 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {promises.map(({ Icon, title, body }) => (
          <RevealItem
            key={title}
            className="flex items-start gap-5 px-6 py-8 sm:px-8 sm:py-10"
          >
            <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
            <div>
              <h3 className="font-display text-lg text-ivory">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone">{body}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
