export type AdminOrderStatus =
  | "PENDING"
  | "PAID"
  | "PRINTING"
  | "READY"
  | "COMPLETED"
  | "CANCELLED"
  | "REFUNDED";

export type AdminOrder = {
  id: string;
  amount: number;
  status: AdminOrderStatus;
  whatsapp: string;
  deliveryMethod: "PICKUP" | "DELIVERY";
  paymentReference: string | null;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
  book: {
    id: string;
    childName: string | null;
    pageCount: number;
    status: string;
    user: {
      id: string;
      name: string | null;
      email: string | null;
      phoneNumber: string | null;
    };
  };
};

export type AdminCustomer = {
  id: string;
  firebaseUid: string;
  name: string | null;
  email: string | null;
  phoneNumber: string | null;
  provider: "GOOGLE" | "PHONE";
  createdAt: string;
  lastActivity: string;
  bookCount: number;
  paidOrderCount: number;
  totalSpent: number;
};

export const ADMIN_ORDER_STATUSES: AdminOrderStatus[] = [
  "PENDING",
  "PAID",
  "PRINTING",
  "READY",
  "COMPLETED",
  "CANCELLED",
  "REFUNDED",
];
