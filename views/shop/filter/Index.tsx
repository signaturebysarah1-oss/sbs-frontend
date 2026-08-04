"use client";

import { getProducts } from "@/providers/get";
import { Product, QuoteData, QuoteDraft, QuoteItem } from "@/types/website";
import { useQuery } from "@tanstack/react-query";
import Products from "./Products";
import ProductFiltersSidebar from "./Filters";
import { useSearchParams } from "next/navigation";
import { authFetch } from "@/providers/get/authfetch";
import { authFetchs } from "@/lib/api";
import ProductErrorState from "./ErrorState";
import EmptyProductsState from "../EmptyState";


const Index = () => {
  const searchParams = useSearchParams();

  const queryString = searchParams.toString();
  const categories = searchParams.get("category") || "All Products";
  const {
    data: filteredData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", queryString],
    queryFn: () =>
      getProducts(`api/products${queryString ? `?${queryString}` : ""}`),
    // staleTime: 1000 * 60 * 5,
  });
  // All products for filters
  const { data: allProductsData } = useQuery({
    queryKey: ["all-products"],
    queryFn: () => getProducts("api/products"),
    // staleTime: 1000 * 60 * 5,
  });

 
  const products: Product[] = filteredData?.data ?? [];
  const allProducts: Product[] = allProductsData?.data ?? [];
  console.log(products);
  console.log(allProducts);
  // Error
if (error) {
  return <ProductErrorState />;
}



  return (
    <section className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
      <ProductFiltersSidebar
        products={allProducts}
        isLoading={isLoading}
        error={!!error}
      />

      <div>
        <Products
          products={products}
          isLoading={isLoading}
          error={!!error}
          category={categories}
        />
      </div>
    </section>
  );
};

export default Index;
