
"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateQuotePayload, Product } from "@/types/website";
import { useEffect, useState } from "react";
import { addToQuote } from "@/services/cart";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postData } from "@/providers/mutations/Index";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { authFetchs } from "@/lib/api";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";

interface ViewModalProps {
  products: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface QuoteItem {
  productId: string;
  productNameSnapshot: string;
  quantity: number;
  unitPriceSnapshot: number;
  variantLabelSnapshot?: string;
  materialNameSnapshot?: string;
  colorNameSnapshot?: string;
  customNotes?: string;
}

interface Quote {
  id: string;
  referenceNumber: string;
  profileId: string;
  customerNotes: string;
  customerStatus: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  submittedAt: string;
  reviewedAt: string | null;
  completedAt: string | null;
  items: QuoteItem[];
}

interface QuotesResponse {
  success: boolean;
  message: string;
  data: Quote[];
}

const ViewModal = ({ products, open, onOpenChange }: ViewModalProps) => {
  const queryClient = useQueryClient();

  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedImage, setSelectedImage] = useState(
    products.images.find((img) => img.isPrimary)?.imageUrl ??
      products.images[0]?.imageUrl
  );
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [session, setSession] = useState<Session | null>();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
    };

    checkSession();
  }, []);

  const handleAddToQuote = () => {
    addToQuote({
      productId: products.id,
      productNameSnapshot: products.name || "",
      quantity: 1,
      imageUrlSnapshot: products.images[0].imageUrl || "",
      unitPriceSnapshot: products.basePrice,
      variantLabelSnapshot: selectedSize ? `EU ${selectedSize}` : undefined,
      materialNameSnapshot: products.materials[0]?.name,
      colorNameSnapshot: products.colors[selectedColor]?.name,
      customNotes: "",
    });
  
    // toast.success("Added to quote") already fires inside addToQuote — don't duplicate it here
    onOpenChange(false);
  };
  const { mutate: createQuote, isPending } = useMutation({
    mutationFn: (payload: CreateQuotePayload) => postData("api/quotes", payload),

    onSuccess: () => {
      toast.success("Added to quote");
      queryClient.invalidateQueries({ queryKey: ["all-quotes"] });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Couldn't add to quote. Please try again.");
    },
  });

  const { mutate: updateQuote, isPending: isUpdatingQuote } = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: CreateQuotePayload }) =>
      authFetchs(`/api/quotes/${id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      }),

    onSuccess: () => {
      toast.success("Added to quote");
      queryClient.invalidateQueries({ queryKey: ["all-quotes"] });
      onOpenChange(false);
    },

    onError: (error) => {
      console.error(error);
      toast.error("Couldn't add to quote. Please try again.");
    },
  });

  // Only fetch quotes for logged-in users — guests never hit the API
  const { data: getquotes, isLoading: myLoading } = useQuery<QuotesResponse>({
    queryKey: ["all-quotes"],
    queryFn: () => authFetchs<QuotesResponse>("/api/quotes/my"),
    enabled: !!session,
  });

  const allquotes: Quote[] = getquotes?.data ?? [];

  const quotePayload: CreateQuotePayload = {
    customerNotes: "",
    items: [
      {
        productId: products.id,
        productNameSnapshot: products.name || "",
        quantity: 1,
        unitPriceSnapshot: products.basePrice,
        variantLabelSnapshot: selectedSize ? `EU ${selectedSize}` : undefined,
        materialNameSnapshot: products.materials[0]?.name,
        colorNameSnapshot: products.colors[selectedColor]?.name,
        customNotes: "",
        imageUrlSnapshot: products.images[0].imageUrl || "",
      },
    ],
  };

  const handleQuoteAction = async () => {
    // Guest path — pure localStorage, no network at all
    if (!session) {
      handleAddToQuote();
      return;
    }

    setIsProcessing(true);

    try {
      const latest = await queryClient.fetchQuery<QuotesResponse>({
        queryKey: ["all-quotes"],
        queryFn: () => authFetchs<QuotesResponse>("/api/quotes/my"),
      });

      const freshQuotes: Quote[] = latest?.data ?? [];
      const pendingQuoteSummary = freshQuotes.find(
        (item) => item.customerStatus === "pending"
      );

      if (pendingQuoteSummary?.id) {
        // /api/quotes/my may not include items — fetch the full quote to be sure
        const full = await queryClient.fetchQuery<{
          success: boolean;
          message: string;
          data: Quote;
        }>({
          queryKey: ["quote", pendingQuoteSummary.id],
          queryFn: () => authFetchs(`/api/quotes/${pendingQuoteSummary.id}`),
        });

        const pendingQuote = full?.data;

        updateQuote({
          id: pendingQuoteSummary.id,
          payload: {
            customerNotes: pendingQuote?.customerNotes || "",
            items: [...(pendingQuote?.items || []), ...quotePayload.items],
          },
        });

        return;
      }

      createQuote(quotePayload, {
        onSuccess: () => {
          onOpenChange(false);
        },
        onError: (error) => {
          console.error(error);
        },
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const isBusy = isProcessing || isPending || isUpdatingQuote;
  // Loading state only matters for logged-in users; guests never wait on this query
  const isLoadingQuotes = !!session && myLoading;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 lg:max-w-3xl">
        <DialogHeader className="hidden">
          <DialogTitle />
          <DialogDescription />
        </DialogHeader>

        <div className="grid lg:grid-cols-2">
          {/* Image */}
          <div className="flex flex-col gap-4 bg-[#F8F6F2] p-5">
            <div className="aspect-[3/4] overflow-hidden rounded-lg">
              <Image
                src={selectedImage}
                alt={products.name}
                width={900}
                height={1100}
                className="h-full w-full object-cover transition-all duration-500"
              />
            </div>

            <div className="flex gap-3 overflow-x-auto">
              {products.images.map((image) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(image.imageUrl)}
                  className={`relative h-20 w-16 flex-shrink-0 overflow-hidden rounded-md border transition-all ${
                    selectedImage === image.imageUrl
                      ? "border-[#FAD90C] ring-1 ring-[#FAD90C]"
                      : "border-[#EAE6DD]"
                  }`}
                >
                  <Image
                    src={image.imageUrl}
                    alt={image.altText || products.name}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-5 p-10">
            <div>
              <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FAD90C]">
                {products.collections[0]?.name}
              </span>

              <h2 className="mb-2 font-display text-[28px] font-bold leading-[1.1] tracking-[-0.01em] text-[#0B0B0B]">
                {products.name}
              </h2>
            </div>

            <p className="text-[13px] leading-7 text-[#666]">
              {products.description}
            </p>

            <div className="flex items-center gap-2.5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#999]">
                Material
              </span>

              <span className="h-1 w-1 rounded-full bg-[#FAD90C]" />

              <span className="text-[13px] font-medium text-[#0B0B0B]">
                {products.materials[0]?.name}
              </span>
            </div>

            {/* Colors */}
            {products.colors.length > 0 && (
              <div>
                <div className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#999]">
                  Color —
                  <span className="ml-1 text-[#0B0B0B]">
                    {products.colors[selectedColor]?.name}
                  </span>
                </div>

                <div className="flex gap-2">
                  {products.colors.map((color, index) => (
                    <button
                      key={color.id}
                      title={color.name}
                      onClick={() => setSelectedColor(index)}
                      className={`h-7 w-7 rounded-full border-2 transition-all ${
                        selectedColor === index
                          ? "border-[#FAD90C]"
                          : "border-transparent"
                      } outline outline-1 outline-[#EAE6DD] outline-offset-2`}
                      style={{ backgroundColor: color.hexCode }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {products.sizes?.length > 0 && (
              <div>
                <div className="mb-2.5 flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#999]">
                    EU Size
                  </span>

                  <button className="text-[11px] text-[#FAD90C] underline">
                    Size Guide
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {products.sizes.map((size, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSize(size)}
                      className={`flex items-center justify-center rounded-md border-[1.5px] px-3 py-2 text-xs font-semibold transition-all ${
                        selectedSize === size
                          ? "border-[#0B0B0B] bg-[#0B0B0B] text-[#FAD90C]"
                          : "border-[#EAE6DD] bg-white text-[#666]"
                      } hover:border-[#0B0B0B]`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="font-display text-[26px] font-bold tracking-[-0.01em] text-[#0B0B0B]">
              ₦{products.basePrice.toLocaleString()}
            </div>

            <button
              onClick={handleQuoteAction}
              disabled={isBusy || isLoadingQuotes}
              className={`rounded-[10px] flex cursor-pointer items-center justify-center px-4 py-[15px] text-[11px] font-bold uppercase tracking-[0.12em] transition-colors ${
                isLoadingQuotes || isBusy
                  ? "cursor-not-allowed bg-[#3A3A3A] text-[#D8C76A]"
                  : "bg-[#0B0B0B] text-[#FAD90C] hover:bg-[#1A1A1A]"
              }`}
            >
              {isLoadingQuotes ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading Product...
                </>
              ) : isBusy ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add to Quote"
              )}
            </button>

            {products.isNewArrival && (
              <div className="rounded-lg border border-[#FAD90C]/30 bg-[#FAD90C]/10 p-4">
                <span className="text-[11px] text-[#0B0B0B]">
                  ✦ <strong>New Arrival</strong> · Recently added to the
                  collection.
                </span>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewModal;