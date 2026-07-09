"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/lib/cart/cart-context";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { BeautyMatchGuide } from "@/components/beauty-match/beauty-match-guide";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
      <BeautyMatchGuide />
    </CartProvider>
  );
}
