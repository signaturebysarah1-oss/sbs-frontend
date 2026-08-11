import { CartItemPayload } from "@/types/website";

const CART_KEY = "guest-cart";


// READ ALL ITEMS
export const getGuestCart = (): CartItemPayload[] => {
  if (typeof window === "undefined") return [];

  const cart = localStorage.getItem(CART_KEY);

  if (!cart) return [];

  return JSON.parse(cart);
};


// CREATE ITEM
export const addToGuestCart = (
  item: CartItemPayload
) => {

  const cart = getGuestCart();


  const existingItem = cart.find(
    (cartItem) =>
      cartItem.productId === item.productId &&
      cartItem.selectedSize === item.selectedSize &&
      cartItem.selectedColor === item.selectedColor &&
      cartItem.selectedMaterial === item.selectedMaterial
  );


  if (existingItem) {

    existingItem.quantity += item.quantity;

  } else {

    cart.push(item);

  }


  localStorage.setItem(
    CART_KEY,
    JSON.stringify(cart)
  );


  return cart;
};



// UPDATE ITEM
export const updateGuestCartItem = (
  index: number,
  updates: Partial<CartItemPayload>
) => {

  const cart = getGuestCart();


  if (!cart[index]) {
    return cart;
  }


  cart[index] = {
    ...cart[index],
    ...updates,
  };


  localStorage.setItem(
    CART_KEY,
    JSON.stringify(cart)
  );


  return cart;
};



// DELETE SINGLE ITEM
export const removeGuestCartItem = (
  index: number
) => {

  const cart = getGuestCart();


  cart.splice(index, 1);


  localStorage.setItem(
    CART_KEY,
    JSON.stringify(cart)
  );


  return cart;
};



// DELETE ALL ITEMS
export const clearGuestCart = () => {

  localStorage.removeItem(
    CART_KEY
  );

};