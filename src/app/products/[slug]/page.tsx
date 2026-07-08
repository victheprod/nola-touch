import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Truck, RefreshCw, ShieldCheck, Star } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import {
  getProduct,
  products,
  relatedProducts,
} from "@/data/catalog";
import { ProductGallery } from "@/components/shop/product-gallery";
import { ProductPurchase } from "@/components/shop/product-purchase";
import { ProductGrid } from "@/components/shop/product-grid";
import { StarRating } from "@/components/ui/star-rating";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Params = { slug: string };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Not Found" };
  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = relatedProducts(product);
  const discount = product.compareAt
    ? Math.round((1 - product.price / product.compareAt) * 100)
    : 0;

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-border">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8"
        >
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
            <li>
              <Link href="/" className="hover:text-onyx">
                Home
              </Link>
            </li>
            <ChevronRight className="h-3 w-3" />
            <li>
              <Link href="/shop" className="hover:text-onyx">
                Shop
              </Link>
            </li>
            <ChevronRight className="h-3 w-3" />
            <li>
              <Link
                href={`/shop/${product.collection}`}
                className="hover:text-onyx"
              >
                {product.collectionName}
              </Link>
            </li>
            <ChevronRight className="h-3 w-3" />
            <li className="truncate text-onyx">{product.name}</li>
          </ol>
        </nav>
      </div>

      {/* Product */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <ProductGallery surface={product.surface} badge={product.badge} />
          </div>

          <div className="flex flex-col">
            <p className="eyebrow text-gold-deep">{product.collectionName}</p>
            <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight text-onyx sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-4 flex items-center gap-3">
              <StarRating rating={product.rating} size={16} />
              <Link href="#reviews" className="text-sm text-muted underline-offset-4 hover:underline">
                {product.rating} · {product.reviewCount} reviews
              </Link>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <span className="font-display text-3xl text-onyx">
                {formatPrice(product.price)}
              </span>
              {product.compareAt && (
                <>
                  <span className="text-lg text-muted-soft line-through">
                    {formatPrice(product.compareAt)}
                  </span>
                  <Badge variant="sale">Save {discount}%</Badge>
                </>
              )}
            </div>

            <p className="mt-5 text-base leading-relaxed text-muted">
              {product.description}
            </p>

            <div className="mt-8">
              <ProductPurchase product={product} />
            </div>

            {/* Trust row */}
            <div className="mt-8 grid grid-cols-3 gap-3 border-y border-border py-5 text-center">
              <div className="flex flex-col items-center gap-1.5">
                <Truck className="h-5 w-5 text-gold-deep" strokeWidth={1.5} />
                <span className="text-[0.7rem] leading-tight text-muted">
                  Free shipping
                  <br />
                  over $75
                </span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <RefreshCw className="h-5 w-5 text-gold-deep" strokeWidth={1.5} />
                <span className="text-[0.7rem] leading-tight text-muted">
                  30-day
                  <br />
                  returns
                </span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <ShieldCheck className="h-5 w-5 text-gold-deep" strokeWidth={1.5} />
                <span className="text-[0.7rem] leading-tight text-muted">
                  Secure
                  <br />
                  checkout
                </span>
              </div>
            </div>

            {/* Details accordion */}
            <Accordion type="single" collapsible className="mt-6" defaultValue="details">
              <AccordionItem value="details">
                <AccordionTrigger>Product Details</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {product.details.map((d) => (
                      <li key={d} className="flex items-start gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold-deep" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping">
                <AccordionTrigger>Shipping & Returns</AccordionTrigger>
                <AccordionContent>
                  Orders ship within 1–2 business days with tracking. Free
                  standard shipping on orders over $75; a flat $5 applies below
                  that. Unopened items can be returned within 30 days. Due to
                  hygiene standards, opened hair and beauty products are final
                  sale.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="care">
                <AccordionTrigger>Care & Use</AccordionTrigger>
                <AccordionContent>
                  Store hair units on a wig stand and wrap with a satin scarf or
                  bonnet overnight. Wash with sulfate-free products, air dry when
                  possible, and use a heat protectant before styling to extend
                  the life of your product.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      {/* Reviews snapshot */}
      <section
        id="reviews"
        className="border-t border-border bg-champagne py-16 sm:py-20"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-5 w-5 fill-gold text-gold"
                strokeWidth={1.5}
              />
            ))}
          </div>
          <p className="mt-4 font-display text-3xl text-onyx sm:text-4xl">
            {product.rating} out of 5
          </p>
          <p className="mt-2 text-sm text-muted">
            Based on {product.reviewCount} verified customer reviews
          </p>
        </div>
      </section>

      {/* Related */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 font-display text-2xl text-onyx sm:text-3xl">
            You may also like
          </h2>
          <ProductGrid products={related} />
        </div>
      </section>
    </>
  );
}
