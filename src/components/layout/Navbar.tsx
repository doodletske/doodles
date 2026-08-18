"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Sparkles,
} from "lucide-react";

import Container from "./Container";
import Button from "../ui/Button";

import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";
import { api } from "@/lib/firebase/api";

const links = [
  { label: "Home", href: "#hero" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [adminAccess, setAdminAccess] = useState(false);
  const { user, loading, logout } = useAuth();
  const { openModal } = useAuthModal();

  const firstName = user?.displayName?.split(" ")[0] ?? "Guest";
  const initial = firstName.charAt(0).toUpperCase() || "G";

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  useEffect(() => {
    let active = true;

    if (!user) {
      return;
    }

    api("/api/admin/session")
      .then(() => {
        if (active) setAdminAccess(true);
      })
      .catch(() => {
        if (active) setAdminAccess(false);
      });

    return () => {
      active = false;
    };
  }, [user]);

  async function handleLogout() {
    setMenuOpen(false);
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
    <header className="sticky top-0 z-50 border-b border-[#dbe5f5] bg-[#fffdf7]/95 shadow-[0_3px_18px_rgba(40,74,128,0.08)] backdrop-blur-md">
      <Container>
        <div className="flex h-[72px] items-center justify-between">
          <button
            onClick={logoClick}
            aria-label="Doodlets home"
            className="rounded-xl transition duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315dbe] focus-visible:ring-offset-2"
          >
            <Image
              src="/images/brand/doodlets-logo-final.png"
              alt=""
              width={192}
              height={72}
              loading="eager"
              className="h-12 w-auto sm:h-14"
            />
          </button>

          {pathname === "/" && (
            <nav className="hidden items-center gap-8 md:flex">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-bold text-[#40516f] transition hover:text-[#315dbe]"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}

          {loading ? null : user ? (
            <div ref={menuRef} className="relative">
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
                className="flex items-center gap-2 rounded-full border border-[#dce5f5] bg-white py-1.5 pl-1.5 pr-3 text-[#243451] shadow-sm transition hover:border-[#b9caea] hover:bg-[#f6f9ff] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#315dbe]/15"
              >
                <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#315dbe] font-black text-white shadow-inner">
                  {initial}
                  <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white bg-[#ffd24e]" />
                </span>
                <span className="hidden text-left sm:block">
                  <span className="block text-[0.65rem] font-black uppercase tracking-[0.12em] text-[#8a94a8]">
                    My account
                  </span>
                  <span className="block max-w-24 truncate text-sm font-black">
                    {firstName}
                  </span>
                </span>
                <ChevronDown
                  className={`h-4 w-4 transition ${menuOpen ? "rotate-180" : ""}`}
                />
              </button>

              {menuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-3 w-[18rem] overflow-hidden rounded-[1.5rem] border border-[#dce5f5] bg-white shadow-[0_22px_55px_rgba(26,47,91,0.2)]"
                >
                  <div className="relative overflow-hidden bg-[linear-gradient(145deg,#315dbe,#284b9f)] px-5 py-5 text-white">
                    <div className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full border-[20px] border-white/[0.06]" />
                    <div className="relative flex items-center gap-3">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#ffd24e] text-lg font-black text-[#243451]">
                        {initial}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-black">{user.displayName ?? "Guest creator"}</p>
                        <p className="mt-0.5 truncate text-xs font-semibold text-white/65">
                          {user.email ?? "Your temporary guest session"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-2.5">
                    {adminAccess && (
                      <Link
                        href="/admin"
                        role="menuitem"
                        onClick={() => setMenuOpen(false)}
                        className="group mb-1 flex items-center gap-3 rounded-2xl px-3 py-3 transition hover:bg-[#fff9e9]"
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff3c4] text-[#9b6a00] transition group-hover:bg-[#ffd24e]">
                          <LayoutDashboard className="h-5 w-5" />
                        </span>
                        <span>
                          <span className="block text-sm font-black text-[#243451]">
                            Admin Dashboard
                          </span>
                          <span className="mt-0.5 block text-xs font-medium text-[#7b8598]">
                            Orders, customers and settings
                          </span>
                        </span>
                      </Link>
                    )}

                    <Link
                      href="/books"
                      role="menuitem"
                      onClick={() => setMenuOpen(false)}
                      className="group flex items-center gap-3 rounded-2xl px-3 py-3 transition hover:bg-[#f1f6ff]"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e9f1ff] text-[#315dbe] transition group-hover:bg-[#315dbe] group-hover:text-white">
                        <BookOpen className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-sm font-black text-[#243451]">My Books</span>
                        <span className="mt-0.5 block text-xs font-medium text-[#7b8598]">
                          View all books and reorder
                        </span>
                      </span>
                    </Link>

                    <Link
                      href="/create"
                      role="menuitem"
                      onClick={() => setMenuOpen(false)}
                      className="group mt-1 flex items-center gap-3 rounded-2xl px-3 py-3 transition hover:bg-[#fff9e9]"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff3c4] text-[#9b6a00] transition group-hover:bg-[#ffd24e]">
                        <Plus className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-sm font-black text-[#243451]">Create a New Book</span>
                        <span className="mt-0.5 block text-xs font-medium text-[#7b8598]">
                          Turn more memories into pages
                        </span>
                      </span>
                    </Link>
                  </div>

                  <div className="border-t border-[#edf0f5] bg-[#fbfcfe] p-2.5">
                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-black text-[#b64646] transition hover:bg-[#fff0f0]"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Button onClick={openModal} className="doodlets-button--sun">
              <Menu className="mr-2 h-4 w-4 sm:hidden" />
              <Sparkles className="mr-2 hidden h-4 w-4 sm:block" />
              Make My Book
            </Button>
          )}
        </div>
      </Container>
    </header>
  );
}
