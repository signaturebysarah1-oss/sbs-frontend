// providers/quoteQuery.ts

import { authFetch } from "@/lib/api";
import { QuoteData } from "@/types/website";

interface QuoteListResponse {
  data?: Array<Omit<QuoteData, "items"> & { items?: QuoteData["items"] }>;
}

interface QuoteDetailResponse {
  data?: QuoteData;
}

export const getPendingQuote = async () => {
  const response = await authFetch("/api/quotes/my");

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch quote");
  }

  const result: QuoteListResponse = await response.json();
  const pendingQuote = (result.data ?? []).find(
    (quote) => quote.customerStatus === "pending"
  );

  if (!pendingQuote) return null;

  const detailResponse = await authFetch(`/api/quotes/${pendingQuote.id}`);

  if (!detailResponse.ok) {
    const error = await detailResponse.json();
    throw new Error(error.message || "Failed to fetch quote details");
  }

  const detail: QuoteDetailResponse | QuoteData = await detailResponse.json();
  return "data" in detail ? detail.data ?? null : detail;
};
