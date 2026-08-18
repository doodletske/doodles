"use client";

import Image from "next/image";
import {
  Check,
  Clock3,
  LoaderCircle,
  Sparkles,
  TriangleAlert,
} from "lucide-react";

export type GenerationBookPage = {
  id: string;
  pageNumber: number;
  status: string;
  originalUrl: string;
  coloringUrl: string | null;
};

type Props = {
  page: GenerationBookPage;
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

export default function GenerationPageCard({ page }: Props) {
  const details =
    statusDetails[page.status as keyof typeof statusDetails] ??
    statusDetails.UPLOADED;
  const Icon = details.Icon;
  const displayImage =
    page.status === "COMPLETED" && page.coloringUrl
      ? page.coloringUrl
      : page.originalUrl;
  const isGenerating = page.status === "GENERATING";

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
            {details.label}
          </span>
          <p className="mt-1 truncate text-xs font-semibold text-[#657087]">
            {details.helper}
          </p>
        </div>
      </div>
    </article>
  );
}
