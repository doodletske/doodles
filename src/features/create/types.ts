export type PackageType =
  | "little"
  | "big"
  | "custom";

export interface BookPackage {
  id: PackageType;
  title: string;
  tagline: string;
  pages: number;
  price: string;
  featured?: boolean;
  description: string;
  highlights: string[];
}
