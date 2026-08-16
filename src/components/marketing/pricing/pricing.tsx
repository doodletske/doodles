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
    <section id="pricing" className="scroll-mt-24 bg-[#edf5ff] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-[#e59019]">
            Pick your adventure
          </span>

          <h2 className="mt-3 text-4xl font-black tracking-tight text-[#1d2841] md:text-5xl">
            Choose your book
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
                className={`relative flex h-full flex-col rounded-[2rem] bg-white p-7 transition duration-300 hover:-translate-y-1 ${
                  pkg.featured
                    ? "border-2 border-[#315dbe] shadow-xl"
                    : "border border-[#dbe5f5] shadow-sm hover:shadow-md"
                }`}
              >
                {pkg.featured && (
                  <div className="absolute -top-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-[#315dbe] px-4 py-1.5 text-xs font-black uppercase tracking-wide text-white shadow-lg">
                    <Star size={14} fill="white" />
                    Most Popular
                  </div>
                )}

                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff6d9] text-[#dc9818]">
                  <Icon size={24} />
                </div>

                <h3 className="text-2xl font-black text-[#1d2841]">
                  {pkg.name}
                </h3>

                <p className="mt-1.5 text-sm font-bold text-[#315dbe]">
                  {pkg.tagline}
                </p>

                {!pkg.custom ? (
                  <div className="mt-6">
                    <span className="text-4xl font-black tracking-tight text-[#1d2841]">
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
                  href={pkg.custom ? "#contact" : "/create"}
                  className={`mt-7 flex w-full items-center justify-center rounded-xl px-6 py-3.5 text-base font-semibold transition ${
                    pkg.custom
                      ? "bg-[#1d2841] text-white hover:bg-[#101828]"
                      : pkg.featured
                      ? "bg-[#315dbe] text-white hover:bg-[#244a9b]"
                      : "bg-[#f6b922] text-[#243451] hover:bg-[#ffc934]"
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
