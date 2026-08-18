import Image from "next/image";
import Link from "next/link";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="bg-[#17213a] text-white">
      <Container>
        <div className="flex flex-col gap-8 py-10 sm:py-12">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Link
                href="/"
                aria-label="Doodlets home"
                className="rounded-2xl bg-white px-3 py-1.5 transition hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd24e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#17213a]"
              >
                <Image
                  src="/images/brand/doodlets-logo-final.png"
                  alt=""
                  width={160}
                  height={60}
                  className="h-11 w-auto"
                />
              </Link>
              <p className="max-w-sm text-sm leading-6 text-[#b9c4d8]">
                Turning the photos your family loves into colouring books they
                can hold, colour and keep.
              </p>
            </div>

            <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-[#dce4f2]">
              <Link className="transition hover:text-[#ffdf67]" href="/#how-it-works">
                How it works
              </Link>
              <Link className="transition hover:text-[#ffdf67]" href="/#pricing">
                Pricing
              </Link>
              <Link className="transition hover:text-[#ffdf67]" href="/#contact">
                Contact
              </Link>
            </nav>
          </div>

          <div className="flex flex-col justify-between gap-2 border-t border-white/10 pt-6 text-xs text-[#8f9bb0] sm:flex-row">
            <p>© {new Date().getFullYear()} Doodlets. All rights reserved.</p>
            <p>Made with happy memories in Kenya.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
