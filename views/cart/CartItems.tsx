"use client";

import { QuoteData, QuoteItem } from "@/types/website";
import { Edit, Minus, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import EmptyCartState from "./EmptyCart";
import QuoteSummary from "./Total";
import Container from "@/components/ui/shared/Container";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPendingQuote } from "@/providers/quoteQuery";
import { deleteQuoteItem, submitQuote, updateQuote } from "@/providers/quoteMutation";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";

const QUOTE_KEY = "sbs-quote";
const CUSTOMER_NOTES_KEY = "sbs-customer-notes";

const getItemKey = (item: QuoteItem) =>
  [
    item.productId,
    item.variantLabelSnapshot ?? "",
    item.materialNameSnapshot ?? "",
    item.colorNameSnapshot ?? "",
  ].join("-");

const readGuestItems = (): QuoteItem[] => {
  try {
    const stored = localStorage.getItem(QUOTE_KEY);
    return stored ? (JSON.parse(stored) as QuoteItem[]) : [];
  } catch {
    return [];
  }
};

const QuotePage = () => {
  const [guestItems, setGuestItems] = useState<QuoteItem[]>([]);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  
  const [measurements, setMeasurements] = useState("");
  const [customNotes, setCustomNotes] = useState("");
  
  const [customerNotes, setCustomerNotes] = useState("");
  
  const [session, setSession] = useState<Session | null>();
  const queryClient = useQueryClient();
  
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
  
      setSession(session);
    };
  
    checkSession();
  }, []);
  
  const pendingQuoteQueryKey = ["pending-quote", session?.user.id] as const;
  const { data: pendingQuote } = useQuery({
    queryKey: pendingQuoteQueryKey,
    queryFn: getPendingQuote,
    enabled: !!session,
  });

  useEffect(() => {
    if (session !== null) {
      return;
    }

    const loadGuestQuote = () => {
      setGuestItems(readGuestItems());
      setCustomerNotes(localStorage.getItem(CUSTOMER_NOTES_KEY) ?? "");
    };

    window.addEventListener("storage", loadGuestQuote);
    loadGuestQuote();

    return () => window.removeEventListener("storage", loadGuestQuote);
  }, [session]);

  useEffect(() => {
    if (session) {
      const syncCustomerNotes = () => {
        setCustomerNotes(pendingQuote?.customerNotes ?? "");
      };

      syncCustomerNotes();
    }
  }, [pendingQuote?.customerNotes, session]);

  const quoteUpdateMutation = useMutation({
    mutationFn: updateQuote,
    onMutate: (variables) => {
      queryClient.setQueryData<QuoteData | null>(pendingQuoteQueryKey, (quote) =>
        quote ? { ...quote, ...variables } : quote
      );
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: pendingQuoteQueryKey }),
    onError: () =>
      queryClient.invalidateQueries({ queryKey: pendingQuoteQueryKey }),
  });

  const quoteSubmitMutation = useMutation({
    mutationFn: submitQuote,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: pendingQuoteQueryKey }),
  });

  const quoteDeleteMutation = useMutation({
    mutationFn: deleteQuoteItem,
    onMutate: ({ items: updatedItems }) => {
      queryClient.setQueryData<QuoteData | null>(pendingQuoteQueryKey, (quote) =>
        quote ? { ...quote, items: updatedItems } : quote
      );
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: pendingQuoteQueryKey }),
    onError: () =>
      queryClient.invalidateQueries({ queryKey: pendingQuoteQueryKey }),
  });

  const items = session ? pendingQuote?.items ?? [] : guestItems;

  const persistGuestItems = (updatedItems: QuoteItem[]) => {
    setGuestItems(updatedItems);
    localStorage.setItem(QUOTE_KEY, JSON.stringify(updatedItems));
  };

  const updateItems = (updatedItems: QuoteItem[]) => {
    if (session && pendingQuote) {
      quoteUpdateMutation.mutate({ id: pendingQuote.id, items: updatedItems });
      return;
    }

    if (!session) {
      persistGuestItems(updatedItems);
    }
  };

  const removeItem = (item: QuoteItem) => {
    const index = items.indexOf(item);
    const updated = items.filter((_, itemIndex) => itemIndex !== index);

    if (session && pendingQuote) {
      quoteDeleteMutation.mutate({ id: pendingQuote.id, items: updated });
      return;
    }

    persistGuestItems(updated);
  };

  const updateQuantity = (item: QuoteItem, amount: number) => {
    const index = items.indexOf(item);
    const updated = items.map((quoteItem, itemIndex) => {
      if (itemIndex === index) {
        return {
          ...quoteItem,
          quantity: Math.max(
            1,
            quoteItem.quantity + amount
          ),
        };
      }
  
      return quoteItem;
    });
  
    updateItems(updated);
  };

  const openEdit = (item: QuoteItem) => {
    setEditingItem(getItemKey(item));
    setCustomNotes(item.customNotes || "");
  };

  const saveCustomization = (item: QuoteItem) => {
    const index = items.indexOf(item);
    const updated = items.map((quoteItem, itemIndex) => {
      if (itemIndex === index) {
        return {
          ...quoteItem,
          customNotes,
        };
      }
  
      return quoteItem;
    });
  
    updateItems(updated);
    setEditingItem(null);
  };

  const saveCustomerNotes = () => {
    if (session && pendingQuote) {
      quoteUpdateMutation.mutate({
        id: pendingQuote.id,
        customerNotes,
      });
      return;
    }

    if (!session) localStorage.setItem(CUSTOMER_NOTES_KEY, customerNotes);
  };

  const total = items.reduce(
    (acc, item) =>
      acc + item.unitPriceSnapshot * item.quantity,
    0
  );
  
  const fmt = (value: number) =>
    `₦${value.toLocaleString()}`;
  return (
    <div className="bg-[#F8F6F2] px-5 py-10 lg:px-10">
      <Container
        className={items.length > 0 ? "flex justify-between gap-10" : ""}
      >
       

        {" "}
        <div className="flex flex-col gap-4">

          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-display text-[22px] font-bold text-[#0B0B0B]">
              Selected Pieces{" "}
              <span className="font-sans text-sm font-normal text-[#999]">
                ({items.length})
              </span>
            </h2>

            <Link
              href="/products"
              className="font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-[#927f04] underline"
            >
              + Continue Shopping
            </Link>
          </div>

          {items.length === 0 ? (
            <div className="w-full">
              <EmptyCartState />
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.productId}-${item.colorNameSnapshot}`}
                className="overflow-hidden rounded-2xl border border-[#EAE6DD] bg-white"
              >
                <div className="flex">
                  <img
                    src={item.imageUrlSnapshot}
                    alt={item.productNameSnapshot}
                    className="w-50 object-cover"
                  />

                  <div className="flex flex-1 justify-between gap-6 p-6">
                    <div className="flex-1">
                      <h3 className="font-display text-xl font-bold">
                        {item.productNameSnapshot}
                      </h3>

                      <div className="mt-3 flex gap-2">
                        <span className="rounded bg-[#F8F6F2] px-3 py-1 text-xs">
                          {item.materialNameSnapshot}
                        </span>

                        <span className="rounded bg-[#F8F6F2] flex items-center justify-center gap-1 px-3 py-1 text-xs">
                          <div
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: item.colorNameSnapshot }}
                          />
                          {item.colorNameSnapshot}{" "}
                        </span>
                      </div>

                      <div className="mt-4 flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item, -1)}
                          className="flex h-8 w-8 items-center justify-center rounded border"
                        >
                          <Minus size={14} />
                        </button>

                        <span className="font-bold">{item.quantity}</span>

                        <button
                          onClick={() => updateQuantity(item, 1)}
                          className="flex h-8 w-8 items-center justify-center rounded border"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {editingItem === getItemKey(item) && (
                        <div className="mt-6 space-y-4">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="mb-2 block text-[11px] font-bold uppercase">
                                Measurements
                              </label>

                              <textarea
                                rows={4}
                                value={measurements}
                                onChange={(e) =>
                                  setMeasurements(e.target.value)
                                }
                                placeholder="Example: Width: 2cm, Length: 5cm"
                                className="w-full rounded-lg border border-[#EAE6DD] bg-[#F8F6F2] p-3 text-sm outline-none"
                              />
                            </div>

                            <div>
                              <label className="mb-2 block text-[11px] font-bold uppercase">
                                Custom Notes
                              </label>

                              <textarea
                                rows={4}
                                value={customNotes}
                                onChange={(e) => setCustomNotes(e.target.value)}
                                placeholder="Special requests..."
                                className="w-full rounded-lg border border-[#EAE6DD] bg-[#F8F6F2] p-3 text-sm outline-none"
                              />
                            </div>
                          </div>

                          <button
                            onClick={() => saveCustomization(item)}
                            className="rounded bg-[#0B0B0B] px-5 py-3 text-xs font-bold uppercase text-[#FAD90C]"
                          >
                            Save Changes
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-end justify-between">
                      <p className="font-display text-2xl font-bold">
                        {fmt(item.unitPriceSnapshot * item.quantity)}
                      </p>

                      <div className="flex gap-2">
                        <button
                          onClick={() => openEdit(item)}
                          className="flex items-center gap-1 rounded border px-3 py-2 text-xs"
                        >
                          <Edit size={13} />
                          Edit
                        </button>

                        <button
                          onClick={() => removeItem(item)}
                          className="flex items-center gap-1 rounded border px-3 py-2 text-xs text-red-600"
                        >
                          <Trash size={13} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {items.length > 0 && (
            <div className="rounded-2xl border border-[#EAE6DD] bg-white p-7">
              <label className="mb-3 block text-[11px] font-bold uppercase">
                Additional Notes
              </label>

              <textarea
                rows={4}
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                placeholder="General requests, delivery details, questions..."
                className="w-full rounded-lg border bg-[#F8F6F2] p-4 text-sm"
              />

              <button
                onClick={saveCustomerNotes}
                className="mt-3 rounded bg-[#0B0B0B] px-5 py-3 text-xs font-bold uppercase text-[#FAD90C]"
              >
                Save Notes
              </button>
            </div>
          )}
        </div>
        {items.length > 0 && (
          <QuoteSummary
            items={items}
            total={total}
            fmt={fmt}
            customerNotes={customerNotes}
            onCustomerNotesChange={setCustomerNotes}
            onSubmitLoggedInQuote={
              session && pendingQuote
                ? () => quoteSubmitMutation.mutateAsync(pendingQuote.id)
                : undefined
            }
            isSubmittingLoggedInQuote={quoteSubmitMutation.isPending}
          />
        )}
      </Container>
    </div>
  );
};

export default QuotePage;
