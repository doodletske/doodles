import {
  ConfirmationResult,
  GoogleAuthProvider,
  RecaptchaVerifier,
  User,
  signInAnonymously,
  signInWithPhoneNumber,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { api } from "@/lib/firebase/api";
import { auth } from "@/lib/firebase/firebase";


const googleProvider = new GoogleAuthProvider();

async function createSession(user: User) {
  const idToken = await user.getIdToken();

  return api("/api/auth/session", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
}

export async function signInWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider);

  return createSession(result.user);
}

export async function signInAsGuest() {
  const result = await signInAnonymously(auth);

  return createSession(result.user);
}

export function createPhoneRecaptcha(containerId: string) {
  return new RecaptchaVerifier(auth, containerId, {
    size: "invisible",
  });
}

export async function sendPhoneVerificationCode(
  phoneNumber: string,
  verifier: RecaptchaVerifier
) {
  return signInWithPhoneNumber(auth, phoneNumber, verifier);
}

export async function confirmPhoneVerificationCode(
  confirmation: ConfirmationResult,
  verificationCode: string
) {
  const result = await confirmation.confirm(verificationCode);

  return createSession(result.user);
}

export async function logout() {
  await signOut(auth);
}
