"use client"
import Image from "next/image";
import { ALL_PRODUCTS } from "../data";
import Container from "@/components/ui/shared/Container";
import { HeartIcon } from "lucide-react";
import { col } from "framer-motion/client";
import ViewModal from "../ViewModal";
import { useState } from "react";
import { Product } from "@/types/website";
const Products = () => {
  // const allCollections = ALL_PRODUCTS.map((collection) =>(
  //   collection.collections.map((collection) => collection)
  // ))
  // const collections = [...new Set(allCollections)]
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);
  return (
    <Container>
      <div className="grid gap-5 grid-cols-3 my-8">
        {ALL_PRODUCTS.map((product) => (
          <article
            key={product.id}
            className={`flex flex-col group overflow-hidden rounded-2xl border border-[#EAE6DD] bg-white transition-all duration-300 `}
          >
            {/* Image */}
            <div className="relative overflow-hidden bg-[#F8F6F2]">
              {/* Primary image */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg">
                {/* Primary Image */}
                {product.images
                  .filter((image) => image.isPrimary)
                  .map((image) => (
                    <Image
                      key={image.id}
                      src={image.imageUrl}
                      alt={image.altText || product.name}
                      width={700}
                      height={900}
                      className="absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:opacity-0"
                    />
                  ))}

                {/* Hover Image */}
                <Image
                  src={
                    product.images[1]?.imageUrl || product.images[0]?.imageUrl
                  }
                  alt={product.name}
                  width={700}
                  height={900}
                  className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:opacity-100"
                />
              </div>
              <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                {product.isBestSeller && (
                  <span className="inline-block rounded-full bg-[#0B0B0B] px-2.5 py-[3px] text-[9px] font-bold uppercase tracking-[0.12em] text-[#FAD90C]">
                    Best Seller
                  </span>
                )}
              </div>

              <button
                className={`absolute top-3 right-3 z-10 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white/90 transition-transform 
                }`}
              >
                <HeartIcon />
              </button>

              <div className="absolute right-0 bottom-0 left-0 z-10 flex justify-center p-3 translate-y-full opacity-0 transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-y-0 group-hover:opacity-100">
                {/* <button className="w-full rounded-lg bg-[#0B0B0B]/90 px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#F8F6F2] backdrop-blur-md transition-colors hover:bg-[#FAD90C] hover:text-[#0B0B0B]">
                  Quick View
                </button> */}
                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setOpen(true);
                  }}
                  className="w-full rounded-lg bg-[#0B0B0B]/90 px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#F8F6F2] backdrop-blur-md transition-colors hover:bg-[#FAD90C] hover:text-[#0B0B0B]"
                >
                  Quick View
                </button>{" "}
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-1.5 p-[18px] pb-5">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#FAD90C]">
                  {product.collections[0]?.name}
                </span>

                {/* {product.isMadeToOrder && (
                  <span className="text-[9px] tracking-[0.08em] text-[#999]">
                    Made to Order
                  </span>
                )} */}
              </div>

              <h3 className="font-display text-[17px] font-semibold leading-[1.2] text-[#0B0B0B]">
                {product.name}
              </h3>

              <span className="text-[11px] tracking-[0.06em] text-[#999]">
                {/* {product.material} */}
                {product.materials[0].name}
              </span>

              {/* Colors */}
              {product.colors.length > 0 && (
                <div className="mt-0.5 flex gap-[5px]">
                  {product.colors.map((color) => (
                    <div
                      key={color.name}
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

              <div className="mt-2 flex items-center justify-between">
                <span className="font-display text-[17px] font-bold tracking-[-0.01em] text-[#0B0B0B]">
                  {/* {fmt(product.price)} */}
                </span>
              </div>
            </div>
          </article>
        ))}
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
