import { orderStatusDetails } from "../format";
import type { AdminOrderStatus } from "../types";

export default function AdminStatusPill({ status }: { status: AdminOrderStatus }) {
  const details = orderStatusDetails[status];

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${details.classes}`}>
      {details.label}
    </span>
  );
}
