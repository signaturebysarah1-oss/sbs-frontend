
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

export async function authQuery(url:string) {
  const res = await authFetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch quote history");
  }

  return res.json();
}

export async function getCustomizatioons() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/customizations`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export async function getGallery() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/gallery`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch gallery");
  }

  return res.json();
}