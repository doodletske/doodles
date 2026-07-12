"use client";

import { useState } from "react";

export interface UploadedPhoto {
  id: string;
  file: File;
  preview: string;
}

export default function usePhotoUpload() {
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);

  const addPhotos = (files: FileList | null) => {
    if (!files) return;

    const incoming = Array.from(files).map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
    }));

    setPhotos((prev) => [...prev, ...incoming].slice(0, 20));
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
  };

  return {
    photos,
    addPhotos,
    removePhoto,
  };
}