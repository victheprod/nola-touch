import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Ribbon } from "@/components/brand/ribbon";
import { Reveal } from "@/components/motion/reveal";
import { educationImage } from "@/data/images";
import { guides } from "@/data/guides";

export function Education() {
  return (
    <section
      className="relative overflow-hidden bg-champagne pb-20 pt-10 sm:pb-28 sm:pt-14"
      aria-labelledby="education-heading"
    >
      <Ribbon tone="onyx" animated={false} className="opacity-[0.14]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="relative z-10 lg:col-span-5 lg:-mt-20 xl:-mt-28">
            <div className="relative overflow-hidden bg-stone shadow-[0_32px_80px_rgba(0,0,0,0.18)] ring-1 ring-stone-line/60">
              <div className="relative aspect-[4/5] max-h-[28rem] lg:max-h-none">
                <Image
                  src={educationImage.src}
                  alt={educationImage.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-onyx/25 via-transparent to-transparent" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7 lg:pt-8">
            <p className="eyebrow text-gold-deep">Hair guides</p>
            <h2
              id="education-heading"
              className="mt-3 font-display text-3xl leading-tight tracking-tight text-onyx sm:text-4xl"
            >
              Pick the right product the first time
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              Straight guides on wig density, bundle counts, and protective style
              care — written for real shopping decisions.
            </p>

            <ul className="mt-8 space-y-5">
              {guides.map((g) => (
                <li key={g.slug} className="border-b border-stone-line/80 pb-5 last:border-0">
                  <Link href={`/learn/${g.slug}`} className="group block">
                    <h3 className="font-display text-lg text-onyx transition-colors group-hover:text-gold-deep">
                      {g.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">
                      {g.excerpt}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-charcoal group-hover:text-onyx">
                      {g.readTime}
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/learn"
              className="group mt-8 inline-flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-onyx"
            >
              All hair guides
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
