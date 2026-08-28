"use client";

import { useEffect, useState } from "react";
import { Bot, CheckCircle2, CircleAlert, LoaderCircle, Settings, ShieldCheck, WalletCards } from "lucide-react";

import AdminPageHeader from "@/features/admin/components/AdminPageHeader";
import { formatKes } from "@/features/admin/format";
import { api } from "@/lib/firebase/api";

type AdminSettings = {
  packages: { pageCount: number; name: string; price: number }[];
  generation: {
    model: string;
    quality: string;
    size: string;
    usageToday: {
      pages: number;
      users: number;
      guestDailyLimit: number;
      signedInDailyLimit: number;
      maxAttempts: number;
      generationAttempts: number;
      globalDailyLimit: number;
    };
  };
  services: Record<string, boolean>;
};

const serviceLabels: Record<string, string> = {
  database: "Database",
  firebase: "Firebase",
  imageGeneration: "Image generation",
  payments: "Paystack payments",
  email: "Admin activity emails",
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api<AdminSettings>("/api/admin/settings")
      .then(setSettings)
      .catch((loadError) => setError(loadError instanceof Error ? loadError.message : "Unable to load settings."));
  }, []);

  return (
    <div>
      <AdminPageHeader
        eyebrow="Launch readiness"
        title="Settings"
        description="A safe, read-only view of the commercial settings and service connections currently powering Doodles."
        icon={Settings}
      />

      {error && <div className="mt-6 rounded-2xl bg-red-50 p-4 font-bold text-red-700">{error}</div>}

      {!settings ? (
        <div className="mt-8 flex min-h-64 items-center justify-center rounded-[2rem] bg-white"><LoaderCircle className="h-8 w-8 animate-spin text-[#315dbe]" /></div>
      ) : (
        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          <section className="rounded-[2rem] bg-white p-6 shadow-[0_14px_35px_rgba(24,55,112,0.08)]">
            <div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff3c4] text-[#9b6a00]"><WalletCards className="h-5 w-5" /></span><div><h2 className="text-xl font-black text-[#18233b]">Book pricing</h2><p className="text-sm font-medium text-[#7a8498]">Prices charged at checkout</p></div></div>
            <div className="mt-6 space-y-3">
              {settings.packages.map((bookPackage) => (
                <div key={bookPackage.pageCount} className="flex items-center justify-between rounded-2xl bg-[#f7f9fd] p-4">
                  <div><p className="font-black text-[#243451]">{bookPackage.name}</p><p className="mt-1 text-xs font-semibold text-[#8992a4]">{bookPackage.pageCount * 2} printed pages · {bookPackage.pageCount} photos</p></div>
                  <span className="text-lg font-black text-[#315dbe]">{formatKes(bookPackage.price)}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] bg-white p-6 shadow-[0_14px_35px_rgba(24,55,112,0.08)]">
            <div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e9f1ff] text-[#315dbe]"><Bot className="h-5 w-5" /></span><div><h2 className="text-xl font-black text-[#18233b]">Colouring engine</h2><p className="text-sm font-medium text-[#7a8498]">Current production profile</p></div></div>
            <dl className="mt-6 space-y-3">
              <div className="flex justify-between gap-4 rounded-2xl bg-[#f7f9fd] p-4"><dt className="font-bold text-[#7a8498]">Model</dt><dd className="text-right font-black text-[#243451]">{settings.generation.model}</dd></div>
              <div className="flex justify-between gap-4 rounded-2xl bg-[#f7f9fd] p-4"><dt className="font-bold text-[#7a8498]">Quality</dt><dd className="capitalize font-black text-[#243451]">{settings.generation.quality}</dd></div>
              <div className="flex justify-between gap-4 rounded-2xl bg-[#f7f9fd] p-4"><dt className="font-bold text-[#7a8498]">Canvas</dt><dd className="font-black text-[#243451]">{settings.generation.size}</dd></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-[#e9f1ff] p-4"><dt className="text-xs font-black uppercase tracking-wider text-[#61728e]">Used today</dt><dd className="mt-2 text-2xl font-black text-[#315dbe]">{settings.generation.usageToday.generationAttempts} / {settings.generation.usageToday.globalDailyLimit}</dd><p className="mt-1 text-xs font-semibold text-[#7a8498]">Generation attempts · {settings.generation.usageToday.pages} distinct pages</p></div>
                <div className="rounded-2xl bg-[#fff3c4] p-4"><dt className="text-xs font-black uppercase tracking-wider text-[#765000]">Customer limits</dt><dd className="mt-2 text-sm font-black text-[#243451]">{settings.generation.usageToday.guestDailyLimit} guest · {settings.generation.usageToday.signedInDailyLimit} signed in</dd><p className="mt-1 text-xs font-semibold text-[#7a8498]">Maximum {settings.generation.usageToday.maxAttempts} attempts per photo</p></div>
              </div>
            </dl>
          </section>

          <section className="rounded-[2rem] bg-white p-6 shadow-[0_14px_35px_rgba(24,55,112,0.08)] xl:col-span-2">
            <div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e4f8eb] text-[#188447]"><ShieldCheck className="h-5 w-5" /></span><div><h2 className="text-xl font-black text-[#18233b]">Service connections</h2><p className="text-sm font-medium text-[#7a8498]">No keys or private values are shown here</p></div></div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
              {Object.entries(settings.services).map(([service, configured]) => (
                <div key={service} className={`rounded-2xl border p-4 ${configured ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"}`}>
                  {configured ? <CheckCircle2 className="h-5 w-5 text-emerald-700" /> : <CircleAlert className="h-5 w-5 text-amber-700" />}
                  <p className="mt-3 font-black text-[#243451]">{serviceLabels[service] ?? service}</p>
                  <p className={`mt-1 text-xs font-black ${configured ? "text-emerald-700" : "text-amber-700"}`}>{configured ? "Configured" : "Needs setup"}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
