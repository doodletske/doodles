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
    <div className="mt-8 flex items-center justify-center gap-6">

      <button
        onClick={previous}
        className="rounded-lg border px-5 py-2 hover:bg-gray-100"
      >
        ← Previous
      </button>

      <div className="font-medium">
        Page {current} of {total}
      </div>

      <button
        onClick={next}
        className="rounded-lg border px-5 py-2 hover:bg-gray-100"
      >
        Next →
      </button>

    </div>
  );
}