"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();

  const bookId = searchParams.get("bookId");

  return (
    <main className="min-h-screen bg-[#f4f1ea] flex items-center justify-center px-6">

      <div className="max-w-xl rounded-3xl bg-white p-10 shadow-2xl text-center">

        <CheckCircle2
          className="mx-auto mb-6 text-green-600"
          size={80}
        />

        <h1 className="text-4xl font-bold text-gray-900">
          Payment Successful
        </h1>

        <p className="mt-5 text-lg text-gray-600 leading-relaxed">
          Thank you for your order.
          <br />
          Your personalised colouring book is now being prepared for production.
        </p>

        <div className="mt-10 rounded-2xl bg-gray-50 p-6 text-left">

          <h2 className="mb-4 text-lg font-semibold">
            What happens next?
          </h2>

          <ul className="space-y-3 text-gray-600">

            <li>✅ We'll print your colouring book.</li>

            <li>
              💬 We'll contact you on the WhatsApp number you provided.
            </li>

            <li>
              📦 If you selected pickup, we'll notify you when your book is ready.
            </li>

            <li>
              🚚 If you selected delivery, we'll arrange delivery with you via WhatsApp.
            </li>

          </ul>

        </div>

        {bookId && (
          <Link
            href={`/books/${bookId}/preview`}
            className="mt-10 inline-block rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
          >
            View Your Book
          </Link>
        )}

      </div>

    </main>
  );
}