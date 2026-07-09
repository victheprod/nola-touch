import { Hero } from "@/components/home/hero";
import { TrustBar } from "@/components/home/trust-bar";
import { FeaturedCollections } from "@/components/home/featured-collections";
import { ProductRail } from "@/components/home/product-rail";
import { Education } from "@/components/home/education";
import { ReviewsSection } from "@/components/home/reviews-section";
import { Newsletter } from "@/components/home/newsletter";
import { StoryBridge, StoryWeave } from "@/components/home/story-flow";
import { bestSellers, newArrivals } from "@/data/catalog";

export default function HomePage() {
  return (
    <div className="home-story relative overflow-x-hidden">
      {/* Act I — arrival */}
      <Hero />
      <TrustBar />
      <StoryBridge from="champagne" to="onyx" ribbon height="md" />

      {/* Act II — discovery */}
      <FeaturedCollections />
      <StoryWeave tone="onyx" />
      <ProductRail
        eyebrow="Best sellers"
        title="Most ordered right now"
        description="Wigs, bundles, and hair care our customers reorder."
        products={bestSellers}
        viewAllHref="/shop/best-sellers"
        tone="dark"
        flow="continue"
      />

      <StoryBridge from="dark" to="ivory" height="lg" marquee />
      <ProductRail
        eyebrow="New arrivals"
        title="Just added this week"
        description="Fresh textures, lengths, and restocks."
        products={newArrivals}
        viewAllHref="/shop/new"
        tone="light"
        flow="lift"
      />

      {/* Act III — knowledge */}
      <StoryBridge from="ivory" to="champagne" ribbon height="md" />
      <Education />

      {/* Act IV — trust & close */}
      <StoryBridge from="champagne" to="ivory" height="sm" />
      <ReviewsSection />
      <StoryBridge from="ivory" to="onyx" ribbon height="lg" />
      <Newsletter />
    </div>
  );
}
