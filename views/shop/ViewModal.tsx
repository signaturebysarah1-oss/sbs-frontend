"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CartItemPayload, Product, QuoteItem } from "@/types/website";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useCreateCartMutation } from "@/providers/mutations/carts";
import { addGuestCartItem } from "@/services/guest-items";

interface ViewModalProps {
  products: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ViewModal = ({ products, open, onOpenChange }: ViewModalProps) => {
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [session, setSession] = useState<Session | null>();

  const [selectedImage, setSelectedImage] = useState(
    (products.images.find((img) => img.isPrimary)?.imageUrl ??
    products.images[0]?.imageUrl) || null
  );
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
    };

    checkSession();
  }, []);

  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  const validateSelection = () => {
    if (selectedColor === null) {
      toast.error("Please select a color");
      return false;
    }

    if (selectedSize === null) {
      toast.error("Please select a size");
      return false;
    }

    return true;
  };

  const { mutate: createCart, isPending } = useCreateCartMutation();

  const getCartPayload = (): CartItemPayload => ({
    productId: products.id,
    productNameSnapshot: products.name,
    imageUrlSnapshot: selectedImage ?? products.images[0].imageUrl,
    quantity: 1,
    selectedSize,
    selectedColor:
      selectedColor !== null ? products.colors[selectedColor]?.name : null,
    selectedMaterial: products.materials[0]?.name ?? null,
    unitPriceSnapshot: products.basePrice,
  });

  const handleGuestCart = () => {
    const payload = getCartPayload();

    addGuestCartItem(payload as QuoteItem);

    toast.success("Added to cart");
    onOpenChange(false);
  };

  // const handleGuestCart = () => {
  //   const payload = getCartPayload();

  //   const existingCart = JSON.parse(
  //     localStorage.getItem("guest-cart") || "[]"
  //   );

  //   localStorage.setItem(
  //     "guest-cart",
  //     JSON.stringify([...existingCart, payload])
  //   );

  //   toast.success("Added to cart");
  //   onOpenChange(false);
  // };
  const handleCartAction = () => {
    if (!validateSelection()) return;

    const payload = getCartPayload();

    if (!session) {
      handleGuestCart();
      return;
    }

    createCart(payload, {
      onSuccess: () => {
        toast.success("Added to cart");
        onOpenChange(false);
      },

      onError: (error: any) => {
        console.error(error);
        toast.error(error?.message || "Couldn't add item to cart");
      },
    });
  };
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedImage(null);
    }
  
    onOpenChange(isOpen);
  };
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-full! max-h-150! overflow-auto p-0 lg:max-h-fit! lg:max-w-3xl [&>button]:bg-near-black [&>button]:text-white [&>button]:rounded-full [&>button]:opacity-100 [&>button]:border-0 [&>button]:h-8 [&>button]:w-8 [&>button]:top-4 [&>button]:right-4 [&>button]:hover:bg-black">
        <DialogHeader className="hidden">
          <DialogTitle />
          <DialogDescription />
        </DialogHeader>
        <div className="grid lg:grid-cols-2">
          {/* Image */}
          <div className="flex  bg-off-white ">
            <div className="aspect-4/5 overflow-hidden rounded-lg max-sm:h-60 max-sm:aspect-auto">
              <Image
                src={selectedImage || products.images[0].imageUrl}
                alt={products.name}
                width={900}
                height={1100}
                className="h-full w-full object-cover transition-all duration-500"
              />
            </div>
            {products.images.length > 1 && (
              <div className="grid grid-cols-1 w-[150px] gap-0.5 overflow-x-auto">
                {products.images.map((image) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImage(image.imageUrl)}
                    className={`relative w-full h-full shrink-0 overflow-hidden border transition-all ${
                      selectedImage === image.imageUrl
                        ? "border-gold ring-1 ring-gold"
                        : "border-border"
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
            )}
          </div>

          {/* Content */}
          <div className="flex justify-between flex-col gap-5 p-10">
            <div className="flex flex-col gap-4 mt-8">
              <div>
                <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.2em]  text-gold">
                  {products.category}
                </span>

                <h2 className="mb-2 font-display text-2xl lg:text-[24px] font-bold leading-[1.1] tracking-[-0.01em] text-near-black">
                  {products.name}
                </h2>
              </div>

              {/* <p className="text-[13px] leading-7 text-[#666]">
              {products.description}
            </p> */}

              <div className="flex items-center gap-2.5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#999]">
                  Material
                </span>

                <span className="h-1 w-1 rounded-full bg-gold" />

                <span className="text-[13px] font-medium text-near-black">
                  {products.materials[0]?.name}
                </span>
              </div>
              {/* Sizes */}
              {products.sizes?.length > 0 && (
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#999]">
                  Sizes
                </span>
                  <div className="flex  mt-1 flex-wrap gap-1.5">
                    {products.sizes.map((size, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedSize(size)}
                        className={`flex items-center justify-center rounded-md border-[1.5px] px-3 py-2 text-xs font-semibold transition-all ${
                          selectedSize === size
                            ? "border-near-black bg-near-black  text-gold"
                            : "border-border bg-white text-[#666]"
                        } hover:border-near-black`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {/* Colors */}
              {products.colors.length > 0 && (
                <div>
                  <div className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#999]">
                    Color
                    {selectedColor !== null && (
                      <span className="ml-1 text-near-black">
                        — {products.colors[selectedColor]?.name}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {products.colors.map((color, index) => (
                      <button
                        key={color.id}
                        title={color.name}
                        onClick={() => setSelectedColor(index)}
                        className={`h-7 w-7 rounded-full border-2 transition-all ${
                          selectedColor === index
                            ? "border-gold"
                            : "border-transparent"
                        }  outline-1 outline-border outline-offset-2`}
                        style={{ backgroundColor: color.hexCode }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="font-display text-[26px] font-bold tracking-[-0.01em] text-near-black">
                ₦{products.basePrice.toLocaleString()}
              </div>
            </div>
            <button
              onClick={handleCartAction}
              disabled={isPending}
              className={`rounded-[10px] flex cursor-pointer items-center justify-center px-4 py-3.75 text-[11px] font-bold uppercase tracking-[0.12em] transition-colors ${
                isPending
                  ? "cursor-not-allowed bg-[#3A3A3A] text-[#D8C76A]"
                  : "bg-near-black  text-gold hover:bg-[#1A1A1A]"
              }`}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add to Bag"
              )}
            </button>

            {products.isNewArrival && (
              <div className="rounded-lg border border-gold/30 bg-gold/10 p-4">
                <span className="text-[11px] text-near-black">
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
