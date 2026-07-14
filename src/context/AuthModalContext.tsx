"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type AuthModalContextType = {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const AuthModalContext = createContext<AuthModalContextType | null>(null);

export function AuthModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <AuthModalContext.Provider
      value={{
        open,
        openModal: () => setOpen(true),
        closeModal: () => setOpen(false),
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);

  if (!context) {
    throw new Error(
      "useAuthModal must be used inside AuthModalProvider"
    );
  }

  return context;
}