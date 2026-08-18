"use client";

import { useState } from "react";

type Props = {
  image: string;
  title: string;
  pageNumber: number;
};

export default function BookPage({
  image,
  title,
  pageNumber,
}: Props) {
  const [rotate, setRotate] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      onContextMenu={(event) => event.preventDefault()}
      className="
        relative
        flex
        h-full
        w-full
        flex-col
        overflow-hidden
        bg-[#fcfbf8]
      "
    >
      {/* Paper texture */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.03]
        "
        style={{
          backgroundImage:
            "radial-gradient(circle,#000 1px,transparent 1px)",
          backgroundSize: "11px 11px",
        }}
      />

      {/* Inner page shadow */}

      <div
        className="
          pointer-events-none
          absolute
          left-0
          top-0
          h-full
          w-6
          bg-gradient-to-r
          from-black/10
          to-transparent
        "
      />

      {/* Content */}

      <div className="relative flex flex-1 flex-col px-8 pt-6 pb-4">

        <h3
          className="
            mb-4
            text-center
            text-lg
            font-semibold
            tracking-wide
            text-gray-700
          "
        >
          {title}
        </h3>

        <div
          className="
            flex
            flex-1
            items-center
            justify-center
            overflow-hidden
          "
        >
          <img
            src={image}
            alt={title}
            draggable={false}
            onLoad={(e) => {
              const img = e.currentTarget;

              if (
                img.naturalWidth >
                img.naturalHeight
              ) {
                setRotate(true);
              }

              setLoaded(true);
            }}
            className={`
              max-h-full
              max-w-full
              object-contain
              pointer-events-none
              select-none
              transition-all
              duration-500
              ${loaded ? "opacity-100" : "opacity-0"}
              ${
                rotate
                  ? "-rotate-90 scale-[0.82]"
                  : ""
              }
            `}
          />
        </div>

      </div>

      {/* Page Number */}

      <div
        className="
          border-t
          border-gray-200
          py-3
          text-center
          text-sm
          font-medium
          text-gray-500
        "
      >
        {pageNumber}
      </div>
    </div>
  );
}
