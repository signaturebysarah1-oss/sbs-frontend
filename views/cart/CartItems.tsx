"use client";

import { QuoteItem } from "@/types/website";
import { useEffect, useState } from "react";
import EmptyCartState from "./EmptyCart";
import QuoteSummary from "./Total";
import Container from "@/components/ui/shared/Container";
import Link from "next/link";
import { useSession } from "@/hooks/useSession";
import { useQuery } from "@tanstack/react-query";
import { authQuery } from "@/providers/query";
import {
  getGuestCart,
  getItemKey,
  removeGuestCartItem,
  updateGuestCartItemQuantity,
} from "@/services/guest-items";
import {
  useRemoveCartItem,
  useUpdateCartItemQuantity,
  useSubmitCart,
} from "@/hooks/useCartMutation";
import { Loader2, Minus, Plus, Trash } from "lucide-react";
import QuotePageSkeleton from "./CartSkeleton";

const QuotePage = () => {
  const { session, isLoading: isSessionLoading } = useSession();
  const [guestItems, setGuestItems] = useState<QuoteItem[]>([]);

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
  const { data, isLoading: isCartLoading } = useQuery({
    queryKey: ["my-quotes"],
    queryFn: () => authQuery("/api/cart"),
    enabled: !!session,
  });

  const updateQuantityMutation = useUpdateCartItemQuantity();
  const removeItemMutation = useRemoveCartItem();

  const items: QuoteItem[] = session ? data?.data.items ?? [] : guestItems;
  const isLoading = isSessionLoading || (session ? isCartLoading : false);

  const fmt = (value: number) => `₦${value.toLocaleString()}`;
  const total = items.reduce(
    (acc, item) => acc + item.unitPriceSnapshot * item.quantity,
    0
  );

  const handleUpdateQuantity = (item: QuoteItem, quantity: number) => {
    if (session) {
      updateQuantityMutation.mutate({ id: item.id, quantity });
      return;
    }

    setGuestItems(updateGuestCartItemQuantity(getItemKey(item), quantity));
  };

  const handleRemoveItem = (item: QuoteItem) => {
    if (session) {
      removeItemMutation.mutate(item.id);
      return;
    }

    setGuestItems(removeGuestCartItem(getItemKey(item)));
  };

  if (isLoading) {
    return (
      <div className="bg-off-white px-5 py-10 lg:px-10">
        <Container>
          <QuotePageSkeleton />
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-off-white px-5 py-10 lg:px-10">
      <Container
        className={items.length > 0 ? "lg:flex justify-between gap-10" : ""}
      >
        <div className="flex flex-col gap-4">
          <div className="mb-2 flex-col lg:flex-row flex items-center justify-between">
            <h2 className="font-display text-[22px] font-bold text-near-black">
              Selected Pieces{" "}
              <span className="font-sans text-sm font-normal text-[#999]">
                ({items.length})
              </span>
            </h2>

            <Link
              href="/product"
              className="font-sans text-[11px] font-semibold uppercase tracking-widest text-[#927f04] underline"
            >
              + Continue Shopping
            </Link>
          </div>

          {items.length === 0 ? (
            <div className="w-full">
              <EmptyCartState />
            </div>
          ) : (
            items.map((item: QuoteItem, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="overflow-hidden rounded-2xl border border-border bg-white"
              >
                <div className="flex flex-col lg:flex-row">
                  <img
                    src={item.imageUrlSnapshot}
                    alt={item.productNameSnapshot}
                    className="w-full lg:w-50 h-60 lg:h-full object-cover"
                  />

                  <div className="lg:flex flex-1 justify-between gap-6 p-6">
                    <div className="flex-1">
                      <h3 className="font-display text-sm lg:text-xl font-bold">
                        {item.productNameSnapshot}
                      </h3>

                      <div className="mt-3 flex gap-2">
                        <span className="rounded bg-off-white px-3 py-1 text-xs">
                          {item.selectedMaterial}
                        </span>

                        <span className="rounded bg-off-white flex items-center justify-center gap-1 px-3 py-1 text-xs">
                          <div
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: item.selectedColor }}
                          />
                          {item.selectedColor}{" "}
                        </span>
                      </div>

                      <div className="mt-4 flex items-center gap-3">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item, item.quantity - 1)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded border"
                        >
                          <Minus size={14} />
                        </button>

                        <span className="font-bold">
                          {updateQuantityMutation.isPending ? (
                            <Loader2 className="animate-spin" />
                          ) : (
                            item.quantity
                          )}
                        </span>

                        <button
                          onClick={() =>
                            handleUpdateQuantity(item, item.quantity + 1)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded border"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-row  items-center lg:flex-col mt-2 lg:mt-0 lg:items-end justify-between">
                      <p className="font-display text-2xl font-bold">
                        {fmt(item.unitPriceSnapshot * item.quantity)}
                      </p>

                      <button
                        onClick={() => handleRemoveItem(item)}
                        disabled={removeItemMutation.isPending}
                        className="flex w-fit lg:w-full mt-2 lg:mt-0 items-center gap-1 rounded border px-3 py-2 text-xs text-red-600 disabled:opacity-50"
                      >
                        <Trash size={13} />
                        {removeItemMutation.isPending ? <Loader2 className="animate-spin"/> : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <QuoteSummary
            items={items}
            total={total}
            fmt={fmt}
          />
        )}
      </Container>
    </div>
  );
};

export default QuotePage;