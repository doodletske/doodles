"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, BookOpen, CircleDollarSign, Clock3, LayoutDashboard, LoaderCircle, PackageCheck, Users } from "lucide-react";

import AdminPageHeader from "@/features/admin/components/AdminPageHeader";
import AdminStatusPill from "@/features/admin/components/AdminStatusPill";
import { formatAdminDate, formatKes } from "@/features/admin/format";
import type { AdminOrder } from "@/features/admin/types";
import { api } from "@/lib/firebase/api";

type DashboardData = {
  metrics: {
    customerCount: number;
    bookCount: number;
    orderCount: number;
    activeBookCount: number;
    fulfilmentCount: number;
    revenue: number;
  };
  recentOrders: AdminOrder[];
};

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api<DashboardData>("/api/admin/dashboard")
      .then(setData)
      .catch((loadError) => setError(loadError instanceof Error ? loadError.message : "Unable to load dashboard."));
  }, []);

  const cards = data
    ? [
        { label: "Revenue", value: formatKes(data.metrics.revenue), icon: CircleDollarSign, tone: "bg-[#e4f8eb] text-[#188447]" },
        { label: "Orders", value: data.metrics.orderCount, icon: PackageCheck, tone: "bg-[#e9f1ff] text-[#315dbe]" },
        { label: "To fulfil", value: data.metrics.fulfilmentCount, icon: Clock3, tone: "bg-[#fff3c4] text-[#9b6a00]" },
        { label: "Customers", value: data.metrics.customerCount, icon: Users, tone: "bg-[#f0eaff] text-[#7047b8]" },
      ]
    : [];

  return (
    <div>
      <AdminPageHeader
        eyebrow="Today at a glance"
        title="Doodles Dashboard"
        description="Track sales, watch the production queue, and move every keepsake smoothly from payment to delivery."
        icon={LayoutDashboard}
        action={
          <Link href="/admin/orders" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#315dbe] px-6 font-black text-white shadow-[0_4px_0_#244a9b]">
            Manage orders <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />

      {error && <div className="mt-6 rounded-2xl bg-red-50 p-4 font-bold text-red-700">{error}</div>}

      {!data ? (
        <div className="mt-8 flex min-h-64 items-center justify-center rounded-[2rem] bg-white shadow-sm">
          <LoaderCircle className="h-8 w-8 animate-spin text-[#315dbe]" />
        </div>
      ) : (
        <>
          <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.label} className="rounded-[1.6rem] border border-white bg-white p-5 shadow-[0_14px_35px_rgba(24,55,112,0.08)]">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${card.tone}`}><Icon className="h-5 w-5" /></span>
                  <p className="mt-5 text-2xl font-black text-[#18233b]">{card.value}</p>
                  <p className="mt-1 text-sm font-bold text-[#7a8498]">{card.label}</p>
                </article>
              );
            })}
          </section>

          <section className="mt-7 overflow-hidden rounded-[2rem] border border-white bg-white shadow-[0_18px_45px_rgba(24,55,112,0.09)]">
            <div className="flex items-center justify-between border-b border-[#edf1f7] px-5 py-5 sm:px-7">
              <div>
                <h2 className="text-xl font-black text-[#18233b]">Recent orders</h2>
                <p className="mt-1 text-sm font-medium text-[#7a8498]">Your newest payments and fulfilment jobs.</p>
              </div>
              <span className="hidden rounded-full bg-[#eef4ff] px-4 py-2 text-xs font-black text-[#315dbe] sm:inline-flex">{data.metrics.activeBookCount} books in progress</span>
            </div>

            {data.recentOrders.length === 0 ? (
              <div className="px-6 py-14 text-center">
                <BookOpen className="mx-auto h-12 w-12 text-[#bdc9dc]" />
                <p className="mt-3 font-black text-[#243451]">No orders yet</p>
              </div>
            ) : (
              <div className="divide-y divide-[#edf1f7]">
                {data.recentOrders.map((order) => (
                  <div key={order.id} className="grid gap-3 px-5 py-4 sm:grid-cols-[1fr_auto_auto] sm:items-center sm:px-7">
                    <div className="min-w-0">
                      <p className="truncate font-black text-[#243451]">{order.book.childName ? `${order.book.childName}'s book` : "Personalised book"}</p>
                      <p className="mt-1 truncate text-xs font-semibold text-[#8992a4]">{order.book.user.name ?? order.book.user.email ?? order.whatsapp} · {formatAdminDate(order.createdAt)}</p>
                    </div>
                    <AdminStatusPill status={order.status} />
                    <span className="font-black text-[#18233b]">{formatKes(order.amount)}</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
