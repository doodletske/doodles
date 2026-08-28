import { BookPackage } from "./types";

export const PACKAGES: BookPackage[] = [
  {
    id: "little",
    title: "Little Doodler",
    tagline: "16 special pages from 8 memories",
    pages: 8,
    price: "KES 1,199",
    description:
      "Turn eight favourite moments into a 16-page personalised book with every original photo beside its matching colouring illustration.",
    highlights: [
      "8 photos + 8 colouring pages",
      "16 printed interior pages",
    ],
  },
  {
    id: "big",
    title: "Big Dreamer",
    tagline: "32 pages of memories and colouring fun",
    pages: 16,
    price: "KES 1,899",
    featured: true,
    description:
      "Keep sixteen favourite moments in a 32-page personalised book pairing every photo with its own colouring illustration.",
    highlights: [
      "16 photos + 16 colouring pages",
      "32 printed interior pages",
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
