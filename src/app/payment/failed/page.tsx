"use client";

import Link from "next/link";
import { XCircle } from "lucide-react";

export default function PaymentFailedPage() {
  return (
    <main className="min-h-screen bg-[#f4f1ea] flex items-center justify-center px-6">

      <div className="max-w-xl rounded-3xl bg-white p-10 shadow-2xl text-center">

        <XCircle
          className="mx-auto mb-6 text-red-500"
          size={80}
        />

        <h1 className="text-4xl font-bold text-gray-900">
          Payment Not Completed
        </h1>

        <p className="mt-5 text-lg text-gray-600">
          We couldn't confirm your payment.
          <br />
          Your colouring book has not yet been sent for production.
        </p>

        <div className="mt-10 rounded-2xl bg-red-50 p-6 text-left">

          <h2 className="mb-4 text-lg font-semibold">
            What can you do?
          </h2>

          <ul className="space-y-3 text-gray-600">

            <li>🔄 Try making the payment again.</li>

            <li>💳 Use a different payment method if necessary.</li>

            <li>
              📱 If you believe you were charged, please contact us on WhatsApp and we'll help you.
            </li>

          </ul>

        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">

          <Link
            href="/"
            className="rounded-xl border border-gray-300 px-6 py-4 font-semibold hover:bg-gray-100"
          >
            Return Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white hover:bg-blue-700"
          >
            Try Payment Again
          </button>

        </div>

      </div>

    </main>
  );
}