"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { UploadCloud } from "lucide-react";

type Props = {
  pages: number;
  images: File[];
  addImages: (files: File[]) => void;
  compressing: boolean;
  photoConsent: boolean;
};

export default function UploadDropzone({
  pages,
  images,
  addImages,
  compressing,
  photoConsent,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [dragging, setDragging] = useState(false);

  function openPicker() {
    if (!canUpload) return;
    inputRef.current?.click();
  }

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    if (!canUpload) return;
    addImages(Array.from(e.target.files ?? []));

    // Allows selecting the same file twice
    e.target.value = "";
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();

    setDragging(false);

    if (!canUpload) return;

    addImages(Array.from(e.dataTransfer.files));
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    if (!canUpload) return;
  }

  const remaining = pages - images.length;
  const canUpload = photoConsent && remaining > 0 && !compressing;

  return (
    <>
      <input
        ref={inputRef}
        hidden
        type="file"
        multiple
        accept="image/*"
        disabled={!canUpload}
        onChange={handleInput}
      />

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={() => canUpload && setDragging(true)}
        onDragLeave={() => setDragging(false)}
        className={`mt-10 rounded-3xl border-2 border-dashed p-12 text-center transition-all duration-200 ${
          !canUpload
            ? "border-gray-200 bg-gray-100 text-gray-400"
            : dragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-gray-50"
        }`}
      >
        <UploadCloud
          size={64}
          className={`mx-auto ${
            canUpload && dragging ? "text-blue-600" : "text-gray-400"
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
          disabled={!canUpload}
          className={`rounded-xl px-8 py-4 font-semibold text-white transition-colors duration-300 ${
            canUpload
              ? "bg-blue-600 hover:bg-blue-700"
              : "cursor-not-allowed bg-gray-300"
          }`}
        >
          {!photoConsent
            ? "Confirm permission to upload"
            : compressing
            ? "Preparing your photos…"
            : remaining > 0
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
