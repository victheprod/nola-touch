import { HeartHandshake, BadgeCheck, Truck, MessagesSquare } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

const promises = [
  {
    Icon: HeartHandshake,
    title: "Curated for Black women",
    body: "Every product is selected with textured hair, protective styles, and real routines in mind — not a generic catalog.",
  },
  {
    Icon: BadgeCheck,
    title: "Quality you can trust",
    body: "We stock the brands stylists actually use, from salon-grade hair to the drugstore staples that perform.",
  },
  {
    Icon: Truck,
    title: "Fast, reliable shipping",
    body: "Orders ship in 1–2 business days with tracking. Free shipping on orders over $75.",
  },
  {
    Icon: MessagesSquare,
    title: "Real human support",
    body: "Questions about texture, length, or install? Our team replies within 24 hours — no bots.",
  },
];

export function BrandPromise() {
  return (
    <section className="border-y border-border bg-champagne py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Nola Touch"
          title="Built for how you actually shop for hair"
          description="We're not a faceless marketplace. Here's what you can count on with every order."
          align="center"
          className="mx-auto"
        />

        <RevealGroup className="mt-14 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {promises.map(({ Icon, title, body }) => (
            <RevealItem
              key={title}
              className="flex flex-col bg-ivory p-8"
            >
              <Icon className="h-6 w-6 text-gold-deep" strokeWidth={1.25} />
              <h3 className="mt-5 font-display text-xl text-onyx">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
