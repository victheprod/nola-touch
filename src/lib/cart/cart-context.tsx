"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import type { Surface } from "@/data/catalog";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  surface: Surface;
  option?: string;
  quantity: number;
};

type CartState = { items: CartItem[] };

type CartAction =
  | { type: "ADD"; item: CartItem }
  | { type: "REMOVE"; key: string }
  | { type: "UPDATE_QTY"; key: string; quantity: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; items: CartItem[] };

const STORAGE_KEY = "nola-touch-cart";

function itemKey(slug: string, option?: string) {
  return option ? `${slug}::${option}` : slug;
}

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { items: action.items };
    case "ADD": {
      const key = itemKey(action.item.slug, action.item.option);
      const existing = state.items.find(
        (i) => itemKey(i.slug, i.option) === key,
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            itemKey(i.slug, i.option) === key
              ? { ...i, quantity: i.quantity + action.item.quantity }
              : i,
          ),
        };
      }
      return { items: [...state.items, action.item] };
    }
    case "REMOVE":
      return {
        items: state.items.filter(
          (i) => itemKey(i.slug, i.option) !== action.key,
        ),
      };
    case "UPDATE_QTY":
      return {
        items: state.items
          .map((i) =>
            itemKey(i.slug, i.option) === action.key
              ? { ...i, quantity: Math.max(0, action.quantity) }
              : i,
          )
          .filter((i) => i.quantity > 0),
      };
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (slug: string, option?: string) => void;
  updateQuantity: (slug: string, option: string | undefined, quantity: number) => void;
  clear: () => void;
  keyFor: (slug: string, option?: string) => string;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage once on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "HYDRATE", items: JSON.parse(raw) });
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
  }, []);

  // Persist on change (after hydration to avoid clobbering).
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // ignore quota / private mode
    }
  }, [state.items, hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const count = state.items.reduce((n, i) => n + i.quantity, 0);
    const subtotal = state.items.reduce((s, i) => s + i.price * i.quantity, 0);
    return {
      items: state.items,
      count,
      subtotal,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem: (item) => {
        dispatch({ type: "ADD", item: { ...item, quantity: item.quantity ?? 1 } });
        setIsOpen(true);
      },
      removeItem: (slug, option) =>
        dispatch({ type: "REMOVE", key: itemKey(slug, option) }),
      updateQuantity: (slug, option, quantity) =>
        dispatch({ type: "UPDATE_QTY", key: itemKey(slug, option), quantity }),
      clear: () => dispatch({ type: "CLEAR" }),
      keyFor: itemKey,
    };
  }, [state.items, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
