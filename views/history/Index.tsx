"use client";

import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Package,
  ReceiptText,
  Truck,
} from "lucide-react";
import Link from "next/link";

import Container from "@/components/ui/shared/Container";
import { authQuery } from "@/providers/query";
import { useSession } from "@/hooks/useSession";
import { Loader2 } from "lucide-react";

interface CartHistoryItem {
  productId?: string | null;
  productNameSnapshot?: string | null;
  imageUrlSnapshot?: string | null;
  quantity: number;
  selectedSize?: number | string | null;
  selectedColor?: string | null;
  selectedMaterial?: string | null;
  unitPriceSnapshot: number;
}

interface CartHistory {
  id: string;
  originalCartId?: string;
  items: CartHistoryItem[];
  totalSnapshot: number;
  completedAt?: string | null;
  createdAt: string;
  status?: string;
  orderNumber?: string;
}

const formatPrice = (value: number) =>
  `₦${Number(value || 0).toLocaleString("en-NG")}`;

const formatDate = (date?: string | null) => {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getStatusStyles = (status?: string) => {
  switch (status?.toLowerCase()) {
    case "completed":
      return "bg-green-50 text-green-700 border-green-200";

    case "cancelled":
      return "bg-red-50 text-red-700 border-red-200";

    case "shipped":
      return "bg-blue-50 text-blue-700 border-blue-200";

    case "processing":
    case "confirmed":
      return "bg-amber-50 text-amber-700 border-amber-200";

    default:
      return "bg-[#C9A227]/10 text-[#927f04] border-[#C9A227]/20";
  }
};

const getStatusLabel = (status?: string) => {
  if (!status) return "Submitted";

  return status
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const OrderHistoryPage = () => {
  const { session, isLoading: isSessionLoading } = useSession();

  const {
    data,
    isLoading: isHistoryLoading,
    isError,
  } = useQuery({
    queryKey: ["cart-history"],
    queryFn: () => authQuery("/api/cart/history"),
    enabled: !!session,
  });

  const history: CartHistory[] = data?.data ?? [];

  if (isSessionLoading || isHistoryLoading) {
    return (
      <main className="min-h-screen bg-[#F8F6F2]">
        <Container>
          <div className="flex min-h-[70vh] items-center justify-center">
            <Loader2 className="h-7 w-7 animate-spin text-[#C9A227]" />
          </div>
        </Container>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="min-h-screen bg-[#F8F6F2]">
        <Container>
          <div className="flex min-h-[70vh] items-center justify-center">
            <div className="max-w-md text-center">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#927f04]">
                01 / Account Required
              </p>

              <h1 className="font-display text-3xl font-bold text-[#0E0E0E]">
                Your Orders
              </h1>

              <p className="mt-4 text-sm leading-7 text-black/50">
                Please sign in to view your submitted orders and order history.
              </p>

              <Link
                href="/login"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#0E0E0E] px-7 py-4 text-xs font-bold uppercase tracking-[0.15em] text-white transition hover:bg-[#C9A227] hover:text-[#0E0E0E]"
              >
                Sign In
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="min-h-screen mt-20 bg-[#F8F6F2] py-10 lg:py-16">
      <Container>
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-10 border-b border-black/10 pb-8 lg:mb-14 lg:pb-10">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#927f04]">
                  01 / Your Collection
                </p>

                <h1 className="font-display text-4xl font-bold tracking-tight text-[#0E0E0E] lg:text-6xl">
                  Order History
                </h1>

                <p className="mt-4 max-w-xl text-sm leading-7 text-black/50">
                  A record of your Signature By Sarah orders, from the moment
                  your selection was submitted to its journey with us.
                </p>
              </div>

              <Link
                href="/product"
                className="group flex w-fit items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0E0E0E]"
              >
                Continue Shopping
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 transition group-hover:border-[#C9A227] group-hover:bg-[#C9A227]">
                  <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </div>

          {/* Error */}
          {isError && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
              <p className="text-sm font-semibold text-red-700">
                We couldn&apos;t load your order history.
              </p>

              <p className="mt-2 text-xs text-red-600/70">
                Please refresh the page and try again.
              </p>
            </div>
          )}

          {/* Empty State */}
          {!isError && history.length === 0 && (
            <div className="overflow-hidden rounded-3xl border border-black/10 bg-white">
              <div className="px-6 py-16 text-center lg:px-10 lg:py-24">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F8F6F2]">
                  <Package
                    size={25}
                    strokeWidth={1.5}
                    className="text-[#927f04]"
                  />
                </div>

                <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.3em] text-[#927f04]">
                  02 / No Orders Yet
                </p>

                <h2 className="mt-3 font-display text-2xl font-bold text-[#0E0E0E] lg:text-3xl">
                  Your story starts here.
                </h2>

                <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-black/50">
                  You haven&apos;t submitted an order yet. Explore our
                  collection and find something made for you.
                </p>

                <Link
                  href="/product"
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#0E0E0E] px-7 py-4 text-xs font-bold uppercase tracking-[0.15em] text-white transition hover:bg-[#C9A227] hover:text-[#0E0E0E]"
                >
                  Explore Collection
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          )}

          {/* Orders */}
          {!isError && history.length > 0 && (
            <div>
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#927f04]">
                    02 / Submitted Orders
                  </p>

                  <h2 className="mt-1 font-display text-xl font-bold text-[#0E0E0E]">
                    Your Orders
                  </h2>
                </div>

                <span className="rounded-full border border-black/10 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-black/50">
                  {history.length} {history.length === 1 ? "Order" : "Orders"}
                </span>
              </div>

              <div className="space-y-5">
                {history.map((order, index) => {
                  const firstItem = order.items?.[0];
                  const itemCount = order.items?.reduce(
                    (total, item) => total + item.quantity,
                    0
                  );

                  return (
                    <div key={index} className="group block overflow-hidden rounded-2xl border border-black/10 bg-white transition duration-300 hover:-translate-y-0.5 hover:border-[#C9A227]/40 hover:shadow-xl hover:shadow-black/5">
                      <div className="flex flex-col lg:flex-row">
                        {/* Image */}
                        <div className="relative h-64 w-full overflow-hidden bg-[#EDEAE4] lg:h-auto lg:w-56 lg:min-w-56">
                          {firstItem?.imageUrlSnapshot ? (
                            <img
                              src={firstItem.imageUrlSnapshot}
                              alt={
                                firstItem.productNameSnapshot || "Order item"
                              }
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full min-h-64 items-center justify-center">
                              <Package
                                size={28}
                                strokeWidth={1.5}
                                className="text-black/20"
                              />
                            </div>
                          )}

                          <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#0E0E0E]/90 text-[10px] font-bold text-[#C9A227]">
                            {String(index + 1).padStart(2, "0")}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex flex-1 flex-col p-6 lg:p-8">
                          <div className="flex flex-col justify-between gap-5 sm:flex-row">
                            <div>
                              <div className="flex flex-wrap items-center gap-3">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#927f04]">
                                  Order
                                </span>

                                <span className="text-xs font-semibold text-black/40">
                                  #
                                  {order.orderNumber ||
                                    order.id.slice(0, 8).toUpperCase()}
                                </span>
                              </div>

                              <h3 className="mt-3 font-display text-xl font-bold text-[#0E0E0E] lg:text-2xl">
                                {firstItem?.productNameSnapshot ||
                                  "Signature By Sarah Order"}
                              </h3>

                              {order.items.length > 1 && (
                                <p className="mt-1 text-xs text-black/40">
                                  + {order.items.length - 1} other{" "}
                                  {order.items.length - 1 === 1
                                    ? "item"
                                    : "items"}
                                </p>
                              )}
                            </div>

                            <span
                              className={`h-fit w-fit rounded-full border px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider ${getStatusStyles(
                                order.status
                              )}`}
                            >
                              {getStatusLabel(order.status)}
                            </span>
                          </div>

                          {/* Meta */}
                          <div className="mt-7 grid grid-cols-2 gap-5 border-y border-black/5 py-5 sm:grid-cols-3">
                            <div>
                              <div className="flex items-center gap-2 text-black/30">
                                <CalendarDays size={13} />
                                <span className="text-[9px] font-bold uppercase tracking-wider">
                                  Submitted
                                </span>
                              </div>

                              <p className="mt-2 text-xs font-semibold text-[#0E0E0E]">
                                {formatDate(
                                  order.completedAt || order.createdAt
                                )}
                              </p>
                            </div>

                            <div>
                              <div className="flex items-center gap-2 text-black/30">
                                <Package size={13} />
                                <span className="text-[9px] font-bold uppercase tracking-wider">
                                  Items
                                </span>
                              </div>

                              <p className="mt-2 text-xs font-semibold text-[#0E0E0E]">
                                {itemCount}{" "}
                                {itemCount === 1 ? "Piece" : "Pieces"}
                              </p>
                            </div>

                            <div className="col-span-2 sm:col-span-1">
                              <div className="flex items-center gap-2 text-black/30">
                                <ReceiptText size={13} />
                                <span className="text-[9px] font-bold uppercase tracking-wider">
                                  Total
                                </span>
                              </div>

                              <p className="mt-2 font-display text-lg font-bold text-[#927f04]">
                                {formatPrice(order.totalSnapshot)}
                              </p>
                            </div>
                          </div>

                          {/* Footer */}
                          <div className="mt-5 flex items-center justify-between gap-3">
                            <Link
                              href={`/history/${order.id}`}
                              className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-black/35 transition hover:text-[#927f04]"
                            >
                              View order details
                              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 transition hover:border-[#C9A227] hover:bg-[#C9A227]">
                                <ChevronRight
                                  size={15}
                                  className="text-black/50 transition group-hover:text-[#0E0E0E]"
                                />
                              </span>
                            </Link>

                            <Link
                              href={`/tracking/${order.orderNumber}`}
                              className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#927f04] transition hover:text-[#C9A227]"
                            >
                              Track order
                              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C9A227]/30 transition hover:border-[#C9A227] hover:bg-[#C9A227]">
                                <Truck
                                  size={14}
                                  className="text-[#927f04] transition hover:text-[#0E0E0E]"
                                />
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </Container>
    </main>
  );
};

export default OrderHistoryPage;
