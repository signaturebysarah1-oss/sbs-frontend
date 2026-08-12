"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import Container from "@/components/ui/shared/Container";
import SuccessModal from "@/components/ui/modals/SuccesModal";
import { useSession } from "@/hooks/useSession";
import { authQuery } from "@/providers/query";
import { QuoteItem } from "@/types/website";
import { getGuestCart, clearGuestCart } from "@/services/guest-items";
import { useSubmitCart } from "@/hooks/useCartMutation";
import { useCreateQuote } from "@/hooks/useCreateQuotes";

import CheckoutCustomerForm from "./CheckoutCustomerForm";
import CheckoutContactMethod from "./CheckoutContactMethod";
import CheckoutDeliveryForm from "./CheckoutDeliveryForm";
import CheckoutPayment from "./CheckoutPayment";
import CheckoutPaymentEvidence from "./CheckoutPaymentEvidence";
import CheckoutOrderSummary from "./CheckoutOrderSummary";

const CheckoutPage = () => {
  const router = useRouter();

  const { session, isLoading: isSessionLoading } = useSession();

  const [guestItems, setGuestItems] = useState<QuoteItem[]>([]);

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [delivery, setDelivery] = useState({
    address: "",
    city: "",
    state: "",
    country: "Nigeria",
  });

  const [contactMethod, setContactMethod] = useState<
    "email" | "whatsapp" | null
  >(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentEvidenceUrl, setPaymentEvidenceUrl] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const { mutate: createQuote, isPending: isCreatingQuote } = useCreateQuote();
  const submitCartMutation = useSubmitCart();
  const submitting = isCreatingQuote || submitCartMutation.isPending;

  const { data: profileData } = useQuery({
    queryKey: ["auth-me"],
    queryFn: () => authQuery("/api/auth/me"),
    enabled: !!session,
  });

  const { data: cartData, isLoading: isCartLoading } = useQuery({
    queryKey: ["my-quotes"],
    queryFn: () => authQuery("/api/cart"),
    enabled: !!session,
  });

  useEffect(() => {
    if (session || isSessionLoading) return;

    const loadGuestCart = () => setGuestItems(getGuestCart());

    loadGuestCart();
    window.addEventListener("storage", loadGuestCart);
    window.addEventListener("guest-cart-updated", loadGuestCart);

    return () => {
      window.removeEventListener("storage", loadGuestCart);
      window.removeEventListener("guest-cart-updated", loadGuestCart);
    };
  }, [session, isSessionLoading]);

  useEffect(() => {
    if (!session) return;

    const profile = profileData?.data;

    if (!profile) return;

    setCustomer({
      name: profile.name ?? "",
      email: profile.email ?? "",
      phone: profile.phone ?? "",
    });
  }, [profileData, session]);

  const items: QuoteItem[] = session ? cartData?.data?.items ?? [] : guestItems;

  const total = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + item.unitPriceSnapshot * item.quantity,
        0
      ),
    [items]
  );

  const fmt = (value: number) => `₦${value.toLocaleString()}`;

  const existingPhone = profileData?.data?.phone ?? null;

  const contactIsValid = session
    ? contactMethod !== null &&
      (contactMethod !== "whatsapp" ||
        !!existingPhone ||
        phoneNumber.trim().length > 7)
    : true;

  const isComplete =
    customer.email.trim() &&
    // customer.phone.trim() &&
    delivery.address.trim() &&
    delivery.city.trim() &&
    delivery.state.trim() &&
    delivery.country.trim() &&
    paymentEvidenceUrl &&
    contactIsValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isComplete) return;

    if (session) {
      submitCartMutation.mutate(
        {
          contactMethod: contactMethod!,
          ...(contactMethod === "whatsapp" && !existingPhone
            ? { phoneNumber: phoneNumber.trim() }
            : {}),
        },
        {
          onSuccess: () => {
            setShowSuccess(true);
            setTimeout(() => {
              router.push("/product");
            }, 5000);
          },
          onError: (error) => {
            console.error("Checkout failed", error);
          },
        }
      );
      return;
    }

    const payload = {
      guestName: customer.name,
      guestEmail: customer.email,
      guestPhone: customer.phone,
      items: items.map((item) => ({
        productId: item.productId,
        productNameSnapshot: item.productNameSnapshot,
        imageUrlSnapshot: item.imageUrlSnapshot,
        selectedMaterial: item.selectedMaterial,
        selectedColor: item.selectedColor,
        quantity: item.quantity,
        unitPriceSnapshot: item.unitPriceSnapshot,
        customNotes: item.customNotes || "",
      })),
    };

    createQuote(payload, {
      onSuccess: () => {
        clearGuestCart();
        setShowSuccess(true);
        setTimeout(() => {
          router.push("/product");
        }, 5000);
      },
      onError: (error) => {
        console.error("Checkout failed", error);
      },
    });
  };

  if (isSessionLoading || (session && isCartLoading)) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loader2 className="animate-spin text-gold" />
      </div>
    );
  }

  return (
    <>
      <Container>
        <div className="pb-10 lg:pt-30 lg:pb-16">
          <div className="mb-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#927f04]">
              Checkout
            </p>

            <h1 className="mt-2 font-display text-4xl font-bold text-near-black lg:text-5xl">
              Complete Your Order
            </h1>

            <p className="mt-3 text-sm text-[#888]">
              Complete your details and payment information to submit your
              order.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid items-start gap-10 lg:grid-cols-[1fr_400px]">
              <div className="space-y-6">
                <CheckoutCustomerForm
                  name={customer.name}
                  email={customer.email}
                  phone={customer.phone}
                  disabled={!!session}
                  onChange={(field, value) =>
                    setCustomer((prev) => ({
                      ...prev,
                      [field]: value,
                    }))
                  }
                />

                {session && (
                  <CheckoutContactMethod
                    contactMethod={contactMethod}
                    phoneNumber={phoneNumber}
                    existingPhone={existingPhone}
                    onChange={setContactMethod}
                    onPhoneChange={setPhoneNumber}
                  />
                )}

                <CheckoutDeliveryForm
                  delivery={delivery}
                  onChange={(field, value) =>
                    setDelivery((prev) => ({
                      ...prev,
                      [field]: value,
                    }))
                  }
                />

                <CheckoutPayment onReceiptReceived={setPaymentEvidenceUrl} />
                <CheckoutPaymentEvidence
                  value={paymentEvidenceUrl}
                  onChange={setPaymentEvidenceUrl}
                />

                <button
                  type="submit"
                  disabled={!isComplete || submitting}
                  className="flex w-full cursor-pointer items-center justify-center rounded-xl bg-near-black py-5 text-sm font-bold uppercase tracking-[0.12em] text-gold transition disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 animate-spin" size={18} />
                      Submitting Order...
                    </>
                  ) : (
                    "Submit Order"
                  )}
                </button>
              </div>

              <CheckoutOrderSummary items={items} total={total} fmt={fmt} />
            </div>
          </form>
        </div>
      </Container>

      <SuccessModal
        open={showSuccess}
        onOpenChange={setShowSuccess}
        title="Order Submitted!"
        description="Your order has been received. We'll verify your payment and contact you shortly."
      />
    </>
  );
};

export default CheckoutPage;
