"use client";

import { useEffect, useMemo, useState } from "react";
import { BookOpen, LoaderCircle, Mail, Phone, Search, Users } from "lucide-react";

import AdminPageHeader from "@/features/admin/components/AdminPageHeader";
import { formatAdminDate, formatKes } from "@/features/admin/format";
import type { AdminCustomer } from "@/features/admin/types";
import { api } from "@/lib/firebase/api";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<AdminCustomer[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api<AdminCustomer[]>("/api/admin/customers")
      .then(setCustomers)
      .catch((loadError) => setError(loadError instanceof Error ? loadError.message : "Unable to load customers."))
      .finally(() => setLoading(false));
  }, []);

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return customers;
    return customers.filter((customer) => [customer.name, customer.email, customer.phoneNumber, customer.firebaseUid].filter(Boolean).join(" ").toLowerCase().includes(query));
  }, [customers, search]);

  return (
    <div>
      <AdminPageHeader
        eyebrow="Customer history"
        title="Customers"
        description="See who is creating with Doodlets, their book history, completed purchases, and lifetime spend."
        icon={Users}
      />

      <label className="relative mt-7 block rounded-[1.6rem] bg-white p-4 shadow-[0_14px_35px_rgba(24,55,112,0.08)]">
        <Search className="pointer-events-none absolute left-8 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8290a8]" />
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, email or phone…" className="min-h-12 w-full rounded-2xl border-2 border-[#e2e8f2] bg-[#f8faff] pl-12 pr-4 font-semibold text-[#243451] outline-none focus:border-[#315dbe]" />
      </label>

      {error && <div className="mt-5 rounded-2xl bg-red-50 p-4 font-bold text-red-700">{error}</div>}

      {loading ? (
        <div className="mt-7 flex min-h-64 items-center justify-center rounded-[2rem] bg-white"><LoaderCircle className="h-8 w-8 animate-spin text-[#315dbe]" /></div>
      ) : filteredCustomers.length === 0 ? (
        <div className="mt-7 rounded-[2rem] bg-white px-6 py-16 text-center shadow-sm"><Users className="mx-auto h-12 w-12 text-[#bdc9dc]" /><p className="mt-3 font-black text-[#243451]">No matching customers</p></div>
      ) : (
        <section className="mt-7 grid gap-5 xl:grid-cols-2">
          {filteredCustomers.map((customer) => {
            const customerName = customer.name ?? "Guest customer";
            const initial = customerName.charAt(0).toUpperCase();
            return (
              <article key={customer.id} className="rounded-[1.75rem] border border-white bg-white p-5 shadow-[0_14px_35px_rgba(24,55,112,0.08)] sm:p-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#315dbe] text-xl font-black text-white">{initial}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h2 className="truncate text-lg font-black text-[#18233b]">{customerName}</h2>
                      <span className="rounded-full bg-[#eef4ff] px-3 py-1 text-xs font-black text-[#315dbe]">{customer.provider === "GOOGLE" ? "Google" : "Phone / guest"}</span>
                    </div>
                    {customer.email && <p className="mt-2 flex items-center gap-2 truncate text-sm font-semibold text-[#748096]"><Mail className="h-4 w-4" /> {customer.email}</p>}
                    {customer.phoneNumber && <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-[#748096]"><Phone className="h-4 w-4" /> {customer.phoneNumber}</p>}
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-[#f6f8fc] p-3 text-center"><BookOpen className="mx-auto h-4 w-4 text-[#315dbe]" /><p className="mt-2 text-lg font-black text-[#18233b]">{customer.bookCount}</p><p className="text-[0.68rem] font-bold text-[#8992a4]">Books</p></div>
                  <div className="rounded-2xl bg-[#f1fbf5] p-3 text-center"><p className="text-lg font-black text-[#188447]">{customer.paidOrderCount}</p><p className="mt-2 text-[0.68rem] font-bold text-[#8992a4]">Paid orders</p></div>
                  <div className="rounded-2xl bg-[#fffaf0] p-3 text-center"><p className="text-sm font-black text-[#9b6a00]">{formatKes(customer.totalSpent)}</p><p className="mt-2 text-[0.68rem] font-bold text-[#8992a4]">Spent</p></div>
                </div>

                <div className="mt-5 flex flex-wrap justify-between gap-2 border-t border-[#edf1f7] pt-4 text-xs font-semibold text-[#8a94a8]">
                  <span>Joined {formatAdminDate(customer.createdAt)}</span>
                  <span>Active {formatAdminDate(customer.lastActivity)}</span>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </div>
  );
}
