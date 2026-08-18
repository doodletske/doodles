"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  ArrowRight,
  Check,
  Clock3,
  LoaderCircle,
  Sparkles,
} from "lucide-react";

import GenerationPageCard, {
  GenerationBookPage,
} from "@/components/book/GenerationPageCard";
import GenerationScene from "@/components/book/GenerationScene";
import { api } from "@/lib/firebase/api";

type Book = {
  id: string;
  status: string;
  pageCount: number;
  pages: GenerationBookPage[];
};

function SkyCloud({ className }: { className: string }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute h-16 w-40 rounded-full bg-white/70 blur-[0.2px] ${className}`}
    >
      <span className="absolute -top-8 left-7 h-20 w-20 rounded-full bg-white/70" />
      <span className="absolute -top-12 right-5 h-24 w-24 rounded-full bg-white/70" />
    </div>
  );
}

export default function BookProgressPage() {
  const { bookId } = useParams<{ bookId: string }>();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    let active = true;

    async function loadBook() {
      const data = await api<Book>(`/api/books/${bookId}`);

      if (active) {
        setBook(data);
      }
    }

    void loadBook();

    const interval = window.setInterval(() => {
      void loadBook();
    }, 3000);

    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, [bookId]);

  if (!book) {
    return (
      <main className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-[#68a3e6] px-6 text-white">
        <SkyCloud className="left-[-3rem] top-28 scale-75" />
        <SkyCloud className="right-8 top-20 hidden sm:block" />
        <div className="relative flex flex-col items-center text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#315dbe] shadow-xl">
            <LoaderCircle className="h-8 w-8 animate-spin" />
          </span>
          <p className="mt-5 text-lg font-black">Opening the Doodlets studio...</p>
        </div>
      </main>
    );
  }

  const pages = [...book.pages].sort(
    (first, second) => first.pageNumber - second.pageNumber,
  );
  const completed = pages.filter(
    (page) => page.status === "COMPLETED",
  ).length;
  const ready = book.status === "READY_FOR_PAYMENT";
  const percentage = Math.min(
    100,
    book.pageCount > 0 ? (completed / book.pageCount) * 100 : 0,
  );
  const activePage =
    pages.find((page) => page.status === "GENERATING") ??
    pages.find((page) => page.status === "UPLOADED") ??
    pages.find((page) => page.status === "UPLOADING");
  const queuedPage = pages.find(
    (page) =>
      page.id !== activePage?.id &&
      ["UPLOADED", "UPLOADING", "GENERATING"].includes(page.status),
  );

  let title = "We’re creating your colouring book";
  let subtitle = "Your memories are becoming pages made especially for you.";

  if (completed > 0 && completed < book.pageCount - 1) {
    title = "Your story is taking shape";
    subtitle = `${completed} beautiful ${completed === 1 ? "page is" : "pages are"} already complete.`;
  }

  if (completed >= book.pageCount - 1 && !ready) {
    title = "The finishing touches are going in";
    subtitle = "Your book is almost ready to preview.";
  }

  if (ready) {
    title = "Your colouring book is ready!";
    subtitle = "Every page is complete and waiting for you to explore.";
  }

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#68a3e6]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#4d86d9_0%,#75ade9_44%,#b7ddf7_100%)]" />
      <div className="pointer-events-none absolute left-[-10%] top-32 h-48 w-[70%] rotate-[-7deg] rounded-[100%] bg-white/[0.08]" />
      <div className="pointer-events-none absolute right-[-15%] top-[32rem] h-56 w-[80%] rotate-[8deg] rounded-[100%] bg-[#e8f5ff]/10" />
      <SkyCloud className="left-[-3rem] top-24 hidden scale-75 sm:block" />
      <SkyCloud className="right-6 top-28 hidden scale-90 lg:block" />
      <SkyCloud className="left-[12%] top-[48rem] hidden scale-50 opacity-60 sm:block" />

      <div className="relative mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14 lg:py-16">
        <header className="max-w-3xl text-white" aria-live="polite">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-2 text-xs font-black uppercase tracking-[0.15em] backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-[#ffdf67]" />
            Doodlets book studio
          </span>

          <h1 className="mt-5 text-4xl font-black leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-white/85 sm:text-lg">
            {subtitle}
          </p>
        </header>

        {!ready ? (
          <div className="mt-7 flex max-w-3xl items-start gap-4 rounded-[1.5rem] border border-white/50 bg-white/95 p-5 text-[#243451] shadow-[0_18px_40px_rgba(24,55,112,0.16)]">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#fff3c4] text-[#b87300]">
              <Clock3 className="h-6 w-6" />
            </span>
            <div>
              <p className="font-black">A little magic takes a few minutes</p>
              <p className="mt-1 text-sm font-medium leading-6 text-[#657087]">
                Our illustration engine is working in the background. Please
                keep this page open while we finish every page of your book.
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-7 inline-flex items-center gap-3 rounded-[1.5rem] border border-white/60 bg-white/95 px-5 py-4 text-[#188447] shadow-[0_18px_40px_rgba(24,55,112,0.16)]">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dff8e8]">
              <Check className="h-6 w-6" strokeWidth={3} />
            </span>
            <span className="font-black">All {book.pageCount} pages are complete.</span>
          </div>
        )}

        <GenerationScene
          activeImage={activePage?.originalUrl}
          queuedImage={queuedPage?.originalUrl}
          completed={completed}
          pageCount={book.pageCount}
          ready={ready}
        />

        <section className="relative mt-8 rounded-[2rem] border border-white/60 bg-white/95 p-5 shadow-[0_24px_55px_rgba(24,55,112,0.18)] backdrop-blur-sm sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.15em] text-[#315dbe]">
                Book progress
              </span>
              <p className="mt-2 text-3xl font-black text-[#1d2841]">
                {completed} of {book.pageCount} pages complete
              </p>
            </div>

            {ready ? (
              <Link
                href={`/books/${book.id}/preview`}
                className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-full bg-[#ffd24e] px-7 py-3 font-black text-[#243451] shadow-[0_4px_0_#dca623] transition hover:translate-y-0.5 hover:shadow-[0_2px_0_#dca623]"
              >
                Preview Book
                <ArrowRight className="h-5 w-5" />
              </Link>
            ) : (
              <span className="inline-flex items-center gap-2 self-start rounded-full bg-[#e9f1ff] px-4 py-2 text-sm font-black text-[#315dbe] sm:self-auto">
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Creating pages
              </span>
            )}
          </div>

          <div className="mt-6 h-4 overflow-hidden rounded-full bg-[#e8eef8]">
            <div
              className="relative h-full rounded-full bg-[linear-gradient(90deg,#315dbe,#5b83dc)] transition-[width] duration-700 ease-out"
              style={{ width: `${percentage}%` }}
            >
              {!ready && (
                <span className="absolute inset-y-0 right-0 w-16 animate-pulse bg-gradient-to-r from-transparent to-white/45" />
              )}
            </div>
          </div>

          <div className="mt-9 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-[#1d2841]">
                Your book pages
              </h2>
              <p className="mt-1 text-sm font-medium text-[#697287]">
                Each card updates automatically as its illustration is finished.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pages.map((page) => (
              <GenerationPageCard key={page.id} page={page} />
            ))}
          </div>

          {ready && (
            <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-[1.5rem] bg-[#315dbe] px-6 py-5 text-center text-white sm:flex-row sm:text-left">
              <div>
                <p className="text-lg font-black">Ready to see the magic?</p>
                <p className="mt-1 text-sm font-medium text-white/75">
                  Flip through every finished page before checkout.
                </p>
              </div>
              <Link
                href={`/books/${book.id}/preview`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 font-black text-[#315dbe] transition hover:bg-[#fff8d9]"
              >
                Preview Book
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
