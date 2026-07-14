import "./globals.css";
import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { AuthProvider } from "@/context/AuthContext";
import { AuthModalProvider } from "@/context/AuthModalContext";

import AuthModal from "@/components/auth/AuthModal";

export const metadata: Metadata = {
  title: "Doodlets",
  description:
    "Turn your favourite memories into personalized coloring books.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <AuthProvider>
          <AuthModalProvider>
            <Navbar />

            <main>{children}</main>

            <Footer />

            <AuthModal />
          </AuthModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}