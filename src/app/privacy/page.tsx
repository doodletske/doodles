import Link from "next/link";

import Container from "@/components/layout/Container";

export const metadata = {
  title: "Privacy Policy | Doodlets",
  description: "How Doodlets protects customer and family-photo privacy.",
};

const sections = [
  {
    title: "Our promise",
    content: [
      "Your family photos are private. We use them only to create and deliver your Doodlets book. We never sell them, make them public, or use them for marketing, testing, or to train AI.",
    ],
  },
  {
    title: "What we collect",
    list: [
      "The photos you upload, generated colouring pages, and your book project.",
      "Your name, email address, phone number, and sign-in details.",
      "Order and delivery details, including delivery preference and WhatsApp contact where provided.",
      "Payment-reference and payment-status information. We do not store full payment-card or mobile-money credentials.",
      "Basic technical information needed to keep the service secure and working, such as account identifiers and activity records.",
    ],
  },
  {
    title: "Why we use your information",
    content: [
      "We use your information to create, preview, print, and deliver your Doodlets book; manage your account, order, payment, support, and deletion requests; protect the service from fraud and unauthorised access; and meet legal, tax, accounting, and record-keeping obligations.",
      "We do not use uploaded photos or generated book images for advertising, social-media posts, product testing, staff demonstrations, or AI training. If we ever want to share a finished book publicly, we will ask for separate, specific permission first.",
    ],
  },
  {
    title: "Children’s and family photos",
    content: [
      "If a photo includes a child, you must be that child’s parent or legal guardian, or have permission to upload it. By ticking the consent box before continuing, you confirm that you have this permission.",
    ],
  },
  {
    title: "Where your data is stored and how we protect it",
    content: [
      "Project images and account records are held in access-controlled cloud systems used to operate Doodlets. Access is limited to the authenticated customer and authorised Doodlets personnel who need it to operate the service, provide support, or fulfil an order.",
      "We use technical and organisational safeguards designed to protect your data, including authenticated account access, restricted staff access, short-lived viewing links for previews, protected connections, and system-activity monitoring. No internet service can be guaranteed completely secure, but we work to reduce the risk of unauthorised access, loss, or misuse.",
    ],
  },
  {
    title: "How long we keep your information",
    content: [
      "We keep your project images and book project until you choose to delete them. After a fulfilled order, you can use the Delete My Project button in your book library. This permanently removes the project record and its uploaded and generated book images from Doodlets.",
      "If you request deletion while an order is still active, contact us and we will explain what must be retained temporarily to complete the transaction or meet a legal obligation. We may keep the minimum order and financial records required by law after project images have been removed.",
    ],
  },
  {
    title: "Your choices and rights",
    content: [
      "You can ask to access, correct, object to the processing of, or delete your personal information. A parent or legal guardian may exercise these rights for a child. To make a request, contact doodletske@gmail.com.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="bg-[#f7faff] py-12 sm:py-16">
      <Container>
        <article className="mx-auto max-w-3xl rounded-[2rem] border border-[#dbe5f5] bg-white px-6 py-10 shadow-[0_20px_48px_rgba(41,72,125,0.10)] sm:px-10 sm:py-12">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#315dbe]">Doodlets</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-[#1d2841] sm:text-5xl">Privacy Policy</h1>
          <p className="mt-4 text-sm font-semibold text-[#697287]">Last updated: 4 October 2026</p>

          <div className="mt-10 space-y-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-xl font-black text-[#1d2841]">{section.title}</h2>
                {section.content?.map((paragraph) => (
                  <p key={paragraph} className="mt-3 leading-7 text-[#4f5c73]">{paragraph}</p>
                ))}
                {section.list && (
                  <ul className="mt-4 space-y-3 pl-5 leading-7 text-[#4f5c73] marker:text-[#315dbe]">
                    {section.list.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <section className="mt-10 rounded-2xl bg-[#eef4ff] p-6">
            <h2 className="text-xl font-black text-[#1d2841]">Contact us</h2>
            <p className="mt-3 leading-7 text-[#4f5c73]">For privacy questions or requests, email <a className="font-bold text-[#315dbe] underline decoration-[#9fc0f0] underline-offset-4" href="mailto:doodletske@gmail.com">doodletske@gmail.com</a>.</p>
          </section>

          <Link href="/create" className="mt-10 inline-flex min-h-12 items-center justify-center rounded-full bg-[#315dbe] px-6 font-black text-white transition hover:bg-[#244a9b]">Create a private book</Link>
        </article>
      </Container>
    </main>
  );
}
