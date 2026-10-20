"use client";

import { QuoteItem } from "@/types/website";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { X, Minus, Plus, Trash, Loader2, ShoppingBag } from "lucide-react";

import { useSession } from "@/hooks/useSession";
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
} from "@/hooks/useCartMutation";
import EmptyCartState from "@/views/cart/EmptyCart";
import QuotePageSkeleton from "@/views/cart/CartSkeleton";


const CartSidebar = () => {
  const router = useRouter();
  const { session, isLoading: isSessionLoading } = useSession();

  const [open, setOpen] = useState(false);
  const [guestItems, setGuestItems] = useState<QuoteItem[]>([]);

  /*
   * Guest cart
   */
  useEffect(() => {
    if (session || isSessionLoading) return;

    const loadGuestCart = () => {
      setGuestItems(getGuestCart());
    };

    loadGuestCart();

    window.addEventListener("storage", loadGuestCart);
    window.addEventListener("guest-cart-updated", loadGuestCart);

    return () => {
      window.removeEventListener("storage", loadGuestCart);
      window.removeEventListener("guest-cart-updated", loadGuestCart);
    };
  }, [session, isSessionLoading]);

  /*
   * Logged-in cart
   */
  const { data, isLoading: isCartLoading } = useQuery({
    queryKey: ["my-quotes"],
    queryFn: () => authQuery("/api/cart"),
    enabled: !!session,
  });

  const updateQuantityMutation = useUpdateCartItemQuantity();
  const removeItemMutation = useRemoveCartItem();

  const items: QuoteItem[] = session
    ? data?.data?.items ?? []
    : guestItems;

  const isLoading =
    isSessionLoading || (session ? isCartLoading : false);

  const total = items.reduce(
    (acc, item) =>
      acc + item.unitPriceSnapshot * item.quantity,
    0
  );

  const totalQuantity = items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const fmt = (value: number) =>
    `₦${value.toLocaleString()}`;

  /*
   * Quantity
   */
  const handleUpdateQuantity = (
    item: QuoteItem,
    quantity: number
  ) => {
    if (quantity < 1) return;

    if (session) {
      updateQuantityMutation.mutate({
        id: item.id,
        quantity,
      });

      return;
    }

    setGuestItems(
      updateGuestCartItemQuantity(
        getItemKey(item),
        quantity
      )
    );
  };

  /*
   * Remove
   */
  const handleRemoveItem = (item: QuoteItem) => {
    if (session) {
      removeItemMutation.mutate(item.id);
      return;
    }

    setGuestItems(
      removeGuestCartItem(getItemKey(item))
    );
  };

  /*
   * Open sidebar
   */
  const openSidebar = () => {
    setOpen(true);
  };

  /*
   * Close sidebar
   */
  const closeSidebar = () => {
    setOpen(false);
  };

  /*
   * Open from anywhere on the page by dispatching:
   *
   * window.dispatchEvent(new Event("open-cart-sidebar"));
   */
  useEffect(() => {
    const handleOpen = () => {
      setOpen(true);
    };

    window.addEventListener(
      "open-cart-sidebar",
      handleOpen
    );

    return () => {
      window.removeEventListener(
        "open-cart-sidebar",
        handleOpen
      );
    };
  }, []);

  /*
   * Prevent background scrolling while open
   */
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Cart trigger */}
      <button
        type="button"
        onClick={openSidebar}
        className="relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-off-white"
      >
        <ShoppingBag size={19} />

        {totalQuantity > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[9px] font-bold text-near-black">
            {totalQuantity}
          </span>
        )}
      </button>

      {/* Overlay */}
      <div
        onClick={closeSidebar}
        className={`fixed inset-0 z-[9998] bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed right-0 top-0 z-[9999] flex h-dvh w-full max-w-[430px] flex-col bg-[#F8F6F2] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-white px-6 py-5">
          <div>
            <h2 className="font-display text-xl font-bold text-near-black">
              Your Bag
            </h2>

            <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-[#999]">
              {totalQuantity}{" "}
              {totalQuantity === 1 ? "item" : "items"}
            </p>
          </div>

          <button
            type="button"
            onClick={closeSidebar}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white transition-colors hover:bg-off-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <QuotePageSkeleton  />
            </div>
          ) : items.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <EmptyCartState />
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={`${item.id ?? item.productId}-${index}`}
                  className="overflow-hidden rounded-xl border border-border bg-white"
                >
                  <div className="flex gap-4 p-4">
                    {/* Image */}
                    <div className="h-28 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-off-white">
                      <img
                        src={item.imageUrlSnapshot}
                        alt={item.productNameSnapshot}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div>
                        <h3 className="line-clamp-2 font-display text-sm font-bold text-near-black">
                          {item.productNameSnapshot}
                        </h3>

                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {item.selectedMaterial && (
                            <span className="rounded bg-off-white px-2 py-1 text-[9px] text-[#666]">
                              {item.selectedMaterial}
                            </span>
                          )}

                          {item.selectedColor && (
                            <span className="flex items-center gap-1 rounded bg-off-white px-2 py-1 text-[9px] text-[#666]">
                              <span
                                className="h-1.5 w-1.5 rounded-full border border-black/10"
                                style={{
                                  backgroundColor:
                                    item.selectedColor,
                                }}
                              />

                              {item.selectedColor}
                            </span>
                          )}

                          {/* {item. && (
                            <span className="rounded bg-off-white px-2 py-1 text-[9px] text-[#666]">
                              EU {item.selectedSize}
                            </span>
                          )} */}
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-3">
                        {/* Quantity */}
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            disabled={item.quantity <= 1}
                            onClick={() =>
                              handleUpdateQuantity(
                                item,
                                item.quantity - 1
                              )
                            }
                            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded border border-[black] disabled:opacity-40"
                          >
                            <Minus size={12}  color="black"/>
                          </button>

                          <span className="min-w-4 text-center text-xs text-black font-bold">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              handleUpdateQuantity(
                                item,
                                item.quantity + 1
                              )
                            }
                            className="flex h-7 w-7 items-center cursor-pointer justify-center rounded border border-black"
                          >
                            <Plus size={12} color="black" />
                          </button>
                        </div>

                        {/* Price */}
                        <p className="font-display text-sm font-bold text-near-black">
                          {fmt(
                            item.unitPriceSnapshot *
                              item.quantity
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveItem(item)
                      }
                      disabled={
                        removeItemMutation.isPending
                      }
                      className="flex h-7 w-7 flex-shrink-0 items-center justify-center self-start rounded text-red-500 transition-colors hover:bg-red-50 disabled:opacity-40"
                    >
                      {removeItemMutation.isPending ? (
                        <Loader2
                          size={13}
                          className="animate-spin"
                        />
                      ) : (
                        <Trash size={13} />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {!isLoading && items.length > 0 && (
          <div className="border-t border-border bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#999]">
                Total
              </span>

              <span className="font-display text-xl font-bold text-near-black">
                {fmt(total)}
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                closeSidebar();
                router.push("/cart");
              }}
              className="w-full rounded-xl bg-near-black py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-gold transition-colors hover:bg-gold hover:text-near-black"
            >
              View Bag
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default CartSidebar;
