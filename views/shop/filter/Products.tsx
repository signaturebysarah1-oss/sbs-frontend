"use client";

import Image from "next/image";
import Container from "@/components/ui/shared/Container";
import { HeartIcon } from "lucide-react";
import ViewModal from "../ViewModal";
import { useState } from "react";
import { Product } from "@/types/website";
import { getProducts } from "@/providers/get";
import { useQuery } from "@tanstack/react-query";

interface products {
  products: Product[];
  error: boolean;
  isLoading: boolean;
  category: string;
}

const Products = ({ products, error, isLoading, category }: products) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);

  if (isLoading) {
    return (
      <Container>
        <div className="my-20 flex justify-center">Loading...</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div className="my-20 text-center">Failed to load products.</div>
      </Container>
    );
  }

  return (
    <Container>
     
      <div className="my-8 grid grid-cols-3 gap-5">
      
        {products.map((product) => {
          const primaryImage =
            product.images.find((img) => img.isPrimary) ?? product.images[0];

          const hoverImage = product.images[1] ?? primaryImage;

          return (
            <article
              key={product.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[#EAE6DD] bg-white transition-all duration-300"
            >
              {/* Image */}
              <div className="relative overflow-hidden bg-[#F8F6F2]">
                <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg">
                  {primaryImage && (
                    <Image
                      src={primaryImage.imageUrl}
                      alt={primaryImage.altText || product.name}
                      width={700}
                      height={900}
                      className="absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:opacity-0"
                    />
                  )}

                  {hoverImage && (
                    <Image
                      src={hoverImage.imageUrl}
                      alt={hoverImage.altText || product.name}
                      width={700}
                      height={900}
                      className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:opacity-100"
                    />
                  )}
                </div>

                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                  {product.isFeatured && (
                    <span className="inline-block rounded-full bg-[#0B0B0B] px-2.5 py-[3px] text-[9px] font-bold uppercase tracking-[0.12em] text-[#FAD90C]">
                      Featured
                    </span>
                  )}
                </div>

                <button className="absolute top-3 right-3 z-10 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white/90 transition-transform">
                  <HeartIcon />
                </button>

                <div className="absolute right-0 bottom-0 left-0 z-10 flex translate-y-full justify-center p-3 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-y-0 group-hover:opacity-100">
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setOpen(true);
                    }}
                    className="w-full rounded-lg bg-[#0B0B0B]/90 px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#F8F6F2] backdrop-blur-md transition-colors hover:bg-[#FAD90C] hover:text-[#0B0B0B]"
                  >
                    Quick View
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-1.5 p-[18px] pb-5">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#FAD90C]">
                    {product.collections[0]?.name ?? product.category}
                  </span>
                </div>

                <h3 className="font-display text-[17px] font-semibold leading-[1.2] text-[#0B0B0B]">
                  {product.name}
                </h3>

                <span className="text-[11px] tracking-[0.06em] text-[#999]">
                  {product.materials[0]?.name ?? ""}
                </span>

                {product.colors.length > 0 && (
                  <div className="mt-0.5 flex gap-[5px]">
                    {product.colors.slice(0, 3).map((color) => (
                      <div
                        key={color.id}
                        title={color.name}
                        className="h-3 w-3 rounded-full border border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
                        style={{ backgroundColor: color.hexCode }}
                      />
                    ))}

                    {product.colors.length > 3 && (
                      <span className="text-[10px] leading-3 text-[#999]">
                        +{product.colors.length - 3}
                      </span>
                    )}
                  </div>
                )}
                <h3 className="font-display text-[17px] font-semibold leading-[1.2] text-[#0B0B0B]">
                  ₦{product.basePrice}
                </h3>
              </div>
            </article>
          );
        })}
      </div>

      {selectedProduct && (
        <ViewModal
          products={selectedProduct}
          open={open}
          onOpenChange={setOpen}
        />
      )}
    </Container>
  );
};

export default Products;
