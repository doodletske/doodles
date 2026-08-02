"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import FlipBook, {
  FlipBookPage,
} from "@/components/book/FlipBook";

type BookPage = {
  id: string;
  pageNumber: number;
  originalUrl: string;
  coloringUrl: string | null;
};

type Book = {
  id: string;
  pageCount: number;
  pages: BookPage[];
};

export default function PreviewBookPage() {
  const { bookId } = useParams<{ bookId: string }>();

  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    async function loadBook() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/books/${bookId}`
      );

      if (!response.ok) return;

      const data: Book = await response.json();

      setBook(data);
    }

    loadBook();
  }, [bookId]);

  if (!book) {
    return (
      <main className="mx-auto max-w-7xl py-20 text-center">
        Loading preview...
      </main>
    );
  }

  const pages: FlipBookPage[] = book.pages
    .filter(
      (
        page
      ): page is BookPage & { coloringUrl: string } =>
        page.coloringUrl !== null
    )
    .sort((a, b) => a.pageNumber - b.pageNumber);

  return (
    <main className="min-h-screen bg-[#f4f1ea]">
      <div className="mx-auto max-w-7xl px-8 py-10">

        <h1 className="mb-2 text-center text-4xl font-bold text-gray-900">
          Preview Your Colouring Book
        </h1>

        <p className="mb-10 text-center text-gray-500">
          Flip through your colouring book before
          proceeding to checkout.
        </p>

        <div className="flex justify-center">
          <FlipBook
            cover="/images/front-cover.jpg"
            pages={pages}
          />
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href={`/books/${book.id}/checkout`}
            className="
              inline-flex
              items-center
              justify-center
              rounded-xl
              bg-blue-600
              px-10
              py-4
              text-lg
              font-semibold
              text-white
              transition
              hover:bg-blue-700
            "
          >
            Continue to Checkout
          </Link>
        </div>

      </div>
    </main>
  );
}