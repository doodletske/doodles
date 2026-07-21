"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import FlipBook from "@/components/book/FlipBook";

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

      const data = await response.json();

      setBook(data);
    }

    loadBook();
  }, [bookId]);

  if (!book) {
    return (
      <main className="mx-auto max-w-7xl py-20">
        Loading preview...
      </main>
    );
  }

  const pages = book.pages
    .filter(
      (
        page
      ): page is BookPage & { coloringUrl: string } =>
        page.coloringUrl !== null
    )
    .sort((a, b) => a.pageNumber - b.pageNumber);

  return (
    <main className="min-h-screen bg-gray-100">

      <div className="mx-auto max-w-7xl px-8 py-10">

        <h1 className="mb-10 text-center text-4xl font-bold">
          Your Colouring Book
        </h1>

        <div className="grid gap-10 lg:grid-cols-2">

          {/* ORIGINAL PHOTO */}

          <section>

            <h2 className="mb-4 text-xl font-semibold">
              Original Photograph
            </h2>

            <div className="overflow-hidden rounded-2xl border bg-white shadow">

              <img
                src={pages[0].originalUrl}
                alt="Original"
                className="w-full object-cover"
              />

            </div>

          </section>

          {/* FLIPBOOK */}

          <section>

            <h2 className="mb-4 text-xl font-semibold">
              Colouring Book Preview
            </h2>

            <FlipBook pages={pages} />

          </section>

        </div>

        <div className="mt-10 flex items-center justify-center">

          <button
            className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
          >
            Continue to Checkout
          </button>

        </div>

      </div>

    </main>
  );
}