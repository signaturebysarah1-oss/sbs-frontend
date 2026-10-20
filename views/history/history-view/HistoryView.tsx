
"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";

import Container from "@/components/ui/shared/Container";
import { authQuery } from "@/providers/query";
import { Order } from "@/types/website";

import OrderHeader from "./OrderHeader";
import OrderItems from "./OrderItems";
import OrderStatusHistory from "./OrderStatusHistory";
import OrderShipping from "./OrderShipping";
import OrderPayment from "./OrderPayment";
import OrderSummary from "./OrderSummary";
import OrderUnavailable from "./OrderUnavailable";

const HistoryView = () => {
  const params = useParams();
  const orderId = params?.id as string;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["cart-order", orderId],
    queryFn: () => authQuery(`/api/cart/history/${orderId}`),
    enabled: !!orderId,
  });

  const order: Order | undefined = data?.data;

  if (isLoading) {
    return (
      <main className="min-h-screen bg-off-white py-10">
        <Container>
          <div className="flex min-h-[60vh] items-center justify-center">
            <Loader2 className="h-7 w-7 animate-spin text-[#C9A227]" />
          </div>
        </Container>
      </main>
    );
  }

  if (isError || !order) {
    return <OrderUnavailable />;
  }

  return (
    <main className="min-h-screen mt-20 bg-off-white py-8 lg:py-12">
      <Container>
        <div className="mx-auto max-w-6xl">
          <OrderHeader order={order} />

          <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
            <div className="space-y-6">
              <OrderItems order={order} />
              <OrderStatusHistory order={order} />
              <OrderShipping order={order} />
              <OrderPayment order={order} />
            </div>
            <OrderSummary order={order} />
          </div>
        </div>
      </Container>
    </main>
  );
};

export default HistoryView;
