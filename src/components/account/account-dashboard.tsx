"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  User,
  Package,
  Sparkles,
  MapPin,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAccount } from "@/lib/account/account-context";
import type { AccountTab } from "@/lib/account/types";
import type { BeautyMatchSubmission } from "@/lib/beauty-match/types";
import { Button } from "@/components/ui/button";

const NAV: { id: AccountTab; label: string; Icon: typeof User }[] = [
  { id: "overview", label: "Overview", Icon: LayoutDashboard },
  { id: "profile", label: "Profile", Icon: User },
  { id: "orders", label: "Orders", Icon: Package },
  { id: "matches", label: "Beauty Matches", Icon: Sparkles },
  { id: "addresses", label: "Addresses", Icon: MapPin },
];

export function AccountDashboard() {
  const { user, signOut, updateProfile, updatePassword } = useAccount();
  const [tab, setTab] = useState<AccountTab>("overview");

  if (!user) return null;

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[240px_1fr] lg:gap-12">
      <aside className="space-y-6">
        <div className="flex items-center gap-3 border border-border bg-ivory p-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-onyx font-display text-lg text-gold">
            {initials}
          </span>
          <div className="min-w-0">
            <p className="truncate font-display text-lg text-onyx">{user.name}</p>
            <p className="truncate text-xs text-muted">{user.email}</p>
          </div>
        </div>

        <nav className="flex flex-col gap-0.5" aria-label="Account">
          {NAV.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors cursor-pointer",
                tab === id
                  ? "bg-onyx text-ivory"
                  : "text-charcoal hover:bg-champagne",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
              {label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          onClick={signOut}
          className="flex w-full items-center gap-3 px-3 py-2.5 text-sm text-muted transition-colors hover:text-onyx cursor-pointer"
        >
          <LogOut className="h-4 w-4" strokeWidth={1.5} />
          Sign out
        </button>
      </aside>

      <div className="min-w-0 border border-border bg-ivory p-6 sm:p-8">
        {tab === "overview" && <OverviewTab userName={user.name} onNavigate={setTab} />}
        {tab === "profile" && (
          <ProfileTab
            user={user}
            onSave={updateProfile}
            onPassword={updatePassword}
          />
        )}
        {tab === "orders" && <OrdersTab />}
        {tab === "matches" && <MatchesTab email={user.email} />}
        {tab === "addresses" && (
          <AddressesTab address={user.address} onSave={(address) => updateProfile({ address })} />
        )}
      </div>
    </div>
  );
}

function OverviewTab({
  userName,
  onNavigate,
}: {
  userName: string;
  onNavigate: (tab: AccountTab) => void;
}) {
  const first = userName.split(" ")[0];
  return (
    <div>
      <h2 className="font-display text-2xl text-onyx">Welcome back, {first}</h2>
      <p className="mt-2 text-sm text-muted">
        Manage your profile, view Beauty Match results, and track orders.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {[
          { tab: "matches" as const, title: "Beauty Matches", desc: "Your saved consultations" },
          { tab: "orders" as const, title: "Orders", desc: "Track shipments & history" },
          { tab: "profile" as const, title: "Profile", desc: "Name, email & password" },
          { tab: "addresses" as const, title: "Shipping", desc: "Default delivery address" },
        ].map((card) => (
          <button
            key={card.tab}
            type="button"
            onClick={() => onNavigate(card.tab)}
            className="border border-stone-line bg-champagne/50 p-5 text-left transition-colors hover:border-gold-deep/40 hover:bg-champagne cursor-pointer"
          >
            <p className="font-display text-lg text-onyx">{card.title}</p>
            <p className="mt-1 text-sm text-muted">{card.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function ProfileTab({
  user,
  onSave,
  onPassword,
}: {
  user: { name: string; email: string; phone?: string };
  onSave: (p: { name?: string; phone?: string }) => void;
  onPassword: (c: string, n: string) => Promise<string | null>;
}) {
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone ?? "");
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  return (
    <div className="space-y-10">
      <section>
        <h2 className="font-display text-2xl text-onyx">Profile</h2>
        <p className="mt-1 text-sm text-muted">Update your personal details.</p>
        <form
          className="mt-6 max-w-md space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSave({ name, phone });
            setMsg("Profile saved.");
          }}
        >
          <AccountField label="Name" value={name} onChange={setName} />
          <div>
            <label className="field-label">Email</label>
            <p className="mt-1.5 text-sm text-muted">{user.email}</p>
          </div>
          <AccountField label="Phone" value={phone} onChange={setPhone} />
          <Button type="submit" variant="primary" size="md">
            Save profile
          </Button>
        </form>
      </section>

      <section className="border-t border-stone-line pt-10">
        <h3 className="font-display text-xl text-onyx">Password</h3>
        <form
          className="mt-4 max-w-md space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            const err = await onPassword(currentPw, newPw);
            setMsg(err ?? "Password updated.");
            if (!err) {
              setCurrentPw("");
              setNewPw("");
            }
          }}
        >
          <AccountField label="Current password" type="password" value={currentPw} onChange={setCurrentPw} />
          <AccountField label="New password" type="password" value={newPw} onChange={setNewPw} />
          <Button type="submit" variant="outline" size="md">
            Update password
          </Button>
        </form>
      </section>

      {msg && <p className="text-sm text-gold-deep">{msg}</p>}
    </div>
  );
}

function OrdersTab() {
  return (
    <div className="text-center py-8">
      <Package className="mx-auto h-10 w-10 text-muted-soft" strokeWidth={1} />
      <h2 className="mt-4 font-display text-2xl text-onyx">No orders yet</h2>
      <p className="mt-2 text-sm text-muted">
        When you check out, your order history will appear here.
      </p>
      <Button variant="gold" size="lg" className="mt-6 rounded-full" asChild>
        <Link href="/shop">Start shopping</Link>
      </Button>
    </div>
  );
}

function MatchesTab({ email }: { email: string }) {
  const [matches, setMatches] = useState<BeautyMatchSubmission[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("nola_beauty_match_submissions");
      const all = raw ? (JSON.parse(raw) as BeautyMatchSubmission[]) : [];
      setMatches(
        all
          .filter((m) => m.email.toLowerCase() === email.toLowerCase())
          .reverse(),
      );
    } catch {
      setMatches([]);
    }
  }, [email]);

  if (matches.length === 0) {
    return (
      <div className="py-8 text-center">
        <Sparkles className="mx-auto h-10 w-10 text-gold" strokeWidth={1} />
        <h2 className="mt-4 font-display text-2xl text-onyx">No saved matches</h2>
        <p className="mt-2 text-sm text-muted">
          Complete the Beauty Match Guide and save your results to see them here.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-display text-2xl text-onyx">Beauty Matches</h2>
      <p className="mt-1 text-sm text-muted">Your personalized consultations.</p>
      <ul className="mt-6 space-y-4">
        {matches.map((m, i) => (
          <li key={`${m.createdAt}-${i}`} className="border border-stone-line p-5">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-display text-lg text-onyx">{m.recommendedCategory}</p>
                <p className="text-xs text-muted">
                  {new Date(m.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              <span className="text-sm text-gold-deep">{m.priceRange}</span>
            </div>
            <p className="mt-3 text-sm text-muted line-clamp-2">
              {m.recommendedProducts.join(" · ")}
            </p>
            <Button variant="outline" size="sm" className="mt-4" asChild>
              <Link href={m.shopHref}>Shop this edit</Link>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AddressesTab({
  address,
  onSave,
}: {
  address?: { line1: string; line2?: string; city: string; state: string; zip: string };
  onSave: (a: { line1: string; line2?: string; city: string; state: string; zip: string }) => void;
}) {
  const [line1, setLine1] = useState(address?.line1 ?? "");
  const [line2, setLine2] = useState(address?.line2 ?? "");
  const [city, setCity] = useState(address?.city ?? "");
  const [state, setState] = useState(address?.state ?? "TX");
  const [zip, setZip] = useState(address?.zip ?? "");
  const [saved, setSaved] = useState(false);

  return (
    <div>
      <h2 className="font-display text-2xl text-onyx">Shipping address</h2>
      <p className="mt-1 text-sm text-muted">Default address for faster checkout.</p>
      <form
        className="mt-6 max-w-md space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          onSave({
            line1,
            line2: line2 || undefined,
            city,
            state,
            zip,
          });
          setSaved(true);
        }}
      >
        <AccountField label="Street address" value={line1} onChange={setLine1} />
        <AccountField label="Apt, suite (optional)" value={line2} onChange={setLine2} />
        <div className="grid gap-4 sm:grid-cols-2">
          <AccountField label="City" value={city} onChange={setCity} />
          <AccountField label="State" value={state} onChange={setState} />
        </div>
        <AccountField label="ZIP code" value={zip} onChange={setZip} />
        <Button type="submit" variant="primary" size="md">
          Save address
        </Button>
        {saved && <p className="text-sm text-gold-deep">Address saved.</p>}
      </form>
    </div>
  );
}

function AccountField({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="field-label">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 h-11 w-full border border-stone-line bg-ivory px-3 text-sm focus:border-gold-deep focus:outline-none"
      />
    </div>
  );
}
