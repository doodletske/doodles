"use client";

import { useEffect, useMemo, useRef } from "react";
import { ArrowLeftRight, Plus, RefreshCw } from "lucide-react";

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
  const addInputRef = useRef<HTMLInputElement>(null);
  const previewUrls = useMemo(
    () => images.map((file) => URL.createObjectURL(file)),
    [images],
  );

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  if (images.length === 0) {
    return null;
  }

  function addMorePhotos(files: FileList | null) {
    if (!files) return;

    addImages(Array.from(files));
  }

  return (
    <div className="mt-12">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-2xl font-black text-[#1d2841]">Book Pages</h3>
          <p className="mt-1 text-sm font-medium text-[#697287]">
            The order below is the order your pages will appear in the book.
          </p>
        </div>

        <div
          role="note"
          className="flex max-w-xl items-start gap-3 rounded-2xl border border-[#efd05d] bg-[#fff8d9] px-4 py-3 shadow-sm"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ffd24e] text-[#243451]">
            <ArrowLeftRight className="h-5 w-5" />
          </span>

          <div>
            <p className="text-sm font-black text-[#243451]">
              Arrange your story your way
            </p>
            <p className="mt-1 text-sm leading-6 text-[#5c667a]">
              Use <RefreshCw className="mx-1 inline h-3.5 w-3.5 text-[#315dbe]" />
              to replace a photo, or the left and right arrows to move it to a
              different page.
            </p>
          </div>
        </div>
      </div>

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
