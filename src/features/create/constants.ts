import { BookPackage } from "./types";

export const PACKAGES: BookPackage[] = [
  {
    id: "little",
    title: "Little Doodler",
    tagline: "A perfect first adventure",
    pages: 8,
    price: "KES 1,199",
    description:
      "Turn eight favourite moments into a joyful personalised colouring book made just for them.",
    highlights: [
      "8 photo-to-colouring pairs",
      "A lovely first keepsake",
    ],
  },
  {
    id: "big",
    title: "Big Dreamer",
    tagline: "More moments to colour",
    pages: 16,
    price: "KES 1,799",
    featured: true,
    description:
      "Keep more of the moments you love with sixteen personalised colouring pages in one beautiful book.",
    highlights: [
      "16 photo-to-colouring pairs",
      "Best value per page",
    ],
  },
  {
    id: "custom",
    title: "Something Special",
    tagline: "Built around your idea",
    pages: 0,
    price: "Custom Quote",
    description:
      "Need extra pages, several copies or something unique? We'll shape a package around your project.",
    highlights: [
      "Extra pages or copies",
      "Schools, gifts and events",
    ],
  },
];
