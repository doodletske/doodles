import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { api } from "@/lib/firebase/api";
import { auth } from "@/lib/firebase/firebase";


const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider);

  const idToken = await result.user.getIdToken();

  const session = await api("/api/auth/session", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  return session;
}

export async function logout() {
  await signOut(auth);
}