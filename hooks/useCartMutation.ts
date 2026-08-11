"use client";
import { addCartItem } from "@/services/carts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authFetch } from "@/providers/query/authfetch";

const CART_QUERY_KEY = ["my-quotes"];

export const useAddCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      productId: string;
      variantId?: string;
      quantity: number;
    }) =>
      authFetch("api/cart/items", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });
};

export const useUpdateCartItemQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, quantity }: { id: string; quantity: number }) =>
      authFetch(`api/cart/items/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ quantity }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });
};

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      authFetch(`api/cart/items/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authFetch("api/cart", { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });
};




export const useSubmitCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      contactMethod: "email" | "whatsapp";
      phoneNumber?: string;
    }) =>
      authFetch("api/cart/submit", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-quotes"] });
    },
  });
};