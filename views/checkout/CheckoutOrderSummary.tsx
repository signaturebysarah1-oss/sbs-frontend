"use client";

import { QuoteItem } from "@/types/website";

interface Props {
  items: QuoteItem[];
  total: number;
  fmt: (value: number) => string;
}

const CheckoutOrderSummary = ({ items, total, fmt }: Props) => {
  return (
    <div className="sticky top-24 rounded-[20px] bg-near-black p-7 lg:p-9">
      <div className="mb-7">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold">
          Your Order
        </p>

        <h2 className="mt-2 font-display text-2xl font-bold text-white">
          Order Summary
        </h2>
      </div>

      <div className="space-y-5">
        {items.map((item, index) => (
          <div
            key={`${item.productId}-${item.selectedColor}-${index}`}
            className="flex gap-4 border-b border-white/10 pb-5"
          >
            <img
              src={item.imageUrlSnapshot}
              alt={item.productNameSnapshot}
              className="h-20 w-20 rounded-xl object-cover"
            />

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-white">
                {item.productNameSnapshot}
              </p>

              <p className="mt-1 text-xs text-white/40">
                {item.selectedColor} · Qty {item.quantity}
              </p>

              {item.selectedMaterial && (
                <p className="mt-1 text-xs text-white/40">
                  {item.selectedMaterial}
                </p>
              )}

              <p className="mt-2 text-sm font-semibold text-gold">
                {fmt(item.unitPriceSnapshot * item.quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-7 flex items-end justify-between border-t border-gold/20 pt-6">
        <span className="text-xs font-bold uppercase tracking-wider text-white/50">
          Total
        </span>

        <span className="font-display text-3xl font-bold text-gold">
          {fmt(total)}
        </span>
      </div>

      <p className="mt-5 text-xs leading-6 text-white/40">
        Your order will only be processed after payment has been verified.
      </p>
    </div>
  );
};

export default CheckoutOrderSummary;