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
    const file = images[i];

    const suppliedExtension = file.name.split(".").pop()?.toLowerCase();
    const extension =
      suppliedExtension && /^[a-z0-9]{2,5}$/.test(suppliedExtension)
        ? suppliedExtension
        : "jpg";

    const storagePath =
      `users/${user.uid}/originals/${bookId}/page-${String(i + 1).padStart(3, "0")}.${extension}`;

    const storageRef = ref(storage, storagePath);

    await uploadBytes(storageRef, file, {
      contentType: file.type || "image/jpeg",
      customMetadata: {
        bookId,
        pageNumber: String(i + 1),
      },
    });

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
