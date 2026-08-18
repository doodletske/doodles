import type { AdminOrderStatus } from "./types";

export function formatKes(value: number) {
  return `KES ${value.toLocaleString("en-KE")}`;
}

export function formatAdminDate(value: string) {
  return new Intl.DateTimeFormat("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export const orderStatusDetails: Record<
  AdminOrderStatus,
  { label: string; classes: string }
> = {
  PENDING: { label: "Pending payment", classes: "bg-amber-100 text-amber-800" },
  PAID: { label: "Paid", classes: "bg-emerald-100 text-emerald-800" },
  PRINTING: { label: "Printing", classes: "bg-blue-100 text-blue-800" },
  READY: { label: "Ready", classes: "bg-indigo-100 text-indigo-800" },
  COMPLETED: { label: "Completed", classes: "bg-green-100 text-green-800" },
  CANCELLED: { label: "Cancelled", classes: "bg-slate-100 text-slate-700" },
  REFUNDED: { label: "Refunded", classes: "bg-rose-100 text-rose-800" },
};
