"use client"

import { getProducts } from "@/providers/get";
import { Product } from "@/types/website";
import { useQuery } from "@tanstack/react-query";
import Products from "./Products";
import ProductFiltersSidebar from "./Filters";
import { useSearchParams } from "next/navigation";

const Index = () => {
  const searchParams = useSearchParams();

  const queryString = searchParams.toString();

  const {
    data: filteredData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", queryString],
    queryFn: () =>
      getProducts(`api/products${queryString ? `?${queryString}` : ""}`),
    staleTime: 1000 * 60 * 5,
  });
  // All products for filters
  const {
    data: allProductsData,
  } = useQuery({
    queryKey: ["all-products"],
    queryFn: () => getProducts("api/products"),
    staleTime: 1000 * 60 * 5,
  });


  const products: Product[] = filteredData?.data ?? [];
  const allProducts: Product[] = allProductsData?.data ?? [];


 
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
        />
      </div>
    </section>
  );
};

export default Index;