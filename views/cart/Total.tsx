"use client";

import { QuoteItem } from "@/types/website";
import { useState } from "react";
import { useRouter } from "next/navigation";
import QuoteChoiceModal from "./QuotesRequestModal";
import { supabase } from "@/lib/supabase";

interface Props {
  items: QuoteItem[];
  total: number;
  fmt: (value: number) => string;
}

const QuoteSummary = ({ items, total, fmt }: Props) => {
  const router = useRouter();
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [checkingSession, setCheckingSession] = useState(false);

  const handleCheckoutClick = async () => {
    setCheckingSession(true);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    setCheckingSession(false);

    if (session) {
      router.push("/checkout");
      return;
    }

    setShowQuoteModal(true);
  };

  return (
    <div className="sticky top-24 ">
      <div className="rounded-2xl mt-4 lg:mt-0 bg-near-black p-8">
        <h3 className="text-xs font-bold uppercase tracking-[0.16em]  text-gold">
          Quote Summary
        </h3>

        <div className="mt-6 space-y-4">
          {items.map((item, idx) => (
            <div
              key={`${item.productId}-${item.selectedColor}-${idx}`}
              className="border-b border-white/10 pb-4"
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-white">{item.productNameSnapshot}</p>
                  <p className="mt-1 text-xs text-white/50">
                    {item.selectedColor} • Qty {item.quantity}
                  </p>
                  {item.customNotes && (
                    <p className="text-xs text-white/50">
                      Note: {item.customNotes}
                    </p>
                  )}
                </div>
                <span className="font-semibold  text-gold">
                  {fmt(item.unitPriceSnapshot * item.quantity)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-gold/20 pt-6">
          <span className="text-xs font-bold uppercase tracking-wider text-white/60">
            Estimated Total
          </span>
          <span className="font-display text-3xl font-bold  text-gold">
            {fmt(total)}
          </span>
        </div>

        <div className="mt-6 rounded-lg border border-gold/20 bg-gold/10 p-4">
          <p className="text-xs leading-6 text-white/70">
            Final pricing will be confirmed after consultation.
          </p>
        </div>
      </div>

      <button
        onClick={handleCheckoutClick}
        disabled={checkingSession}
        className="mt-4 flex w-full items-center justify-center rounded-xl bg-gold py-4 text-sm font-semibold uppercase tracking-wider text-near-black disabled:opacity-50"
      >
        Checkout
      </button>

      <QuoteChoiceModal
        open={showQuoteModal}
        onClose={() => setShowQuoteModal(false)}
        onContinueAsGuest={() => router.push("/checkout")}
        items={items}
      />

      <p className="mt-4 text-center text-xs text-[#888]">
        No payment required. We&apos;ll contact you within 24–48 hours.
      </p>
    </div>
  );
};

export default QuoteSummary;