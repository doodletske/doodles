"use client";

import {
  ArrowRight,
  Check,
  Palette,
  Rocket,
  Sparkles,
} from "lucide-react";

import { BookPackage } from "../types";

type Props = {
  pkg: BookPackage;
  selected: boolean;
  onSelect: () => void;
};

const cardStyles = {
  little: {
    Icon: Palette,
    surface: "border-[#efd05d] bg-[#fff6cf]",
    decoration: "border-[#ffd24e]/55",
    dot: "bg-[#315dbe]",
    icon: "bg-white text-[#d9860b]",
    eyebrow: "text-[#315dbe]",
    title: "text-[#1d2841]",
    body: "text-[#5c667a]",
    divider: "border-[#e8d98e]",
    price: "text-[#1d2841]",
    muted: "text-[#697287]",
    check: "bg-white text-[#315dbe]",
    button:
      "bg-[#315dbe] text-white shadow-[0_4px_0_#244a9b] group-hover:bg-[#244a9b]",
  },
  big: {
    Icon: Sparkles,
    surface: "border-[#315dbe] bg-[#315dbe]",
    decoration: "border-white/10",
    dot: "bg-[#ffd24e]",
    icon: "bg-[#ffd24e] text-[#243451]",
    eyebrow: "text-[#ffdf67]",
    title: "text-white",
    body: "text-[#dbe7fb]",
    divider: "border-white/20",
    price: "text-white",
    muted: "text-[#dbe7fb]",
    check: "bg-white/15 text-[#ffdf67]",
    button:
      "bg-[#ffd24e] text-[#243451] shadow-[0_4px_0_#dca623] group-hover:bg-[#ffe17c]",
  },
  custom: {
    Icon: Rocket,
    surface: "border-[#9dbcec] bg-[#e8f2ff]",
    decoration: "border-[#87ace5]/30",
    dot: "bg-[#ffd24e]",
    icon: "bg-[#315dbe] text-white",
    eyebrow: "text-[#315dbe]",
    title: "text-[#1d2841]",
    body: "text-[#53627a]",
    divider: "border-[#bed2ef]",
    price: "text-[#1d2841]",
    muted: "text-[#657087]",
    check: "bg-white text-[#315dbe]",
    button:
      "bg-white text-[#243451] shadow-[0_4px_0_#bfd1e9] group-hover:bg-[#fff6cf]",
  },
} as const;

export default function PackageCard({
  pkg,
  selected,
  onSelect,
}: Props) {
  const isCustom = pkg.id === "custom";
  const style = cardStyles[pkg.id];
  const Icon = style.Icon;

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`group relative flex h-full w-full flex-col overflow-hidden rounded-[2rem] border text-left shadow-[0_18px_42px_rgba(41,72,125,0.11)] transition-all duration-300 ${
        style.surface
      } ${
        selected
          ? "-translate-y-1 ring-4 ring-[#ffd24e] shadow-[0_24px_52px_rgba(49,93,190,0.2)]"
          : "hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(41,72,125,0.17)]"
      }`}
    >
      <div
        className={`pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full border-[28px] ${style.decoration}`}
      />
      <div
        className={`pointer-events-none absolute bottom-24 right-8 h-3 w-3 rounded-full ${style.dot}`}
      />
      <div
        className={`pointer-events-none absolute bottom-16 right-14 h-1.5 w-1.5 rounded-full ${style.dot}`}
      />

      {pkg.featured && (
        <div className="absolute right-0 top-0 rounded-bl-2xl bg-[#ffd24e] px-4 py-2 text-[0.65rem] font-black uppercase tracking-[0.13em] text-[#243451]">
          Most popular
        </div>
      )}

      {selected && (
        <div className="absolute right-5 top-14 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#ffd24e] text-[#243451] shadow-md">
          <Check className="h-5 w-5" strokeWidth={3} />
        </div>
      )}

      <div className="relative flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-center gap-4 pr-12">
          <span
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-sm ${style.icon}`}
          >
            <Icon className="h-6 w-6" />
          </span>

          <div>
            <p
              className={`text-xs font-black uppercase tracking-[0.13em] ${style.eyebrow}`}
            >
              {pkg.tagline}
            </p>
            <h2 className={`mt-1 text-2xl font-black ${style.title}`}>
              {pkg.title}
            </h2>
          </div>
        </div>

        <p className={`mt-6 min-h-20 text-sm leading-6 ${style.body}`}>
          {pkg.description}
        </p>

        <div className={`mt-5 border-y py-5 ${style.divider}`}>
          <div
            className={`${isCustom ? "text-3xl" : "text-4xl"} font-black tracking-tight ${style.price}`}
          >
            {pkg.price}
          </div>

          {!isCustom && (
            <div className={`mt-1 text-sm font-semibold ${style.muted}`}>
              {pkg.pages * 2}-page personalised book
            </div>
          )}
        </div>

        <ul className="mt-5 space-y-3">
          {pkg.highlights.map((highlight) => (
            <li
              key={highlight}
              className={`flex items-center gap-2.5 text-sm font-semibold ${style.body}`}
            >
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${style.check}`}
              >
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
              {highlight}
            </li>
          ))}
        </ul>

        <span
          className={`mt-7 flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-black transition ${style.button}`}
        >
          {selected
            ? "Selected — continue below"
            : isCustom
              ? "Tell us what you need"
              : "Choose this book"}
          {!selected && <ArrowRight className="h-4 w-4" />}
        </span>
      </div>
    </button>
  );
}
