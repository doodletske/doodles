"use client";

type Props = {
  current: number;
  total: number;
  previous: () => void;
  next: () => void;
};

export default function BookToolbar({
  current,
  total,
  previous,
  next,
}: Props) {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-3 rounded-full border border-white/60 bg-white/90 p-2.5 shadow-[0_14px_30px_rgba(24,55,112,0.16)] backdrop-blur-sm sm:gap-5">

      <button
        type="button"
        onClick={previous}
        className="min-h-11 rounded-full border border-[#bed2ef] bg-white px-5 py-2 text-sm font-black text-[#315dbe] transition hover:-translate-y-0.5 hover:bg-[#e9f1ff]"
      >
        ← Previous
      </button>

      <div className="px-2 text-sm font-black text-[#243451]">
        Page {current} of {total}
      </div>

      <button
        type="button"
        onClick={next}
        className="min-h-11 rounded-full bg-[#ffd24e] px-5 py-2 text-sm font-black text-[#243451] shadow-[0_3px_0_#dca623] transition hover:translate-y-0.5 hover:shadow-[0_1px_0_#dca623]"
      >
        Next →
      </button>

    </div>
  );
}
