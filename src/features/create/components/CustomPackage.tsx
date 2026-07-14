"use client";

import { Mail, MessageCircle, Phone } from "lucide-react";

type Props = {
  onChangePackage: () => void;
};

export default function CustomPackage({
  onChangePackage,
}: Props) {
  return (
    <section className="mt-20 rounded-3xl border border-gray-200 bg-white p-10 shadow-sm">
      {/* Heading */}

      <div className="mb-10 text-center">
        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
          Step 2 of 2
        </span>

        <h2 className="mt-6 text-4xl font-bold text-gray-900">
          Looking for Something Different?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-600">
          Need a custom colouring book, bulk order or something unique?
          Reach out and we'll help you create exactly what you have in mind.
        </p>
      </div>

      {/* Contact Cards */}

      <div className="grid gap-8 md:grid-cols-3">
        {/* Call */}

        <a
          href="tel:+254700000000"
          className="rounded-3xl border border-gray-200 p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
            <Phone size={30} />
          </div>

          <h3 className="mt-6 text-2xl font-bold">
            Call Us
          </h3>

          <p className="mt-3 text-gray-600">
            Speak directly with our team for immediate assistance.
          </p>

          <span className="mt-6 inline-block font-semibold text-orange-600">
            Call Now →
          </span>
        </a>

        {/* WhatsApp */}

        <a
          href="https://wa.me/254700000000"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-3xl border border-gray-200 p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-600">
            <MessageCircle size={30} />
          </div>

          <h3 className="mt-6 text-2xl font-bold">
            WhatsApp
          </h3>

          <p className="mt-3 text-gray-600">
            Chat with us and we'll respond as quickly as possible.
          </p>

          <span className="mt-6 inline-block font-semibold text-green-600">
            Chat on WhatsApp →
          </span>
        </a>

        {/* Email */}

        <a
          href="mailto:hello@doodlets.co.ke"
          className="rounded-3xl border border-gray-200 p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <Mail size={30} />
          </div>

          <h3 className="mt-6 text-2xl font-bold">
            Email
          </h3>

          <p className="mt-3 text-gray-600">
            Perfect for detailed requests, custom projects and bulk orders.
          </p>

          <span className="mt-6 inline-block font-semibold text-blue-600">
            Send Email →
          </span>
        </a>
      </div>

      {/* Footer */}

      <div className="mt-12 border-t border-gray-200 pt-8 text-center">
        <p className="text-gray-500">
          Changed your mind?
        </p>

        <button
          onClick={onChangePackage}
          className="mt-2 font-semibold text-blue-600 hover:text-blue-700"
        >
          Choose a Different Package
        </button>
      </div>
    </section>
  );
}