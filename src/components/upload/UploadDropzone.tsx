"use client";

import { ImagePlus } from "lucide-react";

type UploadDropzoneProps = {
  addPhotos: (files: FileList | null) => void;
};

export default function UploadDropzone({
  addPhotos,
}: UploadDropzoneProps) {
  return (
    <div className="rounded-3xl border-2 border-dashed border-blue-300 bg-blue-50 p-12 text-center transition-all hover:border-blue-500 hover:bg-blue-100">

      <ImagePlus
        className="mx-auto h-16 w-16 text-blue-600"
        strokeWidth={1.5}
      />

      <h2 className="mt-6 text-3xl font-bold text-gray-900">
        Choose Your Favourite Memories
      </h2>

      <p className="mx-auto mt-4 max-w-xl text-gray-600">
        Drag and drop your favourite photos here, or select them
        from your computer. We'll transform each one into a
        beautiful colouring page.
      </p>

      <input
        id="photo-upload"
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        multiple
        className="hidden"
        onChange={(e) => addPhotos(e.target.files)}
      />

      <label
        htmlFor="photo-upload"
        className="mt-8 inline-flex cursor-pointer items-center rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
      >
        Select Photos
      </label>

      <div className="mt-8 grid gap-4 text-sm text-gray-500 md:grid-cols-3">

        <div>
          <strong className="block text-gray-700">
            Supported Formats
          </strong>

          JPG, JPEG & PNG
        </div>

        <div>
          <strong className="block text-gray-700">
            Minimum
          </strong>

          8 photos
        </div>

        <div>
          <strong className="block text-gray-700">
            Maximum
          </strong>

          20 photos
        </div>

      </div>
    </div>
  );
}