"use client";

import UploadCounter from "./UploadCounter";
import UploadDropzone from "./UploadDropzone";
import UploadGrid from "./UploadGrid";
import ContinueBar from "./ContinueBar";

type Props = {
  pages: number;

  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  addImages: (files: File[]) => void;

  complete: boolean;

  onRemove: (index: number) => void;
  onReplace: (index: number, file: File) => void;
  onMoveLeft: (index: number) => void;
  onMoveRight: (index: number) => void;

  onContinue: () => void;
  onChangePackage: () => void;
};

export default function UploadSection({
  pages,
  images,
  setImages,
  addImages,
  complete,
  onRemove,
  onReplace,
  onMoveLeft,
  onMoveRight,
  onContinue,
  onChangePackage,
}: Props) {
  return (
    <section
      id="upload-section"
      className="mt-20 rounded-3xl border border-gray-200 bg-white p-10 shadow-sm"
    >
      {/* Header */}

      <div className="mb-10">
        <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
          Step 2 of 2
        </span>

        <h2 className="mt-6 text-4xl font-bold text-gray-900">
          Upload Your Photos
        </h2>

        <p className="mt-3 max-w-2xl text-lg leading-8 text-gray-600">
          Upload exactly <strong>{pages}</strong> photos. Arrange them in the
          order you'd like them to appear in your colouring book.
        </p>
      </div>

      {/* Progress */}

      <UploadCounter
        uploaded={images.length}
        required={pages}
      />

      {/* Upload Area */}

      <UploadDropzone
        pages={pages}
        images={images}
        addImages={addImages}
      />

      {/* Book Pages */}

      <UploadGrid
        required={pages}
        images={images}
        addImages={addImages}
        onRemove={onRemove}
        onReplace={onReplace}
        onMoveLeft={onMoveLeft}
        onMoveRight={onMoveRight}
      />

      {/* Continue */}

      <ContinueBar
        complete={complete}
        uploaded={images.length}
        pages={pages}
        onContinue={onContinue}
        onChangePackage={onChangePackage}
      />
    </section>
  );
}