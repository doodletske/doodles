"use client";

import { Check } from "lucide-react";
import { BookPackage } from "../types";

type Props = {
  pkg: BookPackage;
  selected: boolean;
  onSelect: () => void;
};

export default function PackageCard({
  pkg,
  selected,
  onSelect,
}: Props) {
  const isCustom = pkg.id === "custom";

  return (
    <button
      onClick={onSelect}
      className={`
        relative w-full rounded-3xl border bg-white p-8 text-left
        transition-all duration-300

        ${
          selected
            ? "border-blue-600 ring-2 ring-blue-200 shadow-xl scale-[1.02]"
            : "border-gray-200 hover:border-blue-300 hover:shadow-lg hover:-translate-y-1"
        }
      `}
    >
      {pkg.featured && (
        <div className="absolute -top-3 left-6 rounded-full bg-blue-600 px-4 py-1 text-xs font-semibold text-white shadow">
          MOST POPULAR
        </div>
      )}

      {selected && (
        <div className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
          <Check size={18} />
        </div>
      )}

      <h3 className="text-2xl font-bold text-gray-900">
        {pkg.title}
      </h3>

      <p className="mt-3 min-h-[70px] text-sm leading-6 text-gray-600">
        {pkg.description}
      </p>

      <div className="mt-8">
        <div className="text-4xl font-extrabold text-gray-900">
          {pkg.price}
        </div>

        {!isCustom && (
          <div className="mt-2 text-gray-500">
            {pkg.pages} personalised colouring pages
          </div>
        )}
      </div>

      <div className="mt-8">
        <span
          className={`
            inline-flex rounded-xl px-5 py-3 text-sm font-semibold transition

            ${
              selected
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800"
            }
          `}
        >
          {selected ? "Selected" : "Choose Package"}
        </span>
      </div>
    </button>
  );
}