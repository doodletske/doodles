"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  ArrowRight,
  BookOpenCheck,
  Check,
  CheckCircle2,
  Home,
  MessageCircle,
  PackageCheck,
  PartyPopper,
  Printer,
  Sparkles,
} from "lucide-react";

function SuccessCloud({ className }: { className: string }) {
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

function SuccessFireworks() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <span className="doodlets-firework left-[12%] top-[22%]" />
      <span className="doodlets-firework doodlets-firework--second right-[11%] top-[18%]" />
      <span className="doodlets-firework doodlets-firework--third left-[24%] top-[58%] hidden sm:block" />
      <span className="doodlets-firework doodlets-firework--fourth right-[22%] top-[62%] hidden sm:block" />
      <span className="doodlets-celebration-spark left-[7%] top-[46%]" />
      <span className="doodlets-celebration-spark doodlets-celebration-spark--second right-[8%] top-[43%]" />
    </div>
  );
}

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const bookId = searchParams.get("bookId");

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#68a3e6]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#4d86d9_0%,#75ade9_48%,#b7ddf7_100%)]" />
      <div className="pointer-events-none absolute left-[-10%] top-40 h-48 w-[70%] rotate-[-7deg] rounded-[100%] bg-white/[0.08]" />
      <div className="pointer-events-none absolute right-[-16%] top-[38rem] h-56 w-[82%] rotate-[7deg] rounded-[100%] bg-[#e8f5ff]/10" />
      <SuccessCloud className="left-[-3rem] top-28 hidden scale-75 sm:block" />
      <SuccessCloud className="right-8 top-32 hidden scale-90 lg:block" />
      <SuccessCloud className="bottom-28 left-[9%] hidden scale-50 opacity-60 md:block" />
      <SuccessFireworks />

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center px-4 py-12 sm:px-8 sm:py-16">
        <section className="w-full max-w-3xl overflow-hidden rounded-[2.25rem] border border-white/60 bg-white/95 text-center shadow-[0_28px_70px_rgba(24,55,112,0.25)] backdrop-blur-sm">
          <div className="relative overflow-hidden bg-[linear-gradient(145deg,#315dbe,#284b9f)] px-6 pb-20 pt-10 text-white sm:px-10 sm:pb-24 sm:pt-12">
            <div className="pointer-events-none absolute -left-14 -top-16 h-52 w-52 rounded-full border-[30px] border-white/[0.06]" />
            <div className="pointer-events-none absolute -bottom-24 -right-12 h-64 w-64 rounded-full border-[36px] border-[#ffdf67]/[0.08]" />

            <span className="relative inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.15em]">
              <PartyPopper className="h-4 w-4 text-[#ffdf67]" />
              Order confirmed
            </span>

            <div className="relative mx-auto mt-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#ffd24e] text-[#243451] shadow-[0_8px_0_#dca623]">
              <Check className="h-12 w-12" strokeWidth={3.5} />
              <Sparkles className="absolute -right-4 -top-3 h-7 w-7 text-white" />
            </div>

            <h1 className="relative mt-7 text-4xl font-black tracking-tight sm:text-5xl">
              Payment successful!
            </h1>
            <p className="relative mx-auto mt-4 max-w-xl text-base font-semibold leading-7 text-white/80 sm:text-lg">
              Thank you for your order. Your personalised colouring book is now
              moving into production.
            </p>
          </div>

          <div className="relative -mt-10 px-5 pb-8 sm:-mt-12 sm:px-9 sm:pb-10">
            <div className="rounded-[1.75rem] border border-[#e2e8f3] bg-white p-5 text-left shadow-[0_14px_35px_rgba(32,54,100,0.12)] sm:p-7">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff3c4] text-[#9b6a00]">
                  <BookOpenCheck className="h-6 w-6" />
                </span>
                <div>
                  <h2 className="text-xl font-black text-[#1d2841]">
                    What happens next?
                  </h2>
                  <p className="mt-1 text-sm font-medium text-[#697287]">
                    We&apos;ll keep you updated as your keepsake comes to life.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-[#f3f7ff] p-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e3ecff] text-[#315dbe]">
                    <Printer className="h-5 w-5" />
                  </span>
                  <p className="mt-3 font-black text-[#243451]">We print it</p>
                  <p className="mt-1 text-xs font-medium leading-5 text-[#697287]">
                    Your finished pages are prepared and professionally printed.
                  </p>
                </div>

                <div className="rounded-2xl bg-[#fffaf0] p-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#fff0be] text-[#a36f00]">
                    <MessageCircle className="h-5 w-5" />
                  </span>
                  <p className="mt-3 font-black text-[#243451]">We message you</p>
                  <p className="mt-1 text-xs font-medium leading-5 text-[#697287]">
                    Watch WhatsApp for production and fulfilment updates.
                  </p>
                </div>

                <div className="rounded-2xl bg-[#f1fbf5] p-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#dff5e7] text-[#188447]">
                    <PackageCheck className="h-5 w-5" />
                  </span>
                  <p className="mt-3 font-black text-[#243451]">You receive it</p>
                  <p className="mt-1 text-xs font-medium leading-5 text-[#697287]">
                    We&apos;ll arrange your selected collection or delivery option.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border-2 border-[#dce5f5] bg-white px-6 font-black text-[#315dbe] transition hover:bg-[#f3f7ff]"
              >
                <Home className="h-4 w-4" />
                Return Home
              </Link>

              {bookId && (
                <Link
                  href={`/books/${bookId}/preview`}
                  className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-[#ffd24e] px-7 font-black text-[#243451] shadow-[0_4px_0_#dca623] transition hover:translate-y-0.5 hover:shadow-[0_2px_0_#dca623]"
                >
                  View Your Book
                  <ArrowRight className="h-5 w-5" />
                </Link>
              )}
            </div>

            <p className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-[#788197]">
              <CheckCircle2 className="h-4 w-4 text-[#188447]" />
              A confirmation has been recorded for your order.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function PaymentSuccessFallback() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#4d86d9_0%,#75ade9_48%,#b7ddf7_100%)] px-4">
      <div className="rounded-full bg-white/90 px-6 py-3 font-bold text-[#315dbe] shadow-lg">
        Confirming your order…
      </div>
    </main>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<PaymentSuccessFallback />}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
