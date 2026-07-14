"use client";

import { PACKAGES } from "../constants";
import { PackageType } from "../types";
import PackageCard from "./PackageCard";

type Props = {
  selected: PackageType | null;
  onSelect: (pkg: PackageType) => void;
};

export default function PackageSelection({
  selected,
  onSelect,
}: Props) {
  return (
    <section id="package-selection" className="py-10">
      <div className="mx-auto max-w-3xl text-center">

        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
          Step 1 of 2
        </span>

        <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-gray-900">
          Create Your Book
        </h1>

        <p className="mt-5 text-lg leading-8 text-gray-600">
          Choose the package that best fits your child's masterpiece.
          Once you've selected a package, we'll guide you through
          uploading the exact number of photos needed to create your
          personalised colouring book.
        </p>

      </div>

      <div className="mt-16 grid gap-8 lg:grid-cols-3">
        {PACKAGES.map((pkg) => (
          <PackageCard
            key={pkg.id}
            pkg={pkg}
            selected={selected === pkg.id}
            onSelect={() => onSelect(pkg.id)}
          />
        ))}
      </div>
    </section>
  );
}