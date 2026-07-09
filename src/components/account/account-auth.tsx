"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { BrandMark } from "@/components/brand/brand-mark";
import { Button } from "@/components/ui/button";
import { useAccount } from "@/lib/account/account-context";
import { easeLux } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { heroImage } from "@/data/images";

type Mode = "signin" | "signup";

export function AccountAuth() {
  const { signIn, signUp } = useAccount();
  const [mode, setMode] = useState<Mode>("signin");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const err =
      mode === "signin"
        ? await signIn(email, password)
        : await signUp({ name, email, password, phone: phone || undefined });
    setLoading(false);
    if (err) setError(err);
  };

  return (
    <div className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-5xl overflow-hidden border border-border bg-ivory lg:grid-cols-2 lg:min-h-[640px]">
      {/* Editorial panel */}
      <div className="relative hidden min-h-[280px] bg-onyx lg:block">
        <Image
          src={heroImage.src}
          alt=""
          fill
          className="object-cover opacity-50"
          sizes="512px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/60 to-onyx/30" />
        <div className="relative flex h-full flex-col justify-between p-10">
          <BrandMark asset="icon" variant="gold" className="h-10 w-10" />
          <div>
            <div className="flex items-center gap-2 text-gold">
              <Sparkles className="h-4 w-4" strokeWidth={1.5} />
              <span className="text-[0.58rem] font-semibold uppercase tracking-[0.2em]">
                Your account
              </span>
            </div>
            <h2 className="mt-3 font-display text-3xl leading-tight text-ivory">
              Your crown,
              <br />
              <span className="italic text-gold">your account.</span>
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone">
              Track orders, save your Beauty Match results, and manage shipping
              from San Antonio, Texas.
            </p>
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-14">
        <div className="mb-8 flex gap-1 rounded-full border border-border bg-champagne p-1">
          {(["signin", "signup"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setMode(m);
                setError(null);
              }}
              className={cn(
                "flex-1 rounded-full py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] transition-all cursor-pointer",
                mode === m
                  ? "bg-onyx text-ivory shadow-sm"
                  : "text-muted hover:text-onyx",
              )}
            >
              {m === "signin" ? "Sign in" : "Create account"}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.form
            key={mode}
            initial={{ opacity: 0, x: mode === "signin" ? -8 : 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: mode === "signin" ? 8 : -8 }}
            transition={{ duration: 0.35, ease: easeLux }}
            onSubmit={submit}
            className="space-y-4"
          >
            {mode === "signup" && (
              <Field label="Full name" id="name" value={name} onChange={setName} autoComplete="name" />
            )}
            <Field
              label="Email"
              id="email"
              type="email"
              value={email}
              onChange={setEmail}
              autoComplete="email"
            />
            {mode === "signup" && (
              <Field
                label="Phone (optional)"
                id="phone"
                type="tel"
                value={phone}
                onChange={setPhone}
                autoComplete="tel"
              />
            )}
            <Field
              label="Password"
              id="password"
              type="password"
              value={password}
              onChange={setPassword}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
            />

            {error && (
              <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
                {error}
              </p>
            )}

            <Button
              type="submit"
              variant="gold"
              size="lg"
              className="mt-2 w-full rounded-full"
              disabled={loading}
            >
              {loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
            </Button>
          </motion.form>
        </AnimatePresence>

        <p className="mt-6 text-center text-[0.65rem] leading-relaxed text-muted-soft">
          Accounts are stored locally for now — ready to connect to Shopify Customer
          Accounts or Supabase when you&apos;re ready.
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  id,
  type = "text",
  value,
  onChange,
  autoComplete,
}: {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-[0.58rem] font-medium uppercase tracking-[0.16em] text-charcoal">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        required={id !== "phone"}
        className="mt-1.5 h-11 w-full border border-stone-line bg-ivory px-3 text-sm text-onyx focus:border-gold-deep focus:outline-none"
      />
    </div>
  );
}
