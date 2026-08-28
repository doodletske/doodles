"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Building2,
  Check,
  CheckCircle2,
  LoaderCircle,
  LockKeyhole,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

import { api } from "@/lib/firebase/api";
import {
  COUNTRY_CALLING_CODES,
  normalizePhoneNumber,
} from "@/lib/phone/countryCallingCodes";

type DeliveryMethod = "PICKUP" | "DELIVERY";

type Book = {
  id: string;
  pageCount: number;
  price: number;
};

type OrderResponse = {
  id: string;
};

type PaymentResponse = {
  authorization_url: string;
};

function CheckoutCloud({ className }: { className: string }) {
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

function formatPrice(price?: number) {
  if (typeof price !== "number") return "Loading...";
  return `KES ${price.toLocaleString("en-KE")}`;
}

function errorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : "Something went wrong. Please try again.";
}

export default function CheckoutPage() {
  const { bookId } = useParams<{ bookId: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [selectedCountry, setSelectedCountry] = useState("KE");
  const [whatsapp, setWhatsapp] = useState("");
  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryMethod>("PICKUP");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadBook() {
      try {
        const data = await api<Book>(`/api/books/${bookId}`);
        if (active) setBook(data);
      } catch (loadError) {
        if (active) setError(errorMessage(loadError));
      }
    }

    void loadBook();

    return () => {
      active = false;
    };
  }, [bookId]);

  async function continueToPayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const country = COUNTRY_CALLING_CODES.find(
      (option) => option.iso === selectedCountry,
    );
    const normalizedWhatsapp = country
      ? normalizePhoneNumber(country.callingCode, whatsapp)
      : "";

    if (!/^\+[1-9]\d{7,14}$/.test(normalizedWhatsapp)) {
      setError("Please enter a valid WhatsApp number for the selected country.");
      return;
    }

    try {
      setLoading(true);

      const order = await api<OrderResponse>("/api/orders", {
        method: "POST",
        body: JSON.stringify({
          bookId,
          whatsapp: normalizedWhatsapp,
          deliveryMethod,
        }),
      });

      const payment = await api<PaymentResponse>(
        `/api/orders/${order.id}/pay`,
        { method: "POST" },
      );

      window.location.href = payment.authorization_url;
    } catch (paymentError) {
      setError(errorMessage(paymentError));
      setLoading(false);
    }
  }

  const deliveryLabel =
    deliveryMethod === "PICKUP" ? "Office collection" : "Home delivery";

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#68a3e6]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#4d86d9_0%,#75ade9_48%,#b7ddf7_100%)]" />
      <div className="pointer-events-none absolute left-[-10%] top-40 h-48 w-[70%] rotate-[-7deg] rounded-[100%] bg-white/[0.08]" />
      <div className="pointer-events-none absolute right-[-16%] top-[42rem] h-56 w-[82%] rotate-[7deg] rounded-[100%] bg-[#e8f5ff]/10" />
      <CheckoutCloud className="left-[-3rem] top-28 hidden scale-75 sm:block" />
      <CheckoutCloud className="right-8 top-32 hidden scale-90 lg:block" />
      <CheckoutCloud className="bottom-32 left-[10%] hidden scale-50 opacity-60 md:block" />

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-8 sm:py-14">
        <header className="mx-auto max-w-3xl text-center text-white">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-2 text-xs font-black uppercase tracking-[0.15em] backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-[#ffdf67]" />
            The final step
          </span>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            Bring your book home
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base font-semibold leading-7 text-white/85 sm:text-lg">
            Tell us how to reach you and where your finished Doodles book
            should go.
          </p>
        </header>

        <div className="mt-9 grid items-start gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(19rem,0.75fr)]">
          <form
            onSubmit={continueToPayment}
            className="rounded-[2rem] border border-white/60 bg-white/95 p-5 shadow-[0_24px_55px_rgba(24,55,112,0.2)] backdrop-blur-sm sm:p-8"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#fff3c4] font-black text-[#9b6a00]">
                1
              </span>
              <div>
                <h2 className="text-xl font-black text-[#1d2841] sm:text-2xl">
                  Your contact details
                </h2>
                <p className="mt-1 text-sm font-medium leading-6 text-[#697287]">
                  We&apos;ll send order and fulfilment updates through WhatsApp.
                </p>
              </div>
            </div>

            <label
              htmlFor="whatsapp"
              className="mt-6 block text-sm font-black text-[#243451]"
            >
              WhatsApp number
            </label>
            <div className="mt-2 flex overflow-hidden rounded-2xl border-2 border-[#dce5f5] bg-[#f8fbff] transition focus-within:border-[#315dbe] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#315dbe]/10">
              <select
                aria-label="Country code"
                value={selectedCountry}
                onChange={(event) => setSelectedCountry(event.target.value)}
                className="min-h-14 w-[8.5rem] shrink-0 border-r border-[#dce5f5] bg-[#eef4ff] px-3 text-sm font-black text-[#243451] outline-none sm:w-[10.5rem]"
              >
                {COUNTRY_CALLING_CODES.map((option) => (
                  <option key={option.iso} value={option.iso}>
                    {option.iso} {option.callingCode}
                  </option>
                ))}
              </select>
              <div className="relative min-w-0 flex-1">
                <MessageCircle className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#315dbe]" />
                <input
                  id="whatsapp"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel-national"
                  placeholder="712 345 678"
                  value={whatsapp}
                  onChange={(event) => setWhatsapp(event.target.value)}
                  className="min-h-14 w-full bg-transparent py-3 pl-12 pr-4 font-semibold text-[#1d2841] outline-none placeholder:text-[#929bad]"
                />
              </div>
            </div>

            <div className="my-8 h-px bg-[#e5eaf3]" />

            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#e9f1ff] font-black text-[#315dbe]">
                2
              </span>
              <div>
                <h2 className="text-xl font-black text-[#1d2841] sm:text-2xl">
                  Choose how to receive it
                </h2>
                <p className="mt-1 text-sm font-medium leading-6 text-[#697287]">
                  Select the option that works best for you.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label
                className={`relative flex cursor-pointer flex-col rounded-[1.5rem] border-2 p-5 transition ${
                  deliveryMethod === "PICKUP"
                    ? "border-[#315dbe] bg-[#f3f7ff] shadow-[0_10px_24px_rgba(49,93,190,0.12)]"
                    : "border-[#e1e6ef] bg-white hover:border-[#b8c9ea]"
                }`}
              >
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="PICKUP"
                  checked={deliveryMethod === "PICKUP"}
                  onChange={() => setDeliveryMethod("PICKUP")}
                  className="sr-only"
                />
                <span className="flex items-start justify-between gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff3c4] text-[#a36f00]">
                    <Building2 className="h-6 w-6" />
                  </span>
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                      deliveryMethod === "PICKUP"
                        ? "border-[#315dbe] bg-[#315dbe] text-white"
                        : "border-[#c5ccd8] text-transparent"
                    }`}
                  >
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                </span>
                <span className="mt-5 font-black text-[#1d2841]">
                  Collect from our office
                </span>
                <span className="mt-2 text-sm font-medium leading-6 text-[#697287]">
                  We&apos;ll message you as soon as your book is ready to collect.
                </span>
                <span className="mt-4 text-xs font-black uppercase tracking-[0.12em] text-[#188447]">
                  No delivery fee
                </span>
              </label>

              <label
                className={`relative flex cursor-pointer flex-col rounded-[1.5rem] border-2 p-5 transition ${
                  deliveryMethod === "DELIVERY"
                    ? "border-[#315dbe] bg-[#f3f7ff] shadow-[0_10px_24px_rgba(49,93,190,0.12)]"
                    : "border-[#e1e6ef] bg-white hover:border-[#b8c9ea]"
                }`}
              >
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="DELIVERY"
                  checked={deliveryMethod === "DELIVERY"}
                  onChange={() => setDeliveryMethod("DELIVERY")}
                  className="sr-only"
                />
                <span className="flex items-start justify-between gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e9f1ff] text-[#315dbe]">
                    <Truck className="h-6 w-6" />
                  </span>
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                      deliveryMethod === "DELIVERY"
                        ? "border-[#315dbe] bg-[#315dbe] text-white"
                        : "border-[#c5ccd8] text-transparent"
                    }`}
                  >
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                </span>
                <span className="mt-5 font-black text-[#1d2841]">
                  Have it delivered
                </span>
                <span className="mt-2 text-sm font-medium leading-6 text-[#697287]">
                  Free within Nairobi CBD. We&apos;ll confirm any fee outside the CBD.
                </span>
                <span className="mt-4 text-xs font-black uppercase tracking-[0.12em] text-[#315dbe]">
                  Delivered to you
                </span>
              </label>
            </div>

            {error && (
              <div
                role="alert"
                className="mt-6 flex items-start gap-3 rounded-2xl border border-[#f4b9b9] bg-[#fff2f2] px-4 py-3 text-sm font-bold text-[#a43c3c]"
              >
                <span className="mt-0.5">!</span>
                {error}
              </div>
            )}

            <div className="mt-7 flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href={`/books/${bookId}/preview`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 font-black text-[#315dbe] transition hover:bg-[#eef4ff]"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Preview
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#ffd24e] px-7 font-black text-[#243451] shadow-[0_4px_0_#dca623] transition hover:translate-y-0.5 hover:shadow-[0_2px_0_#dca623] disabled:cursor-not-allowed disabled:opacity-65"
              >
                {loading ? (
                  <>
                    <LoaderCircle className="h-5 w-5 animate-spin" />
                    Preparing payment...
                  </>
                ) : (
                  <>
                    Continue to Payment
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          </form>

          <aside className="overflow-hidden rounded-[2rem] border border-white/50 bg-[#243f8f] text-white shadow-[0_24px_55px_rgba(24,55,112,0.24)] lg:sticky lg:top-6">
            <div className="relative overflow-hidden bg-[linear-gradient(145deg,#315dbe,#243f8f)] p-6 sm:p-7">
              <div className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full border-[24px] border-white/[0.06]" />
              <span className="relative inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.15em] text-[#ffdf67]">
                <PackageCheck className="h-4 w-4" />
                Order summary
              </span>
              <div className="relative mt-5 flex items-center gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-[#ffdf67]">
                  <BookOpen className="h-7 w-7" />
                </span>
                <div>
                  <p className="font-black">Your Doodles colouring book</p>
                  <p className="mt-1 text-sm font-medium text-white/65">
                    {book
                      ? `${book.pageCount * 2}-page book · ${book.pageCount} photos + ${book.pageCount} colouring illustrations`
                      : "Loading your book details..."}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 p-6 sm:p-7">
              <div className="space-y-4 text-sm font-semibold">
                <div className="flex items-center justify-between gap-4 text-white/75">
                  <span>Book</span>
                  <span className="text-right text-white">{formatPrice(book?.price)}</span>
                </div>
                <div className="flex items-center justify-between gap-4 text-white/75">
                  <span>Receiving method</span>
                  <span className="text-right text-white">{deliveryLabel}</span>
                </div>
                <div className="flex items-center justify-between gap-4 text-white/75">
                  <span>Delivery fee</span>
                  <span className="text-right text-[#ffdf67]">
                    {deliveryMethod === "PICKUP" ? "Free" : "Confirmed via WhatsApp"}
                  </span>
                </div>
              </div>

              <div className="my-6 border-t border-dashed border-white/25" />

              <div className="flex items-end justify-between gap-4">
                <span className="font-black">Book total</span>
                <span className="text-2xl font-black text-[#ffdf67]">
                  {formatPrice(book?.price)}
                </span>
              </div>

              <div className="mt-6 rounded-2xl bg-white/10 p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#ffdf67]" />
                  <div>
                    <p className="text-sm font-black">Secure payment</p>
                    <p className="mt-1 text-xs font-medium leading-5 text-white/65">
                      You&apos;ll continue to our secure payment partner to complete
                      your order.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-center gap-2 text-xs font-bold text-white/55">
                <LockKeyhole className="h-3.5 w-3.5" />
                Your payment details are never stored by Doodles
              </div>
            </div>
          </aside>
        </div>

        <div className="mx-auto mt-7 grid max-w-4xl gap-3 text-sm font-bold text-white/85 sm:grid-cols-3">
          <div className="flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-3 backdrop-blur-sm">
            <CheckCircle2 className="h-4 w-4 text-[#ffdf67]" />
            Preview approved
          </div>
          <div className="flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-3 backdrop-blur-sm">
            <ShieldCheck className="h-4 w-4 text-[#ffdf67]" />
            Secure checkout
          </div>
          <div className="flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-3 backdrop-blur-sm">
            <PackageCheck className="h-4 w-4 text-[#ffdf67]" />
            Made just for you
          </div>
        </div>
      </div>
    </main>
  );
}
