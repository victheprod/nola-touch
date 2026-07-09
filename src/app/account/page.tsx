import type { Metadata } from "next";
import { PageHero } from "@/components/shop/page-hero";
import { AccountPageClient } from "@/components/account/account-page-client";

export const metadata: Metadata = {
  title: "Account",
  description:
    "Sign in to your Nola Touch account — manage your profile, orders, and Beauty Match results.",
};

export default function AccountPage() {
  return (
    <>
      <PageHero
        eyebrow="Account"
        title="Your Nola Touch account"
        description="Sign in to track orders, save Beauty Match results, and manage your profile."
        crumbs={[{ label: "Home", href: "/" }, { label: "Account" }]}
        tone="dark"
      />
      <section className="bg-champagne py-12 sm:py-16">
        <AccountPageClient />
      </section>
    </>
  );
}
