"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";

import Container from "@/components/ui/shared/Container";
import { authQuery } from "@/providers/query";
import { TrackingOrder } from "@/types/website";

import TrackingHeader from "./TrackingHeader";
import TrackingStatusTimeline from "./TrackingStatusTimeline";
import TrackingItems from "./TrackingItems";
import TrackingDelivery from "./TrackingDelivery";
import TrackingPayment from "./TrackingPayment";
import TrackingSummary from "./TrackingSummary";
import TrackingUnavailable from "./TrackingUnavailable";

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
    return <TrackingUnavailable />;
  }

  const total = order.totalSnapshot ?? order.total ?? 0;

  return (
    <main className="min-h-screen bg-off-white mt-20 py-8 lg:py-12">
      <Container>
        <div className="mx-auto max-w-6xl">
          <TrackingHeader order={order} />

          <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
            <div className="space-y-6">
              <TrackingStatusTimeline order={order} />

              <TrackingItems order={order} />

              <TrackingDelivery order={order} />

              <TrackingPayment order={order} />
            </div>

            <TrackingSummary order={order} total={total} />
          </div>
        </div>
      </Container>
    </main>
  );
};

export default TrackingPage;