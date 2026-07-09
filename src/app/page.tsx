import { Hero } from "@/components/home/hero";
import { CategoryTicker } from "@/components/home/category-ticker";
import { FeaturedCollections } from "@/components/home/featured-collections";
import { ProductRail } from "@/components/home/product-rail";
import { BrandPromise } from "@/components/home/brand-promise";
import { Education } from "@/components/home/education";
import { ReviewsSection } from "@/components/home/reviews-section";
import { Newsletter } from "@/components/home/newsletter";
import { bestSellers, newArrivals } from "@/data/catalog";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryTicker />
      <FeaturedCollections />
      <ProductRail
        eyebrow="Most Loved"
        title="Best sellers"
        description="The products our customers reorder again and again."
        products={bestSellers}
        viewAllHref="/shop/best-sellers"
        tone="dark"
      />
      <BrandPromise />
      <ProductRail
        eyebrow="Just In"
        title="New arrivals"
        description="Fresh textures, lengths, and brands added this week."
        products={newArrivals}
        viewAllHref="/shop/new"
        tone="dark"
      />
      <Education />
      <ReviewsSection />
      <Newsletter />
    </>
  );
}
