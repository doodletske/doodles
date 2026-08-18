"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { ArrowLeft, LayoutDashboard, LoaderCircle, PackageCheck, Settings, ShieldCheck, Users } from "lucide-react";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { api } from "@/lib/firebase/api";

const adminLinks = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Orders", href: "/admin/orders", icon: PackageCheck },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

type AdminSession = { name: string; email: string };

function AdminGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [session, setSession] = useState<AdminSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    api<AdminSession>("/api/admin/session")
      .then((data) => { if (active) setSession(data); })
      .catch(() => { if (active) setError("This area is restricted to Doodlets administrators."); })
      .finally(() => { if (active) setLoading(false); });

    return () => { active = false; };
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[65vh] items-center justify-center bg-[#eef5ff]">
        <div className="rounded-3xl bg-white px-8 py-7 text-center shadow-xl">
          <LoaderCircle className="mx-auto h-8 w-8 animate-spin text-[#315dbe]" />
          <p className="mt-3 font-black text-[#243451]">Opening the admin studio…</p>
        </div>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="flex min-h-[65vh] items-center justify-center bg-[#eef5ff] px-4">
        <div className="max-w-md rounded-[2rem] border border-[#dce5f5] bg-white p-8 text-center shadow-xl">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fff3c4] text-[#9b6a00]"><ShieldCheck className="h-8 w-8" /></span>
          <h1 className="mt-5 text-2xl font-black text-[#18233b]">Admin access required</h1>
          <p className="mt-3 font-medium leading-6 text-[#6e788c]">{error}</p>
          <Link href="/" className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#315dbe] px-6 font-black text-white">
            <ArrowLeft className="h-4 w-4" /> Return to Doodlets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eef5ff]">
      <div className="mx-auto grid max-w-[1500px] lg:grid-cols-[250px_minmax(0,1fr)]">
        <aside className="border-b border-white/10 bg-[linear-gradient(180deg,#223f8c,#172d68)] px-4 py-5 text-white lg:min-h-screen lg:border-b-0 lg:border-r lg:px-5 lg:py-8">
          <div className="hidden lg:block">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-[#ffdf67]"><ShieldCheck className="h-4 w-4" /> Admin studio</span>
            <p className="mt-4 truncate font-black">{session.name}</p>
            <p className="mt-1 truncate text-xs font-semibold text-white/55">{session.email}</p>
          </div>

          <nav className="flex gap-2 overflow-x-auto lg:mt-9 lg:block lg:space-y-2">
            {adminLinks.map((link) => {
              const active = link.href === "/admin" ? pathname === link.href : pathname.startsWith(link.href);
              const Icon = link.icon;
              return (
                <Link key={link.href} href={link.href} className={`flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-sm font-black transition ${active ? "bg-[#ffd24e] text-[#243451] shadow-[0_4px_0_#d6a61e]" : "text-white/75 hover:bg-white/10 hover:text-white"}`}>
                  <Icon className="h-5 w-5" /> {link.label}
                </Link>
              );
            })}
          </nav>

          <Link href="/" className="mt-8 hidden items-center gap-2 rounded-2xl px-4 py-3 text-sm font-black text-white/60 transition hover:bg-white/10 hover:text-white lg:flex">
            <ArrowLeft className="h-4 w-4" /> Back to website
          </Link>
        </aside>

        <section className="min-w-0 px-4 py-7 sm:px-7 lg:px-10 lg:py-10">{children}</section>
      </div>
    </div>
  );
}

export default function AdminShell({ children }: { children: ReactNode }) {
  return <ProtectedRoute><AdminGate>{children}</AdminGate></ProtectedRoute>;
}
