"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import { StarRating } from "@/components/ui/star-rating";
import { Ribbon } from "@/components/brand/ribbon";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { reviews, reviewStats } from "@/data/reviews";
import { reviewAvatars } from "@/data/images";
import { cn } from "@/lib/utils";

const featured = reviews.slice(0, 3);

export function ReviewsSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setActive((p) => (p + 1) % featured.length),
      6000,
    );
    return () => clearInterval(t);
  }, []);

  return (
    <section
      className="relative overflow-hidden bg-[#0D0D0D] py-20 text-ivory sm:py-28"
      aria-labelledby="reviews-heading"
    >
      <Ribbon tone="gold" className="opacity-[0.05]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <SectionHeading
            eyebrow="Real Reviews"
            title="What our customers say"
            align="center"
            tone="dark"
            id="reviews-heading"
          />
          <div className="flex items-center gap-3">
            <StarRating rating={reviewStats.average} size={18} />
            <span className="text-sm text-stone">
              <span className="font-semibold text-ivory">{reviewStats.average}</span>{" "}
              from {reviewStats.count.toLocaleString()} reviews
            </span>
          </div>
        </div>

        <RevealGroup className="mt-14 hidden gap-5 lg:grid lg:grid-cols-3">
          {featured.map((review) => (
            <RevealItem key={review.id}>
              <figure className="flex h-full flex-col border border-white/5 bg-[#111] p-8">
                <StarRating rating={review.rating} size={14} />
                <blockquote className="mt-5 flex-1 font-display text-[1.05rem] italic leading-[1.5] text-ivory">
                  &ldquo;{review.text}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/5 pt-5">
                  {reviewAvatars[review.id] && (
                    <Image
                      src={reviewAvatars[review.id]}
                      alt=""
                      width={36}
                      height={36}
                      className="h-9 w-9 rounded-full object-cover"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-ivory">{review.name}</p>
                    <p className="text-xs text-stone">{review.location}</p>
                  </div>
                  <p className="hidden text-[0.625rem] tracking-[0.1em] text-gold xl:block">
                    {review.product.split("—")[0]?.trim()}
                  </p>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Mobile carousel */}
        <div className="relative mt-10 min-h-[22rem] lg:hidden">
          {featured.map((review, i) => (
            <figure
              key={review.id}
              className={cn(
                "absolute inset-0 flex flex-col border border-white/5 bg-[#111] p-7 transition-all duration-500",
                i === active
                  ? "pointer-events-auto translate-x-0 opacity-100"
                  : "pointer-events-none translate-x-4 opacity-0",
              )}
            >
              <StarRating rating={review.rating} size={14} />
              <blockquote className="mt-4 flex-1 font-display text-lg italic leading-[1.5] text-ivory">
                &ldquo;{review.text}&rdquo;
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-white/5 pt-5">
                {reviewAvatars[review.id] && (
                  <Image
                    src={reviewAvatars[review.id]}
                    alt=""
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="text-sm font-medium text-ivory">{review.name}</p>
                  <p className="text-xs text-stone">{review.location}</p>
                </div>
              </figcaption>
            </figure>
          ))}
          <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2">
            {featured.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Review ${i + 1}`}
                onClick={() => setActive(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === active ? "w-6 bg-gold" : "w-1.5 bg-white/20",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
