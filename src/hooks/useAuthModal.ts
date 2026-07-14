"use client";

import { useAuthModal as useAuthModalContext } from "@/context/AuthModalContext";

export function useAuthModal() {
  return useAuthModalContext();
}  