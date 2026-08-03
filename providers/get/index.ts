
export async function getProducts(endpoint:string) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
  
    return res.json();
  }