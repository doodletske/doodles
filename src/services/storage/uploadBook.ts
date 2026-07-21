import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import { storage } from "@/lib/firebase/firebase";

export type UploadedPage = {
  pageNumber: number;
  originalUrl: string;
  storagePath: string;
};

export async function uploadBook(
  bookId: string,
  images: File[]
): Promise<UploadedPage[]> {
  const uploaded: UploadedPage[] = [];

  for (let i = 0; i < images.length; i++) {
    const file = images[i];

    const extension =
      file.name.split(".").pop() || "jpg";

    const storagePath =
      `books/${bookId}/page-${String(i + 1).padStart(3, "0")}.${extension}`;

    const storageRef = ref(storage, storagePath);

    await uploadBytes(storageRef, file);

    const originalUrl =
      await getDownloadURL(storageRef);

    uploaded.push({
      pageNumber: i + 1,
      originalUrl,
      storagePath,
    });
  }

  return uploaded;
}