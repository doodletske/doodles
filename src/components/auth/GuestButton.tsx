"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useAuthModal } from "@/context/AuthModalContext";
import { signInAsGuest } from "@/services/firebaseAuth";

export default function GuestButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { closeModal } = useAuthModal();

  async function handleGuestLogin() {
    try {
      setLoading(true);
      setError("");

      await signInAsGuest();
      closeModal();
      router.push("/create");
    } catch (guestError) {
      console.error(guestError);
      setError("Guest access is unavailable right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={handleGuestLogin}
        disabled={loading}
        className="flex w-full items-center justify-center rounded-xl bg-[#ffd24e] px-5 py-3 font-semibold text-[#1d2841] shadow-[0_3px_0_#d6a91d] transition hover:-translate-y-0.5 hover:bg-[#ffdc68] hover:shadow-[0_4px_0_#d6a91d] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Opening your book builder..." : "Continue as Guest"}
      </button>

      {error ? (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
