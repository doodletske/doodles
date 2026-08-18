import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";

import Container from "@/components/layout/Container";

const contactOptions = [
  {
    label: "Call us",
    detail: "Speak directly with our team",
    action: "Call now",
    href: "tel:+254111350052",
    icon: Phone,
    iconClass: "bg-[#fff0d7] text-[#d96b0b]",
    external: false,
  },
  {
    label: "WhatsApp",
    detail: "The quickest way to chat with us",
    action: "Start a chat",
    href: "https://wa.me/254111350052",
    icon: MessageCircle,
    iconClass: "bg-[#def8e8] text-[#159447]",
    external: true,
  },
  {
    label: "Email",
    detail: "hello@doodlets.co.ke",
    action: "Send an email",
    href: "mailto:hello@doodlets.co.ke",
    icon: Mail,
    iconClass: "bg-[#e6efff] text-[#315dbe]",
    external: false,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 bg-[#fffdf7] py-16 lg:py-20">
      <Container>
        <div className="overflow-hidden rounded-[2.5rem] border border-[#dbe5f5] bg-white shadow-[0_20px_55px_rgba(41,72,125,0.11)]">
          <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
            <div className="relative overflow-hidden bg-[#315dbe] p-8 text-white sm:p-10 lg:p-12">
              <div className="pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 rounded-full border-[36px] border-white/5" />
              <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full border-[28px] border-[#83aceb]/25" />

              <div className="relative">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ffdf67]">
                  We&apos;re here to help
                </p>
                <h2 className="mt-4 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl">
                  Let&apos;s make something special.
                </h2>
                <p className="mt-5 max-w-lg text-lg leading-8 text-[#e2edff]">
                  Not sure which book to choose, or planning something a little
                  different? Tell us what you have in mind and we&apos;ll help you
                  find the right option.
                </p>

                <a
                  href="https://wa.me/254111350052"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#ffd24e] px-5 text-sm font-black !text-[#243451] shadow-[0_4px_0_#dca623] transition hover:-translate-y-0.5 hover:bg-[#ffe17c]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat on WhatsApp
                </a>

                <p className="mt-5 text-sm font-semibold text-[#bfd6fa]">
                  Friendly, human help—no complicated support forms.
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8 lg:p-10">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#7a8497]">
                Choose what&apos;s easiest
              </p>
              <div className="mt-5 space-y-3">
                {contactOptions.map((option) => {
                  const Icon = option.icon;

                  return (
                    <a
                      key={option.label}
                      href={option.href}
                      target={option.external ? "_blank" : undefined}
                      rel={option.external ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-4 rounded-2xl border border-[#e2e9f4] p-4 transition hover:-translate-y-0.5 hover:border-[#b8cff3] hover:bg-[#f8fbff] hover:shadow-md sm:p-5"
                    >
                      <span
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${option.iconClass}`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block text-lg font-black text-[#1d2841]">
                          {option.label}
                        </span>
                        <span className="mt-0.5 block truncate text-sm text-[#697386]">
                          {option.detail}
                        </span>
                      </span>

                      <span className="hidden items-center gap-1 text-sm font-extrabold text-[#315dbe] sm:flex">
                        {option.action}
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

      </Container>
    </section>
  );
}
