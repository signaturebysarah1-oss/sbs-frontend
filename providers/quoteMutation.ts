import { authFetch } from "@/lib/api";
import { CreateQuotePayload, QuoteItem } from "@/types/website";


export const createQuote = async (
 payload: CreateQuotePayload
) => {

 const response = await authFetch(
   "/api/quotes",
   {
    method:"POST",
    body:JSON.stringify(payload)
   }
 );


 if(!response.ok){
   throw new Error("Failed to submit quote");
 }


 return response.json();

};



export const updateQuote = async ({
  id,
  ...payload
}: {
  id: string;
  customerNotes?: string;
  customerStatus?: "pending" | "completed";
  items?: QuoteItem[];
}) => {
  const response = await authFetch(`/api/quotes/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update quote");
  }

  return response.json();
};

/**
 * Quote items are replaced as a complete list by the quote API. Keeping this
 * operation explicit prevents the cart from depending on a separate endpoint.
 */
export const deleteQuoteItem = ({
  id,
  items,
}: {
  id: string;
  items: QuoteItem[];
}) => updateQuote({ id, items });

export const submitQuote = (id: string) =>
  updateQuote({ id, customerStatus: "completed" });
