"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import HTMLFlipBook from "react-pageflip";

import BookCover from "./BookCover";
import BookPage from "./BookPage";
import BookToolbar from "./BookToolbar";
import OrientationHint from "./OrientationHint";

export type FlipBookPage = {
  pageNumber: number;
  originalUrl: string;
  coloringUrl: string;
};

type Props = {
  cover: string;
  pages: FlipBookPage[];
  onPageChange?: (
    page: FlipBookPage
  ) => void;
};

export default function FlipBook({
  cover,
  pages,
  onPageChange,
}: Props) {
  const flipBook = useRef<any>(null);

  const [currentPage, setCurrentPage] =
    useState(1);

  const totalPages =
    pages.length * 2 + 1;

  function nextPage() {
    flipBook.current
      ?.pageFlip()
      .flipNext();
  }

  function previousPage() {
    flipBook.current
      ?.pageFlip()
      .flipPrev();
  }

  useEffect(() => {
    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (event.key === "ArrowRight") {
        nextPage();
      }

      if (event.key === "ArrowLeft") {
        previousPage();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, []);

  useEffect(() => {
    if (pages.length) {
      onPageChange?.(pages[0]);
    }
  }, [pages, onPageChange]);

  function handleFlip(e: any) {
    const flipPage = e.data;

    setCurrentPage(flipPage + 1);

    // Cover
    if (flipPage === 0) {
      onPageChange?.(pages[0]);
      return;
    }

    const imageIndex = Math.floor(
      (flipPage - 1) / 2
    );

    if (pages[imageIndex]) {
      onPageChange?.(
        pages[imageIndex]
      );
    }
  }

  return (
    <div className="flex flex-col items-center">

      <OrientationHint />

      <div
        className="
          relative
          rounded-[26px]
          bg-gradient-to-br
          from-[#5c3a22]
          via-[#6b472b]
          to-[#412617]
          p-7
          shadow-[0_35px_70px_rgba(0,0,0,0.35)]
        "
      >
        {/* Spine */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-0
            h-full
            w-[14px]
            -translate-x-1/2
            rounded-full
            bg-gradient-to-r
            from-black/35
            via-white/10
            to-black/35
          "
        />

        {/* Book */}

        <HTMLFlipBook
          ref={flipBook}
          width={420}
          height={594}
          size="fixed"
          minWidth={420}
          maxWidth={420}
          minHeight={594}
          maxHeight={594}
          showCover
          mobileScrollSupport
          className=""
          style={{}}
          startPage={0}
          drawShadow
          flippingTime={900}
          usePortrait={false}
          startZIndex={0}
          autoSize={false}
          maxShadowOpacity={0.65}
          clickEventForward
          useMouseEvents
          swipeDistance={30}
          showPageCorners
          disableFlipByClick={false}
          onFlip={handleFlip}
        >
          {/* FRONT COVER */}

          <div className="bg-white">

            <BookCover
              cover={cover}
            />

          </div>

          {/* INSIDE PAGES */}

          {pages.flatMap(
            (page) => [
              <div
                key={`original-${page.pageNumber}`}
                className="bg-[#faf8f2]"
              >
                <BookPage
                  image={
                    page.originalUrl
                  }
                  title="Original Photograph"
                  pageNumber={
                    page.pageNumber
                  }
                />
              </div>,

              <div
                key={`colour-${page.pageNumber}`}
                className="bg-[#faf8f2]"
              >
                <BookPage
                  image={
                    page.coloringUrl
                  }
                  title="Colouring Page"
                  pageNumber={
                    page.pageNumber
                  }
                />
              </div>,
            ]
          )}
        </HTMLFlipBook>
      </div>

      <BookToolbar
        current={currentPage}
        total={totalPages}
        previous={previousPage}
        next={nextPage}
      />
    </div>
  );
}