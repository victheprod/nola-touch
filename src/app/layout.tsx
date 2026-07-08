import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Providers } from "./providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nolatouch.com"),
  title: {
    default: "Nola Touch — Premium Beauty Supply for Black Women",
    template: "%s · Nola Touch",
  },
  description:
    "Nola Touch is a digital beauty supply store for Black women — wigs, extensions, hair care, styling products, and beauty essentials. Quality brands, fast shipping, and real support.",
  keywords: [
    "beauty supply for Black women",
    "HD lace wigs",
    "human hair bundles",
    "edge control",
    "hair care",
    "Nola Touch",
  ],
  openGraph: {
    title: "Nola Touch — Premium Beauty Supply for Black Women",
    description:
      "Wigs, extensions, hair care, styling, and beauty essentials — curated for Black women.",
    type: "website",
    siteName: "Nola Touch",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-ivory text-onyx antialiased">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
