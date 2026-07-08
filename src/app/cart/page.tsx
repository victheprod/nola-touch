"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, Lock, ArrowLeft } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart/cart-context";
import { Button } from "@/components/ui/button";
import { ProductSurface } from "@/components/shop/product-surface";
import { Reveal } from "@/components/motion/reveal";

const FREE_SHIPPING = 75;

export default function CartPage() {
  const { items, subtotal, count, updateQuantity, removeItem, keyFor } = useCart();

  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING ? 0 : 5;
  const estimatedTax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = subtotal + shipping + estimatedTax;

  if (items.length === 0) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 py-20 text-center">
        <ShoppingBag className="h-10 w-10 text-muted-soft" strokeWidth={1} />
        <h1 className="mt-6 font-display text-3xl text-onyx">Your bag is empty</h1>
        <p className="mt-3 text-muted">
          Discover wigs, bundles, hair care, and beauty essentials curated for
          you.
        </p>
        <Button variant="gold" size="lg" className="mt-8" asChild>
          <Link href="/shop">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="flex items-end justify-between">
        <h1 className="font-display text-4xl tracking-tight text-onyx sm:text-5xl">
          Your Bag
        </h1>
        <span className="text-sm text-muted">
          {count} {count === 1 ? "item" : "items"}
        </span>
      </div>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
        {/* Line items */}
        <div>
          <ul className="flex flex-col border-t border-border">
            {items.map((item) => {
              const key = keyFor(item.slug, item.option);
              return (
                <li key={key} className="flex gap-5 border-b border-border py-6">
                  <Link href={`/products/${item.slug}`} className="shrink-0">
                    <ProductSurface
                      surface={item.surface}
                      className="h-32 w-26 sm:h-36 sm:w-30"
                      markClassName="h-8 w-8"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-4">
                      <div>
                        <Link
                          href={`/products/${item.slug}`}
                          className="font-display text-lg leading-snug text-onyx hover:text-gold-deep"
                        >
                          {item.name}
                        </Link>
                        {item.option && (
                          <p className="mt-1 text-sm text-muted">{item.option}</p>
                        )}
                      </div>
                      <span className="font-semibold text-onyx">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-4">
                      <div className="flex items-center border border-border">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() =>
                            updateQuantity(item.slug, item.option, item.quantity - 1)
                          }
                          className="flex h-9 w-9 items-center justify-center text-muted transition-colors hover:text-onyx cursor-pointer"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-9 text-center text-sm">{item.quantity}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() =>
                            updateQuantity(item.slug, item.option, item.quantity + 1)
                          }
                          className="flex h-9 w-9 items-center justify-center text-muted transition-colors hover:text-onyx cursor-pointer"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.slug, item.option)}
                        className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.1em] text-muted transition-colors hover:text-[#8a2b2b] cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} /> Remove
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.12em] text-onyx"
          >
            <ArrowLeft className="h-4 w-4" /> Continue shopping
          </Link>
        </div>

        {/* Summary */}
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <div className="border border-border bg-champagne/50 p-7">
            <h2 className="font-display text-2xl text-onyx">Order Summary</h2>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Subtotal</dt>
                <dd className="font-medium text-onyx">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Shipping</dt>
                <dd className="font-medium text-onyx">
                  {shipping === 0 ? "Free" : formatPrice(shipping)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Estimated tax</dt>
                <dd className="font-medium text-onyx">{formatPrice(estimatedTax)}</dd>
              </div>
            </dl>

            <div className="mt-5 flex items-center justify-between border-t border-border pt-5">
              <span className="font-display text-lg text-onyx">Total</span>
              <span className="font-display text-2xl text-onyx">
                {formatPrice(total)}
              </span>
            </div>

            {subtotal < FREE_SHIPPING && (
              <p className="mt-4 bg-ivory px-4 py-3 text-xs text-muted">
                Add {formatPrice(FREE_SHIPPING - subtotal)} more to qualify for
                free shipping.
              </p>
            )}

            <Button variant="gold" size="lg" className="mt-6 w-full">
              <Lock className="h-4 w-4" strokeWidth={1.75} /> Secure Checkout
            </Button>
            <p className="mt-3 text-center text-xs text-muted">
              Taxes and shipping calculated at checkout. Encrypted &amp; secure.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
