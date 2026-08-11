"use client";

import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  Check,
  Clock3,
  ExternalLink,
  Package,
  Truck,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

import Container from "@/components/ui/shared/Container";
import { authQuery } from "@/providers/query";
import { TrackingOrder } from "@/types/website";
import { formatStatus, getStatusClasses } from "@/utils/formatStatus";
import { formatDate, formatDateTime, formatPrice } from "@/utils/formatPrice";





const TrackingPage = () => {
    const params = useParams();
    const id = params?.id as string; 
    
    const {
      data,
      isLoading,
      isError,
    } = useQuery({
      queryKey: ["cart-tracking", id],
      queryFn: () => authQuery(`/api/tracking/cart/${id}`),
      enabled: !!id, 
    });
    
    const order: TrackingOrder | undefined = data?.data;
  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#F8F6F2] py-10">
        <Container>
          <div className="flex min-h-[60vh] items-center justify-center">
            <Loader2 className="h-7 w-7 animate-spin text-[#C9A227]" />
          </div>
        </Container>
      </main>
    );
  }

  if (isError || !order) {
    return (
      <main className="min-h-screen bg-[#F8F6F2] py-10">
        <Container>
          <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#C9A227]/20 bg-white">
              <Package className="h-7 w-7 text-[#C9A227]" />
            </div>

            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-[#927f04]">
              Tracking unavailable
            </p>

            <h1 className="mt-3 font-display text-3xl font-bold text-[#0E0E0E]">
              Order not found
            </h1>

            <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
              We couldn&apos;t find a tracking record for this order. Please
              check the order number and try again.
            </p>

            <Link
              href="/orders"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#0E0E0E] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-[#222]"
            >
              <ArrowLeft size={14} />
              Back to Orders
            </Link>
          </div>
        </Container>
      </main>
    );
  }

  const total = order.totalSnapshot ?? order.total ?? 0;

  return (
    <main className="min-h-screen bg-off-white mt-20 py-8 lg:py-12">
      <Container>
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/history"
              className="mb-6 inline-flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500 transition hover:text-[#927f04]"
            >
              <ArrowLeft size={14} />
              Order History
            </Link>

            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-[#927f04]">
                  Track Your Order
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <h1 className="font-display text-3xl font-bold tracking-tight text-[#0E0E0E] lg:text-4xl">
                    {order.orderNumber}
                  </h1>

                  <span
                    className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${getStatusClasses(
                      order.status
                    )}`}
                  >
                    {formatStatus(order.status)}
                  </span>
                </div>

                <p className="mt-2 text-sm text-gray-500">
                  Order placed on {formatDate(order.createdAt)}
                </p>
              </div>

              {order.shippingTrackingUrl && (
                <a
                  href={order.shippingTrackingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 rounded-xl border border-[#0E0E0E] bg-white px-5 py-3 text-xs font-semibold uppercase tracking-widest text-[#0E0E0E] transition hover:bg-[#0E0E0E] hover:text-white"
                >
                  Track Shipment
                  <ExternalLink size={13} />
                </a>
              )}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
            {/* Main content */}
            <div className="space-y-6">
              {/* Status Timeline */}
              <section className="rounded-2xl border border-[#E5E1D9] bg-white p-6 lg:p-7">
                <div className="mb-8">
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-[#927f04]">
                    01
                  </p>

                  <h2 className="mt-1 font-display text-xl font-bold text-[#0E0E0E]">
                    Order Progress
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Follow your order as it moves through our fulfilment
                    process.
                  </p>
                </div>

                {order.statusHistory && order.statusHistory.length > 0 ? (
                  <div className="space-y-8">
                    {order.statusHistory.map((history, index) => {
                      const isLatest =
                        index === order.statusHistory!.length - 1;

                      return (
                        <div
                          key={`${history.status}-${history.createdAt}-${index}`}
                          className="relative flex gap-4"
                        >
                          {!isLatest && (
                            <div className="absolute left-[14px] top-8 h-[calc(100%+1rem)] w-px bg-[#EDEAE4]" />
                          )}

                          <div
                            className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
                              isLatest
                                ? "border-[#C9A227] bg-[#C9A227]"
                                : "border-[#C9A227]/30 bg-[#F8F6F2]"
                            }`}
                          >
                            {isLatest ? (
                              <Check
                                size={13}
                                className="text-[#0E0E0E]"
                              />
                            ) : (
                              <Check
                                size={13}
                                className="text-[#927f04]"
                              />
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                              <p
                                className={`text-sm font-semibold ${
                                  isLatest
                                    ? "text-[#0E0E0E]"
                                    : "text-gray-600"
                                }`}
                              >
                                {formatStatus(history.status)}
                              </p>

                              <p className="text-[10px] uppercase tracking-wider text-gray-400">
                                {formatDateTime(history.createdAt)}
                              </p>
                            </div>

                            {history.note && (
                              <p className="mt-1 text-xs leading-5 text-gray-500">
                                {history.note}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex items-center gap-4 rounded-xl bg-[#F8F6F2] p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                      <Clock3
                        size={17}
                        className="text-[#C9A227]"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#0E0E0E]">
                        {formatStatus(order.status)}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Your order has been received and is being processed.
                      </p>
                    </div>
                  </div>
                )}
              </section>

              {/* Items */}
              <section className="overflow-hidden rounded-2xl border border-[#E5E1D9] bg-white">
                <div className="border-b border-[#EDEAE4] px-6 py-5 lg:px-7">
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-[#927f04]">
                    02
                  </p>

                  <div className="mt-1 flex items-center justify-between gap-4">
                    <h2 className="font-display text-xl font-bold text-[#0E0E0E]">
                      Order Items
                    </h2>

                    <span className="text-xs text-gray-400">
                      {order.items.length}{" "}
                      {order.items.length === 1 ? "item" : "items"}
                    </span>
                  </div>
                </div>

                <div className="divide-y divide-[#EDEAE4]">
                  {order.items.map((item, index) => (
                    <div
                      key={`${item.productId || "custom"}-${index}`}
                      className="flex flex-col gap-5 p-6 sm:flex-row"
                    >
                      <div className="h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-[#F8F6F2]">
                        {item.imageUrlSnapshot ? (
                          <img
                            src={item.imageUrlSnapshot}
                            alt={item.productNameSnapshot || "Order item"}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <Package className="h-6 w-6 text-gray-300" />
                          </div>
                        )}
                      </div>

                      <div className="flex flex-1 flex-col justify-between gap-4">
                        <div>
                          <div className="flex items-start justify-between gap-4">
                            <h3 className="font-display text-lg font-bold text-[#0E0E0E]">
                              {item.productNameSnapshot || "Custom Item"}
                            </h3>

                            <p className="shrink-0 font-display text-lg font-bold text-[#0E0E0E]">
                              {formatPrice(
                                item.unitPriceSnapshot * item.quantity
                              )}
                            </p>
                          </div>

                          <div className="mt-3 flex flex-wrap gap-2">
                            {item.selectedMaterial && (
                              <span className="rounded-md bg-[#F8F6F2] px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-gray-600">
                                {item.selectedMaterial}
                              </span>
                            )}

                            {item.selectedColor && (
                              <span className="flex items-center gap-2 rounded-md bg-[#F8F6F2] px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-gray-600">
                                <span
                                  className="h-2.5 w-2.5 rounded-full border border-black/10"
                                  style={{
                                    backgroundColor: item.selectedColor,
                                  }}
                                />

                                {item.selectedColor}
                              </span>
                            )}

                            {item.selectedSize && (
                              <span className="rounded-md bg-[#F8F6F2] px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-gray-600">
                                Size {item.selectedSize}
                              </span>
                            )}

                            <span className="rounded-md bg-[#F8F6F2] px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-gray-600">
                              Qty {item.quantity}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-gray-400">
                          {formatPrice(item.unitPriceSnapshot)} each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Delivery */}
              {(order.shippingTrackingNumber ||
                order.shippingTrackingUrl ||
                order.shippingDetails) && (
                <section className="rounded-2xl border border-[#E5E1D9] bg-white p-6 lg:p-7">
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-[#927f04]">
                    03
                  </p>

                  <h2 className="mt-1 font-display text-xl font-bold text-[#0E0E0E]">
                    Delivery
                  </h2>

                  <div className="mt-6 flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F8F6F2]">
                      <Truck className="h-5 w-5 text-[#927f04]" />
                    </div>

                    <div className="space-y-4">
                      {order.shippingTrackingNumber && (
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                            Tracking Number
                          </p>

                          <p className="mt-1 text-sm font-semibold text-[#0E0E0E]">
                            {order.shippingTrackingNumber}
                          </p>
                        </div>
                      )}

                      {order.shippingDetails && (
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                            Delivery Details
                          </p>

                          <div className="mt-1 text-sm leading-6 text-gray-600">
                            {order.shippingDetails.address && (
                              <p>{order.shippingDetails.address}</p>
                            )}

                            {(order.shippingDetails.city ||
                              order.shippingDetails.state) && (
                              <p>
                                {order.shippingDetails.city}
                                {order.shippingDetails.city &&
                                order.shippingDetails.state
                                  ? ", "
                                  : ""}
                                {order.shippingDetails.state}
                              </p>
                            )}

                            {order.shippingDetails.country && (
                              <p>{order.shippingDetails.country}</p>
                            )}
                          </div>
                        </div>
                      )}

                      {order.shippingTrackingUrl && (
                        <a
                          href={order.shippingTrackingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-[#927f04]"
                        >
                          Open tracking
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                </section>
              )}

              {/* Payment */}
              {(order.receiptUrl || order.paymentUrl) && (
                <section className="rounded-2xl border border-[#E5E1D9] bg-white p-6 lg:p-7">
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-[#927f04]">
                    04
                  </p>

                  <h2 className="mt-1 font-display text-xl font-bold text-[#0E0E0E]">
                    Payment
                  </h2>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {order.receiptUrl && (
                      <a
                        href={order.receiptUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-[#E5E1D9] bg-white px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#0E0E0E] transition hover:border-[#C9A227]"
                      >
                        View Receipt
                        <ExternalLink size={13} />
                      </a>
                    )}

                    {order.paymentUrl && (
                      <a
                        href={order.paymentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-[#E5E1D9] bg-white px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#0E0E0E] transition hover:border-[#C9A227]"
                      >
                        Payment Details
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </section>
              )}
            </div>

            {/* Summary */}
            <aside className="lg:sticky lg:top-8 lg:h-fit">
              <div className="overflow-hidden rounded-2xl bg-[#0E0E0E] text-white">
                <div className="p-6">
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C9A227]">
                    Order Summary
                  </p>

                  <h2 className="mt-2 font-display text-2xl font-bold">
                    {order.orderNumber}
                  </h2>

                  <div className="mt-7 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <span className="text-xs text-white/50">
                        Items
                      </span>

                      <span className="text-sm">
                        {order.items.reduce(
                          (total, item) => total + item.quantity,
                          0
                        )}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <span className="text-xs text-white/50">
                        Status
                      </span>

                      <span className="text-xs text-[#C9A227]">
                        {formatStatus(order.status)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <span className="text-xs text-white/50">
                        Ordered
                      </span>

                      <span className="text-xs">
                        {formatDate(order.createdAt)}
                      </span>
                    </div>

                    <div className="flex items-end justify-between pt-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/50">
                        Order Total
                      </span>

                      <span className="font-display text-2xl font-bold text-[#C9A227]">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 bg-white/[0.03] px-6 py-5">
                  <div className="flex items-start gap-3">
                    <Check
                      size={15}
                      className="mt-0.5 shrink-0 text-[#C9A227]"
                    />

                    <p className="text-xs leading-5 text-white/50">
                      Your order status is updated by our team as it moves
                      through the fulfilment process.
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href={`/orders/${order.orderNumber}`}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[#D9D4CA] bg-white py-3.5 text-xs font-semibold uppercase tracking-widest text-[#0E0E0E] transition hover:border-[#C9A227]"
              >
                <Package size={14} />
                View Order Details
              </Link>

              <Link
                href="/orders"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-[#D9D4CA] bg-white py-3.5 text-xs font-semibold uppercase tracking-widest text-[#0E0E0E] transition hover:border-[#C9A227]"
              >
                <ArrowLeft size={14} />
                Back to Order History
              </Link>
            </aside>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default TrackingPage;
