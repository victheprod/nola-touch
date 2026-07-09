"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/lib/cart/cart-context";
import { AccountProvider } from "@/lib/account/account-context";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { BeautyMatchGuide } from "@/components/beauty-match/beauty-match-guide";
import { SplashGate } from "@/components/brand/splash-screen";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SplashGate>
      <AccountProvider>
        <CartProvider>
          {children}
          <CartDrawer />
          <BeautyMatchGuide />
        </CartProvider>
      </AccountProvider>
    </SplashGate>
  );
}
