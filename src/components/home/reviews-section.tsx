import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { StarRating } from "@/components/ui/star-rating";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { reviews, reviewStats } from "@/data/reviews";
import { reviewAvatars } from "@/data/images";

export function ReviewsSection() {
  return (
    <section
      className="bg-ivory py-16 text-onyx sm:py-24"
      aria-labelledby="reviews-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-3 text-center">
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
        </div>

        <RevealGroup className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {reviews.map((review) => (
            <RevealItem key={review.id}>
              <figure className="flex h-full flex-col border border-stone-line bg-white p-6 sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <StarRating rating={review.rating} size={13} />
                  {review.verified && (
                    <span className="inline-flex items-center gap-1 text-[0.6rem] font-medium uppercase tracking-[0.1em] text-gold-deep">
                      <BadgeCheck className="h-3.5 w-3.5" />
                      Verified
                    </span>
                  )}
                </div>
                <blockquote className="mt-4 flex-1 text-[0.92rem] leading-relaxed text-charcoal">
                  &ldquo;{review.text}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-stone-line pt-4">
                  {reviewAvatars[review.id] && (
                    <Image
                      src={reviewAvatars[review.id]}
                      alt=""
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-onyx">{review.name}</p>
                    <p className="text-xs text-muted">{review.location}</p>
                    <p className="mt-0.5 truncate text-[0.65rem] text-muted-soft">
                      {review.product}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
