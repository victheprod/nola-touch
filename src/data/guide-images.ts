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

export const textureSwatches: Record<string, { src: string; alt: string }> = {
  "kinky-coily": {
    src: q("1522335781003-9c091ccab534", 300, 300),
    alt: "Kinky coily texture",
  },
  curly: {
    src: q("1527203561188-dae1bc1a417f", 300, 300),
    alt: "Curly texture",
  },
  wavy: {
    src: q("1589156191108-c762ff4b96ab", 300, 300),
    alt: "Wavy texture",
  },
  straight: {
    src: q("1709672262859-68cb9b39ae4f", 300, 300),
    alt: "Straight texture",
  },
  yaki: {
    src: q("1636302925868-52075f44d810", 300, 300),
    alt: "Yaki blown-out texture",
  },
  unsure: {
    src: q("1772987714654-2df39af2c658", 300, 300),
    alt: "Versatile texture",
  },
};

export const revealPortrait = {
  src: q("1539701938214-0d9736e1c16b", 800, 1000),
  alt: "Your beauty match reveal",
};
