"use client";

import Image from "next/image";
import { HeartIcon } from "lucide-react";
import { Product } from "@/types/website";

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

const ProductCard = ({ product, onViewDetails }: ProductCardProps) => {
  const primaryImage =
    product.images.find((img) => img.isPrimary) ?? product.images[0];

  const hoverImage = product.images[1] ?? primaryImage;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300">
      <div className="relative overflow-hidden bg-off-white">
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

        <button
          type="button"
          className="absolute top-3 right-3 z-10 flex h-8.5 w-8.5 items-center justify-center rounded-full bg-white/90 transition-transform"
        >
          <HeartIcon size={16} />
        </button>

        {/* Desktop */}
        <div className="absolute right-0 bottom-0 left-0 z-10 hidden justify-center p-3 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-y-0 group-hover:opacity-100 md:flex md:translate-y-full">
          <button
            type="button"
            onClick={() => onViewDetails(product)}
            className="w-full rounded-lg bg-near-black/90 px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-off-white backdrop-blur-md transition-colors hover:bg-gold hover:text-near-black"
          >
            View details
          </button>
        </div>

        {/* Mobile */}
        <div className="absolute right-0 bottom-0 left-0 z-10 flex justify-center p-3 opacity-100 md:hidden">
          <button
            type="button"
            onClick={() => onViewDetails(product)}
            className="w-full rounded-lg bg-gold px-6 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-black backdrop-blur-md transition-colors hover:bg-gold hover:text-near-black lg:py-2.5"
          >
            View details
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4.5 pb-5">
        <h3 className="font-display text-xs font-semibold leading-[1.2] text-near-black lg:text-[17px]">
          {product.name}
        </h3>

        <span className="text-[11px] tracking-[0.06em] text-[#999]">
          {product.materials[0]?.name ?? ""}
        </span>

        {product.colors.length > 0 && (
          <div className="mt-0.5 flex gap-1.25">
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

        <h3 className="font-display text-[17px] font-semibold leading-[1.2] text-near-black">
          ₦{product.basePrice}
        </h3>
      </div>
    </article>
  );
};

export default ProductCard;