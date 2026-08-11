import { authFetch } from "@/providers/query/authfetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// hooks/useCartMutations.ts
export const useSubmitCart = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (payload: { contactMethod: "email" | "whatsapp"; phoneNumber?: string }) =>
        authFetch("api/cart/submit", {
          method: "POST",
          body: JSON.stringify(payload),
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["my-quotes"] });
      },
    });
  };