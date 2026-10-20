"use client";

import { getProducts } from "@/providers/query";
import { Product } from "@/types/website";
import { useQuery } from "@tanstack/react-query";
import { CheckIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

interface ShoeStyleProps {
  selections: Record<string, any>;
  select: (key: string, value: any) => void;
}

interface CollectionResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    slug: string;
    description?: string;
    products: Product[];
  };
}

const ShoeStyle = ({ selections, select }: ShoeStyleProps) => {
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  const {
    data: filteredData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", queryString],
    queryFn: () =>
      getProducts(
        `api/collections${
          selections.collectionSlug
            ? `?collections=${selections.collectionSlug}`
            : ""
        }`
      ),
  });

  const { data: allProductsData } = useQuery({
    queryKey: ["all-products"],
    queryFn: () => getProducts("api/products"),
  });

  // const products: Product[] = filteredData?.data ?? [];
  const allProducts: Product[] = allProductsData?.data ?? [];

  const collectionsMap = new Map<string, { name: string; slug: string }>();
  allProducts.forEach((item) => {
    item.collections?.forEach((c) => {
      if (!collectionsMap.has(c.slug)) {
        collectionsMap.set(c.slug, { name: c.name, slug: c.slug });
      }
    });
  });
  const collections = Array.from(collectionsMap.values());

  const {
    data: collectionData,
    isLoading: isLoadingCollectionProducts,
    error: collectionError,
  } = useQuery({
    queryKey: ["collection", selections.collectionSlug],
    queryFn: () => getProducts(`api/collections/${selections.collectionSlug}`),
    enabled: !!selections.collectionSlug,
  });
  
  const collectionProducts: Product[] = collectionData?.data?.products ?? [];

  const selectCollection = (slug: string) => {
    select("collectionSlug", slug);
    select("productId", undefined);
    select("productName", undefined);
    select("imageUrlSnapshot", undefined);
    select("unitPriceSnapshot", undefined);
  };

  const selectProduct = (product: Product) => {
    const primaryImage =
      product.images?.find((img) => img.isPrimary)?.imageUrl ??
      product.images?.[0]?.imageUrl ??
      "";
    select("productId", product.id);
    select("productName", product.name || "");
    select("shoeNameSnapshot", product.name || "");
    select("imageUrlSnapshot", primaryImage);
    select("unitPriceSnapshot", product.basePrice);
  };

  return (
    <div>
      <h2 className="mb-2 font-display text-4xl font-bold text-near-black">
        Choose Your Style
      </h2>

      <p className="mb-10 text-sm text-[#888]">
        Select the silhouette that speaks to you.
      </p>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length:2 }).map((_, index) => (
            <div key={index} className="rounded-2xl border bg-white p-4">
              <Skeleton className="mb-3 h-6 w-3/4" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {collections.map((style) => {
            const isSelected = selections.collectionSlug === style.slug;

            return (
              <button
                key={style.slug}
                type="button"
                onClick={() => selectCollection(style.slug)}
                className={`overflow-hidden rounded-2xl border-2 bg-white text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  isSelected
                    ? "border-gold"
                    : "border-border hover:border-gold/40"
                }`}
              >
                <div className="p-4">
                  <h3 className="font-display text-lg font-semibold text-near-black">
                    {style.name}
                  </h3>

                  {isSelected && (
                    <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-near-black">
                      <CheckIcon className="h-4 w-4 text-gold" />
                      Selected
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    {!selections.collectionSlug ? (
  <div className="mt-12 rounded-2xl border border-dashed border-black/10 bg-white px-6 py-12 text-center">
    <p className="font-display text-lg font-semibold text-near-black">
      Please select a product
    </p>

    <p className="mt-2 text-sm text-[#888]">
      Choose a category above to view the available products.
    </p>
  </div>
) : (
  <div className="mt-12">
    <h3 className="mb-6 font-display text-2xl font-bold text-near-black">
      Choose a Product
    </h3>

    {isLoadingCollectionProducts && (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border bg-white"
          >
            <Skeleton className="aspect-[3/4] w-full" />

            <div className="space-y-3 p-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        ))}
      </div>
    )}

    {collectionError && (
      <p className="text-sm text-red-600">
        Couldn't load products for this collection. Please try again.
      </p>
    )}

    {!isLoadingCollectionProducts &&
      !collectionError &&
      collectionProducts.length === 0 && (
        <p className="text-sm text-[#888]">
          No products available in this collection yet.
        </p>
      )}

    {!isLoadingCollectionProducts &&
      !collectionError &&
      collectionProducts.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {collectionProducts.map((product) => {
            const isProductSelected = selections.productId === product.id;

            const primaryImage =
              product.images?.find((img) => img.isPrimary)?.imageUrl ??
              product.images?.[0]?.imageUrl;

            return (
              <button
                key={product.id}
                type="button"
                onClick={() => selectProduct(product)}
                className={`overflow-hidden rounded-2xl border-2 bg-white text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  isProductSelected
                    ? "border-gold"
                    : "border-border hover:border-gold/40"
                }`}
              >
                {primaryImage && (
                  <div className="relative h-40 w-full overflow-hidden bg-[#f8f6f2]">
                    <Image
                      src={primaryImage}
                      alt={product.name || "Product"}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="p-4">
                  <h3 className="font-display text-sm font-semibold text-near-black">
                    {product.name}
                  </h3>

                  <p className="mt-1 text-sm text-[#888]">
                    ₦{product.basePrice?.toLocaleString()}
                  </p>

                  {isProductSelected && (
                    <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-near-black">
                      <CheckIcon className="h-4 w-4 text-gold" />
                      Selected
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
  </div>
)}
    </div>
  );
};

export default ShoeStyle;
