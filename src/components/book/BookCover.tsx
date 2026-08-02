"use client";

type Props = {
  cover: string;
};

export default function BookCover({
  cover,
}: Props) {
  return (
    <div
      className="
        relative
        h-full
        w-full
        overflow-hidden
        rounded-r-md
        bg-[#efe7d6]
        shadow-inner
      "
    >
      {/* Hardcover texture */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.04]
          pointer-events-none
        "
        style={{
          backgroundImage:
            "radial-gradient(circle,#000 1px,transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      />

      {/* Spine */}

      <div
        className="
          absolute
          left-0
          top-0
          h-full
          w-8
          bg-gradient-to-r
          from-[#5b3a22]
          via-[#7d5637]
          to-[#9c7553]
          shadow-inner
          z-20
        "
      />

      {/* Cover image */}

      <img
        src={cover}
        alt="Book Cover"
        draggable={false}
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          select-none
        "
      />

      {/* Gloss */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-br
          from-white/30
          via-transparent
          to-black/10
        "
      />

      {/* Edge shadow */}

      <div
        className="
          pointer-events-none
          absolute
          right-0
          top-0
          h-full
          w-6
          bg-gradient-to-l
          from-black/15
          to-transparent
        "
      />

      {/* Bottom shadow */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          h-10
          w-full
          bg-gradient-to-t
          from-black/10
          to-transparent
        "
      />
    </div>
  );
}