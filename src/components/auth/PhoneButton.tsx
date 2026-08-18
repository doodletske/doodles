"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { ConfirmationResult, RecaptchaVerifier } from "firebase/auth";

import { useAuthModal } from "@/context/AuthModalContext";
import {
  confirmPhoneVerificationCode,
  createPhoneRecaptcha,
  sendPhoneVerificationCode,
} from "@/services/firebaseAuth";
import {
  COUNTRY_CALLING_CODES,
  normalizePhoneNumber,
} from "@/lib/phone/countryCallingCodes";

type PhoneStep = "closed" | "phone" | "code";

export default function PhoneButton() {
  const [step, setStep] = useState<PhoneStep>("closed");
  const [selectedCountry, setSelectedCountry] = useState("KE");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const confirmationRef = useRef<ConfirmationResult | null>(null);
  const recaptchaRef = useRef<RecaptchaVerifier | null>(null);
  const router = useRouter();
  const { closeModal } = useAuthModal();

  useEffect(() => {
    return () => {
      recaptchaRef.current?.clear();
    };
  }, []);

  function resetPhoneFlow() {
    recaptchaRef.current?.clear();
    recaptchaRef.current = null;
    confirmationRef.current = null;
    setStep("closed");
    setSelectedCountry("KE");
    setPhoneNumber("");
    setVerificationCode("");
    setError("");
  }

  async function handleSendCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const country = COUNTRY_CALLING_CODES.find(
      (option) => option.iso === selectedCountry
    );

    if (!country) return;

    const normalizedPhoneNumber = normalizePhoneNumber(
      country.callingCode,
      phoneNumber
    );

    if (!/^\+[1-9]\d{7,14}$/.test(normalizedPhoneNumber)) {
      setError("Enter a valid mobile number for the selected country code.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      recaptchaRef.current?.clear();
      const verifier = createPhoneRecaptcha("phone-sign-in-recaptcha");
      recaptchaRef.current = verifier;

      confirmationRef.current = await sendPhoneVerificationCode(
        normalizedPhoneNumber,
        verifier
      );
      setPhoneNumber(normalizedPhoneNumber);
      setStep("code");
    } catch (phoneError) {
      console.error(phoneError);
      recaptchaRef.current?.clear();
      recaptchaRef.current = null;
      setError("We couldn't send the code. Check the number and try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!/^\d{6}$/.test(verificationCode)) {
      setError("Enter the 6-digit code sent to your phone.");
      return;
    }

    if (!confirmationRef.current) {
      setError("Request a new verification code and try again.");
      setStep("phone");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await confirmPhoneVerificationCode(
        confirmationRef.current,
        verificationCode
      );
      closeModal();
      router.push("/create");
    } catch (phoneError) {
      console.error(phoneError);
      setError("That code is incorrect or has expired. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (step === "closed") {
    return (
      <button
        type="button"
        onClick={() => setStep("phone")}
        className="w-full rounded-xl border border-gray-300 py-3 font-semibold transition hover:border-blue-500 hover:bg-blue-50"
      >
        Continue with Phone
      </button>
    );
  }

  return (
    <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4 text-left">
      {step === "phone" ? (
        <form onSubmit={handleSendCode} className="space-y-3">
          <div>
            <label
              htmlFor="auth-phone-number"
              className="mb-1.5 block text-sm font-semibold text-gray-800"
            >
              Phone number
            </label>
            <div className="flex overflow-hidden rounded-xl border border-gray-300 bg-white transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
              <div className="flex shrink-0 items-center border-r border-gray-200 bg-gray-50 px-3">
                <select
                  value={selectedCountry}
                  onChange={(event) => setSelectedCountry(event.target.value)}
                  aria-label="Country calling code"
                  className="w-[8.25rem] cursor-pointer bg-transparent py-3 pr-1 text-sm font-semibold text-gray-700 outline-none"
                >
                  {COUNTRY_CALLING_CODES.map((option) => (
                    <option key={option.iso} value={option.iso}>
                      {option.country} ({option.callingCode})
                    </option>
                  ))}
                </select>
              </div>

              <input
                id="auth-phone-number"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                placeholder="712 345 678"
                aria-describedby="auth-phone-hint"
                autoFocus
                className="min-w-0 flex-1 bg-white px-4 py-3 outline-none"
              />
            </div>
            <p id="auth-phone-hint" className="mt-1.5 text-xs text-gray-500">
              Choose your country, then enter your number without the prefix.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Sending code..." : "Send verification code"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyCode} className="space-y-3">
          <div>
            <label
              htmlFor="auth-verification-code"
              className="mb-1.5 block text-sm font-semibold text-gray-800"
            >
              Verification code
            </label>
            <p className="mb-2 text-xs text-gray-500">
              Enter the code sent to {phoneNumber}.
            </p>
            <input
              id="auth-verification-code"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={verificationCode}
              onChange={(event) =>
                setVerificationCode(event.target.value.replace(/\D/g, ""))
              }
              placeholder="123456"
              autoFocus
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 tracking-[0.35em] outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Checking code..." : "Verify and continue"}
          </button>
        </form>
      )}

      {error ? (
        <p className="mt-3 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="button"
        onClick={resetPhoneFlow}
        disabled={loading}
        className="mt-3 text-sm font-medium text-gray-600 transition hover:text-gray-900 disabled:opacity-50"
      >
        Back to sign-in options
      </button>

      <div id="phone-sign-in-recaptcha" />
    </div>
  );
}
