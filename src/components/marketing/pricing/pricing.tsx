import Link from "next/link";
import { Check, Palette, Rocket, Sparkles, Star } from "lucide-react";

import Container from "@/components/layout/Container";

const bookPackages = [
  {
    name: "Little Doodler",
    tagline: "A perfect first adventure",
    price: "KES 1,199",
    featured: false,
    icon: Palette,
    features: [
      "8 personalised colouring pages",
      "Created from 8 of your photos",
      "Original photo beside every page",
      "Thick, colouring-friendly paper",
      "Delivery available across Kenya",
    ],
  },
  {
    name: "Big Dreamer",
    tagline: "More moments to colour",
    price: "KES 1,799",
    featured: true,
    icon: Sparkles,
    features: [
      "16 personalised colouring pages",
      "Created from up to 16 photos",
      "Original photo beside every page",
      "Thick, colouring-friendly paper",
      "Delivery available across Kenya",
      "Best value per page",
    ],
  },
];

const customFeatures = [
  "Extra pages",
  "Multiple copies",
  "Schools & events",
  "Special requests",
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="scroll-mt-24 bg-[#edf5ff] py-16 lg:py-20"
    >
      <Container>
        <div className="max-w-2xl">
            <span className="text-xs font-black uppercase tracking-[0.18em] text-[#d9860b]">
              Pick your adventure
            </span>
            <h2 className="mt-4 text-4xl font-black leading-none tracking-tight text-[#1d2841] md:text-5xl">
              Choose the book that fits your story
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#5c667a]">
              Every Doodlets book pairs your original photos with personalised
              colouring pages, printed and bound as a keepsake.
            </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {bookPackages.map((pkg) => {
            const Icon = pkg.icon;

            return (
              <article
                key={pkg.name}
                className={`relative flex h-full flex-col overflow-hidden rounded-[2rem] border bg-white p-7 shadow-[0_16px_40px_rgba(41,72,125,0.09)] lg:p-8 ${
                  pkg.featured ? "border-[#315dbe]" : "border-[#dbe5f5]"
                }`}
              >
                {pkg.featured && (
                  <div className="absolute right-0 top-0 flex items-center gap-2 rounded-bl-2xl bg-[#315dbe] px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white">
                    <Star className="h-3.5 w-3.5" fill="currentColor" />
                    Most popular
                  </div>
                )}

                <div className="flex items-center gap-4 pr-28">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#fff3c4] text-[#d9860b]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-[#1d2841]">
                      {pkg.name}
                    </h3>
                    <p className="mt-1 text-sm font-bold text-[#315dbe]">
                      {pkg.tagline}
                    </p>
                  </div>
                </div>

                <div className="mt-7 flex items-end gap-3 border-b border-[#e4ebf6] pb-7">
                  <span className="text-4xl font-black tracking-tight text-[#1d2841] md:text-5xl">
                    {pkg.price}
                  </span>
                  <span className="pb-1 text-sm font-semibold text-[#7a8497]">
                    per book
                  </span>
                </div>

                <ul className="mt-7 grid flex-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm leading-6 text-[#4e596d]"
                    >
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#eef5ff] text-[#315dbe]">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/create"
                  className={`mt-8 inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-black transition hover:-translate-y-0.5 ${
                    pkg.featured
                      ? "bg-[#315dbe] !text-white shadow-[0_4px_0_#244a9b] hover:bg-[#244a9b]"
                      : "bg-[#ffd24e] !text-[#243451] shadow-[0_4px_0_#dca623] hover:bg-[#ffe17c]"
                  }`}
                >
                  Start my book
                </Link>
              </article>
            );
          })}
        </div>

        <div className="relative mt-6 overflow-hidden rounded-[2rem] bg-[#1d2841] p-7 text-white shadow-[0_18px_45px_rgba(29,40,65,0.18)] lg:p-9">
          <div className="pointer-events-none absolute -right-14 -top-20 h-56 w-56 rounded-full border-[30px] border-white/5" />
          <div className="relative grid items-center gap-7 lg:grid-cols-[1fr_auto]">
            <div className="flex items-start gap-5">
              <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#ffd24e] text-[#243451] sm:flex">
                <Rocket className="h-7 w-7" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#ffdf67]">
                  Need something different?
                </p>
                <h3 className="mt-2 text-2xl font-black md:text-3xl">
                  We make custom orders too.
                </h3>
                <p className="mt-3 max-w-2xl leading-7 text-[#cdd6e8]">
                  More pages, multiple copies, a school project or a special
                  event—we&apos;ll shape a package around your idea.
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {customFeatures.map((feature) => (
                    <li
                      key={feature}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-bold text-[#e7ecf6]"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Link
              href="#contact"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 text-sm font-black !text-[#1d2841] transition hover:-translate-y-0.5 hover:bg-[#fff3c4]"
            >
              Request a custom quote
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
