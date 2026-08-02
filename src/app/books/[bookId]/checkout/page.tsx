"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const { bookId } = useParams<{ bookId: string }>();

  const [whatsapp, setWhatsapp] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState<
    "PICKUP" | "DELIVERY"
  >("PICKUP");

  const [loading, setLoading] = useState(false);

  async function continueToPayment() {
  if (!whatsapp.trim()) {
    alert("Please enter your WhatsApp number.");
    return;
  }

  try {
    setLoading(true);

    //
    // STEP 1
    // Create the order
    //

    const orderResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/orders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId,
          whatsapp,
          deliveryMethod,
        }),
      }
    );

    const order = await orderResponse.json();

    if (!orderResponse.ok) {
      throw new Error(
        order.message || "Unable to create order."
      );
    }

    //
    // STEP 2
    // Initialise Paystack
    //

    const paymentResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/orders/${order.id}/pay`,
      {
        method: "POST",
      }
    );

    const payment = await paymentResponse.json();

    if (!paymentResponse.ok) {
      throw new Error(
        payment.message ||
          "Unable to start payment."
      );
    }

    //
    // STEP 3
    // Redirect customer to Paystack
    //

    window.location.href =
      payment.authorization_url;

  } catch (error: any) {
    alert(error.message);
  } finally {
    setLoading(false);
  }
}

  return (
    <main className="min-h-screen bg-[#f4f1ea]">
      <div className="mx-auto max-w-2xl px-8 py-16">
        <h1 className="text-center text-4xl font-bold">
          Checkout
        </h1>

        <p className="mt-3 text-center text-gray-600">
          You're one step away from ordering your
          personalised colouring book.
        </p>

        {/* WhatsApp */}

        <div className="mt-12">
          <label className="mb-2 block font-semibold">
            WhatsApp Number
          </label>

          <input
            type="tel"
            placeholder="+254 712 345 678"
            value={whatsapp}
            onChange={(e) =>
              setWhatsapp(e.target.value)
            }
            className="w-full rounded-xl border border-gray-300 bg-white px-5 py-4 outline-none focus:border-blue-600"
          />

          <p className="mt-2 text-sm text-gray-500">
            We'll use this number to notify you
            when your colouring book is ready and
            to arrange collection or delivery.
          </p>
        </div>

        {/* Delivery */}

        <div className="mt-12">
          <h2 className="mb-4 text-xl font-semibold">
            How would you like to receive your book?
          </h2>

          <div className="space-y-5">
            <label className="flex cursor-pointer items-start gap-4 rounded-2xl border bg-white p-5">
              <input
                type="radio"
                checked={deliveryMethod === "PICKUP"}
                onChange={() =>
                  setDeliveryMethod("PICKUP")
                }
              />

              <div>
                <p className="font-semibold">
                  🏢 Collect from our office
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  We'll send you a WhatsApp message
                  once your colouring book is ready
                  for collection.
                </p>
              </div>
            </label>

            <label className="flex cursor-pointer items-start gap-4 rounded-2xl border bg-white p-5">
              <input
                type="radio"
                checked={
                  deliveryMethod === "DELIVERY"
                }
                onChange={() =>
                  setDeliveryMethod("DELIVERY")
                }
              />

              <div>
                <p className="font-semibold">
                  🚚 Have it delivered
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Delivery is free within Nairobi
                  CBD. Outside the CBD we'll contact
                  you on WhatsApp after printing to
                  arrange delivery and confirm any
                  applicable delivery fee.
                </p>
              </div>
            </label>
          </div>
        </div>

        <button
          onClick={continueToPayment}
          disabled={loading}
          className="mt-14 w-full rounded-xl bg-blue-600 px-8 py-5 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {loading
            ? "Creating your order..."
            : "Continue to Secure Payment"}
        </button>
      </div>
    </main>
  );
}