import { collectionImages, heroImage } from "@/data/images";

const q = (id: string, w = 400, h = 500) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format`;

export const guideIntroCollage = [
  heroImage,
  collectionImages.wigs,
  collectionImages.extensions,
  collectionImages.styling,
];

export const shoppingGoalImages: Record<string, { src: string; alt: string }> = {
  wigs: collectionImages.wigs,
  extensions: collectionImages.extensions,
  "hair-care": collectionImages["hair-care"],
  styling: collectionImages.styling,
  tools: collectionImages.tools,
  beauty: collectionImages.beauty,
};

export const lookGoalImages: Record<string, { src: string; alt: string }> = {
  "natural-everyday": {
    src: q("1632765866070-3fadf25d3d5b"),
    alt: "Natural effortless hairstyle",
  },
  "glam-event": {
    src: q("1522390108011-5f8667fd551d"),
    alt: "Glam bold hairstyle",
  },
  protective: {
    src: q("1645736279976-59f8fd22720c"),
    alt: "Protective wig styling",
  },
  "fresh-color": {
    src: q("1593351799227-75df2026356b"),
    alt: "Soft romantic color",
  },
  "sleek-pressed": {
    src: q("1709672262859-68cb9b39ae4f"),
    alt: "Sleek polished straight hair",
  },
  unsure: {
    src: q("1539701938214-0d9736e1c16b"),
    alt: "Versatile beauty look",
  },
};

export const revealPortrait = {
  src: q("1539701938214-0d9736e1c16b", 800, 1000),
  alt: "Your beauty match reveal",
};
