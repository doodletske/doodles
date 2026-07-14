"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { signInWithGoogle } from "@/services/firebaseAuth";
import { useAuthModal } from "@/context/AuthModalContext";

export default function GoogleButton() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { closeModal } = useAuthModal();

  async function handleLogin() {
    try {
      setLoading(true);

      const session = await signInWithGoogle();

      console.log("Authenticated user:", session);

      // Close the authentication modal
      closeModal();

      // Redirect to the book creation page
      router.push("/create");

    } catch (error) {
      console.error(error);
      alert("Google sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleLogin}
      disabled={loading}
      className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? "Signing you in..." : "Continue with Google"}
    </button>
  );
}