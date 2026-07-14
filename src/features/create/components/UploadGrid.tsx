"use client";

import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";

import UploadSlot from "./UploadSlot";

type Props = {
  required: number;
  images: File[];

  addImages: (files: File[]) => void;

  onRemove: (index: number) => void;
  onReplace: (index: number, file: File) => void;
  onMoveLeft: (index: number) => void;
  onMoveRight: (index: number) => void;
};

export default function UploadGrid({
  required,
  images,
  addImages,
  onRemove,
  onReplace,
  onMoveLeft,
  onMoveRight,
}: Props) {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const addInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const urls = images.map((file) => URL.createObjectURL(file));

    setPreviewUrls(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  if (images.length === 0) {
    return null;
  }

  function addMorePhotos(files: FileList | null) {
    if (!files) return;

    addImages(Array.from(files));
  }

  return (
    <div className="mt-12">
      <h3 className="mb-6 text-2xl font-bold text-gray-900">
        Book Pages
      </h3>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
        {images.map((_, index) => (
          <UploadSlot
            key={index}
            page={index + 1}
            totalPages={required}
            imageUrl={previewUrls[index]}
            canMoveLeft={index > 0}
            canMoveRight={index < images.length - 1}
            onRemove={() => onRemove(index)}
            onReplace={(file) => onReplace(index, file)}
            onMoveLeft={() => onMoveLeft(index)}
            onMoveRight={() => onMoveRight(index)}
          />
        ))}

        {images.length < required && (
          <>
            <input
              ref={addInputRef}
              hidden
              multiple
              type="file"
              accept="image/*"
              onChange={(e) => {
                addMorePhotos(e.target.files);
                e.target.value = "";
              }}
            />

            <button
              type="button"
              onClick={() => addInputRef.current?.click()}
              className="
                aspect-square
                rounded-2xl
                border-2
                border-dashed
                border-gray-300
                bg-gray-50
                transition
                hover:border-blue-500
                hover:bg-blue-50
              "
            >
              <div className="flex h-full flex-col items-center justify-center">
                <Plus
                  size={42}
                  className="text-blue-600"
                />

                <p className="mt-4 font-semibold text-gray-800">
                  Page {images.length + 1} of {required}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Add Photo
                </p>
              </div>
            </button>
          </>
        )}
      </div>
    </div>
  );
}