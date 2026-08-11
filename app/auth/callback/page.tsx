"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { getGuestCart, clearGuestCart } from "@/services/guest-cart";
import { useCreateCartMutation } from "@/providers/mutations/carts";

export default function Callback() {
  const router = useRouter();
  const { mutateAsync: createCart } = useCreateCartMutation();
  const [isMerging, setIsMerging] = useState(false);

  useEffect(() => {
    const handleAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/");
        return;
      }

      const guestItems = getGuestCart();

      if (guestItems.length > 0) {
        setIsMerging(true);

        try {
          await Promise.all(
            guestItems.map((item) =>
              createCart({
                productId: item.productId,
                productNameSnapshot: item.productNameSnapshot,
                imageUrlSnapshot: item.imageUrlSnapshot,
                quantity: item.quantity,
                selectedSize: item.selectedSize,
                selectedColor: item.selectedColor,
                selectedMaterial: item.selectedMaterial,
                unitPriceSnapshot: item.unitPriceSnapshot,
              })
            )
          );

          clearGuestCart();
        } catch (error) {
          console.error(error);
          toast.error("Some saved items couldn't be added to your cart");
          // Guest items stay in localStorage so nothing's lost — they'll
          // be retried on the next successful merge attempt.
        } finally {
          setIsMerging(false);
        }
      }

      let redirectPath = localStorage.getItem("auth_redirect") || "/";

      if (redirectPath === "/custom") {
        redirectPath = `/custom?step=7`;
      }

      router.replace(redirectPath);
      toast.success("User logged in successfully");
    };

    handleAuth();
  }, [router]);

  return (
    <p className="flex min-h-screen items-center justify-center">
      {isMerging ? "Syncing your saved items..." : "Signing you in..."}
    </p>
  );
}