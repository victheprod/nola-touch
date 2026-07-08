import { BadgeCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { StarRating } from "@/components/ui/star-rating";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { reviews, reviewStats } from "@/data/reviews";

export function ReviewsSection() {
  return (
    <section className="bg-onyx py-20 text-ivory sm:py-28" aria-labelledby="reviews-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <SectionHeading
            eyebrow="Customer Reviews"
            title="Loved by thousands of customers"
            align="center"
            tone="dark"
            id="reviews-heading"
          />
          <div className="flex items-center gap-3">
            <StarRating rating={reviewStats.average} size={18} />
            <span className="text-sm text-stone">
              <span className="font-semibold text-ivory">
                {reviewStats.average}
              </span>{" "}
              from {reviewStats.count.toLocaleString()} reviews
            </span>
          </div>
        </div>

        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <RevealItem key={review.id}>
              <figure className="flex h-full flex-col border border-white/10 bg-white/[0.03] p-7">
                <StarRating rating={review.rating} size={14} />
                <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-stone">
                  &ldquo;{review.text}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-white/10 pt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-ivory">
                      {review.name}
                    </span>
                    {review.verified && (
                      <span className="inline-flex items-center gap-1 text-[0.65rem] uppercase tracking-[0.1em] text-gold">
                        <BadgeCheck className="h-3.5 w-3.5" /> Verified
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-muted-soft">
                    {review.location} · {review.product}
                  </p>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
