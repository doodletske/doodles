"use client";

import AuthButtons from "./AuthButtons";
import { useAuthModal } from "@/context/AuthModalContext";

export default function AuthModal() {
  const { open, closeModal } = useAuthModal();

  if (!open) return null;

  return (
    <div
  style={{
    position: "fixed",
    inset: 0,
    zIndex: 999999,
    background: "rgba(0,0,0,.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}>

      <div className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">

        <button
          onClick={closeModal}
          className="absolute right-5 top-5 text-2xl text-gray-500 hover:text-black"
        >
          ×
        </button>

        <h2 className="mb-3 text-center text-3xl font-bold">
          Let's Get Started
        </h2>

        <p className="mb-8 text-center text-gray-500">
          Turn your favourite photos into a personalised
          colouring book in just a few minutes.
        </p>

        <AuthButtons />

      </div>

    </div>
  );
}