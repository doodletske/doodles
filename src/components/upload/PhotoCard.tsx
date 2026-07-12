"use client";

import Image from "next/image";
import { X } from "lucide-react";

type Props = {
  preview: string;
  onRemove: () => void;
};

export default function PhotoCard({
  preview,
  onRemove,
}: Props) {
  return (
    <div className="relative overflow-hidden rounded-2xl">
      <Image
        src={preview}
        alt="Uploaded photo"
        width={250}
        height={250}
        className="aspect-square w-full object-cover"
      />

      <button
        onClick={onRemove}
        className="absolute right-3 top-3 rounded-full bg-white p-2 shadow-lg hover:bg-red-500 hover:text-white"
      >
        <X size={18} />
      </button>
    </div>
  );
}