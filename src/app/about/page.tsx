import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/shop/page-hero";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { educationImage } from "@/data/images";

export const metadata: Metadata = {
  title: "About",
  description:
    "NOLA Touch is a student-centered beauty supply born at UTSA — local pickup, fast delivery, and beauty essentials right when you need them.",
};

const facts = [
  { value: "UTSA", label: "Where our story began" },
  { value: "Pickup", label: "Steps from campus" },
  { value: "1–3 days", label: "Fast local delivery" },
  { value: "500+", label: "Beauty essentials" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About NOLA Touch"
        title="Beauty, Right When You Need It."
        description="We're redefining what it means to shop for beauty essentials as a college student — proudly based in San Antonio, Texas."
        tone="dark"
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Opening */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <Reveal>
          <p className="font-display text-2xl leading-snug tracking-tight text-onyx sm:text-3xl">
            Looking and feeling your best shouldn&apos;t depend on whether you have a
            car, enough time between classes, or the ability to travel across the
            city to find a beauty supply store.
          </p>
          <p className="mt-6 text-base leading-relaxed text-muted">
            At NOLA Touch, we believe beauty should meet you where you are — not
            the other way around.
          </p>
        </Reveal>
      </section>

      {/* UTSA origin */}
      <section className="border-y border-border bg-champagne">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden bg-stone shadow-[0_32px_80px_rgba(0,0,0,0.12)]">
              <Image
                src={educationImage.src}
                alt={educationImage.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-onyx/50 via-transparent to-transparent" />
              <p className="absolute bottom-6 left-6 font-display text-xl italic text-ivory">
                Our story began at UTSA.
              </p>
            </div>
          </Reveal>
          <Reveal className="max-w-xl">
            <p className="eyebrow text-gold-deep">The problem</p>
            <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight text-onyx sm:text-4xl">
              When self-care isn&apos;t spontaneous
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-muted">
              <p>
                As a student living across from campus without reliable
                transportation, something as simple as buying braiding hair,
                shampoo, edge control, or other beauty essentials often became a
                frustrating experience.
              </p>
              <p>
                The nearest beauty supply store was over 30 minutes away — which
                meant planning hairstyles days in advance, ordering products online
                and waiting for shipping, or searching for someone who could give a
                ride. Spontaneous self-care simply wasn&apos;t an option.
              </p>
              <p className="font-display text-lg text-onyx">
                We knew there had to be a better way.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* The solution */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="max-w-xl lg:order-2">
            <p className="eyebrow text-gold-deep">The solution</p>
            <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight text-onyx sm:text-4xl">
              A beauty supply built for students
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-muted">
              <p>
                That&apos;s why we created NOLA Touch — a student-centered beauty
                supply store designed to make beauty more accessible. Through fast
                local delivery and convenient pickup just steps from UTSA,
                we&apos;re making it easier than ever for students to get the
                products they need, exactly when they need them.
              </p>
              <p>
                Whether you&apos;re getting ready for a protective style, restocking
                your wash day essentials, or facing a last-minute beauty emergency,
                NOLA Touch is here to make the process simple, fast, and
                stress-free.
              </p>
            </div>
            <Button variant="gold" size="lg" className="mt-8 rounded-full" asChild>
              <Link href="/shop">Shop essentials</Link>
            </Button>
          </Reveal>
          <Reveal className="lg:order-1">
            <div className="border border-stone-line bg-ivory p-8 sm:p-10">
              <p className="eyebrow text-gold-deep">Our mission</p>
              <h3 className="mt-3 font-display text-2xl text-onyx">
                Beyond selling products
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted">
                We&apos;re here to remove barriers, save students time, and support
                the confidence that comes from feeling prepared.
              </p>
              <ul className="mt-6 space-y-3 border-t border-stone-line pt-6">
                {[
                  "Fast local delivery across San Antonio",
                  "Convenient pickup near UTSA campus",
                  "Nationwide shipping when you need it",
                  "Curated essentials for textured hair",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-charcoal">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Vision + closing */}
      <section className="bg-onyx py-16 text-ivory sm:py-24">
        <Reveal className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="eyebrow text-gold">Looking ahead</p>
          <h2 className="mt-4 font-display text-3xl leading-tight tracking-tight sm:text-4xl">
            From UTSA to campuses everywhere
          </h2>
          <p className="mt-6 text-base leading-relaxed text-stone">
            Today, we&apos;re proudly serving the UTSA community with a vision to
            expand to college campuses across the country — bringing the same
            convenience, accessibility, and care to students everywhere.
          </p>
          <blockquote className="mt-12 border-t border-white/10 pt-10">
            <p className="font-display text-2xl italic leading-snug text-gold sm:text-3xl">
              Because beauty shouldn&apos;t have to wait.
            </p>
            <p className="mt-3 font-display text-xl text-ivory sm:text-2xl">
              It should be right where you are.
            </p>
          </blockquote>
        </Reveal>
      </section>

      <section className="border-t border-border bg-champagne py-16">
        <RevealGroup className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {facts.map((f) => (
            <RevealItem key={f.label} className="text-center">
              <p className="font-display text-4xl text-onyx sm:text-5xl">{f.value}</p>
              <p className="mt-2 text-sm text-muted">{f.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
    </>
  );
}
