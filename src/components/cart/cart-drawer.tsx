"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart/cart-context";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ProductSurface } from "@/components/shop/product-surface";

const FREE_SHIPPING_THRESHOLD = 75;

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    openCart,
    subtotal,
    count,
    updateQuantity,
    removeItem,
    keyFor,
  } = useCart();

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <Sheet open={isOpen} onOpenChange={(o) => (o ? openCart() : closeCart())}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
            Your Bag {count > 0 && <span className="text-muted">({count})</span>}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag className="h-8 w-8 text-muted-soft" strokeWidth={1} />
            <p className="font-display text-xl text-onyx">Your bag is empty</p>
            <p className="max-w-xs text-sm text-muted">
              Explore wigs, bundles, and beauty essentials curated for you.
            </p>
            <Button variant="gold" onClick={closeCart} asChild>
              <Link href="/shop">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Free shipping progress */}
            <div className="border-b border-border px-6 py-4">
              <p className="text-xs text-muted">
                {remaining > 0 ? (
                  <>
                    You&apos;re {formatPrice(remaining)} away from{" "}
                    <span className="font-medium text-onyx">free shipping</span>
                  </>
                ) : (
                  <span className="font-medium text-gold-deep">
                    You&apos;ve unlocked free shipping.
                  </span>
                )}
              </p>
              <div className="mt-2 h-1 w-full overflow-hidden bg-stone">
                <div
                  className="h-full bg-gold transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              <ul className="flex flex-col divide-y divide-border">
                {items.map((item) => {
                  const key = keyFor(item.slug, item.option);
                  return (
                    <li key={key} className="flex gap-4 py-4">
                      <Link
                        href={`/products/${item.slug}`}
                        onClick={closeCart}
                        className="shrink-0"
                      >
                        <ProductSurface
                          surface={item.surface}
                          className="h-24 w-20"
                          markClassName="h-6 w-6"
                        />
                      </Link>
                      <div className="flex flex-1 flex-col">
                        <Link
                          href={`/products/${item.slug}`}
                          onClick={closeCart}
                          className="font-display text-sm leading-snug text-onyx hover:text-gold-deep"
                        >
                          {item.name}
                        </Link>
                        {item.option && (
                          <p className="mt-1 text-xs text-muted">{item.option}</p>
                        )}
                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="flex items-center border border-border">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              onClick={() =>
                                updateQuantity(item.slug, item.option, item.quantity - 1)
                              }
                              className="flex h-8 w-8 items-center justify-center text-muted transition-colors hover:text-onyx cursor-pointer"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              onClick={() =>
                                updateQuantity(item.slug, item.option, item.quantity + 1)
                              }
                              className="flex h-8 w-8 items-center justify-center text-muted transition-colors hover:text-onyx cursor-pointer"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold text-onyx">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                            <button
                              type="button"
                              aria-label="Remove item"
                              onClick={() => removeItem(item.slug, item.option)}
                              className="text-muted-soft transition-colors hover:text-[#8a2b2b] cursor-pointer"
                            >
                              <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="border-t border-border px-6 py-5">
              <div className="flex items-center justify-between">
                <span className="text-sm uppercase tracking-[0.1em] text-muted">
                  Subtotal
                </span>
                <span className="font-display text-xl text-onyx">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted">
                Shipping & taxes calculated at checkout.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <Button variant="gold" size="lg" onClick={closeCart} asChild>
                  <Link href="/cart">Checkout</Link>
                </Button>
                <Button variant="ghost" size="sm" onClick={closeCart}>
                  Continue Shopping
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
