export type Guide = {
  slug: string;
  kicker: string;
  title: string;
  excerpt: string;
  readTime: string;
  body: string[];
};

export const guides: Guide[] = [
  {
    slug: "lace-front-wig-density",
    kicker: "Wig Guide",
    title: "How to choose the right wig density",
    excerpt:
      "150%, 180%, or 200%? A clear guide to picking density for everyday wear versus a fuller, occasion look.",
    readTime: "4 min read",
    body: [
      "Density describes how much hair is on a wig, expressed as a percentage. It's one of the biggest factors in how natural — or how dramatic — your unit looks. Most people overestimate the density they want, so it helps to picture the finished style before you buy.",
      "For an everyday, realistic look that mimics the average head of hair, 150%–180% density is the sweet spot. It photographs well, blends easily at the hairline, and doesn't overwhelm your frame. This is what we recommend for most first-time buyers and for anyone who wants their wig to read as their own hair.",
      "If you want a fuller, high-glam look for events, photoshoots, or big curly and wavy styles, reach for 200%+. Curly textures naturally 'eat' density, so a higher percentage keeps them looking full rather than stringy. Just know that very high density can look heavy on shorter or straighter styles.",
      "When in doubt, match density to length and texture: shorter and straighter styles need less; longer and curlier styles carry more. Every product page lists density so you can choose with confidence.",
    ],
  },
  {
    slug: "how-many-bundles",
    kicker: "Install Guide",
    title: "How many bundles do you actually need?",
    excerpt:
      "Bundle counts by length and texture — plus when to add a closure or a frontal for a seamless install.",
    readTime: "5 min read",
    body: [
      "The number of bundles you need depends mostly on length. Shorter lengths have wider wefts of hair per bundle, so you need fewer; longer lengths taper, so you need more to keep the install full from root to tip.",
      "As a rule of thumb: for 10″–16″, two to three bundles are plenty. For 18″–22″, plan on three bundles. For 24″ and longer, three to four bundles keeps the ends looking full rather than thin.",
      "If you're leaving hair out to blend, two to three bundles work with your natural leave-out. If you want a closed, protective install with no hair out, add a closure (for a smaller parting area) or a frontal (for an ear-to-ear hairline and versatile parting).",
      "A closure pairs well with two to three bundles; a frontal usually needs three, since some length is used to cover the install. When you buy a bundle deal on Nola Touch, the closure or frontal option is priced in so you're not guessing.",
    ],
  },
  {
    slug: "protective-style-maintenance",
    kicker: "Hair Health",
    title: "Caring for your hair between installs",
    excerpt:
      "A simple wash-day routine, scalp care, and product rotation to keep your natural hair healthy under protective styles.",
    readTime: "6 min read",
    body: [
      "Protective styles only protect if your natural hair underneath stays healthy. The goal between installs is simple: keep the scalp clean, keep strands moisturized, and give your hair a real break before the next install.",
      "Start with a gentle, sulfate-free cleanse to remove buildup without stripping moisture. Follow with a deep conditioner for at least ten minutes to restore softness and slip — this is the step most people skip and the one that makes the biggest difference.",
      "Between wash days, focus on the scalp. A lightweight oil with rosemary or mint soothes dryness and supports circulation; massage it in a few times a week rather than drowning your hair in product. Seal moisture with a leave-in and a small amount of oil on the lengths.",
      "At night, wrap with a satin scarf or bonnet to prevent breakage and lock in moisture. And give your edges a rest — take at least a week between tension styles so your hairline can recover. Healthy natural hair makes every future install lay better and last longer.",
    ],
  },
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}
