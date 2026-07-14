"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import Container from "./Container";
import Button from "../ui/Button";

import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";

const links = [
  {
    label: "Home",
    href: "#hero",
  },
  {
    label: "How It Works",
    href: "#how-it-works",
  },
  {
    label: "Pricing",
    href: "#pricing",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { user, loading, logout } = useAuth();
  const { openModal } = useAuthModal();

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  function logoClick() {
    if (pathname === "/") {
      window.location.href = "#hero";
    } else {
      router.push("/");
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}

          <button
            onClick={logoClick}
            className="text-xl font-extrabold tracking-tight text-blue-600 transition hover:text-blue-700"
          >
            Doodlets
          </button>

          {/* Navigation */}

          {pathname === "/" && (
            <nav className="hidden items-center gap-7 md:flex">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}

          {/* Right Side */}

          {loading ? null : user ? (
  <details className="relative">
    <summary className="flex cursor-pointer list-none items-center gap-2 rounded-lg px-3 py-2 transition hover:bg-gray-100">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>

      <span className="font-medium">
        {user.displayName?.split(" ")[0] ?? "Guest"}
      </span>
    </summary>

    <div className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-200 bg-white p-2 shadow-xl">

  <div className="border-b border-gray-100 px-3 py-3">
    <p className="font-semibold">
      {user.displayName?.split(" ")[0] ?? "Guest"}
    </p>
  </div>

  <button
    className="mt-2 w-full rounded-lg px-3 py-2 text-left transition hover:bg-gray-100"
  >
    📚 My Books
  </button>

  <hr className="my-2" />

  <button
    onClick={handleLogout}
    className="w-full rounded-lg px-3 py-2 text-left text-red-600 transition hover:bg-red-50"
  >
    🚪 Sign Out
  </button>

</div>
  </details>
) : (
            <Button onClick={openModal}>
              📖 Make My Book
            </Button>
          )}

        </div>
      </Container>
    </header>
  );
}