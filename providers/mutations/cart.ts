// import { authFetch } from "@/lib/api";
// import { CreateCartPayload, UpdateCartPayload } from "@/types/website";


// export const createCart = async (payload: CreateCartPayload) => {
//   const response = await authFetch("/api/cart/items", {
//     method: "POST",
//     body: JSON.stringify(payload),
//   });

//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.message || "Failed to add item to cart");
//   }

//   return response.json();
// };


// export const updateCart = async ({
//   id,
//   ...payload
// }: {
//   id: string;
// } & UpdateCartPayload) => {
//   const response = await authFetch(`/api/cart/items/${id}`, {
//     method: "PATCH",
//     body: JSON.stringify(payload),
//   });

//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.message || "Failed to update cart item");
//   }

//   return response.json();
// };

// export const deleteCart = async (id: string) => {
//   const response = await authFetch(`/api/cart/items/${id}`, {
//     method: "DELETE",
//   });

//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.message || "Failed to delete cart item");
//   }

//   return response.json();
// };


// export const submitCart = async (payload: {
//   contactMethod: "email" | "whatsapp";
//   phoneNumber?: string;
// }) => {
//   const response = await authFetch("/api/cart/submit", {
//     method: "POST",
//     body: JSON.stringify(payload),
//   });

//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.message || "Failed to submit cart");
//   }

//   return response.json();
// };


// export const getCart = async () => {
//   const response = await authFetch("/api/cart");

//   if (!response.ok) {
//     throw new Error("Failed to fetch cart");
//   }

//   return response.json();
// };


// export const getCartHistory = async () => {
//   const response = await authFetch("/api/cart/history");

//   if (!response.ok) {
//     throw new Error("Failed to fetch cart history");
//   }

//   return response.json();
// };

// /**
//  * Clear active cart
//  */
// export const clearCart = async () => {
//   const response = await authFetch("/api/cart", {
//     method: "DELETE",
//   });

//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.message || "Failed to clear cart");
//   }

//   return response.json();
// };