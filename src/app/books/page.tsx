"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BookCopy,
  BookOpen,
  CheckCircle2,
  Clock3,
  LoaderCircle,
  Plus,
  RefreshCw,
  Sparkles,
} from "lucide-react";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { api } from "@/lib/firebase/api";

type MyBook = {
  id: string;
  childName: string | null;
  pageCount: number;
  status: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  previewUrl: string | null;
  orderStatus: string | null;
  paidAt: string | null;
};

type ReorderResponse = {
  id: string;
};

const purchaseStatusDetails: Record<
  string,
  { label: string; classes: string; description: string }
> = {
  PAID: {
    label: "Payment received",
    classes: "bg-[#e4f8eb] text-[#188447]",
    description: "Your order is confirmed and joining the print queue.",
  },
  PRINTING: {
    label: "Being printed",
    classes: "bg-[#e9f1ff] text-[#315dbe]",
    description: "Your colouring book is currently being printed.",
  },
  READY: {
    label: "Ready for you",
    classes: "bg-[#e9f1ff] text-[#315dbe]",
    description: "Your finished book is ready for collection or delivery.",
  },
  COMPLETED: {
    label: "Fulfilled",
    classes: "bg-[#e4f8eb] text-[#188447]",
    description: "This keepsake has been successfully fulfilled.",
  },
};

const draftStatusDetails: Record<
  string,
  { label: string; classes: string; description: string }
> = {
  DRAFT: {
    label: "Draft",
    classes: "bg-[#eef3ff] text-[#315dbe]",
    description: "This book is waiting for you to continue.",
  },
  UPLOADING: {
    label: "Uploading",
    classes: "bg-[#fff3c4] text-[#8a6200]",
    description: "Your photos are being added to this book.",
  },
  GENERATING: {
    label: "Creating pages",
    classes: "bg-[#fff3c4] text-[#8a6200]",
    description: "The Doodles studio is illustrating your pages.",
  },
  READY_FOR_PAYMENT: {
    label: "Awaiting payment",
    classes: "bg-[#fff3c4] text-[#8a6200]",
    description: "Your book is ready for checkout.",
  },
  CANCELLED: {
    label: "Cancelled",
    classes: "bg-[#fff0f0] text-[#b64646]",
    description: "This book was cancelled before fulfilment.",
  },
};

