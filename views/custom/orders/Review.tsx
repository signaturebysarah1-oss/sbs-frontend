"use client";

import SuccessModal from "@/components/ui/modals/SuccesModal";
import { supabase } from "@/lib/supabase";
import QuoteChoiceModal from "@/views/cart/QuotesRequestModal";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useCreateQuote } from "@/hooks/useCreateQuotes";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ExtraMeasurement {
  label: string;
  value: string;
}

interface CustomMeasurements {
  leftFront: string;
  rightFront: string;
  leftBack: string;
  rightBack: string;
  extra: ExtraMeasurement[];
}

interface ReviewSelections {
  collectionSlug?: string;
  productId?: string;
  productName?: string;
  imageUrlSnapshot?: string;
  unitPriceSnapshot?: number;
  material?: string;
  color?: string;
  sole?: string;
  toeStyleSnapshot?: string;
  initials?: string;
  size?: string;
  customMeasurements?: CustomMeasurements;
}

interface ReviewProps {
  selections: ReviewSelections;
  select: (key: string, value: any) => void;
}

const FALLBACK_PRICE = 185000;

const Review = ({ selections }: ReviewProps) => {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showGuestForm, setShowGuestForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const { mutate: createQuote, isPending } = useCreateQuote();

  const displayPrice = selections.unitPriceSnapshot || FALLBACK_PRICE;

  const buildQuotePayload = (isGuest = false) => {
    const storedOrder = localStorage.getItem("sbs-custom-order");
    const order: ReviewSelections = storedOrder
      ? JSON.parse(storedOrder)
      : selections;

    return {
      ...(isGuest && {
        guestName: form.name,
        guestEmail: form.email,
        guestPhone: form.phone,
      }),

      items: [
        {
          productId: order.productId,

          productNameSnapshot: order.productName || "Custom Shoe",

          imageUrlSnapshot: order.imageUrlSnapshot || "custom",

          shoeNameSnapshot: order.productName || "Custom Shoe",

          toeStyleSnapshot: order.toeStyleSnapshot || "custom",

          size: order.size || null,

          material: order.material || "custom",

          color: order.color || "custom",

          quantity: 1,

          unitPriceSnapshot: order.unitPriceSnapshot || FALLBACK_PRICE,

          customMeasurements: order.customMeasurements || {},

          customNotes: order.initials || "",
        },
      ],
    };
  };

  const submitLoggedInQuote = () => {
    const payload = buildQuotePayload();

    createQuote(payload, {
      onSuccess: () => {
        localStorage.removeItem("sbs-custom-order");
        setShowSuccess(true);
      
        setTimeout(() => {
          router.push("/custom?step=1");
          toast.success("Quote submitted successfully");
        }, 3000);
      },
      onError: (error) => {
        console.error("Quote failed", error);
      },
    });
  };

  const submitGuestQuote = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = buildQuotePayload(true);

    createQuote(payload, {
      onSuccess: () => {
        localStorage.removeItem("sbs-custom-order");
        setShowSuccess(true);
      
        setTimeout(() => {
          router.push("/custom?step=1");
          toast.success("Quote submitted successfully");
        }, 3000);
      },

      onError: (error) => {
        console.error("Quote failed", error);
      },
    });
  };

  const requestQuote = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      submitLoggedInQuote();
      return;
    }

    setShowQuoteModal(true);
  };

  const summary = [
    {
      label: "Style",
      value: selections.productName,
    },
    {
      label: "Material",
      value: selections.material,
    },
    {
      label: "Color",
      value: selections.color,
    },
    {
      label: "Toe Shape",
      value: selections.toeStyleSnapshot,
    },
    {
      label: "Size",
      value:
        selections.size ||
        (selections.customMeasurements ? "Custom Measurements" : "—"),
    },
  ];

  return (
    <div>
      <h2 className="mb-2 font-display text-4xl font-bold text-near-black">
        Review Your Order
      </h2>

      <p className="mb-10 text-sm text-[#888]">
        Your bespoke shoes, one final look before we begin crafting.
      </p>

      <div className="grid items-start gap-10 lg:grid-cols-2">
        <div className="rounded-[20px] bg-near-black p-9">
          <h3 className="mb-7 font-display text-xl font-semibold text-off-white">
            Order Summary
          </h3>

          {selections.imageUrlSnapshot && (
            <div className="mb-6 overflow-hidden rounded-xl">
              <img
                src={selections.imageUrlSnapshot}
                alt={selections.productName || "Selected shoe"}
                className="h-48 w-full object-cover"
              />
            </div>
          )}

          {summary.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between border-b border-white/10 py-3"
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/50">
                {item.label}
              </span>

              <span className="text-sm font-semibold capitalize  text-gold">
                {item.value || "—"}
              </span>
            </div>
          ))}

          <div className="mt-8 rounded-xl border border-gold/20 bg-gold/10 p-5">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em]  text-gold">
              Timeline
            </p>

            <h4 className="font-display text-lg font-semibold text-white">
              3–4 Weeks Production
            </h4>

            <p className="mt-1 text-sm text-white/60">
              + 5–10 Business Days Delivery
            </p>
          </div>
        </div>

        {/* Right */}

        <div>
          <div className="mb-5 rounded-[20px] border-2 border-border bg-off-white p-9">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#888]">
              Estimated Starting Price
            </p>

            <h2 className="font-display text-5xl font-bold tracking-tight text-near-black">
              ₦{displayPrice.toLocaleString()}
              <span className="text-xl text-[#888]">+</span>
            </h2>

            <p className="mt-2 text-sm text-[#888]">
              Final quote provided within 24 hours of request.
            </p>
          </div>

          {!showGuestForm && (
            <button
              onClick={requestQuote}
              disabled={isPending}
              className="mt-4 flex w-full items-center justify-center rounded-xl bg-gold py-4 text-sm font-semibold uppercase tracking-wider text-near-black"
            >
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Request a Quote"
              )}
            </button>
          )}

          {showGuestForm && (
            <form
              onSubmit={submitGuestQuote}
              className="mt-4 flex flex-col gap-4 rounded-2xl border border-border bg-white p-7"
            >
              <div className="text-xs font-bold uppercase tracking-[0.14em] text-near-black">
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
                className="rounded-lg border border-border bg-off-white px-4 py-3 text-sm outline-none"
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
                className="rounded-lg border border-border bg-off-white px-4 py-3 text-sm outline-none"
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
                className="rounded-lg border border-border bg-off-white px-4 py-3 text-sm outline-none"
              />

              <button
                disabled={isPending}
                className="rounded-lg bg-near-black py-4 text-xs font-bold uppercase tracking-wider  text-gold"
              >
                {isPending ? "Submitting..." : "Submit Quote Request"}
              </button>
            </form>
          )}

          <p className="mt-4 text-center text-xs leading-6 text-[#AAA]">
            No payment required. Our team will contact you within 24 hours to
            discuss your order, confirm pricing, and arrange payment.
          </p>

          <QuoteChoiceModal
            open={showQuoteModal}
            onClose={() => setShowQuoteModal(false)}
            onContinueAsGuest={() => {
              setShowQuoteModal(false);
              setShowGuestForm(true);
            }}
          />

          <SuccessModal
            open={showSuccess}
            onOpenChange={setShowSuccess}
            title="Quote Submitted!"
            description="Your quote request has been received. We'll review it and contact you shortly."
          />
        </div>
      </div>
    </div>
  );
};

export default Review;
