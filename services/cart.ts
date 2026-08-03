import { QuoteItem } from "@/types/website";

const QUOTE_KEY = "sbs-quote";

export const getQuote = (): QuoteItem[] => {
  if (typeof window === "undefined") return [];

  const quote = localStorage.getItem(QUOTE_KEY);
  return quote ? JSON.parse(quote) : [];
};

export const addToQuote = (item: QuoteItem) => {
  const quote = getQuote();

  const existing = quote.find(
    (quoteItem) =>
      quoteItem.productId === item.productId &&
      quoteItem.variantLabelSnapshot === item.variantLabelSnapshot &&
      quoteItem.colorNameSnapshot === item.colorNameSnapshot &&
      quoteItem.materialNameSnapshot === item.materialNameSnapshot
  );

  if (existing) {
    existing.quantity += item.quantity;
  } else {
    quote.push(item);
  }

  localStorage.setItem(QUOTE_KEY, JSON.stringify(quote));
};

export const removeFromQuote = (
  productId: string,
  variantLabelSnapshot?: string,
  colorNameSnapshot?: string,
  materialNameSnapshot?: string
) => {
  const quote = getQuote().filter(
    (item) =>
      !(
        item.productId === productId &&
        item.variantLabelSnapshot === variantLabelSnapshot &&
        item.colorNameSnapshot === colorNameSnapshot &&
        item.materialNameSnapshot === materialNameSnapshot
      )
  );

  localStorage.setItem(QUOTE_KEY, JSON.stringify(quote));
};

export const clearQuote = () => {
  localStorage.removeItem(QUOTE_KEY);
};