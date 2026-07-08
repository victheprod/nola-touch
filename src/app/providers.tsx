"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/lib/cart/cart-context";
import { CartDrawer } from "@/components/cart/cart-drawer";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
    </CartProvider>
  );
}
