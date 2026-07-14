export type PackageType =
  | "little"
  | "big"
  | "custom";

export interface BookPackage {
  id: PackageType;
  title: string;
  pages: number;
  price: string;
  featured?: boolean;
  description: string;
}