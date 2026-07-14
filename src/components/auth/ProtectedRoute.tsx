"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";

type Props = {
  children: ReactNode;
};

export default function ProtectedRoute({
  children,
}: Props) {
  const { user, loading } = useAuth();

  const { openModal } = useAuthModal();

  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
      openModal();
    }
  }, [loading, user, router, openModal]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}