"use client";

import { useEffect, useState } from "react";
import { Loader2, Upload, CheckCircle2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import Container from "@/components/ui/shared/Container";
import SuccessModal from "@/components/ui/modals/SuccesModal";
import { supabase } from "@/lib/supabase";
import { authQuery } from "@/providers/query";
import { useCreateQuote } from "@/hooks/useCreateQuotes";
import { clearGuestCart } from "@/services/guest-items";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";
import { CheckoutForm, QuoteItem } from "@/types/website";



const CheckoutPage = () => {
  const router = useRouter();
  const { mutate: createQuote, isPending: isCreatingQuote } =
    useCreateQuote();

  const [items, setItems] = useState<QuoteItem[]>([]);
  const [isLoadingItems, setIsLoadingItems] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  const [form, setForm] = useState<CheckoutForm>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    paymentReference: "",
  });

  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptUrl, setReceiptUrl] = useState("");

  const [isUploadingReceipt, setIsUploadingReceipt] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { data: profileData, isLoading: isProfileLoading } = useQuery({
    queryKey: ["auth-me"],
    queryFn: () => authQuery("/api/auth/me"),
    enabled: isLoggedIn,
  });

 

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setIsLoggedIn(!!session);
      setCheckingSession(false);
    };

    checkSession();
  }, []);

  /*
   * LOAD CART
   * Logged-in users:
   *   cart was already saved before authentication.
   *
   * Guests:
   *   QuoteChoiceModal saved guest-cart to localStorage.
   */

  useEffect(() => {
    if (checkingSession) return;

    const loadItems = async () => {
      try {
        if (isLoggedIn) {
          const response = await authQuery("/api/cart");

          setItems(response?.data?.items ?? []);
          return;
        }

        const storedGuestCart = localStorage.getItem("guest-cart");

        if (!storedGuestCart) {
          setItems([]);
          return;
        }

        const parsedItems = JSON.parse(storedGuestCart);

        setItems(Array.isArray(parsedItems) ? parsedItems : []);
      } catch (error) {
        console.error("Failed to load checkout items:", error);
        toast.error("Unable to load your selected items.");
      } finally {
        setIsLoadingItems(false);
      }
    };

    loadItems();
  }, [isLoggedIn, checkingSession]);

  /*
   * LAOD PROFILE
   */

  useEffect(() => {
    if (!isLoggedIn || !profileData?.data) return;

    const profile = profileData.data;

    setForm((current) => ({
      ...current,
      fullName:
        current.fullName ||
        profile.fullName ||
        profile.name ||
        "",
      email: current.email || profile.email || "",
      phone: current.phone || profile.phone || "",
    }));
  }, [isLoggedIn, profileData]);

  /*
   * TOTAL
   */

  const total = items.reduce(
    (acc, item) =>
      acc + item.unitPriceSnapshot * item.quantity,
    0
  );

  const fmt = (value: number) => `₦${value.toLocaleString()}`;

  /*
   * FORM
   */

  const updateField = (
    field: keyof CheckoutForm,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  /*
   * RECEIPT UPLOAD
   */

  const handleReceiptChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "application/pdf",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error(
        "Please upload a receipt, screenshot, or PDF."
      );

      e.target.value = "";
      return;
    }


    if (file.size > 10 * 1024 * 1024) {
      toast.error("Payment evidence must be less than 10MB.");

      e.target.value = "";
      return;
    }

    setReceiptFile(file);
    setReceiptUrl("");

    try {
      setIsUploadingReceipt(true);

      const url = await uploadToCloudinary(file);

      setReceiptUrl(url);

      toast.success("Payment evidence uploaded.");
    } catch (error) {
      console.error("Receipt upload failed:", error);

      setReceiptFile(null);
      setReceiptUrl("");

      toast.error(
        "Payment evidence upload failed. Please try again."
      );

      e.target.value = "";
    } finally {
      setIsUploadingReceipt(false);
    }
  };

  const removeReceipt = () => {
    setReceiptFile(null);
    setReceiptUrl("");
  };

  /*
   * VALIDATION
   */

  const isFormComplete =
    form.fullName.trim().length > 0 &&
    form.email.trim().length > 0 &&
    form.phone.trim().length > 0 &&
    form.address.trim().length > 0 &&
    form.city.trim().length > 0 &&
    form.state.trim().length > 0 &&
    form.paymentReference.trim().length > 0 &&
    !!receiptFile &&
    !!receiptUrl &&
    !isUploadingReceipt &&
    items.length > 0;

  /*
   * SUBMIT
   */

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormComplete) {
      toast.error(
        "Please complete every field and upload your payment evidence."
      );
      return;
    }

    const payload = {
      ...(isLoggedIn
        ? {}
        : {
            guestName: form.fullName.trim(),
            guestEmail: form.email.trim(),
            guestPhone: form.phone.trim(),
          }),

      customerNotes: "",

      contactMethod: "email",

      phoneNumber: form.phone.trim(),

      deliveryAddress: {
        address: form.address.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
      },

      paymentReference: form.paymentReference.trim(),

      paymentEvidenceUrl: receiptUrl,

      items: items.map((item) => ({
        productId: item.productId,

        productNameSnapshot:
          item.productNameSnapshot,

        imageUrlSnapshot:
          item.imageUrlSnapshot,

        selectedMaterial:
          item.selectedMaterial,

        selectedColor:
          item.selectedColor,

        quantity: item.quantity,

        unitPriceSnapshot:
          item.unitPriceSnapshot,

        customNotes:
          item.customNotes || "",
      })),

      total,
    };

    createQuote(payload, {
      onSuccess: () => {
        /*
         * Guest cart cleanup.
         */

        if (!isLoggedIn) {
          clearGuestCart();
          localStorage.removeItem("guest-cart");
        }

        /*
         * Custom order cleanup if one exists.
         */

        // localStorage.removeItem("sbs-custom-order");

        setShowSuccess(true);
      },

      onError: (error) => {
        console.error("Quote submission failed:", error);

        toast.error(
          "We couldn't submit your quote. Please try again."
        );
      },
    });
  };

 

  if (
    checkingSession ||
    isLoadingItems ||
    (isLoggedIn && isProfileLoading)
  ) {
    return (
      <Container>
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gold" />
        </div>
      </Container>
    );
  }


  if (items.length === 0) {
    return (
      <Container>
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <h1 className="font-display text-3xl font-bold text-near-black">
            Your checkout is empty
          </h1>

          <p className="mt-3 text-sm text-[#777]">
            Add some products before proceeding to checkout.
          </p>

          <button
            onClick={() => router.push("/product")}
            className="mt-6 rounded-xl bg-near-black px-8 py-4 text-xs font-bold uppercase tracking-wider text-gold"
          >
            Continue Shopping
          </button>
        </div>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <div className="mx-auto max-w-7xl py-10 lg:py-16">
          {/* Header */}

          <div className="mb-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#927f04]">
              Checkout
            </p>

            <h1 className="mt-2 font-display text-4xl font-bold text-near-black lg:text-5xl">
              Complete Your Order
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#777]">
              Complete your delivery details and upload evidence
              of payment to submit your quote request.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid items-start gap-10 lg:grid-cols-[1fr_420px]"
          >
            {/* ==============================================================
                LEFT
            ============================================================== */}

            <div className="space-y-6">
              {/* Customer information */}

              <section className="rounded-2xl border border-border bg-white p-6 lg:p-8">
                <div className="mb-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#927f04]">
                    01
                  </p>

                  <h2 className="mt-1 font-display text-2xl font-bold text-near-black">
                    Customer Information
                  </h2>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-near-black">
                      Full Name *
                    </label>

                    <input
                      required
                      value={form.fullName}
                      onChange={(e) =>
                        updateField(
                          "fullName",
                          e.target.value
                        )
                      }
                      placeholder="Your full name"
                      className="w-full rounded-xl border border-border bg-off-white px-4 py-3 text-sm outline-none transition focus:border-near-black"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-near-black">
                      Email Address *
                    </label>

                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        updateField(
                          "email",
                          e.target.value
                        )
                      }
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-border bg-off-white px-4 py-3 text-sm outline-none transition focus:border-near-black"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-near-black">
                      Phone / WhatsApp *
                    </label>

                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        updateField(
                          "phone",
                          e.target.value
                        )
                      }
                      placeholder="+2348012345678"
                      className="w-full rounded-xl border border-border bg-off-white px-4 py-3 text-sm outline-none transition focus:border-near-black"
                    />
                  </div>
                </div>
              </section>

              {/* Delivery */}

              <section className="rounded-2xl border border-border bg-white p-6 lg:p-8">
                <div className="mb-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#927f04]">
                    02
                  </p>

                  <h2 className="mt-1 font-display text-2xl font-bold text-near-black">
                    Delivery Address
                  </h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-near-black">
                      Address *
                    </label>

                    <textarea
                      required
                      rows={3}
                      value={form.address}
                      onChange={(e) =>
                        updateField(
                          "address",
                          e.target.value
                        )
                      }
                      placeholder="Enter your full delivery address"
                      className="w-full resize-none rounded-xl border border-border bg-off-white px-4 py-3 text-sm outline-none transition focus:border-near-black"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-near-black">
                        City *
                      </label>

                      <input
                        required
                        value={form.city}
                        onChange={(e) =>
                          updateField(
                            "city",
                            e.target.value
                          )
                        }
                        placeholder="City"
                        className="w-full rounded-xl border border-border bg-off-white px-4 py-3 text-sm outline-none transition focus:border-near-black"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-near-black">
                        State *
                      </label>

                      <input
                        required
                        value={form.state}
                        onChange={(e) =>
                          updateField(
                            "state",
                            e.target.value
                          )
                        }
                        placeholder="State"
                        className="w-full rounded-xl border border-border bg-off-white px-4 py-3 text-sm outline-none transition focus:border-near-black"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Payment */}

              <section className="rounded-2xl border border-border bg-white p-6 lg:p-8">
                <div className="mb-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#927f04]">
                    03
                  </p>

                  <h2 className="mt-1 font-display text-2xl font-bold text-near-black">
                    Payment Evidence
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#777]">
                    Please make your payment using the payment
                    instructions provided by the brand, then
                    upload a receipt, screenshot, or other proof
                    of payment below.
                  </p>
                </div>

                <div className="rounded-xl border border-gold/20 bg-gold/10 p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-near-black">
                    Payment Required
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#666]">
                    Your order cannot be submitted without
                    evidence of payment.
                  </p>
                </div>

                <div className="mt-5">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-near-black">
                    Payment Reference *
                  </label>

                  <input
                    required
                    value={form.paymentReference}
                    onChange={(e) =>
                      updateField(
                        "paymentReference",
                        e.target.value
                      )
                    }
                    placeholder="Enter your payment reference"
                    className="w-full rounded-xl border border-border bg-off-white px-4 py-3 text-sm outline-none transition focus:border-near-black"
                  />
                </div>

                <div className="mt-5">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-near-black">
                    Evidence of Payment *
                  </label>

                  {!receiptFile ? (
                    <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-off-white px-6 py-10 text-center transition hover:border-gold">
                      <Upload className="h-7 w-7 text-[#927f04]" />

                      <p className="mt-3 text-sm font-semibold text-near-black">
                        Upload payment evidence
                      </p>

                      <p className="mt-1 text-xs text-[#888]">
                        Receipt, screenshot, or PDF
                      </p>

                      <p className="mt-1 text-[11px] text-[#aaa]">
                        Maximum 10MB
                      </p>

                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,application/pdf"
                        onChange={handleReceiptChange}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="rounded-xl border border-border bg-off-white p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100">
                          {isUploadingReceipt ? (
                            <Loader2 className="h-5 w-5 animate-spin text-green-700" />
                          ) : (
                            <CheckCircle2 className="h-5 w-5 text-green-700" />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-near-black">
                            {receiptFile.name}
                          </p>

                          <p className="mt-1 text-xs text-[#888]">
                            {isUploadingReceipt
                              ? "Uploading..."
                              : receiptUrl
                                ? "Payment evidence uploaded"
                                : "Upload failed"}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={removeReceipt}
                          disabled={isUploadingReceipt}
                          className="rounded-lg p-2 text-[#888] hover:bg-white disabled:opacity-50"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* ==============================================================
                RIGHT — ORDER SUMMARY
            ============================================================== */}

            <aside className="sticky top-6 rounded-2xl bg-near-black p-6 text-white lg:p-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gold">
                Order Summary
              </p>

              <h2 className="mt-2 font-display text-2xl font-bold">
                Your Selected Pieces
              </h2>

              <div className="mt-6 space-y-4">
                {items.map((item, index) => (
                  <div
                    key={`${item.productId}-${index}`}
                    className="flex gap-4 border-b border-white/10 pb-4"
                  >
                    <img
                      src={item.imageUrlSnapshot}
                      alt={item.productNameSnapshot}
                      className="h-20 w-20 rounded-lg object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold">
                        {item.productNameSnapshot}
                      </p>

                      <p className="mt-1 text-xs text-white/50">
                        {item.selectedMaterial || "—"}
                        {" • "}
                        {item.selectedColor || "—"}
                      </p>

                      <p className="mt-1 text-xs text-white/50">
                        Qty {item.quantity}
                      </p>

                      {item.customNotes && (
                        <p className="mt-1 text-xs text-white/50">
                          Note: {item.customNotes}
                        </p>
                      )}
                    </div>

                    <p className="shrink-0 text-sm font-semibold text-gold">
                      {fmt(
                        item.unitPriceSnapshot *
                          item.quantity
                      )}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-gold/20 pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-white/60">
                    Estimated Total
                  </span>

                  <span className="font-display text-3xl font-bold text-gold">
                    {fmt(total)}
                  </span>
                </div>

                <p className="mt-3 text-xs leading-5 text-white/50">
                  Final pricing will be confirmed after
                  consultation.
                </p>
              </div>

              <button
                type="submit"
                disabled={
                  !isFormComplete ||
                  isCreatingQuote ||
                  isUploadingReceipt
                }
                className="mt-7 flex w-full items-center justify-center rounded-xl bg-gold py-4 text-sm font-bold uppercase tracking-wider text-near-black transition disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isCreatingQuote ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : isUploadingReceipt ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Uploading Evidence...
                  </>
                ) : (
                  "Submit Order"
                )}
              </button>

              {!isFormComplete && (
                <p className="mt-3 text-center text-[11px] leading-5 text-white/40">
                  Complete all required fields and upload
                  evidence of payment before submitting.
                </p>
              )}

              <p className="mt-5 text-center text-xs leading-5 text-white/40">
                By submitting this order, you confirm that
                the information provided is correct and that
                payment has been made.
              </p>
            </aside>
          </form>
        </div>
      </Container>

      <SuccessModal
        open={showSuccess}
        onOpenChange={setShowSuccess}
        title="Order Submitted!"
        description="Your order has been received successfully. Our team will review your payment evidence and contact you shortly."
      />
    </>
  );
};

export default CheckoutPage;