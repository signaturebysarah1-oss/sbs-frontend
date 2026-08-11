import { addCartItem, clearCart, getCart, getCartHistory, removeCartItem, submitCart, updateCartItem } from "@/services/carts";
import { CartItemPayload } from "@/types/website";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";



export const useCreateCartMutation = () => {
   const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CartItemPayload) =>
      addCartItem(payload),

    onSuccess(){
        queryClient.invalidateQueries({
          queryKey:["my-quotes"]
        });
      }
    
  });
  
};


  
  export const useCart = () =>
    useQuery({
      queryKey:["cart"],
      queryFn:getCart,
    });
  
  
  
  export const useCartHistory = () =>
    useQuery({
      queryKey:["cart-history"],
      queryFn:getCartHistory,
    });
  
  
  
  export const useAddCartItem = () => {
  
   const queryClient = useQueryClient();
  
   return useMutation({
  
    mutationFn:addCartItem,
  
    onSuccess(){
      queryClient.invalidateQueries({
        queryKey:["cart"]
      });
    }
  
   });
  
  };
  
  
  
  export const useUpdateCartItem = () => {
  
   const queryClient = useQueryClient();
  
   return useMutation({
  
    mutationFn:updateCartItem,
  
    onSuccess(){
      queryClient.invalidateQueries({
        queryKey:["cart"]
      });
    }
  
   });
  
  };
  
  
  
  export const useRemoveCartItem = () => {
  
   const queryClient = useQueryClient();
  
   return useMutation({
  
    mutationFn:removeCartItem,
  
    onSuccess(){
      queryClient.invalidateQueries({
        queryKey:["cart"]
      });
    }
  
   });
  
  };
  
  
  
  export const useClearCart = () => {
  
   const queryClient = useQueryClient();
  
   return useMutation({
  
    mutationFn:clearCart,
  
    onSuccess(){
      queryClient.invalidateQueries({
        queryKey:["cart"]
      });
    }
  
   });
  
  };
  
  
  
  export const useSubmitCart = () => {
  
   const queryClient = useQueryClient();
  
   return useMutation({
  
    mutationFn:submitCart,
  
    onSuccess(){
  
      queryClient.invalidateQueries({
        queryKey:["cart"]
      });
  
      queryClient.invalidateQueries({
        queryKey:["cart-history"]
      });
  
    }
  
   });
  
  };