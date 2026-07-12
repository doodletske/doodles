"use client";

import Link from "next/link";
import Container from "./Container";
import Button from "../ui/Button";

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
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            className="text-xl font-extrabold tracking-tight text-blue-600 transition hover:text-blue-700"
          >
            Doodlets
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 transition-colors duration-200 hover:text-blue-600"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <Link href="/create-book">
            <Button>Make My Book</Button>
          </Link>
        </div>
      </Container>
    </header>
  );
}