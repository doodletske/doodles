"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  Check,
  Clock3,
  LoaderCircle,
  RefreshCw,
  Sparkles,
  TriangleAlert,
  Upload,
} from "lucide-react";

export type GenerationBookPage = {
  id: string;
  pageNumber: number;
  status: string;
  originalUrl: string;
  coloringUrl: string | null;
  failureReason?: string | null;
};

type Props = {
  page: GenerationBookPage;
  onRetry?: (page: GenerationBookPage) => void;
  onReplace?: (page: GenerationBookPage, file: File) => void;
  retrying?: boolean;
  replacing?: boolean;
};

const statusDetails = {
  UPLOADING: {
    label: "Uploading",
    helper: "Preparing your photo",
    Icon: Clock3,
    badge: "bg-[#eef3fb] text-[#53627a]",
    icon: "bg-[#eef3fb] text-[#53627a]",
  },
  UPLOADED: {
    label: "In the queue",
    helper: "Waiting to be illustrated",
    Icon: Clock3,
    badge: "bg-[#fff3c4] text-[#8a5a00]",
    icon: "bg-[#fff3c4] text-[#8a5a00]",
  },
  GENERATING: {
    label: "Creating",
    helper: "Drawing your colouring page",
    Icon: LoaderCircle,
    badge: "bg-[#e9f1ff] text-[#315dbe]",
    icon: "bg-[#315dbe] text-white",
  },
  COMPLETED: {
    label: "Complete",
    helper: "Your colouring page is ready",
    Icon: Check,
    badge: "bg-[#dff8e8] text-[#188447]",
    icon: "bg-[#dff8e8] text-[#188447]",
  },
  FAILED: {
    label: "Needs attention",
    helper: "We couldn't finish this page",
    Icon: TriangleAlert,
    badge: "bg-[#fee8e7] text-[#c33f38]",
    icon: "bg-[#fee8e7] text-[#c33f38]",
  },
} as const;

export default function GenerationPageCard({
  page,
  onRetry,
  onReplace,
  retrying = false,
  replacing = false,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const details =
    statusDetails[page.status as keyof typeof statusDetails] ??
    statusDetails.UPLOADED;
  const Icon = details.Icon;
  const displayImage =
    page.status === "COMPLETED" && page.coloringUrl
      ? page.coloringUrl
      : page.originalUrl;
  const isGenerating = page.status === "GENERATING";
  const needsReplacement =
    page.failureReason === "SAFETY_REJECTION" ||
    page.failureReason === "INVALID_IMAGE" ||
    page.failureReason === "RETRY_LIMIT_REACHED";
  const failureExplanation =
    page.failureReason === "SAFETY_REJECTION"
      ? "Our automatic safety checks couldn't process this photo. This can sometimes happen with swimwear, very young children or unclear images. Please choose a different photo."
      : page.failureReason === "INVALID_IMAGE"
        ? "We couldn't read this image clearly. Please replace it with a clear JPG, PNG or WebP photo."
        : page.failureReason === "RETRY_LIMIT_REACHED"
          ? "We tried to illustrate this photo twice, but it still couldn't be completed. Please choose another photo so we don't keep charging the illustration engine for the same result."
        : page.failureReason === "PREVIEW_ERROR"
          ? "Your illustration was created, but its preview couldn't be prepared. Please try again."
          : page.failureReason === "CAPACITY_LIMIT"
            ? "The Doodles studio has reached today's safe generation capacity. Your photo is saved, so please try again tomorrow."
          : "The illustration service couldn't accept this photo on the last attempt. Automatic safety checks, image quality or a temporary issue may be responsible. Try once more, then replace it if the problem continues.";
  const statusLabel = needsReplacement ? "Photo needs replacing" : details.label;
  const statusHelper = needsReplacement
    ? "Please choose a different photo"
    : details.helper;

  return (
    <article
      className={`group overflow-hidden rounded-[1.5rem] border bg-white shadow-[0_14px_30px_rgba(41,72,125,0.09)] transition duration-300 ${
        isGenerating
          ? "border-[#7ba2e3] ring-4 ring-[#dfeaff]"
          : page.status === "COMPLETED"
            ? "border-[#bfe5cc]"
            : "border-[#dbe5f5]"
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#e9f1ff]">
        {displayImage ? (
          <Image
            src={displayImage}
            alt={`Book page ${page.pageNumber}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={`object-cover transition duration-500 ${
              page.status === "UPLOADED" ? "saturate-50" : ""
            }`}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[#315dbe]">
            <Sparkles className="h-10 w-10" />
          </div>
        )}

        {isGenerating && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#315dbe]/55 backdrop-blur-[1px]">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#315dbe] shadow-lg">
              <LoaderCircle className="h-7 w-7 animate-spin" />
            </span>
          </div>
        )}

        <span className="absolute left-3 top-3 rounded-full bg-[#243451]/85 px-3 py-1.5 text-xs font-black text-white backdrop-blur-sm">
          Page {page.pageNumber}
        </span>
      </div>

      <div className="flex items-center gap-3 p-4">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${details.icon}`}
        >
          <Icon
            className={`h-5 w-5 ${isGenerating ? "animate-spin" : ""}`}
            strokeWidth={2.5}
          />
        </span>

        <div className="min-w-0 flex-1">
          <span
            className={`inline-flex rounded-full px-2.5 py-1 text-[0.65rem] font-black uppercase tracking-[0.09em] ${details.badge}`}
          >
            {statusLabel}
          </span>
          <p className="mt-1 truncate text-xs font-semibold text-[#657087]">
            {statusHelper}
          </p>
        </div>
      </div>

      {page.status === "FAILED" && (onRetry || onReplace) && (
        <div className="border-t border-[#edf1f7] p-3">
          <p className="mb-3 text-xs font-semibold leading-5 text-[#657087]">
            {failureExplanation}
          </p>
          <div className={`grid gap-2 ${needsReplacement ? "grid-cols-1" : "grid-cols-2"}`}>
            {!needsReplacement && (
              <button
                type="button"
                onClick={() => onRetry?.(page)}
                disabled={!onRetry || retrying || replacing}
                className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl bg-[#e9f1ff] px-3 text-xs font-black text-[#315dbe] disabled:opacity-60"
              >
                <RefreshCw className={`h-4 w-4 ${retrying ? "animate-spin" : ""}`} />
                {retrying ? "Trying…" : "Try again"}
              </button>
            )}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={!onReplace || retrying || replacing}
            className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl bg-[#fff3c4] px-3 text-xs font-black text-[#765000] disabled:opacity-60"
          >
            <Upload className={`h-4 w-4 ${replacing ? "animate-pulse" : ""}`} />
            {replacing ? "Replacing…" : needsReplacement ? "Choose another photo" : "Replace photo"}
          </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) onReplace?.(page, file);
              event.currentTarget.value = "";
            }}
          />
        </div>
      )}
    </article>
  );
}
