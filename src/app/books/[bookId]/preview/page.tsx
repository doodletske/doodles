"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  ArrowRight,
  BookOpenCheck,
  LoaderCircle,
  MoveHorizontal,
  Sparkles,
} from "lucide-react";

import FlipBook, {
  FlipBookPage,
} from "@/components/book/FlipBook";
import OrientationHint from "@/components/book/OrientationHint";
import { api } from "@/lib/firebase/api";

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

function PreviewCloud({ className }: { className: string }) {
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

export default function PreviewBookPage() {
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

    return () => {
      active = false;
    };
  }, [bookId]);

  if (!book) {
    return (
      <main className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-[#68a3e6] px-6 text-white">
        <PreviewCloud className="right-8 top-20 hidden sm:block" />
        <div className="relative flex flex-col items-center text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#315dbe] shadow-xl">
            <LoaderCircle className="h-8 w-8 animate-spin" />
          </span>
          <p className="mt-5 text-lg font-black">Opening your book...</p>
        </div>
      </main>
    );
  }

  const pages: FlipBookPage[] = book.pages
    .filter(
      (
        page,
      ): page is BookPage & { coloringUrl: string } =>
        page.coloringUrl !== null,
    )
    .sort((first, second) => first.pageNumber - second.pageNumber);

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#68a3e6]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#4d86d9_0%,#75ade9_48%,#b7ddf7_100%)]" />
      <div className="pointer-events-none absolute left-[-10%] top-40 h-48 w-[70%] rotate-[-7deg] rounded-[100%] bg-white/[0.08]" />
      <div className="pointer-events-none absolute right-[-16%] top-[40rem] h-56 w-[82%] rotate-[7deg] rounded-[100%] bg-[#e8f5ff]/10" />
      <PreviewCloud className="left-[-3rem] top-24 hidden scale-75 sm:block" />
      <PreviewCloud className="right-7 top-28 hidden scale-90 lg:block" />
      <PreviewCloud className="bottom-40 left-[8%] hidden scale-50 opacity-60 md:block" />

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-8 sm:py-14">
        <header className="mx-auto max-w-3xl text-center text-white">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-2 text-xs font-black uppercase tracking-[0.15em] backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-[#ffdf67]" />
            Your Doodlets keepsake
          </span>

          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            Preview your colouring book
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base font-semibold leading-7 text-white/85 sm:text-lg">
            Take a look through every memory and its finished colouring page
            before moving on to checkout.
          </p>

          <div className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-black text-[#315dbe] shadow-sm">
            <MoveHorizontal className="h-4 w-4" />
            Use the arrows, swipe or drag a page corner to explore
          </div>
          <p className="mx-auto mt-3 max-w-xl text-xs font-bold text-white/75">
            Generated colouring pages are watermarked for protection. Your
            original photos and printed book remain clean.
          </p>
        </header>

        <div className="mx-auto mt-8 max-w-sm md:hidden">
          <OrientationHint />
        </div>

        <div className="mt-4 overflow-x-auto px-2 pb-5 pt-2 md:mt-9">
          <div className="mx-auto w-max">
            <FlipBook
              cover="/images/front-cover.jpg"
              pages={pages}
            />
          </div>
        </div>

        <div className="mx-auto mt-7 flex max-w-3xl flex-col items-center justify-between gap-5 rounded-[1.75rem] border border-white/50 bg-white/95 px-6 py-5 text-center shadow-[0_20px_45px_rgba(24,55,112,0.18)] backdrop-blur-sm sm:flex-row sm:text-left">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#e9f1ff] text-[#315dbe]">
              <BookOpenCheck className="h-6 w-6" />
            </span>
            <div>
              <p className="font-black text-[#243451]">Happy with your book?</p>
              <p className="mt-1 text-sm font-medium text-[#657087]">
                Continue when you&apos;re ready to arrange payment and delivery.
              </p>
            </div>
          </div>

          <Link
            href={`/books/${book.id}/checkout`}
            className="inline-flex min-h-[3.25rem] shrink-0 items-center justify-center gap-2 rounded-full bg-[#315dbe] px-7 font-black text-white shadow-[0_4px_0_#244a9b] transition hover:translate-y-0.5 hover:bg-[#244a9b] hover:shadow-[0_2px_0_#244a9b]"
          >
            Continue to Checkout
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </main>
  );
}
