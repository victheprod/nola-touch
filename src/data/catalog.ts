export type Surface = "onyx" | "champagne" | "gold" | "stone";

export type Collection = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  surface: Surface;
  productCount: number;
};

export type Product = {
  slug: string;
  name: string;
  collection: string; // collection slug
  collectionName: string;
  price: number;
  compareAt?: number;
  rating: number;
  reviewCount: number;
  badge?: "Best Seller" | "New" | "Limited" | "Restocked";
  surface: Surface;
  shortDescription: string;
  description: string;
  options?: {
    label: string;
    values: string[];
  };
  details: string[];
  featured?: boolean;
};

export const collections: Collection[] = [
  {
    slug: "wigs",
    name: "Wigs",
    tagline: "Glueless, HD lace & ready-to-wear",
    description:
      "Hand-selected lace front, glueless, and full units in natural textures — built for everyday wear and effortless installs.",
    surface: "onyx",
    productCount: 84,
  },
  {
    slug: "extensions",
    name: "Bundles & Extensions",
    tagline: "Virgin & raw hair by the bundle",
    description:
      "Wefted bundles, closures, and frontals in virgin and raw hair. Minimal shedding, holds a curl, and blends with your natural texture.",
    surface: "onyx",
    productCount: 112,
  },
  {
    slug: "hair-care",
    name: "Hair Care",
    tagline: "Cleanse, condition & protect",
    description:
      "Shampoos, conditioners, oils, and treatments formulated for textured hair, protective styles, and scalp health.",
    surface: "champagne",
    productCount: 96,
  },
  {
    slug: "styling",
    name: "Styling",
    tagline: "Edges, hold & finish",
    description:
      "Edge control, mousse, gel, and heat protectants that lay edges, define curls, and hold through the day.",
    surface: "gold",
    productCount: 68,
  },
  {
    slug: "tools",
    name: "Tools & Accessories",
    tagline: "Bonnets, wraps & essentials",
    description:
      "Satin bonnets, wig grips, edge brushes, and the everyday tools that keep your style and your natural hair protected.",
    surface: "stone",
    productCount: 54,
  },
  {
    slug: "beauty",
    name: "Beauty Essentials",
    tagline: "Lashes, nails & finishing",
    description:
      "Lashes, press-on nails, skincare, and finishing products to complete the look from hairline to fingertips.",
    surface: "champagne",
    productCount: 72,
  },
];

