import { BookPackage } from "./types";

export const PACKAGES: BookPackage[] = [
  {
    id: "little",
    title: "Little Doodler",
    pages: 8,
    price: "KSh 1,999",
    description:
  "Perfect for first-time little artists. Turn eight favourite photos into a beautiful personalised colouring book.",
  },
  {
    id: "big",
    title: "Big Dreamer",
    pages: 16,
    price: "KSh 2,999",
    featured: true,
    description:
      "Our most popular choice. Sixteen personalised colouring pages for even more creativity and family memories.",
  },
  {
    id: "custom",
    title: "Something Special",
    pages: 0,
    price: "Custom Quote",
    description:
      "Need more pages, books for   multiple children or something unique? We'll create a custom package just for you.",
  },
];