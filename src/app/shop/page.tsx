import type { Metadata } from "next";
import { PageHero } from "@/components/shop/page-hero";
import { ShopBrowser } from "@/components/shop/shop-browser";
import { collections, products } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Shop All",
  description:
    "Shop wigs, bundles, hair care, styling, tools, and beauty essentials — curated for Black women.",
};

export default function ShopPage() {
  return (
    <>
      <PageHero
        eyebrow="Shop All"
        title="Everything you need, in one place"
        description="Browse the full collection — filter by category and sort to find your next favorite."
        crumbs={[{ label: "Home", href: "/" }, { label: "Shop" }]}
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <ShopBrowser products={products} collections={collections} />
      </div>
    </>
  );
}
