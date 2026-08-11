"use client";

import { getProducts } from "@/providers/query";
import { Product } from "@/types/website";
import { useQuery } from "@tanstack/react-query";
import Products from "./Products";
import ProductFiltersSidebar from "./Filters";
import { useSearchParams } from "next/navigation";
import ProductErrorState from "./ErrorState";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";

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
  });

  const { data: allProductsData } = useQuery({
    queryKey: ["all-products"],
    queryFn: () => getProducts("api/products"),
  });

  const products: Product[] = filteredData?.data ?? [];
  const allProducts: Product[] = allProductsData?.data ?? [];

  if (error) {
    return <ProductErrorState />;
  }

  return (
    <section className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <ProductFiltersSidebar
          products={allProducts}
          isLoading={isLoading}
          error={!!error}
        />
      </div>

      <div>
        <div className="mb-6 flex lg:hidden">
          <Sheet>
            <SheetTrigger>
              <div className="flex items-center gap-2 border border-input mt-2 mx-4 bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 rounded-md text-sm font-medium cursor-pointer">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </div>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-[320px] border-none overflow-y-auto "
            >
              <SheetHeader></SheetHeader>

              <div className="mt-6">
                <ProductFiltersSidebar
                  products={allProducts}
                  isLoading={isLoading}
                  error={!!error}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

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
