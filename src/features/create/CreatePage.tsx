"use client";

import { useRef, useState } from "react";

import Container from "@/components/layout/Container";

import PackageSelection from "./components/PackageSelection";
import UploadSection from "./components/UploadSection";

import { PackageType } from "./types";
import { PACKAGES } from "./constants";
import CustomPackage from "./components/CustomPackage";

export default function CreatePage() {
  const [selectedPackage, setSelectedPackage] =
    useState<PackageType | null>(null);

  const [images, setImages] = useState<File[]>([]);

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

  function addImages(files: File[]) {
  setImages((previous) => {
    const remaining = pages - previous.length;

    if (remaining <= 0) {
      return previous;
    }

    const accepted = files
      .filter((file) => file.type.startsWith("image/"))
      .slice(0, remaining);

    return [...previous, ...accepted];
  });
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

  function handleContinue() {
    console.log("Sprint 9 → Upload to Firebase");
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