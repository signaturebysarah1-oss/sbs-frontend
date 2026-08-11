import { authFetch } from "@/lib/api";
import { CartItemPayload, UpdateCartItemPayload } from "@/types/website";


// CREATE
export const addCartItem = async (
  payload: CartItemPayload
) => {
  const response = await authFetch(
    "/api/cart/items",
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  );


  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to add item");
  }


  return response.json();
};



// READ ACTIVE CART
export const getCart = async () => {
  const response = await authFetch(
    "/api/cart"
  );


  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to get cart");
  }


  return response.json();
};



// READ CART HISTORY
export const getCartHistory = async () => {
  const response = await authFetch(
    "/api/cart/history"
  );


  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      error.message || "Failed to get cart history"
    );
  }


  return response.json();
};



// UPDATE CART ITEM
export const updateCartItem = async ({
  id,
  ...payload
}: {
  id: string;
} & UpdateCartItemPayload) => {

  const response = await authFetch(
    `/api/cart/items/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(payload),
    }
  );


  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      error.message || "Failed to update cart item"
    );
  }


  return response.json();
};



// DELETE SINGLE ITEM
export const removeCartItem = async (
  id: string
) => {

  const response = await authFetch(
    `/api/cart/items/${id}`,
    {
      method: "DELETE",
    }
  );


  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      error.message || "Failed to remove item"
    );
  }


  return response.json();
};



// DELETE ALL ITEMS
export const clearCart = async () => {

  const response = await authFetch(
    "/api/cart",
    {
      method: "DELETE",
    }
  );


  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      error.message || "Failed to clear cart"
    );
  }


  return response.json();
};



// SUBMIT CART
export const submitCart = async (
  payload:{
    contactMethod:"email"|"whatsapp";
    phoneNumber?:string;
  }
)=>{

 const response = await authFetch(
   "/api/cart/submit",
   {
    method:"POST",
    body:JSON.stringify(payload)
   }
 );


 if(!response.ok){
   const error = await response.json();
   throw new Error(
    error.message || "Failed to submit cart"
   );
 }


 return response.json();
};