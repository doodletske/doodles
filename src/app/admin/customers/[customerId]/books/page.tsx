"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, BookOpen, Image as ImageIcon, LoaderCircle } from "lucide-react";

import AdminPageHeader from "@/features/admin/components/AdminPageHeader";
import { formatAdminDate } from "@/features/admin/format";
import { api } from "@/lib/firebase/api";

type CustomerBookPage = {
  id: string;
  pageNumber: number;
  status: string;
  originalUrl: string;
  coloringUrl: string | null;
};

type CustomerBook = {
  id: string;
  childName: string | null;
  pageCount: number;
  status: string;
  orderStatus: string | null;
  createdAt: string;
  pages: CustomerBookPage[];
};

type CustomerBooksResponse = {
  customer: { id: string; name: string | null; email: string | null; phoneNumber: string | null };
  books: CustomerBook[];
};

export default function AdminCustomerBooksPage() {
  const params = useParams<{ customerId: string }>();
  const customerId = params.customerId;
  const [data, setData] = useState<CustomerBooksResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    api<CustomerBooksResponse>(`/api/admin/customers/${customerId}/books`)
      .then((response) => { if (active) setData(response); })
      .catch((loadError) => { if (active) setError(loadError instanceof Error ? loadError.message : "Unable to load this customer's books."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [customerId]);

  const customerName = data?.customer.name ?? "Guest customer";

  return (
    <div>
      <Link href="/admin/customers" className="inline-flex items-center gap-2 text-sm font-black text-[#315dbe] hover:text-[#244a9b]"><ArrowLeft className="h-4 w-4" /> Back to customers</Link>
      <AdminPageHeader eyebrow="Customer projects" title={`${customerName}'s books`} description="Original customer photos and generated illustrations are visible only to administrators." icon={BookOpen} />

      {error && <div className="mt-5 rounded-2xl bg-red-50 p-4 font-bold text-red-700">{error}</div>}
      {loading ? (
        <div className="mt-7 flex min-h-64 items-center justify-center rounded-[2rem] bg-white"><LoaderCircle className="h-8 w-8 animate-spin text-[#315dbe]" /></div>
      ) : data && data.books.length === 0 ? (
        <div className="mt-7 rounded-[2rem] bg-white px-6 py-16 text-center shadow-sm"><ImageIcon className="mx-auto h-12 w-12 text-[#bdc9dc]" /><p className="mt-3 font-black text-[#243451]">This customer has no books yet.</p></div>
      ) : data ? (
        <div className="mt-7 space-y-7">
          {data.books.map((book) => (
            <section key={book.id} className="rounded-[1.75rem] bg-white p-5 shadow-[0_14px_35px_rgba(24,55,112,0.08)] sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-black text-[#18233b]">{book.childName ? `${book.childName}'s ${book.pageCount}-photo book` : `${book.pageCount}-photo book`}</h2>
                  <p className="mt-1 text-sm font-semibold text-[#748096]">Created {formatAdminDate(book.createdAt)} · {book.status.replaceAll("_", " ")}</p>
                </div>
                <span className="rounded-full bg-[#eef4ff] px-3 py-1 text-xs font-black text-[#315dbe]">{book.pages.length} of {book.pageCount} photos</span>
              </div>
              {book.pages.length > 0 ? (
                <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {book.pages.map((page) => (
                    <article key={page.id} className="overflow-hidden rounded-2xl border border-[#e4eaf4] bg-[#f8faff]">
                      <img src={page.originalUrl} alt={`Original upload ${page.pageNumber}`} className="aspect-[3/4] w-full object-cover" />
                      <div className="flex items-center justify-between px-3 py-2 text-xs font-black text-[#59657a]"><span>Photo {page.pageNumber}</span><span>{page.status.toLowerCase()}</span></div>
                    </article>
                  ))}
                </div>
              ) : <p className="mt-5 text-sm font-semibold text-[#748096]">No photos have been uploaded for this book.</p>}
            </section>
          ))}
        </div>
      ) : null}
    </div>
  );
}
