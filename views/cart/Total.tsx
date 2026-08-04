"use client";

import { QuoteItem } from "@/types/website";
import { useState } from "react";
import QuoteChoiceModal from "./QuotesRequestModal";
import { supabase } from "@/lib/supabase";
import { useCreateQuote } from "@/hooks/useCreateQuotes";
import { Loader2 } from "lucide-react";
import SuccessModal from "@/components/ui/modals/SuccesModal";
interface Props {
  items: QuoteItem[];
  total: number;
  fmt: (value: number) => string;
  customerNotes: string;
  onCustomerNotesChange: (value: string) => void;
  onSubmitLoggedInQuote?: () => Promise<unknown>;
  isSubmittingLoggedInQuote: boolean;
}

const QuoteSummary = ({
  items,
  total,
  fmt,
  customerNotes,
  onCustomerNotesChange,
  onSubmitLoggedInQuote,
  isSubmittingLoggedInQuote,
}: Props) => {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showGuestForm, setShowGuestForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const { mutate: createQuote, isPending } = useCreateQuote();
  const submitLoggedInQuote = async () => {
    if (!onSubmitLoggedInQuote) return;

    try {
      await onSubmitLoggedInQuote();
      setShowSuccess(true);
    } catch (error) {
      console.error("Quote failed", error);
    }
  };

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      guestName: form.name,
      guestEmail: form.email,
      guestPhone: form.phone,
      customerNotes,
      items: items.map((item) => ({
        productId: item.productId,
        productNameSnapshot: item.productNameSnapshot,
        variantLabelSnapshot: item.variantLabelSnapshot,
        imageUrlSnapshot: item.imageUrlSnapshot,
        materialNameSnapshot: item.materialNameSnapshot,
        colorNameSnapshot: item.colorNameSnapshot,
        quantity: item.quantity,
        unitPriceSnapshot: item.unitPriceSnapshot,
        customNotes: item.customNotes || "",
      })),
    };

    setSubmitting(true);
    createQuote(payload, {
      onSuccess: () => {
        localStorage.removeItem("sbs-quote");
        localStorage.removeItem("sbs-customer-notes");
        setShowGuestForm(false);
        setShowSuccess(true);
      },
      onError: (error) => {
        console.error("Quote failed", error);
      },
      onSettled: () => setSubmitting(false),
    });
  };

  return (
    <div className="sticky top-24">
      <div className="rounded-2xl bg-[#0B0B0B] p-8">
        <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#FAD90C]">
          Quote Summary
        </h3>

        <div className="mt-6 space-y-4">
          {items.map((item,idx) => (
            <div
              key={`${item.productId}-${item.colorNameSnapshot}-${idx}`}
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

                  {/* {item.customMeasurements && (
                    <p className="mt-2 text-xs text-white/50">
                      Measurement:{" "}
                      {typeof item.customMeasurements === "string"
                        ? item.customMeasurements
                        : JSON.stringify(item.customMeasurements)}
                    </p>
                  )} */}

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
       onClick={async () => {
     
         const {
           data: {
             session
           }
         } = await supabase.auth.getSession();
         if(session){
           submitLoggedInQuote();
           return;
         }
         setShowQuoteModal(true);
     
       }}
       className="mt-4 w-full flex items-center justify-center rounded-xl bg-[#FAD90C] py-4 text-sm font-semibold uppercase tracking-wider text-[#0B0B0B]"
     >
       {isPending || isSubmittingLoggedInQuote ? <Loader2 className="animate-spin text-white"/> : "Request a Quote"}
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
            onChange={(e) => onCustomerNotesChange(e.target.value)}
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
        items={items}
      />
      <SuccessModal
  open={showSuccess}
  onOpenChange={setShowSuccess}
  title="Quote Submitted!"
  description="Your quote request has been received. We'll review it and contact you shortly."
/>

      <p className="mt-4 text-center text-xs text-[#888]">
        No payment required. We&apos;ll contact you within 24–48 hours.
      </p>
    </div>
  );
};

export default QuoteSummary;
