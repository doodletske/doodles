import Image from "next/image";
import { Sparkles } from "lucide-react";

import Button from "@/components/ui/Button";
import HeroStats from "./HeroStats";

export default function HeroContent() {
  return (
    <div className="relative z-10 py-3 lg:py-6">
      <Image
        src="/images/decor/crayon-blue.png"
        alt=""
        width={260}
        height={195}
        className="pointer-events-none absolute -bottom-10 -left-20 hidden w-36 rotate-[6deg] drop-shadow-[0_14px_18px_rgba(25,45,85,0.22)] sm:block lg:-bottom-14 lg:-left-24 lg:w-44"
      />
      <Image
        src="/images/decor/crayon-yellow.png"
        alt=""
        width={180}
        height={180}
        className="pointer-events-none absolute -right-10 -top-20 hidden w-28 rotate-[16deg] drop-shadow-[0_12px_16px_rgba(25,45,85,0.18)] md:block lg:-right-4 lg:-top-24 lg:w-32"
      />
      <Sparkles className="pointer-events-none absolute left-[46%] top-3 hidden h-6 w-6 -rotate-12 text-[#ffdf67] lg:block" />

      <div className="relative z-10">
        <p className="inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white">
          Made from your memories
        </p>
        <h1 className="mt-5 text-5xl font-black leading-[1.02] tracking-tight text-white lg:text-6xl">
          Photos that turn into
          <br />
          their next <span className="text-[#ffdf67]">favourite book.</span>
        </h1>

        <p className="mt-5 max-w-xl text-lg leading-7 text-blue-50">
          Upload 8–16 favourite memories. We turn them into a one-of-a-kind A4
          sized colouring book, print it beautifully, and have it delivered to
          a location of your choosing.
        </p>

        <div className="mt-7">
          <Button className="doodlets-button--sun">Create My Book</Button>
        </div>

        <HeroStats />
      </div>
    </div>
  );
}
