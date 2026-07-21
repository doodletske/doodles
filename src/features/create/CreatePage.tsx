"use client";

import { useRef, useState } from "react";

import Container from "@/components/layout/Container";

import PackageSelection from "./components/PackageSelection";
import UploadSection from "./components/UploadSection";

import { createBook } from "@/services/books/createBook";
import { uploadBook } from "@/services/storage/uploadBook";
import { compressImages } from "@/services/images/compressImages";

import { api } from "@/lib/firebase/api";

import { useRouter } from "next/navigation";

import { PackageType } from "./types";
import { PACKAGES } from "./constants";
import CustomPackage from "./components/CustomPackage";

export default function CreatePage() {
  const [selectedPackage, setSelectedPackage] =
    useState<PackageType | null>(null);

  const [images, setImages] = useState<File[]>([]);
  const [compressing, setCompressing] =
  useState(false);

  const router = useRouter();

  const uploadRef = useRef<HTMLDivElement>(null);
  const packageRef = useRef<HTMLDivElement>(null);

  function handleSelect(pkg: PackageType) {
    setSelectedPackage(pkg);

    // Reset uploads whenever the package changes
    setImages([]);

    if (pkg !== "custom") {
      setTimeout(() => {
        uploadRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }


async function addImages(files: File[]) {
  if (!files.length) return;

  setCompressing(true);

  try {
    const compressed = await compressImages(files);

    setImages((previous) => {
      const remaining = pages - previous.length;

      return [
        ...previous,
        ...compressed.slice(0, remaining),
      ];
    });
  } finally {
    setCompressing(false);
  }
}

  function changePackage() {
    packageRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function removeImage(index: number) {
    setImages((previous) =>
      previous.filter((_, i) => i !== index)
    );
  }

  function moveImageLeft(index: number) {
    if (index === 0) return;

    setImages((previous) => {
      const updated = [...previous];

      [updated[index - 1], updated[index]] = [
        updated[index],
        updated[index - 1],
      ];

      return updated;
    });
  }

  function moveImageRight(index: number) {
    setImages((previous) => {
      if (index >= previous.length - 1) return previous;

      const updated = [...previous];

      [updated[index], updated[index + 1]] = [
        updated[index + 1],
        updated[index],
      ];

      return updated;
    });
  }

  function replaceImage(index: number, file: File) {
    setImages((previous) => {
      const updated = [...previous];

      updated[index] = file;

      return updated;
    });
  }

  async function handleContinue() {
  try {
    // 1. Create the book
    const book = await createBook(pages);

    console.log("Book created:", book);

    // 2. Upload all photos
const uploadedPages =
  await uploadBook(book.id, images);

// 3. Save uploaded pages in PostgreSQL
await api(
  `/api/books/${book.id}/pages`,
  {
    method: "POST",
    body: JSON.stringify(uploadedPages),
  }
);

// 4. Tell the backend to start generating
await api(
  `/api/generation/${book.id}`,
  {
    method: "POST",
  }
);

// 5. Go to the progress page
router.push(`/books/${book.id}`);

  } catch (err) {
    console.error(err);

    alert("Upload failed.");
  }
}

  const pages =
    PACKAGES.find((p) => p.id === selectedPackage)?.pages ?? 0;

  const complete =
    images.length === pages && pages > 0;

  return (
    <Container>
      <div className="py-16">

        <div ref={packageRef}>
          <PackageSelection
            selected={selectedPackage}
            onSelect={handleSelect}
          />
        </div>

        {selectedPackage === "custom" ? (
  <CustomPackage
    onChangePackage={changePackage}
  />
) : selectedPackage ? (
  <div ref={uploadRef}>
    <UploadSection
      pages={pages}
      images={images}
      setImages={setImages}
      addImages={addImages}
      compressing={compressing}      
      complete={complete}
      onRemove={removeImage}
      onReplace={replaceImage}
      onMoveLeft={moveImageLeft}
      onMoveRight={moveImageRight}
      onContinue={handleContinue}
      onChangePackage={changePackage}
    />
  </div>
) : null}
      </div>
    </Container>
  );
}