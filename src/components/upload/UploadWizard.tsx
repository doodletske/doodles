"use client";

import UploadHeader from "./UploadHeader";
import UploadDropzone from "./UploadDropzone";
import UploadCounter from "./UploadCounter";
import UploadGrid from "./UploadGrid";
import ContinueButton from "./ContinueButton";
import usePhotoUpload from "./hooks/usePhotoUpload";

export default function UploadWizard() {
  const { photos, addPhotos, removePhoto } = usePhotoUpload();

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <UploadHeader />

      <div className="mt-10 rounded-3xl bg-white p-8 shadow-xl md:p-10">

        <UploadDropzone addPhotos={addPhotos} />

        <UploadCounter
          uploaded={photos.length}
          minimum={8}
          maximum={20}
        />

        <UploadGrid
          photos={photos}
          onRemove={removePhoto}
        />

        <div className="mt-10 flex justify-end">
          <ContinueButton disabled={photos.length < 8} />
        </div>

      </div>
    </div>
  );
}