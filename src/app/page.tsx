import { Hero } from "@/components/home/hero";
import { TrustBar } from "@/components/home/trust-bar";
import { FeaturedCollections } from "@/components/home/featured-collections";
import { ProductRail } from "@/components/home/product-rail";
import { Education } from "@/components/home/education";
import { ReviewsSection } from "@/components/home/reviews-section";
import { Newsletter } from "@/components/home/newsletter";
import { bestSellers, newArrivals } from "@/data/catalog";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <FeaturedCollections />
      <ProductRail
        eyebrow="Best sellers"
        title="Most ordered right now"
        description="Wigs, bundles, and hair care our customers reorder."
        products={bestSellers}
        viewAllHref="/shop/best-sellers"
        tone="dark"
      />
      <ProductRail
        eyebrow="New arrivals"
        title="Just added this week"
        description="Fresh textures, lengths, and restocks."
        products={newArrivals}
        viewAllHref="/shop/new"
        tone="light"
      />
      <Education />
      <ReviewsSection />
      <Newsletter />
    </>
  );
}
