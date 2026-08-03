"use client";

import { QuoteItem } from "@/types/website";
import { useState } from "react";
import QuoteChoiceModal from "./QuotesRequestModal";

interface Props {
  items: QuoteItem[];
  total: number;
  fmt: (value: number) => string;
}

const QuoteSummary = ({ items, total, fmt }: Props) => {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showGuestForm, setShowGuestForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [customerNotes, setCustomerNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitting(true);

    const payload = {
      guestName: form.name,
      guestEmail: form.email,
      guestPhone: form.phone,
      customerNotes,
      items: items.map((item) => ({
        productId: item.productId,
        productNameSnapshot: item.productNameSnapshot,
        variantLabelSnapshot: item.variantLabelSnapshot,
        materialNameSnapshot: item.materialNameSnapshot,
        colorNameSnapshot: item.colorNameSnapshot,
        quantity: item.quantity,
        unitPriceSnapshot: item.unitPriceSnapshot,
        customMeasurements: item.customMeasurements || {},
        customNotes: item.customNotes || "",
      })),
    };

    console.log(payload);

    setSubmitting(false);
  };

  return (
    <div className="sticky top-24">
      <div className="rounded-2xl bg-[#0B0B0B] p-8">
        <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#FAD90C]">
          Quote Summary
        </h3>

        <div className="mt-6 space-y-4">
          {items.map((item) => (
            <div
              key={`${item.productId}-${item.colorNameSnapshot}`}
              className="border-b border-white/10 pb-4"
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-white">
                    {item.productNameSnapshot}
                  </p>

                  <p className="mt-1 text-xs text-white/50">
                    {item.colorNameSnapshot} • Qty {item.quantity}
                  </p>

                  {item.customMeasurements && (
                    <p className="mt-2 text-xs text-white/50">
                      Measurement:{" "}
                      {typeof item.customMeasurements === "string"
                        ? item.customMeasurements
                        : JSON.stringify(item.customMeasurements)}
                    </p>
                  )}

                  {item.customNotes && (
                    <p className="text-xs text-white/50">
                      Note: {item.customNotes}
                    </p>
                  )}
                </div>

                <span className="font-semibold text-[#FAD90C]">
                  {fmt(item.unitPriceSnapshot * item.quantity)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-[#FAD90C]/20 pt-6">
          <span className="text-xs font-bold uppercase tracking-wider text-white/60">
            Estimated Total
          </span>

          <span className="font-display text-3xl font-bold text-[#FAD90C]">
            {fmt(total)}
          </span>
        </div>

        <div className="mt-6 rounded-lg border border-[#FAD90C]/20 bg-[#FAD90C]/10 p-4">
          <p className="text-xs leading-6 text-white/70">
            Final pricing will be confirmed after consultation.
          </p>
        </div>
      </div>


      {!showGuestForm && (
        <button
          onClick={() => setShowQuoteModal(true)}
          className="mt-4 w-full rounded-xl bg-[#FAD90C] py-4 text-sm font-semibold uppercase tracking-wider text-[#0B0B0B]"
        >
          Request Quote
        </button>
      )}


      {showGuestForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-4 flex flex-col gap-4 rounded-2xl border border-[#EAE6DD] bg-white p-7"
        >
          <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#0B0B0B]">
            Your Details
          </div>


          <input
            placeholder="Full Name"
            required
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="rounded-lg border border-[#EAE6DD] bg-[#F8F6F2] px-4 py-3 text-sm outline-none"
          />


          <input
            placeholder="Email Address"
            required
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            className="rounded-lg border border-[#EAE6DD] bg-[#F8F6F2] px-4 py-3 text-sm outline-none"
          />


          <input
            placeholder="Phone / WhatsApp"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value,
              })
            }
            className="rounded-lg border border-[#EAE6DD] bg-[#F8F6F2] px-4 py-3 text-sm outline-none"
          />


          <textarea
            placeholder="Additional notes"
            rows={3}
            value={customerNotes}
            onChange={(e) => setCustomerNotes(e.target.value)}
            className="rounded-lg border border-[#EAE6DD] bg-[#F8F6F2] px-4 py-3 text-sm outline-none"
          />


          <button
            disabled={submitting}
            className="rounded-lg bg-[#0B0B0B] py-4 text-xs font-bold uppercase tracking-wider text-[#FAD90C]"
          >
            {submitting ? "Submitting..." : "Submit Quote Request"}
          </button>
        </form>
      )}


      <QuoteChoiceModal
        open={showQuoteModal}
        onClose={() => setShowQuoteModal(false)}
        onContinueAsGuest={() => {
          setShowQuoteModal(false);
          setShowGuestForm(true);
        }}
      />


      <p className="mt-4 text-center text-xs text-[#888]">
        No payment required. We'll contact you within 24–48 hours.
      </p>
    </div>
  );
};

export default QuoteSummary;