export const products: Product[] = [
  // Wigs
  {
    slug: "hd-lace-body-wave-22",
    name: "13×6 HD Lace Front Wig — Body Wave, 22″",
    collection: "wigs",
    collectionName: "Wigs",
    price: 189,
    compareAt: 229,
    rating: 4.9,
    reviewCount: 214,
    badge: "Best Seller",
    surface: "onyx",
    shortDescription: "Pre-plucked HD lace, 180% density, glueless-ready.",
    description:
      "Our most-reordered unit. A 13×6 HD lace front with a pre-plucked hairline and 180% density for a full, natural look. The transparent HD lace melts into most skin tones with minimal work, and the adjustable straps and combs make it wearable straight out of the box.",
    options: { label: "Length", values: ["18″", "20″", "22″", "24″", "26″"] },
    details: [
      "100% virgin human hair",
      "13×6 HD transparent lace",
      "180% density, pre-plucked hairline",
      "Adjustable straps + 3 combs",
      "Can be dyed, bleached, and heat-styled",
    ],
    featured: true,
  },
  {
    slug: "glueless-kinky-curly-18",
    name: "Glueless 5×5 HD Lace Wig — Kinky Curly, 18″",
    collection: "wigs",
    collectionName: "Wigs",
    price: 215,
    rating: 4.8,
    reviewCount: 47,
    badge: "New",
    surface: "onyx",
    shortDescription: "Beginner-friendly, no glue required.",
    description:
      "A glueless 5×5 closure wig with a kinky-curly pattern that mirrors natural 4A–4B texture. The elastic band and adjustable straps hold the unit securely without adhesive — install in minutes, take it off at night.",
    options: { label: "Length", values: ["16″", "18″", "20″", "22″"] },
    details: [
      "100% virgin human hair",
      "5×5 HD closure, glueless construction",
      "Elastic band + adjustable straps",
      "150% density",
      "Reusable, low-maintenance",
    ],
    featured: true,
  },
  {
    slug: "deep-wave-frontal-26",
    name: "13×4 Lace Frontal Wig — Deep Wave, 26″",
    collection: "wigs",
    collectionName: "Wigs",
    price: 249,
    rating: 4.7,
    reviewCount: 92,
    surface: "onyx",
    shortDescription: "Long, full deep-wave with a natural hairline.",
    description:
      "A statement 26″ deep-wave frontal wig with defined, bouncy waves and a natural-looking hairline. Full 200% density for maximum volume that photographs beautifully.",
    options: { label: "Length", values: ["22″", "24″", "26″", "28″"] },
    details: [
      "100% virgin human hair",
      "13×4 transparent lace frontal",
      "200% density",
      "Pre-plucked with baby hairs",
      "Bleachable knots",
    ],
  },
  {
    slug: "silk-press-bob-12",
    name: "Ready-to-Wear Silk Press Bob — 12″",
    collection: "wigs",
    collectionName: "Wigs",
    price: 159,
    rating: 4.8,
    reviewCount: 63,
    badge: "Restocked",
    surface: "onyx",
    shortDescription: "Sleek blunt bob, minimal styling needed.",
    description:
      "A polished, blunt-cut silk-press bob that comes styled and ready to wear. Ideal for a clean, professional look with almost no heat styling required.",
    options: { label: "Length", values: ["10″", "12″", "14″"] },
    details: [
      "100% human hair, silk-pressed",
      "4×4 closure",
      "Pre-styled blunt cut",
      "150% density",
    ],
  },

  // Extensions
  {
    slug: "brazilian-body-wave-set",
    name: "Brazilian Body Wave Bundle Set — 18″/20″/22″",
    collection: "extensions",
    collectionName: "Bundles & Extensions",
    price: 145,
    compareAt: 175,
    rating: 4.8,
    reviewCount: 178,
    badge: "Best Seller",
    surface: "onyx",
    shortDescription: "Three double-drawn bundles, minimal shedding.",
    description:
      "A three-bundle set of Brazilian body wave in graduated lengths for a full sew-in. Double-drawn wefts mean thick ends and minimal shedding — a stylist favorite that holds a curl wash after wash.",
    options: { label: "Bundle Deal", values: ["3 Bundles", "3 + Closure", "3 + Frontal"] },
    details: [
      "100% virgin Brazilian hair",
      "Double-drawn, double-wefted",
      "18″ / 20″ / 22″ included",
      "Can be colored and heat-styled",
      "Minimal shedding & tangling",
    ],
    featured: true,
  },
  {
    slug: "raw-cambodian-straight-20",
    name: "Raw Cambodian Straight Bundle — 20″",
    collection: "extensions",
    collectionName: "Bundles & Extensions",
    price: 89,
    rating: 4.9,
    reviewCount: 31,
    badge: "New",
    surface: "onyx",
    shortDescription: "Single raw bundle, thick from root to tip.",
    description:
      "Ethically sourced raw Cambodian straight hair, sold by the single bundle. Naturally thick and coarse with full ends — pairs beautifully with a raw closure for a seamless install.",
    options: { label: "Length", values: ["16″", "18″", "20″", "22″", "24″"] },
    details: [
      "100% raw Cambodian hair",
      "Single donor, natural texture",
      "Thick from root to tip",
      "Lasts 2+ years with care",
    ],
    featured: true,
  },
  {
    slug: "hd-lace-closure-4x4",
    name: "HD Lace Closure 4×4 — Body Wave",
    collection: "extensions",
    collectionName: "Bundles & Extensions",
    price: 65,
    rating: 4.7,
    reviewCount: 88,
    surface: "onyx",
    shortDescription: "Finish any sew-in with a natural parting.",
    description:
      "A 4×4 HD lace closure to complete your bundle install with a realistic parting and hairline. Free-part construction lets you style it in any direction.",
    options: { label: "Length", values: ["14″", "16″", "18″"] },
    details: ["100% virgin human hair", "4×4 HD lace", "Free-part", "Pre-plucked"],
  },
  {
    slug: "clip-in-kinky-straight",
    name: "Clip-In Extensions — Kinky Straight, 7 pcs",
    collection: "extensions",
    collectionName: "Bundles & Extensions",
    price: 119,
    rating: 4.6,
    reviewCount: 54,
    surface: "onyx",
    shortDescription: "Add length in minutes, no install needed.",
    description:
      "A seven-piece clip-in set in a kinky-straight texture that blends with relaxed or blown-out natural hair. Secure clips add instant length and volume for the day.",
    options: { label: "Length", values: ["14″", "16″", "18″", "20″"] },
    details: ["100% human hair", "7-piece set", "Sturdy stainless clips", "Reusable"],
  },

  // Hair Care
  {
    slug: "melanin-leave-in",
    name: "Melanin Haircare Multi-Use Softening Leave-In",
    collection: "hair-care",
    collectionName: "Hair Care",
    price: 24,
    rating: 4.9,
    reviewCount: 342,
    badge: "Best Seller",
    surface: "champagne",
    shortDescription: "Softens and detangles without buildup.",
    description:
      "A lightweight leave-in that softens, detangles, and adds slip to textured hair without leaving 4C hair crunchy. Works on wash day and refresh days alike.",
    details: [
      "8 oz",
      "Sulfate & paraben free",
      "Safe for color-treated hair",
      "Black-owned brand",
    ],
    featured: true,
  },
  {
    slug: "mielle-rosemary-mint-oil",
    name: "Mielle Rosemary Mint Scalp & Hair Oil",
    collection: "hair-care",
    collectionName: "Hair Care",
    price: 11.99,
    rating: 4.8,
    reviewCount: 156,
    badge: "New",
    surface: "champagne",
    shortDescription: "Nourishes the scalp and strengthens strands.",
    description:
      "A cult-favorite scalp and hair strengthening oil infused with biotin. Massage into the scalp to soothe dryness and support healthy growth.",
    details: ["2 oz", "Infused with biotin", "For all hair types", "Tingle-free"],
  },
  {
    slug: "hydrating-deep-conditioner",
    name: "Intensive Hydrating Deep Conditioner",
    collection: "hair-care",
    collectionName: "Hair Care",
    price: 18,
    rating: 4.8,
    reviewCount: 121,
    surface: "champagne",
    shortDescription: "Weekly moisture mask for dry, brittle hair.",
    description:
      "A rich, slip-heavy deep conditioner for weekly wash-day treatments. Restores moisture to dry, brittle, or heat-stressed hair in 10 minutes.",
    details: ["12 oz", "Shea butter + argan oil", "Sulfate free", "Detangling"],
  },
  {
    slug: "sulfate-free-shampoo",
    name: "Gentle Sulfate-Free Clarifying Shampoo",
    collection: "hair-care",
    collectionName: "Hair Care",
    price: 16,
    rating: 4.7,
    reviewCount: 98,
    surface: "champagne",
    shortDescription: "Cleanses buildup without stripping.",
    description:
      "A gentle clarifying shampoo that removes product buildup and excess oil without stripping natural moisture — safe for regular use on protective styles.",
    details: ["12 oz", "Sulfate free", "pH balanced", "Safe for extensions"],
  },

  // Styling
  {
    slug: "style-factor-edge-control",
    name: "Edge Control — Extra Hold, 4 oz",
    collection: "styling",
    collectionName: "Styling",
    price: 8.49,
    rating: 4.6,
    reviewCount: 203,
    badge: "Best Seller",
    surface: "gold",
    shortDescription: "Lays edges with no flaking or white residue.",
    description:
      "A maximum-hold edge control that lays and sculpts baby hairs with a high-shine finish — no flaking, no white residue, and it doesn't harden the hairline.",
    details: ["4 oz", "24-hour hold", "No flaking", "Biotin infused"],
    featured: true,
  },
  {
    slug: "eco-styler-olive-oil",
    name: "Eco Styler Olive Oil Styling Gel — 16 oz",
    collection: "styling",
    collectionName: "Styling",
    price: 6.99,
    rating: 4.7,
    reviewCount: 891,
    surface: "gold",
    shortDescription: "Defined, frizz-free wash-and-go's.",
    description:
      "The staple styling gel for defined wash-and-go's, sleek buns, and slick-backs. Firm hold with olive oil to keep hair conditioned, not crunchy.",
    details: ["16 oz", "Max hold", "Olive oil infused", "Non-flaking"],
  },
  {
    slug: "curl-defining-mousse",
    name: "Curl Defining Mousse — Lightweight Hold",
    collection: "styling",
    collectionName: "Styling",
    price: 14,
    rating: 4.7,
    reviewCount: 77,
    badge: "New",
    surface: "gold",
    shortDescription: "Bouncy, touchable curl definition.",
    description:
      "A lightweight mousse that defines curls and coils with soft, touchable hold and zero crunch. Layer over leave-in for a frizz-free wash-and-go.",
    details: ["7 oz", "Alcohol free", "Humidity resistant", "Adds shine"],
  },
  {
    slug: "heat-protectant-spray",
    name: "Thermal Heat Protectant Spray",
    collection: "styling",
    collectionName: "Styling",
    price: 12,
    rating: 4.8,
    reviewCount: 64,
    surface: "gold",
    shortDescription: "Shields up to 450°F for silk presses.",
    description:
      "A fine-mist heat protectant that shields hair up to 450°F for silk presses and blowouts, sealing the cuticle for a smoother, longer-lasting finish.",
    details: ["6 oz", "Protects to 450°F", "Weightless", "Adds shine"],
  },

  // Tools & Accessories
  {
    slug: "double-layer-satin-bonnet",
    name: "Double-Layer Satin Sleep Bonnet",
    collection: "tools",
    collectionName: "Tools & Accessories",
    price: 15,
    rating: 4.9,
    reviewCount: 260,
    badge: "Best Seller",
    surface: "stone",
    shortDescription: "Protects styles overnight, stays on.",
    description:
      "An extra-large double-layer satin bonnet that protects wigs, silk presses, and natural styles overnight. A wide, non-slip band stays put while you sleep.",
    options: { label: "Size", values: ["Regular", "Large", "Jumbo"] },
    details: ["Double-layer satin", "Non-slip band", "Fits all styles", "Machine washable"],
    featured: true,
  },
  {
    slug: "wig-grip-band",
    name: "Adjustable Wig Grip Band — Velvet",
    collection: "tools",
    collectionName: "Tools & Accessories",
    price: 12,
    rating: 4.7,
    reviewCount: 143,
    surface: "stone",
    shortDescription: "Keeps glueless units secure all day.",
    description:
      "A velvet-lined wig grip that holds glueless units securely without adhesive and takes pressure off your hairline. Adjustable hook closure for a custom fit.",
    details: ["Velvet lined", "Adjustable closure", "Protects edges", "Comfortable all-day wear"],
  },
  {
    slug: "edge-brush-dual",
    name: "Dual-Sided Edge Brush & Comb",
    collection: "tools",
    collectionName: "Tools & Accessories",
    price: 7,
    rating: 4.6,
    reviewCount: 89,
    surface: "stone",
    shortDescription: "Lay and sculpt precise baby hairs.",
    description:
      "A dual-sided tool with firm boar-style bristles and a fine-tooth comb for laying, sculpting, and detailing edges with precision.",
    details: ["Firm bristles + comb", "Precise control", "Durable handle"],
  },

  // Beauty
  {
    slug: "mink-lashes-wispy",
    name: "3D Faux Mink Lashes — Wispy, 5 Pairs",
    collection: "beauty",
    collectionName: "Beauty Essentials",
    price: 22,
    rating: 4.8,
    reviewCount: 112,
    badge: "New",
    surface: "champagne",
    shortDescription: "Reusable, natural-looking volume.",
    description:
      "A five-pair set of lightweight 3D faux-mink lashes in a wispy style that adds natural volume. Reusable up to 15 wears with proper care.",
    details: ["5 pairs", "Faux mink", "Reusable 15×", "Cruelty free"],
  },
  {
    slug: "press-on-nails-almond",
    name: "Luxe Press-On Nails — Almond, 24 pcs",
    collection: "beauty",
    collectionName: "Beauty Essentials",
    price: 16,
    rating: 4.6,
    reviewCount: 74,
    surface: "champagne",
    shortDescription: "Salon-look nails in 10 minutes.",
    description:
      "A 24-piece almond-shape press-on set with a glossy, salon-quality finish. Includes adhesive tabs and glue for a manicure that lasts up to two weeks.",
    options: { label: "Finish", values: ["Glossy Nude", "French Tip", "Chrome"] },
    details: ["24 nails, 12 sizes", "Adhesive tabs + glue", "Up to 2 weeks wear", "Reusable"],
  },
  {
    slug: "gold-silk-scarf",
    name: "Printed Silk Hair Scarf — Signature Gold",
    collection: "beauty",
    collectionName: "Beauty Essentials",
    price: 34,
    rating: 4.9,
    reviewCount: 41,
    badge: "Limited",
    surface: "gold",
    shortDescription: "Protect and accessorize in one piece.",
    description:
      "A large printed silk scarf in the Nola Touch signature pattern — wrap it, tie it, or wear it as an accessory. Gentle on edges and endlessly versatile.",
    details: ['35" × 35"', "100% mulberry silk", "Signature print", "Protects edges"],
    featured: true,
  },
];

// -------- helpers --------

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getCollection(slug: string) {
  return collections.find((c) => c.slug === slug);
}

export function getProductsByCollection(slug: string) {
  return products.filter((p) => p.collection === slug);
}

export const bestSellers = products.filter((p) => p.badge === "Best Seller");
export const newArrivals = products.filter((p) => p.badge === "New");
export const featuredProducts = products.filter((p) => p.featured);

export function relatedProducts(product: Product, limit = 4) {
  return products
    .filter((p) => p.collection === product.collection && p.slug !== product.slug)
    .concat(products.filter((p) => p.collection !== product.collection))
    .slice(0, limit);
}
