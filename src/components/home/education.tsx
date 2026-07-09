import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { educationImage } from "@/data/images";
import { guides } from "@/data/guides";

export function Education() {
  const featured = guides[0];

  return (
    <section className="bg-onyx py-20 text-ivory sm:py-28" aria-labelledby="education-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <Reveal className="relative overflow-hidden bg-[#111]">
            <div className="relative aspect-[4/5]">
              <Image
                src={educationImage.src}
                alt={educationImage.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="eyebrow text-gold">Hair Guide</p>
            <h2
              id="education-heading"
              className="mt-4 font-display text-[2.25rem] leading-[1.08] tracking-[-0.01em] sm:text-4xl lg:text-5xl"
            >
              Know before
              <br />
              <span className="italic text-gold">you buy</span>
            </h2>

            <div className="mt-10 space-y-8">
              {guides.map((g, i) => (
                <div
                  key={g.slug}
                  className="flex gap-6 border-b border-white/5 pb-8 last:border-0 last:pb-0"
                >
                  <span className="mt-0.5 shrink-0 font-display text-sm italic text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-lg text-ivory">{g.title}</h3>
                    <p className="mt-2 text-sm leading-[1.8] text-stone">{g.excerpt}</p>
                    <Link
                      href={`/learn/${g.slug}`}
                      className="mt-3 inline-flex items-center gap-1.5 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-gold transition-colors hover:text-ivory"
                    >
                      Read guide
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href={`/learn/${featured.slug}`}
              className="group mt-10 inline-flex items-center gap-2.5 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-ivory transition-colors hover:text-gold"
            >
              Full hair guide
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
