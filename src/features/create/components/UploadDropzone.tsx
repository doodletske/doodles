"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { UploadCloud } from "lucide-react";

type Props = {
  pages: number;
  images: File[];
  addImages: (files: File[]) => void;
  compressing: boolean;
};

export default function UploadDropzone({
  pages,
  images,
  addImages,
  compressing,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [dragging, setDragging] = useState(false);

  function openPicker() {
    inputRef.current?.click();
  }

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    addImages(Array.from(e.target.files ?? []));

    // Allows selecting the same file twice
    e.target.value = "";
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();

    setDragging(false);

    addImages(Array.from(e.dataTransfer.files));
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  const remaining = pages - images.length;

  return (
    <>
      <input
        ref={inputRef}
        hidden
        type="file"
        multiple
        accept="image/*"
        onChange={handleInput}
      />

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={() => setDragging(true)}
        onDragLeave={() => setDragging(false)}
        className={`mt-10 rounded-3xl border-2 border-dashed p-12 text-center transition-all duration-200 ${
          dragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-gray-50"
        }`}
      >
        <UploadCloud
          size={64}
          className={`mx-auto ${
            dragging ? "text-blue-600" : "text-gray-400"
          }`}
        />

        <h3 className="mt-6 text-2xl font-semibold">
          Drag & Drop Your Photos
        </h3>

        <p className="mt-3 text-gray-500">
          Upload JPG, PNG, WEBP or HEIC images.
        </p>

        <div className="my-6 text-gray-400">or</div>

        <button
          type="button"
          onClick={openPicker}
          disabled={remaining === 0}
          className={`rounded-xl px-8 py-4 font-semibold text-white transition ${
            remaining > 0
              ? "bg-blue-600 hover:bg-blue-700"
              : "cursor-not-allowed bg-green-600"
          }`}
        >
          {remaining > 0
            ? `Select ${remaining} More Photo${
                remaining === 1 ? "" : "s"
              }`
            : "All Photos Selected ✓"}
        </button>

        <p className="mt-6 text-sm text-gray-500">
          {images.length} / {pages} selected
        </p>
      </div>
    </>
  );
}