"use client";

import { getProducts } from "@/providers/get";
import { Product } from "@/types/website";
import { useQuery } from "@tanstack/react-query";
import { CheckIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

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
        `api/collection${
          selections.collectionSlug ? `?collections=${selections.collectionSlug}` : ""
        }`
      ),
  });

  // All products used only to derive the list of available collections
  const { data: allProductsData } = useQuery({
    queryKey: ["all-products"],
    queryFn: () => getProducts("api/products"),
  });

  const products: Product[] = filteredData?.data ?? [];
  const allProducts: Product[] = allProductsData?.data ?? [];

  // Dedupe collections by slug (the previous [...new Set(objects)] trick
  // doesn't dedupe objects — each object is a distinct reference, so Set
  // never actually removes duplicates. Map by slug instead.)
  const collectionsMap = new Map<string, { name: string; slug: string }>();
  allProducts.forEach((item) => {
    item.collections?.forEach((c) => {
      if (!collectionsMap.has(c.slug)) {
        collectionsMap.set(c.slug, { name: c.name, slug: c.slug });
      }
    });
  });
  const collections = Array.from(collectionsMap.values());

  // Fetch the selected collection's own products once a collection is chosen
  const {
    data: collectionData,
    isLoading: isLoadingCollectionProducts,
    error: collectionError,
  } = useQuery<CollectionResponse>({
    queryKey: ["collection", selections.collectionSlug],
    queryFn: () => getProducts(`api/collections/${selections.collectionSlug}`),
    enabled: !!selections.collectionSlug,
  });

  const collectionProducts: Product[] = collectionData?.data?.products ?? [];

  const selectCollection = (slug: string) => {
    select("collectionSlug", slug);
    // Changing collection invalidates whichever product was previously chosen
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
    select("imageUrlSnapshot", primaryImage);
    select("unitPriceSnapshot", product.basePrice);
  };

  return (
    <div>
      <h2 className="mb-2 font-display text-4xl font-bold text-[#0B0B0B]">
        Choose Your Style
      </h2>

      <p className="mb-10 text-sm text-[#888]">
        Select the silhouette that speaks to you.
      </p>

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
                  ? "border-[#FAD90C]"
                  : "border-[#EAE6DD] hover:border-[#FAD90C]/40"
              }`}
            >
              <div className="p-4">
                <h3 className="font-display text-lg font-semibold text-[#0B0B0B]">
                  {style.name}
                </h3>

                {isSelected && (
                  <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-[#0B0B0B]">
                    <CheckIcon className="h-4 w-4 text-[#FAD90C]" />
                    Selected
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {selections.collectionSlug && (
        <div className="mt-12">
          <h3 className="mb-6 font-display text-2xl font-bold text-[#0B0B0B]">
            Choose a Product
          </h3>

          {isLoadingCollectionProducts && (
            <p className="text-sm text-[#888]">Loading products...</p>
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
                      ? "border-[#FAD90C]"
                      : "border-[#EAE6DD] hover:border-[#FAD90C]/40"
                  }`}
                >
                  {primaryImage && (
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={primaryImage}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="p-4">
                    <h3 className="font-display text-lg font-semibold text-[#0B0B0B]">
                      {product.name}
                    </h3>

                    <p className="mt-1 text-sm text-[#888]">
                      ₦{product.basePrice?.toLocaleString()}
                    </p>

                    {isProductSelected && (
                      <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-[#0B0B0B]">
                        <CheckIcon className="h-4 w-4 text-[#FAD90C]" />
                        Selected
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoeStyle;