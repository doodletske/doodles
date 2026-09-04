import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { AuthProvider } from "@/context/AuthContext";
import { AuthModalProvider } from "@/context/AuthModalContext";

import AuthModal from "@/components/auth/AuthModal";

export const metadata: Metadata = {
  metadataBase: new URL("https://doodles.co.ke"),
  title: "Personalised Colouring Books from Your Photos | Doodles",
  description:
    "Turn 8 or 16 family photos into a professionally printed 16- or 32-page A4 personalised colouring book for children—a meaningful gift filled with familiar faces and favourite memories.",
  keywords: [
    "personalised colouring book",
    "colouring book from photos",
    "personalised gift for children",
    "custom family colouring book",
    "photo colouring book",
  ],
  openGraph: {
    title: "Personalised Colouring Books from Your Photos | Doodles",
    description:
      "Turn family photos into a professionally printed 16- or 32-page personalised colouring book made just for them.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0K95F0RTNG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0K95F0RTNG');
          `}
        </Script>
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
