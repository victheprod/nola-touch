import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/shop/page-hero";
import { ProductGrid } from "@/components/shop/product-grid";
import {
  bestSellers,
  collections,
  getCollection,
  getProductsByCollection,
  newArrivals,
  type Product,
} from "@/data/catalog";

type Params = { collection: string };

// Virtual collections that aren't in the catalog list.
const virtual: Record<
  string,
  { title: string; eyebrow: string; description: string; items: Product[] }
> = {
  new: {
    title: "New Arrivals",
    eyebrow: "Just Dropped",
    description:
      "The latest textures, lengths, and brands to land at Nola Touch — added weekly.",
    items: newArrivals,
  },
  "best-sellers": {
    title: "Best Sellers",
    eyebrow: "Top Picks",
    description:
      "The products our customers reorder again and again — tested and stylist-approved.",
    items: bestSellers,
  },
};

export function generateStaticParams() {
  return [
    ...collections.map((c) => ({ collection: c.slug })),
    { collection: "new" },
    { collection: "best-sellers" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { collection } = await params;
  const v = virtual[collection];
  if (v) return { title: v.title, description: v.description };
  const c = getCollection(collection);
  if (!c) return { title: "Not Found" };
  return { title: c.name, description: c.description };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { collection } = await params;
  const v = virtual[collection];
  const c = getCollection(collection);

  if (!v && !c) notFound();

  const title = v ? v.title : c!.name;
  const eyebrow = v ? v.eyebrow : "Collection";
  const description = v ? v.description : c!.description;
  const items = v ? v.items : getProductsByCollection(collection);

  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        tone="dark"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: title },
        ]}
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <p className="text-sm text-muted">{items.length} products</p>
        </div>
        {items.length > 0 ? (
          <ProductGrid products={items} />
        ) : (
          <p className="py-20 text-center text-muted">
            Nothing here yet — check back soon.
          </p>
        )}
      </div>

      {/* Other collections */}
      <section className="border-t border-border bg-champagne py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow mb-5 text-gold-deep">Keep exploring</p>
          <div className="flex flex-wrap gap-3">
            {collections
              .filter((col) => col.slug !== collection)
              .map((col) => (
                <a
                  key={col.slug}
                  href={`/shop/${col.slug}`}
                  className="border border-border bg-ivory px-4 py-2.5 text-sm font-medium text-onyx transition-colors hover:border-onyx"
                >
                  {col.name}
                </a>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}

export const dynamicParams = true;