function BooksCloud({ className }: { className: string }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute h-16 w-40 rounded-full bg-white/70 ${className}`}
    >
      <span className="absolute -top-8 left-7 h-20 w-20 rounded-full bg-white/70" />
      <span className="absolute -top-12 right-5 h-24 w-24 rounded-full bg-white/70" />
    </div>
  );
}

function packageName(pageCount: number) {
  return pageCount === 8
    ? "Little Doodler"
    : pageCount === 16
      ? "Big Dreamer"
      : "Custom Doodles Book";
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

const reorderableOrderStatuses = new Set([
  "PAID",
  "PRINTING",
  "READY",
  "COMPLETED",
]);

function BookHistoryCard({
  book,
  reordering,
  onReorder,
}: {
  book: MyBook;
  reordering: boolean;
  onReorder: (bookId: string) => void;
}) {
  const isPurchased =
    book.orderStatus !== null &&
    reorderableOrderStatuses.has(book.orderStatus);
  const details = isPurchased
    ? purchaseStatusDetails[book.orderStatus ?? ""]
    : draftStatusDetails[book.status];
  const displayDetails = details ?? {
    label: book.status.replaceAll("_", " "),
    classes: "bg-[#eef1f6] text-[#596579]",
    description: "This book has been saved to your library.",
  };
  const isGenerating = ["UPLOADING", "GENERATING"].includes(book.status);

  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-white/55 bg-white shadow-[0_20px_45px_rgba(24,55,112,0.18)] transition hover:-translate-y-1 hover:shadow-[0_26px_55px_rgba(24,55,112,0.24)]">
      <div className="relative h-52 overflow-hidden bg-[linear-gradient(145deg,#e9f1ff,#fff8d9)]">
        <div className="absolute inset-y-0 left-0 z-10 w-3 bg-[#315dbe] shadow-[3px_0_8px_rgba(30,60,130,0.18)]" />
        {book.previewUrl ? (
          // Signed preview URLs are intentionally handled by the browser.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={book.previewUrl}
            alt="Generated colouring-page preview"
            draggable={false}
            onContextMenu={(event) => event.preventDefault()}
            className="h-full w-full select-none object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-[#315dbe]">
            <BookOpen className="h-16 w-16 opacity-30" />
            <span className="mt-3 text-xs font-black uppercase tracking-[0.15em] opacity-55">
              Doodles book
            </span>
          </div>
        )}
        <span className={`absolute right-4 top-4 z-20 rounded-full px-3 py-1.5 text-xs font-black ${displayDetails.classes}`}>
          {displayDetails.label}
        </span>
        <span className="absolute bottom-3 left-6 z-20 rounded-full bg-[#243451]/85 px-3 py-1.5 text-xs font-black text-white backdrop-blur-sm">
          {book.pageCount * 2}-page book
        </span>
      </div>

      <div className="p-5">
        <p className="text-xs font-black uppercase tracking-[0.13em] text-[#315dbe]">
          {packageName(book.pageCount)}
        </p>
        <h3 className="mt-2 text-xl font-black text-[#1d2841]">
          {book.childName
            ? `${book.childName}'s colouring book`
            : "My personalised colouring book"}
        </h3>
        <p className="mt-2 text-sm font-medium leading-6 text-[#697287]">
          {displayDetails.description}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-[#edf0f5] pt-4 text-sm">
          <span className="font-semibold text-[#8a94a8]">
            {formatDate(book.paidAt ?? book.createdAt)}
          </span>
          <span className="font-black text-[#243451]">
            KES {book.price.toLocaleString("en-KE")}
          </span>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {isGenerating ? (
            <Link
              href={`/books/${book.id}`}
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#315dbe] px-4 text-sm font-black text-white"
            >
              Track Progress
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : book.status === "READY_FOR_PAYMENT" && !isPurchased ? (
            <Link
              href={`/books/${book.id}/checkout`}
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#ffd24e] px-4 text-sm font-black text-[#243451]"
            >
              Complete Order
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : book.previewUrl ? (
            <Link
              href={`/books/${book.id}/preview`}
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#eef4ff] px-4 text-sm font-black text-[#315dbe] transition hover:bg-[#dfeaff]"
            >
              View Book
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : null}

          {isPurchased && (
            <button
              type="button"
              disabled={reordering}
              onClick={() => onReorder(book.id)}
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#315dbe] px-4 text-sm font-black text-white transition hover:bg-[#244a9b] disabled:cursor-wait disabled:opacity-65"
            >
              {reordering ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Reorder
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function MyBooksContent() {
  const router = useRouter();
  const [books, setBooks] = useState<MyBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reorderingId, setReorderingId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadBooks() {
      try {
        const data = await api<MyBook[]>("/api/books");
        if (active) setBooks(data);
      } catch (loadError) {
        if (active) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "We couldn't load your books.",
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadBooks();

    return () => {
      active = false;
    };
  }, []);

  async function handleReorder(bookId: string) {
    try {
      setError("");
      setReorderingId(bookId);
      const reordered = await api<ReorderResponse>(
        `/api/books/${bookId}/reorder`,
        { method: "POST" },
      );
      router.push(`/books/${reordered.id}/checkout`);
    } catch (reorderError) {
      setError(
        reorderError instanceof Error
          ? reorderError.message
          : "We couldn't prepare this reorder.",
      );
      setReorderingId(null);
    }
  }

  const purchasedBooks = books.filter(
    (book) =>
      book.orderStatus !== null &&
      reorderableOrderStatuses.has(book.orderStatus),
  );
  const draftBooks = books.filter(
    (book) =>
      book.orderStatus === null ||
      !reorderableOrderStatuses.has(book.orderStatus),
  );

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#68a3e6]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#4d86d9_0%,#75ade9_46%,#b7ddf7_100%)]" />
      <div className="pointer-events-none absolute left-[-10%] top-40 h-48 w-[70%] rotate-[-7deg] rounded-[100%] bg-white/[0.08]" />
      <div className="pointer-events-none absolute right-[-16%] top-[44rem] h-56 w-[82%] rotate-[7deg] rounded-[100%] bg-[#e8f5ff]/10" />
      <BooksCloud className="left-[-3rem] top-28 hidden scale-75 sm:block" />
      <BooksCloud className="right-8 top-32 hidden scale-90 lg:block" />
      <BooksCloud className="bottom-36 left-[9%] hidden scale-50 opacity-60 md:block" />

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-8 sm:py-14">
        <header className="flex flex-col items-center justify-between gap-6 text-center text-white sm:flex-row sm:text-left">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-2 text-xs font-black uppercase tracking-[0.15em] backdrop-blur-sm">
              <BookCopy className="h-4 w-4 text-[#ffdf67]" />
              Your keepsake library
            </span>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              My Books
            </h1>
            <p className="mt-3 max-w-2xl text-base font-semibold leading-7 text-white/85">
              Keep your works in progress close, revisit finished books, and
              order another copy of a family favourite.
            </p>
          </div>

          <Link
            href="/create"
            className="inline-flex min-h-13 shrink-0 items-center justify-center gap-2 rounded-full bg-[#ffd24e] px-7 font-black text-[#243451] shadow-[0_4px_0_#dca623] transition hover:translate-y-0.5 hover:shadow-[0_2px_0_#dca623]"
          >
            <Plus className="h-5 w-5" />
            Create New Book
          </Link>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-[1.5rem] border border-white/45 bg-white/95 p-5 shadow-[0_16px_35px_rgba(24,55,112,0.13)]">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#e9f1ff] text-[#315dbe]">
              <BookOpen className="h-5 w-5" />
            </span>
            <p className="mt-4 text-3xl font-black text-[#1d2841]">{books.length}</p>
            <p className="mt-1 text-sm font-bold text-[#758096]">All books</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/45 bg-white/95 p-5 shadow-[0_16px_35px_rgba(24,55,112,0.13)]">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#e4f8eb] text-[#188447]">
              <CheckCircle2 className="h-5 w-5" />
            </span>
            <p className="mt-4 text-3xl font-black text-[#1d2841]">{purchasedBooks.length}</p>
            <p className="mt-1 text-sm font-bold text-[#758096]">Purchased books</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/45 bg-white/95 p-5 shadow-[0_16px_35px_rgba(24,55,112,0.13)]">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#fff3c4] text-[#9b6a00]">
              <Clock3 className="h-5 w-5" />
            </span>
            <p className="mt-4 text-3xl font-black text-[#1d2841]">{draftBooks.length}</p>
            <p className="mt-1 text-sm font-bold text-[#758096]">Drafts & unpaid</p>
          </div>
        </section>

        {error && (
          <div className="mt-6 rounded-2xl border border-[#f2b4b4] bg-[#fff2f2] px-5 py-4 font-bold text-[#a43c3c] shadow-sm" role="alert">
            {error}
          </div>
        )}

        {loading ? (
          <div className="mt-8 flex min-h-64 flex-col items-center justify-center rounded-[2rem] border border-white/50 bg-white/90 text-[#315dbe] shadow-xl">
            <LoaderCircle className="h-9 w-9 animate-spin" />
            <p className="mt-4 font-black">Opening your book library...</p>
          </div>
        ) : books.length === 0 ? (
          <div className="mt-8 rounded-[2rem] border border-white/55 bg-white/95 px-6 py-14 text-center shadow-[0_24px_55px_rgba(24,55,112,0.18)]">
            <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-[#fff3c4] text-[#9b6a00]">
              <Sparkles className="h-10 w-10" />
            </span>
            <h2 className="mt-6 text-3xl font-black text-[#1d2841]">
              Your first story starts here
            </h2>
            <p className="mx-auto mt-3 max-w-lg font-medium leading-7 text-[#697287]">
              Create a personalised colouring book and it will stay here while
              you work on it, then move into your purchase history after payment.
            </p>
            <Link
              href="/create"
              className="mt-7 inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-[#315dbe] px-7 font-black text-white shadow-[0_4px_0_#244a9b]"
            >
              Make My First Book
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        ) : (
          <div className="space-y-12">
            {purchasedBooks.length > 0 && (
              <section className="mt-8">
                <div className="mb-5 flex items-end justify-between gap-4 text-white">
                  <div>
                    <span className="text-xs font-black uppercase tracking-[0.15em] text-[#ffdf67]">
                      Purchase history
                    </span>
                    <h2 className="mt-1 text-2xl font-black">Purchased Books</h2>
                  </div>
                  <span className="hidden text-sm font-bold text-white/70 sm:block">
                    Ready to preview and reorder
                  </span>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {purchasedBooks.map((book) => (
                    <BookHistoryCard
                      key={book.id}
                      book={book}
                      reordering={reorderingId === book.id}
                      onReorder={handleReorder}
                    />
                  ))}
                </div>
              </section>
            )}

            {draftBooks.length > 0 && (
              <section className={purchasedBooks.length > 0 ? "" : "mt-8"}>
                <div className="mb-5 flex items-end justify-between gap-4 text-white">
                  <div>
                    <span className="text-xs font-black uppercase tracking-[0.15em] text-[#ffdf67]">
                      Works in progress
                    </span>
                    <h2 className="mt-1 text-2xl font-black">Drafts &amp; Unpaid</h2>
                  </div>
                  <span className="hidden text-sm font-bold text-white/70 sm:block">
                    Saved until you are ready
                  </span>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {draftBooks.map((book) => (
                    <BookHistoryCard
                      key={book.id}
                      book={book}
                      reordering={reorderingId === book.id}
                      onReorder={handleReorder}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function MyBooksPage() {
  return (
    <ProtectedRoute>
      <MyBooksContent />
    </ProtectedRoute>
  );
}
