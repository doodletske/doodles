"use client";

import Link from "next/link";
import {
  Check,
  Star,
  Sparkles,
  Palette,
  Rocket,
} from "lucide-react";

const packages = [
  {
    name: "Little Doodler",
    tagline: "A perfect first adventure",
    price: "KES 1,999",
    featured: false,
    custom: false,
    icon: Palette,
    features: [
      "8 personalized coloring pages",
      "Created from 8 of your own photos",
      "Original photo beside every coloring page",
      "Printed on thick, coloring-friendly paper",
      "Nationwide delivery across Kenya",
    ],
  },
  {
    name: "Big Dreamer",
    tagline: "Even more moments to colour",
    price: "KES 2,999",
    featured: true,
    custom: false,
    icon: Sparkles,
    features: [
      "16 personalized coloring pages",
      "Created from up to 16 of your own photos",
      "Original photo beside every coloring page",
      "Printed on thick, coloring-friendly paper",
      "Nationwide delivery across Kenya",
      "Best value per page",
    ],
  },
  {
    name: "Custom Order",
    tagline: "For ideas beyond the ordinary",
    featured: false,
    custom: true,
    icon: Rocket,
    description:
      "Need more than 16 pages? Planning a school, corporate, or special event? We'll create a custom package tailored specifically for you.",
    features: [
      "More page options",
      "Multiple copies",
      "Birthday & holiday gifts",
      "School projects",
      "Corporate orders",
      "Special requests",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-24 bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Pricing
          </span>

          <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            Choose Your Book
          </h2>

          <p className="mt-3 text-lg text-gray-600">
            Every Doodlets book is professionally printed,
            created from your own photos, and delivered
            anywhere in Kenya.
          </p>
        </div>

        {/* Cards */}

        <div className="grid gap-6 lg:grid-cols-3">

          {packages.map((pkg) => {
            const Icon = pkg.icon;

            return (
              <div
                key={pkg.name}
                className={`relative flex h-full flex-col rounded-2xl bg-white p-7 transition duration-300 hover:-translate-y-1 ${
                  pkg.featured
                    ? "border-2 border-blue-600 shadow-xl"
                    : "border border-gray-200 shadow-sm hover:shadow-md"
                }`}
              >
                {pkg.featured && (
                  <div className="absolute -top-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-blue-600 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-lg">
                    <Star size={14} fill="white" />
                    Most Popular
                  </div>
                )}

                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon size={24} />
                </div>

                <h3 className="text-2xl font-bold text-gray-900">
                  {pkg.name}
                </h3>

                <p className="mt-1.5 text-sm font-medium text-blue-600">
                  {pkg.tagline}
                </p>

                {!pkg.custom ? (
                  <div className="mt-6">
                    <span className="text-4xl font-extrabold tracking-tight text-gray-900">
                      {pkg.price}
                    </span>
                  </div>
                ) : (
                  <div className="mt-6 rounded-xl bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-gray-700">
                      Tailored pricing based on your project.
                    </p>

                    <p className="mt-1.5 text-sm text-gray-600">
                      Tell us what you have in mind and we'll prepare a
                      personalized quotation.
                    </p>
                  </div>
                )}

                {pkg.custom && (
                  <p className="mt-4 text-sm leading-6 text-gray-600">
                    {pkg.description}
                  </p>
                )}

                <ul className="mt-6 flex-grow space-y-3">

                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm"
                    >
                      <Check
                        className="mt-0.5 shrink-0 text-blue-600"
                        size={16}
                      />

                      <span className="text-gray-700">
                        {feature}
                      </span>
                    </li>
                  ))}

                </ul>

                <Link
                  href={pkg.custom ? "#contact" : "/create-book"}
                  className={`mt-7 flex w-full items-center justify-center rounded-xl px-6 py-3.5 text-base font-semibold transition ${
                    pkg.custom
                      ? "bg-slate-800 text-white hover:bg-black"
                      : pkg.featured
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-900 text-white hover:bg-black"
                  }`}
                >
                  {pkg.custom ? "Make a Request" : "Start My Book"}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}