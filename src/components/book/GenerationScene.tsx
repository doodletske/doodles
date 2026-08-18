"use client";

import Image from "next/image";
import { Check, Sparkles } from "lucide-react";

type Props = {
  activeImage?: string | null;
  queuedImage?: string | null;
  completed: number;
  pageCount: number;
  ready: boolean;
};

function Cloud({ className }: { className: string }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute h-10 w-28 rounded-full bg-white/90 shadow-[0_10px_30px_rgba(48,93,160,0.16)] ${className}`}
    >
      <span className="absolute -top-5 left-4 h-14 w-14 rounded-full bg-white/90" />
      <span className="absolute -top-8 right-4 h-16 w-16 rounded-full bg-white/90" />
    </div>
  );
}

function DeliveryBird({
  image,
  className = "",
}: {
  image?: string | null;
  className?: string;
}) {
  return (
    <div
      className={`doodlets-delivery-rig absolute z-10 h-52 w-64 ${className}`}
    >
      <Image
        src="/images/decor/doodlets-flying-bird.png"
        alt="A yellow Doodlets bird carrying a photograph"
        width={180}
        height={180}
        priority
        className="absolute left-0 top-0 h-36 w-36 object-contain drop-shadow-[0_12px_16px_rgba(24,55,112,0.22)] sm:h-40 sm:w-40"
      />

      <div className="doodlets-carried-photo absolute left-28 top-28 h-20 w-24 rotate-6 overflow-hidden rounded-lg border-[5px] border-[#ffd24e] bg-white shadow-[0_12px_22px_rgba(25,54,108,0.3)] sm:left-32 sm:top-32 sm:h-24 sm:w-28">
        {image ? (
          <Image
            src={image}
            alt="A photograph currently being carried to the printer"
            fill
            sizes="112px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[#fff8d9] text-[#315dbe]">
            <Sparkles className="h-7 w-7" />
          </div>
        )}
      </div>
    </div>
  );
}

export default function GenerationScene({
  activeImage,
  queuedImage,
  completed,
  pageCount,
  ready,
}: Props) {
  return (
    <div className="relative mt-8 h-[20rem] overflow-hidden rounded-[2rem] border border-white/30 bg-[linear-gradient(155deg,rgba(255,255,255,0.16),rgba(255,255,255,0.04))] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] sm:h-[23rem]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(255,255,255,0.16),transparent_28%),radial-gradient(circle_at_80%_80%,rgba(37,89,177,0.22),transparent_36%)]" />
      <Cloud className="left-10 top-14 scale-75 sm:scale-100" />
      <Cloud className="right-12 top-10 hidden scale-75 sm:block" />

      <div className="absolute left-5 top-5 z-20 rounded-full border border-white/50 bg-white/90 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-[#315dbe] shadow-sm sm:left-8 sm:top-8">
        {ready ? "All pages printed" : `Delivering page ${Math.min(completed + 1, pageCount)} of ${pageCount}`}
      </div>

      {!ready && (
        <>
          <DeliveryBird image={activeImage} />
          <DeliveryBird
            image={queuedImage ?? activeImage}
            className="doodlets-delivery-rig--second hidden sm:block"
          />
        </>
      )}

      {ready && (
        <div className="absolute left-[12%] top-1/2 z-10 -translate-y-1/2 rounded-[1.75rem] border border-white/60 bg-white/90 px-6 py-5 text-[#243451] shadow-[0_18px_35px_rgba(24,55,112,0.18)] sm:left-[20%]">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#dff8e8] text-[#188447]">
            <Check className="h-7 w-7" strokeWidth={3} />
          </span>
          <p className="mt-3 text-sm font-black">Your book is ready</p>
          <p className="mt-1 text-xs font-semibold text-[#657087]">
            {pageCount} pages beautifully illustrated
          </p>
        </div>
      )}

      <div
        className={`${ready ? "" : "doodlets-printer"} absolute -bottom-3 right-[-2.5rem] z-20 w-56 sm:bottom-0 sm:right-7 sm:w-72`}
      >
        <Image
          src="/images/decor/doodlets-printer.png"
          alt="A playful blue and yellow printing machine"
          width={420}
          height={420}
          priority
          className="h-auto w-full drop-shadow-[0_18px_24px_rgba(24,55,112,0.26)]"
        />
      </div>

      {!ready && (
        <div className="absolute bottom-5 left-5 z-20 max-w-[13rem] rounded-2xl bg-[#243451]/85 px-4 py-3 text-xs font-bold leading-5 text-white backdrop-blur-sm sm:bottom-8 sm:left-8 sm:max-w-xs sm:text-sm">
          The birds are carrying your memories to the Doodlets printer.
        </div>
      )}
    </div>
  );
}
