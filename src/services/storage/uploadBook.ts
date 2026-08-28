import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import { auth, storage } from "@/lib/firebase/firebase";

export type UploadedPage = {
  pageNumber: number;
  originalUrl: string;
  storagePath: string;
};

export async function uploadBookPage(
  bookId: string,
  pageNumber: number,
  file: File
): Promise<UploadedPage> {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Please sign in again before uploading your photo.");
  }

  const suppliedExtension = file.name.split(".").pop()?.toLowerCase();
  const extension =
    suppliedExtension && /^[a-z0-9]{2,5}$/.test(suppliedExtension)
      ? suppliedExtension
      : "jpg";
  const storagePath =
    `users/${user.uid}/originals/${bookId}/page-${String(pageNumber).padStart(3, "0")}.${extension}`;
  const storageRef = ref(storage, storagePath);

  await uploadBytes(storageRef, file, {
    contentType: file.type || "image/jpeg",
    customMetadata: { bookId, pageNumber: String(pageNumber) },
  });

  return {
    pageNumber,
    originalUrl: await getDownloadURL(storageRef),
    storagePath,
  };
}

export async function uploadBook(
  bookId: string,
  images: File[]
): Promise<UploadedPage[]> {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Please sign in again before uploading your photos.");
  }

  const uploaded: UploadedPage[] = [];

  for (let i = 0; i < images.length; i++) {
    uploaded.push(await uploadBookPage(bookId, i + 1, images[i]));
  }

  return uploaded;
}
