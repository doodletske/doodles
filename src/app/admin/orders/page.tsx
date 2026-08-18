"use client";

import { useEffect, useMemo, useState } from "react";
import { LoaderCircle, PackageCheck, Search, Truck } from "lucide-react";

import AdminPageHeader from "@/features/admin/components/AdminPageHeader";
import AdminStatusPill from "@/features/admin/components/AdminStatusPill";
import { formatAdminDate, formatKes, orderStatusDetails } from "@/features/admin/format";
import { ADMIN_ORDER_STATUSES, type AdminOrder, type AdminOrderStatus } from "@/features/admin/types";
import { api } from "@/lib/firebase/api";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | AdminOrderStatus>("ALL");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    api<AdminOrder[]>("/api/admin/orders")
      .then(setOrders)
      .catch((loadError) => setError(loadError instanceof Error ? loadError.message : "Unable to load orders."))
      .finally(() => setLoading(false));
  }, []);

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();
    return orders.filter((order) => {
      const matchesStatus = statusFilter === "ALL" || order.status === statusFilter;
      const haystack = [order.id, order.whatsapp, order.book.childName, order.book.user.name, order.book.user.email, order.paymentReference]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return matchesStatus && (!query || haystack.includes(query));
    });
  }, [orders, search, statusFilter]);

  async function changeStatus(orderId: string, status: AdminOrderStatus) {
    try {
      setUpdatingId(orderId);
      setError("");
      const updated = await api<AdminOrder>(`/api/admin/orders/${orderId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      setOrders((current) => current.map((order) => order.id === orderId ? updated : order));
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "Unable to update order.");
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div>
      <AdminPageHeader
        eyebrow="Production and fulfilment"
        title="Orders"
        description="Find an order, confirm where it is in the process, and keep its customer-facing status up to date."
        icon={PackageCheck}
      />

      <section className="mt-7 grid gap-3 rounded-[1.6rem] bg-white p-4 shadow-[0_14px_35px_rgba(24,55,112,0.08)] sm:grid-cols-[1fr_13rem]">
        <label className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8290a8]" />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search customer, phone, book or order…" className="min-h-12 w-full rounded-2xl border-2 border-[#e2e8f2] bg-[#f8faff] pl-12 pr-4 font-semibold text-[#243451] outline-none focus:border-[#315dbe]" />
        </label>
        <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as "ALL" | AdminOrderStatus)} className="min-h-12 rounded-2xl border-2 border-[#e2e8f2] bg-[#f8faff] px-4 font-black text-[#243451] outline-none focus:border-[#315dbe]">
          <option value="ALL">All statuses</option>
          {ADMIN_ORDER_STATUSES.map((status) => <option key={status} value={status}>{orderStatusDetails[status].label}</option>)}
        </select>
      </section>

      {error && <div className="mt-5 rounded-2xl bg-red-50 p-4 font-bold text-red-700">{error}</div>}

      {loading ? (
        <div className="mt-7 flex min-h-64 items-center justify-center rounded-[2rem] bg-white"><LoaderCircle className="h-8 w-8 animate-spin text-[#315dbe]" /></div>
      ) : filteredOrders.length === 0 ? (
        <div className="mt-7 rounded-[2rem] bg-white px-6 py-16 text-center shadow-sm">
          <PackageCheck className="mx-auto h-12 w-12 text-[#bdc9dc]" />
          <p className="mt-3 font-black text-[#243451]">No matching orders</p>
        </div>
      ) : (
        <div className="mt-7 space-y-4">
          {filteredOrders.map((order) => (
            <article key={order.id} className="overflow-hidden rounded-[1.75rem] border border-white bg-white shadow-[0_14px_35px_rgba(24,55,112,0.08)]">
              <div className="grid gap-5 p-5 lg:grid-cols-[1.35fr_1fr_auto] lg:items-center lg:p-6">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <AdminStatusPill status={order.status} />
                    <span className="text-xs font-black uppercase tracking-[0.12em] text-[#929bad]">#{order.id.slice(-8).toUpperCase()}</span>
                  </div>
                  <h2 className="mt-3 text-lg font-black text-[#18233b]">{order.book.childName ? `${order.book.childName}'s ${order.book.pageCount}-page book` : `${order.book.pageCount}-page personalised book`}</h2>
                  <p className="mt-1 text-sm font-semibold text-[#748096]">{order.book.user.name ?? "Guest customer"} · {order.book.user.email ?? order.book.user.phoneNumber ?? order.whatsapp}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl bg-[#f7f9fd] p-3">
                    <p className="text-xs font-bold text-[#8a94a8]">Placed</p>
                    <p className="mt-1 font-black text-[#243451]">{formatAdminDate(order.createdAt)}</p>
                  </div>
                  <div className="rounded-2xl bg-[#f7f9fd] p-3">
                    <p className="text-xs font-bold text-[#8a94a8]">Total</p>
                    <p className="mt-1 font-black text-[#243451]">{formatKes(order.amount)}</p>
                  </div>
                  <a href={`https://wa.me/${order.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="col-span-2 flex items-center gap-2 rounded-2xl bg-[#effaf3] p-3 font-black text-[#188447]">
                    {order.whatsapp}
                  </a>
                </div>

                <div className="min-w-52">
                  <label className="text-xs font-black uppercase tracking-[0.12em] text-[#7b8598]">Update status</label>
                  <div className="relative mt-2">
                    <select disabled={updatingId === order.id} value={order.status} onChange={(event) => void changeStatus(order.id, event.target.value as AdminOrderStatus)} className="min-h-12 w-full rounded-2xl border-2 border-[#dce5f5] bg-white px-4 pr-10 font-black text-[#243451] outline-none focus:border-[#315dbe] disabled:opacity-60">
                      {ADMIN_ORDER_STATUSES.map((status) => <option key={status} value={status}>{orderStatusDetails[status].label}</option>)}
                    </select>
                    {updatingId === order.id && <LoaderCircle className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 animate-spin text-[#315dbe]" />}
                  </div>
                  <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-[#8a94a8]"><Truck className="h-3.5 w-3.5" /> {order.deliveryMethod === "DELIVERY" ? "Delivery" : "Office collection"}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
