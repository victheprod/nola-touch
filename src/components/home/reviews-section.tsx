"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BadgeCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { StarRating } from "@/components/ui/star-rating";
import { Reveal } from "@/components/motion/reveal";
import { crossfade, easeLux } from "@/lib/motion";
import { reviews, reviewStats } from "@/data/reviews";
import { reviewAvatars } from "@/data/images";

const SLIDE_MS = 7000;

export function ReviewsSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((next: number) => {
    setProgress(0);
    setIndex((next + reviews.length) % reviews.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const tick = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          go(index + 1);
          return 0;
        }
        return p + 100 / (SLIDE_MS / 50);
      });
    }, 50);
    timer.current = tick;
    return () => clearInterval(tick);
  }, [paused, index, go]);

  const review = reviews[index];

  return (
    <section
      className="bg-ivory py-16 text-onyx sm:py-24"
      aria-labelledby="reviews-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col items-center gap-3 text-center">
          <SectionHeading
            eyebrow="Customer reviews"
            title="Trusted by real shoppers"
            align="center"
            id="reviews-heading"
          />
          <div className="flex items-center gap-2.5">
            <StarRating rating={reviewStats.average} size={16} />
            <span className="text-sm text-muted">
              <span className="font-semibold text-onyx">{reviewStats.average}</span>{" "}
              · {reviewStats.count.toLocaleString()} reviews
            </span>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          {/* Featured quote — editorial pull-quote layout */}
          <div className="relative lg:col-span-7">
            <span className="absolute -left-1 top-0 hidden h-full w-px bg-gold/40 lg:block" aria-hidden />
            <AnimatePresence mode="wait">
              <motion.figure
                key={review.id}
                variants={crossfade}
                initial="enter"
                animate="center"
                exit="exit"
                className="relative"
              >
                <span className="font-display text-6xl leading-none text-gold/25" aria-hidden>
                  &ldquo;
                </span>
                <blockquote className="-mt-6 font-display text-2xl leading-snug tracking-tight text-onyx sm:text-3xl lg:text-[2rem] lg:leading-[1.25]">
                  {review.text}
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  {reviewAvatars[review.id] && (
                    <Image
                      src={reviewAvatars[review.id]}
                      alt=""
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full object-cover ring-2 ring-gold/30"
                    />
                  )}
                  <div>
                    <p className="text-sm font-medium text-onyx">{review.name}</p>
                    <p className="text-xs text-muted">{review.location}</p>
                    <p className="mt-1 text-[0.65rem] text-muted-soft">{review.product}</p>
                  </div>
                  {review.verified && (
                    <span className="ml-auto hidden items-center gap-1 text-[0.6rem] font-medium uppercase tracking-[0.1em] text-gold-deep sm:inline-flex">
                      <BadgeCheck className="h-3.5 w-3.5" />
                      Verified
                    </span>
                  )}
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            <div className="mt-8 flex items-center gap-4">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous review"
                className="flex h-10 w-10 items-center justify-center border border-stone-line text-onyx transition-colors hover:border-onyx cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next review"
                className="flex h-10 w-10 items-center justify-center border border-stone-line text-onyx transition-colors hover:border-onyx cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Progress rail + supporting quotes */}
          <div className="lg:col-span-5">
            <div className="flex flex-col gap-3">
              {reviews.map((r, i) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => go(i)}
                  className="group text-left cursor-pointer"
                  aria-label={`Read review from ${r.name}`}
                >
                  <div className="h-px w-full bg-stone-line">
                    <motion.div
                      className="h-px bg-gold"
                      initial={false}
                      animate={{ width: i === index ? `${progress}%` : i < index ? "100%" : "0%" }}
                      transition={{ duration: 0.15, ease: easeLux }}
                    />
                  </div>
                  <p
                    className={`mt-3 text-[0.7rem] font-medium uppercase tracking-[0.12em] transition-colors ${
                      i === index ? "text-gold-deep" : "text-muted-soft group-hover:text-muted"
                    }`}
                  >
                    {r.name}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-charcoal/80">
                    {r.text}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
