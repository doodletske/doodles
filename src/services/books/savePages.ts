import { api } from "@/lib/firebase/api";

type UploadedPage = {
  pageNumber: number;
  downloadUrl: string;
  storagePath: string;
};

export async function savePages(
  bookId: string,
  pages: UploadedPage[]
) {
  return api(`/api/books/${bookId}/pages`, {
    method: "POST",
    body: JSON.stringify(
      pages.map((page) => ({
        pageNumber: page.pageNumber,
        originalUrl: page.downloadUrl,
        storagePath: page.storagePath,
      }))
    ),
  });
}