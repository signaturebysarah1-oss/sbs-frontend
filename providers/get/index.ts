
import { authFetch } from "@/lib/api";

export async function getProducts(endpoint:string) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
  
    return res.json();
  }


export async function getMyQuotes() {
  const res = await authFetch("/api/quotes/my");

  if (!res.ok) {
    throw new Error("Failed to fetch quote history");
  }

  return res.json();
}