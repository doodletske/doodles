"use client";

import Image from "next/image";
import SliderHandle from "./SliderHandle";
import { useEffect, useRef, useState } from "react";
import type { ImageComparisonSliderProps } from "./types";

export default function ImageComparisonSlider({
  beforeImage,
  afterImage,
  beforeAlt = "Before",
  afterAlt = "After",
}: ImageComparisonSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);

  const updatePosition = (clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    let percent = ((clientX - rect.left) / rect.width) * 100;

    percent = Math.max(5, Math.min(95, percent));

    setPosition(percent);
  };

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!dragging) return;
      updatePosition(e.clientX);
    };

    const up = () => setDragging(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, [dragging]);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[3/2] w-full select-none overflow-hidden rounded-3xl bg-gray-100 shadow-2xl"
      onClick={(e) => updatePosition(e.clientX)}
      onTouchMove={(e) => updatePosition(e.touches[0].clientX)}
    >
      {/* BEFORE (base image) */}
      <Image
        src={beforeImage}
        alt={beforeAlt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
        className="object-cover"
      />

      {/* AFTER (revealed from the right) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 0 0 ${position}%)` }}
      >
        <Image
          src={afterImage}
          alt={afterAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          className="object-cover"
        />
      </div>

      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
        style={{
          left: `${position}%`,
          transform: "translateX(-50%)",
        }}
      />

      {/* Handle */}
      <SliderHandle
        position={position}
        onMouseDown={() => setDragging(true)}
      />

      {/* Before Badge */}
      <div className="absolute left-4 top-4 rounded-full bg-black/60 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
        Before
      </div>

      {/* After Badge */}
      <div className="absolute right-4 top-4 rounded-full bg-black/60 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
        After
      </div>
    </div>
  );
}
