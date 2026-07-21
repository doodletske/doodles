"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type BookPage = {
  id: string;
  pageNumber: number;
  status: string;
};

type Book = {
  id: string;
  status: string;
  pageCount: number;
  pages: BookPage[];
};

export default function BookProgressPage() {
  const { bookId } = useParams<{ bookId: string }>();

  const [book, setBook] = useState<Book | null>(null);

  async function loadBook() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/books/${bookId}`
    );

    if (!response.ok) return;

    const data = await response.json();

    setBook(data);
  }

  useEffect(() => {
    loadBook();

    const interval = setInterval(loadBook, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!book) {
    return (
      <main className="mx-auto max-w-4xl py-20">
        Loading...
      </main>
    );
  }

  const completed = book.pages.filter(
    (page) => page.status === "COMPLETED"
  ).length;

  const percentage =
    (completed / book.pageCount) * 100;

  let title = "Creating Your Colouring Book";
  let subtitle =
    "Please don't close this page while your book is being generated.";

  if (completed > 0 && completed < book.pageCount) {
    title = "Your pages are being illustrated...";
  }

  if (
    completed >= book.pageCount - 1 &&
    completed < book.pageCount
  ) {
    title = "Almost finished...";
  }

  if (book.status === "READY_FOR_PAYMENT") {
    title = "🎉 Your colouring book is ready!";
    subtitle =
      "Everything is complete. You can now preview your book.";
  }

  function statusLabel(status: string) {
    switch (status) {
      case "UPLOADING":
        return "⬆️ Uploading";

      case "UPLOADED":
        return "⏳ Waiting";

      case "GENERATING":
        return "🟡 Generating";

      case "COMPLETED":
        return "✅ Complete";

      case "FAILED":
        return "❌ Failed";

      default:
        return status;
    }
  }

  return (
    <main className="mx-auto max-w-4xl py-20">

      <h1 className="text-4xl font-bold">
        {title}
      </h1>

      <p className="mt-3 text-gray-500">
        {subtitle}
      </p>

      {/* Progress */}

      <div className="mt-10">

        <div className="mb-3 flex justify-between text-sm">

          <span>
            {completed} / {book.pageCount} complete
          </span>

          <span className="font-medium">
            {book.status}
          </span>

        </div>

        <div className="h-4 overflow-hidden rounded-full bg-gray-200">

          <div
            className="h-full bg-blue-600 transition-all duration-500"
            style={{
              width: `${percentage}%`,
            }}
          />

        </div>

      </div>

      {/* Pages */}

      <div className="mt-12 space-y-3">

        {book.pages.map((page) => (
          <div
            key={page.id}
            className="flex items-center justify-between rounded-xl border p-4"
          >
            <span className="font-medium">
              Page {page.pageNumber}
            </span>

            <span>
              {statusLabel(page.status)}
            </span>

          </div>
        ))}

      </div>

      {book.status === "READY_FOR_PAYMENT" && (
        <div className="mt-12">

          <Link
            href={`/books/${book.id}/preview`}
            className="inline-flex rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
          >
            Preview Book
          </Link>

        </div>
      )}

    </main>
  );
}