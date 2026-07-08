"use client";

import { useEffect, useState } from "react";

/**
 * Returns true after the component has mounted on the client.
 * Used to gate Framer Motion `initial` states so the server-rendered HTML
 * stays visible (no hydration mismatch, works without JS), while entrance
 * animations still play once hydrated.
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
