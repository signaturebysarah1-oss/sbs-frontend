import { createQuote } from "@/providers/quoteMutation";
import { useMutation } from "@tanstack/react-query";


export const useCreateQuote = () => {

 return useMutation({
   mutationFn:createQuote
 });

};