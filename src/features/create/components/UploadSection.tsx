"use client";

import UploadCounter from "./UploadCounter";
import UploadDropzone from "./UploadDropzone";
import UploadGrid from "./UploadGrid";
import ContinueBar from "./ContinueBar";

type Props = {
  pages: number;

  images: File[];
  addImages: (files: File[]) => void;
  compressing: boolean;

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
  addImages,
  compressing,
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
      className="relative mt-12 overflow-hidden rounded-[2.25rem] border border-[#dbe5f5] bg-white p-6 shadow-[0_20px_48px_rgba(41,72,125,0.10)] sm:p-8 lg:p-10"
    >
      <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full border-[32px] border-[#edf4ff]" />
      {/* Header */}

      <div className="relative mb-10">
        <span className="rounded-full bg-[#eaf8ef] px-4 py-2 text-sm font-black text-[#188447]">
          Step 2 of 2
        </span>

        <h2 className="mt-6 text-4xl font-black tracking-tight text-[#1d2841]">
          Add the moments you love
        </h2>

        <p className="mt-3 max-w-2xl text-lg leading-8 text-[#5c667a]">
          Upload exactly <strong>{pages}</strong> photos. Arrange them in the
          order you&apos;d like them to appear in your colouring book.
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
        compressing={compressing}
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
