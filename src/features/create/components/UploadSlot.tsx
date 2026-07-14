"use client";

import { ChangeEvent, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";

type Props = {
  page: number;
  totalPages: number;

  imageUrl?: string;

  canMoveLeft: boolean;
  canMoveRight: boolean;

  onRemove: () => void;
  onReplace: (file: File) => void;
  onMoveLeft: () => void;
  onMoveRight: () => void;
};

export default function UploadSlot({
  page,
  totalPages,
  imageUrl,
  canMoveLeft,
  canMoveRight,
  onRemove,
  onReplace,
  onMoveLeft,
  onMoveRight,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function chooseReplacement() {
    inputRef.current?.click();
  }

  function handleReplace(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    onReplace(file);

    e.target.value = "";
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">

      <input
        ref={inputRef}
        hidden
        type="file"
        accept="image/*"
        onChange={handleReplace}
      />

      {/* Header */}

      <div className="border-b bg-gray-50 px-4 py-3">
        <p className="font-semibold text-gray-700">
          Page {page} of {totalPages}
        </p>
      </div>

      {/* Image */}

      <div className="aspect-square bg-gray-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`Page ${page}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <ImageIcon
              size={48}
              className="text-gray-300"
            />
          </div>
        )}
      </div>

      {/* Actions */}

      {imageUrl && (
        <div className="grid grid-cols-4 border-t">

          <button
            onClick={chooseReplacement}
            className="flex justify-center border-r p-3 hover:bg-gray-100"
            title="Replace"
          >
            <RefreshCw size={18} />
          </button>

          <button
            onClick={onMoveLeft}
            disabled={!canMoveLeft}
            className="flex justify-center border-r p-3 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            title="Move Earlier"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={onMoveRight}
            disabled={!canMoveRight}
            className="flex justify-center border-r p-3 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            title="Move Later"
          >
            <ChevronRight size={18} />
          </button>

          <button
            onClick={onRemove}
            className="flex justify-center p-3 text-red-600 hover:bg-red-50"
            title="Remove"
          >
            <Trash2 size={18} />
          </button>

        </div>
      )}
    </div>
  );
}