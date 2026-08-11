// services/guest-cart.ts
import { QuoteItem } from "@/types/website";

const GUEST_CART_KEY = "guest-cart";

const getItemKey = (item: Pick<QuoteItem, "productId" | "variantLabelSnapshot" | "materialNameSnapshot" | "colorNameSnapshot">) =>
  [
    item.productId,
    item.variantLabelSnapshot ?? "",
    item.materialNameSnapshot ?? "",
    item.colorNameSnapshot ?? "",
  ].join("-");

  const readCart = (): QuoteItem[] => {
    try {
      const stored = localStorage.getItem(GUEST_CART_KEY);
      if (!stored || stored === "undefined" || stored === "null") return [];
  
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };
  

// services/guest-items.ts

const writeCart = (items: QuoteItem[]): QuoteItem[] => {
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("guest-cart-updated"));
    return items;
  };
export const getGuestCart = readCart;

export const addGuestCartItem = (item: QuoteItem): QuoteItem[] => {
  const items = readCart();
  const key = getItemKey(item);
  const existingIndex = items.findIndex((i) => getItemKey(i) === key);

  if (existingIndex >= 0) {
    const updated = items.map((i, idx) =>
      idx === existingIndex ? { ...i, quantity: i.quantity + item.quantity } : i
    );
    return writeCart(updated);
  }

  return writeCart([...items, item]);
};

export const updateGuestCartItemQuantity = (
  itemKey: string,
  quantity: number
): QuoteItem[] => {
  const items = readCart();
  const updated = items.map((i) =>
    getItemKey(i) === itemKey ? { ...i, quantity: Math.max(1, quantity) } : i
  );
  return writeCart(updated);
};

export const removeGuestCartItem = (itemKey: string): QuoteItem[] => {
  const items = readCart().filter((i) => getItemKey(i) !== itemKey);
  return writeCart(items);
};

export const clearGuestCart = (): QuoteItem[] => writeCart([]);

export { getItemKey };