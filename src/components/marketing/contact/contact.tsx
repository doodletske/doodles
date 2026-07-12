"use client";

import { Mail, MapPin, MessageCircle } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-white py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">

          <h2 className="text-4xl font-bold text-gray-900 md:text-5xl">
            Have a Question?
          </h2>

          <p className="mt-5 text-lg text-gray-600">
            We're happy to help you create the perfect personalized
            coloring book. Reach out through any of the channels below
            and we'll get back to you as soon as possible.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

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
              Chat with us directly.
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
              hello@doodlets.co.ke
            </p>
          </a>


          
        </div>

        <div className="mt-20 rounded-3xl bg-blue-600 px-10 py-12 text-center text-white">

          <h3 className="text-3xl font-bold">
            Still not sure which book is right for you?
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
            We'd love to hear your ideas and help you choose the perfect
            option for your family or special project.
          </p>

          <a
            href="https://wa.me/254700000000"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex rounded-xl bg-white px-8 py-4 text-lg font-semibold text-blue-600 transition hover:bg-gray-100"
          >
            Let's Talk
          </a>

        </div>

      </div>
    </section>
  );
}