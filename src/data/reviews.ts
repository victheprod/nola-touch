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
    product: "13×6 HD Lace Front Wig — Body Wave",
    text: "The lace melted perfectly and the body wave pattern looks exactly like the photos. I got so many compliments and the density is full without looking heavy. Reordering in 24 inches.",
    date: "March 2026",
    verified: true,
  },
  {
    id: "rev-2",
    name: "Aaliyah T.",
    location: "Houston, TX",
    rating: 5,
    product: "Brazilian Body Wave Bundle Set",
    text: "Third time ordering these bundles. Minimal shedding, holds a curl well, and the wefts are thick. My stylist said the quality is better than what she usually gets from her supplier.",
    date: "February 2026",
    verified: true,
  },
  {
    id: "rev-3",
    name: "Dominique R.",
    location: "New Orleans, LA",
    rating: 5,
    product: "Melanin Haircare Leave-In",
    text: "Finally a leave-in that doesn't leave my 4C hair crunchy. I use it on wash day and refresh days. Shipping was fast too — arrived in two days with tracking the whole way.",
    date: "January 2026",
    verified: true,
  },
  {
    id: "rev-4",
    name: "Jasmine W.",
    location: "Chicago, IL",
    rating: 4,
    product: "Glueless 5×5 HD Lace Wig — Kinky Curly",
    text: "Beautiful curl pattern and the glueless band actually stays put through a full workday. Took off one star only because I wish it came in more lengths, but I'm very happy with it.",
    date: "March 2026",
    verified: true,
  },
  {
    id: "rev-5",
    name: "Brianna K.",
    location: "Detroit, MI",
    rating: 5,
    product: "Double-Layer Satin Sleep Bonnet",
    text: "Big enough for my longest wigs and it does not slip off at night. The satin is good quality and my edges have been thanking me. Bought two more as gifts.",
    date: "February 2026",
    verified: true,
  },
  {
    id: "rev-6",
    name: "Simone A.",
    location: "Newark, NJ",
    rating: 5,
    product: "Edge Control — Extra Hold",
    text: "This edge control lays my baby hairs and they stay all day with zero flaking. A little goes a long way so the jar lasts. This is my repurchase now.",
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
