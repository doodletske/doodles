import { api } from "@/lib/firebase/api";
import type { UploadedPage } from "@/services/storage/uploadBook";

export async function savePages(
  bookId: string,
  pages: UploadedPage[]
) {
  return api(`/api/books/${bookId}/pages`, {
    method: "POST",
    body: JSON.stringify(
      pages.map((page) => ({
        pageNumber: page.pageNumber,
        originalUrl: page.originalUrl,
        storagePath: page.storagePath,
      }))
    ),
  });
}
