export type Review = {
  id: string;
  name: string;
  location: string;
  rating: number;
  product: string;
  text: string;
  date: string;
  verified: boolean;
};

export const reviews: Review[] = [
  {
    id: "rev-1",
    name: "Keisha M.",
    location: "Atlanta, GA",
    rating: 5,
    product: "HD Lace Front Wig — Body Wave, 22″",
    text: "The lace melted on the first try and the density looks full without being heavy. Shipped in two days with tracking. Already ordered a backup unit.",
    date: "March 2026",
    verified: true,
  },
  {
    id: "rev-2",
    name: "Aaliyah T.",
    location: "Houston, TX",
    rating: 5,
    product: "Brazilian Body Wave Bundle Set",
    text: "Third order of these bundles. Minimal shedding, holds a curl, and the wefts are thick. My stylist said the quality beats what she usually sources locally.",
    date: "February 2026",
    verified: true,
  },
  {
    id: "rev-3",
    name: "Dominique R.",
    location: "San Antonio, TX",
    rating: 5,
    product: "Melanin Haircare Leave-In",
    text: "This leave-in works on my 4C hair without crunch. I use it on wash day and between styles. Packaging was secure and it arrived faster than expected.",
    date: "January 2026",
    verified: true,
  },
];

export const reviewStats = {
  average: 4.9,
  count: 820,
  distribution: [
    { stars: 5, percent: 86 },
    { stars: 4, percent: 10 },
    { stars: 3, percent: 3 },
    { stars: 2, percent: 1 },
    { stars: 1, percent: 0 },
  ],
};
