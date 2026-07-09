"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AccountUser } from "./types";
import {
  changePassword,
  getSessionUserId,
  loadUserById,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
} from "./storage";

type AccountContextValue = {
  user: AccountUser | null;
  ready: boolean;
  signUp: (input: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  }) => Promise<string | null>;
  signIn: (email: string, password: string) => Promise<string | null>;
  signOut: () => void;
  updateProfile: (
    patch: Partial<Pick<AccountUser, "name" | "phone" | "address">>,
  ) => void;
  updatePassword: (
    current: string,
    next: string,
  ) => Promise<string | null>;
};

const AccountContext = createContext<AccountContextValue | null>(null);

export function AccountProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AccountUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = getSessionUserId();
    if (id) setUser(loadUserById(id));
    setReady(true);
  }, []);

  const signUp = useCallback(async (input: Parameters<AccountContextValue["signUp"]>[0]) => {
    const result = await registerUser(input);
    if (!result.ok) return result.error;
    setUser(result.user);
    return null;
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const result = await loginUser(email, password);
    if (!result.ok) return result.error;
    setUser(result.user);
    return null;
  }, []);

  const signOut = useCallback(() => {
    logoutUser();
    setUser(null);
  }, []);

  const updateProfile = useCallback(
    (patch: Partial<Pick<AccountUser, "name" | "phone" | "address">>) => {
      if (!user) return;
      const next = updateUser(user.id, patch);
      if (next) setUser(next);
    },
    [user],
  );

  const updatePassword = useCallback(
    async (current: string, next: string) => {
      if (!user) return "Not signed in.";
      const result = await changePassword(user.id, current, next);
      return result.ok ? null : result.error;
    },
    [user],
  );

  const value = useMemo(
    () => ({ user, ready, signUp, signIn, signOut, updateProfile, updatePassword }),
    [user, ready, signUp, signIn, signOut, updateProfile, updatePassword],
  );

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}

export function useAccount() {
  const ctx = useContext(AccountContext);
  if (!ctx) throw new Error("useAccount must be used within AccountProvider");
  return ctx;
}
