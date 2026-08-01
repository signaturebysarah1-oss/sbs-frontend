import Image from "next/image";
import { Heart, Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Product } from "@/types/website";
import { useState } from "react";

interface ViewModalProps {
  products: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ViewModal = ({
  products,
  open,
  onOpenChange,
}: ViewModalProps) => {
  const selectedColor = 0;
  const selectedSize = products.variants[0]?.sizeValue;
  const [selectedImage, setSelectedImage] = useState(
    products.images.find((img) => img.isPrimary)?.imageUrl ||
      products.images[0]?.imageUrl
  );
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 lg:max-w-3xl">
        <DialogHeader className="hidden">
          <DialogTitle />
          <DialogDescription />
        </DialogHeader>

        <div className="grid lg:grid-cols-2">
          {/* Image */}
         {/* Image Gallery */}
<div className="flex flex-col gap-4 bg-[#F8F6F2] p-5">
  {/* Main Image */}
  <div className="aspect-[3/4] overflow-hidden rounded-lg">
    <Image
      src={selectedImage}
      alt={products.name}
      width={900}
      height={1100}
      className="h-full w-full object-cover transition-all duration-500"
    />
  </div>

  {/* Thumbnails */}
  <div className="flex gap-3 overflow-x-auto">
    {products.images.map((image) => (
      <button
        key={image.id}
        onClick={() => setSelectedImage(image.imageUrl)}
        className={`relative h-20 w-16 flex-shrink-0 overflow-hidden rounded-md border transition-all ${
          selectedImage === image.imageUrl
            ? "border-[#FAD90C] ring-1 ring-[#FAD90C]"
            : "border-[#EAE6DD]"
        }`}
      >
        <Image
          src={image.imageUrl}
          alt={image.altText || products.name}
          fill
          className="object-cover"
        />
      </button>
    ))}
  </div>
</div>

          {/* Content */}
          <div className="flex flex-col gap-5 p-10">
            <div>
              <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FAD90C]">
                {products.collections[0]?.name}
              </span>

              <h2 className="mb-2 font-display text-[28px] font-bold leading-[1.1] tracking-[-0.01em] text-[#0B0B0B]">
                {products.name}
              </h2>

           
            </div>

            <p className="text-[13px] leading-7 text-[#666]">
              {products.description}
            </p>

            <div className="flex items-center gap-2.5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#999]">
                Material
              </span>

              <span className="h-1 w-1 rounded-full bg-[#FAD90C]" />

              <span className="text-[13px] font-medium text-[#0B0B0B]">
                {products.materials[0]?.name}
              </span>
            </div>

            {/* Colors */}
            {products.colors.length > 0 && (
              <div>
                <div className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#999]">
                  Color —
                  <span className="ml-1 text-[#0B0B0B]">
                    {products.colors[selectedColor]?.name}
                  </span>
                </div>

                <div className="flex gap-2">
                  {products.colors.map((color) => (
                    <button
                      key={color.id}
                      title={color.name}
                      className="h-7 w-7 rounded-full border-2 border-transparent outline outline-1 outline-[#EAE6DD] outline-offset-2"
                      style={{ backgroundColor: color.hexCode }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {products.variants.length > 0 && (
              <div>
                <div className="mb-2.5 flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#999]">
                    EU Size
                  </span>

                  <button className="text-[11px] text-[#FAD90C] underline">
                    Size Guide
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {products.variants.map((variant) => (
                    <button
                      key={variant.id}
                      disabled={!variant.isAvailable}
                      className={`flex px-3 py-2 items-center justify-center rounded-md border-[1.5px] text-xs font-semibold transition-all ${
                        selectedSize === variant.sizeValue
                          ? "border-[#0B0B0B] bg-[#0B0B0B] text-[#FAD90C]"
                          : "border-[#EAE6DD] bg-white text-[#666]"
                      } ${
                        !variant.isAvailable
                          ? "cursor-not-allowed opacity-40"
                          : "hover:border-[#0B0B0B]"
                      }`}
                    >
                      {variant.sizeLabel}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="font-display text-[26px] font-bold tracking-[-0.01em] text-[#0B0B0B]">
              ₦{products.basePrice.toLocaleString()}
            </div>

            <button className="rounded-[10px] bg-[#0B0B0B] px-4 py-[15px] text-[11px] font-bold uppercase tracking-[0.12em] text-[#FAD90C] transition-colors hover:bg-[#1A1A1A]">
              Add to Cart
            </button>

            {products.isNewArrival && (
              <div className="rounded-lg border border-[#FAD90C]/30 bg-[#FAD90C]/10 p-4">
                <span className="text-[11px] text-[#0B0B0B]">
                  ✦ <strong>New Arrival</strong> · Recently added to the
                  collection.
                </span>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewModal;