"use client";

import { Images } from "lucide-react";

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
    <section id="package-selection" className="py-4 lg:py-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-[#ffd24e] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#243451] shadow-[0_3px_0_#dca623]">
              Step 1 of 2
            </span>
            <span className="text-xs font-black uppercase tracking-[0.18em] text-[#315dbe]">
              Pick your adventure
            </span>
          </div>

          <h1 className="mt-5 text-4xl font-black leading-none tracking-tight text-[#1d2841] sm:text-5xl">
            Choose your book
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-[#5c667a] sm:text-lg">
            Select the package that fits your favourite moments. You&apos;ll add
            the photos for each page next.
          </p>
        </div>

        <div className="flex max-w-md items-center gap-3 rounded-2xl border border-[#cfe0f7] bg-white/80 px-4 py-3 text-sm font-bold leading-6 text-[#5c667a] shadow-sm">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e9f1ff] text-[#315dbe]">
            <Images className="h-5 w-5" />
          </span>
          Every colouring page begins with one of your own photos.
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
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
