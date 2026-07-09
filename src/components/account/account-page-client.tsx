"use client";

import { AccountAuth } from "@/components/account/account-auth";
import { AccountDashboard } from "@/components/account/account-dashboard";
import { useAccount } from "@/lib/account/account-context";

export function AccountPageClient() {
  const { user, ready } = useAccount();

  if (!ready) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-20 text-center text-sm text-muted">
        Loading your account…
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {user ? <AccountDashboard /> : <AccountAuth />}
    </div>
  );
}
