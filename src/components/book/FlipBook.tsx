"use client";

import { useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import Image from "next/image";

type Page = {
  pageNumber: number;
  coloringUrl: string;
};

type Props = {
  pages: Page[];
  currentPage?: number;
  onPageChange?: (page: number) => void;
};

export default function FlipBook({
  pages,
  onPageChange,
}: Props) {
  const flipBook = useRef<any>(null);

  return (
    <div className="w-full">

      {/* Mobile Message */}

      <div className="mb-4 rounded-xl bg-yellow-50 p-3 text-center text-sm text-yellow-800 lg:hidden">
        📱 For the best preview experience, rotate your device to landscape.
      </div>

      <div className="flex justify-center">

        <div className="w-full max-w-[420px]">

          <HTMLFlipBook
            ref={flipBook}
            width={380}
            height={520}
            size="fixed"
            minWidth={320}
            maxWidth={420}
            minHeight={450}
            maxHeight={560}
            showCover={true}
            mobileScrollSupport={true}
            className=""
            style={{}}
            startPage={0}
            drawShadow={true}
            flippingTime={700}
            usePortrait={true}
            startZIndex={0}
            autoSize={true}
            maxShadowOpacity={0.4}
            clickEventForward={true}
            useMouseEvents={true}
            swipeDistance={30}
            showPageCorners={true}
            disableFlipByClick={false}
            onFlip={(event: any) => {
              onPageChange?.(event.data);
            }}
          >
            {pages.map((page) => (
              <div
                key={page.pageNumber}
                className="relative bg-white"
              >
                <Image
                  src={page.coloringUrl}
                  alt={`Page ${page.pageNumber}`}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </HTMLFlipBook>

        </div>

      </div>

    </div>
  );
}