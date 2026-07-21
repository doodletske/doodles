import { api } from "@/lib/firebase/api";

export type CreateBookResponse = {
  id: string;
  pageCount: number;
  status: string;
};

export async function createBook(
  pageCount: number,
  childName?: string
): Promise<CreateBookResponse> {
  return api("/api/books", {
    method: "POST",
    body: JSON.stringify({
      pageCount,
      childName,
    }),
  });
}