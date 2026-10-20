// "use client";

// import Image from "next/image";
// import Container from "@/components/ui/shared/Container";
// import { HeartIcon } from "lucide-react";
// import ViewModal from "../ViewModal";
// import { useState } from "react";
// import { Product } from "@/types/website";
// import ProductSkeleton from "./Skeleton";
// import EmptyProductsState from "../EmptyState";

// interface products {
//   products: Product[];
//   error: boolean;
//   isLoading: boolean;
//   category: string;
// }

// const Products = ({ products, error, isLoading, category }: products) => {
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [open, setOpen] = useState(false);

//   if (isLoading) {
//     return (
//       <Container>
//         <ProductSkeleton />{" "}
//       </Container>
//     );
//   }

//   // Empty
//   if (products.length === 0) {
//     return <EmptyProductsState />;
//   }

//   return (
//     <Container className="min-h-screen">
//       <div className="my-8 grid grid-cols-2 md:grid-cols-3 gap-5">
//         {products.map((product) => {
//           const primaryImage =
//             product.images.find((img) => img.isPrimary) ?? product.images[0];

//           const hoverImage = product.images[1] ?? primaryImage;
//           console.log(primaryImage);
//           return (
//             <article
//             key={product.id}
//             className="group flex bg-off-white flex-col overflow-hidden rounded-2xl border border-black/5 shadow-[0_8px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
//           >
//               {/* Image */}
//               <div className="relative overflow-hidden glass-panel">
//                 <div className="relative h-70   overflow-hidden rounded-t-lg">
//                   {primaryImage && (
//                     <Image
//                       src={primaryImage.imageUrl}
//                       alt={primaryImage.altText || product.name}
//                       width={500}
//                       height={500}
//                       className="absolute inset-0 h-full w-full object-contain transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:opacity-0"
//                     />
//                   )}

//                   {hoverImage && (
//                     <Image
//                       src={hoverImage.imageUrl}
//                       alt={hoverImage.altText || product.name}
//                       width={700}
//                       height={700}
//                       className="absolute inset-0 h-full w-full object-contain opacity-0 transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:opacity-100"
//                     />
//                   )}
//                 </div>

//                 {/* <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
//                   {product.isFeatured && (
//                     <span className="inline-block rounded-full bg-near-black px-2.5 py-0.75 text-[9px] font-bold uppercase tracking-[0.12em]  text-gold">
//                       Featured
//                     </span>
//                   )}
//                 </div> */}

//                 <button className="absolute top-3 right-3 z-10 flex h-8.5 w-8.5 items-center justify-center rounded-full bg-white/90 transition-transform">
//                   <HeartIcon />
//                 </button>

//                 <div className="absolute right-0 bottom-0 left-0 z-10 flex translate-y-full justify-center p-3 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-y-0 group-hover:opacity-100">
//                   <button
//                     onClick={() => {
//                       setSelectedProduct(product);
//                       setOpen(true);
//                     }}
//                     className="w-full rounded-lg bg-near-black/90 px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-off-white backdrop-blur-md transition-colors hover:bg-gold hover:text-near-black"
//                   >
//                    View details
//                   </button>
//                 </div>
//                 <div className="absolute right-0 bottom-0 left-0 z-10 flex justify-center p-3 opacity-100 md:translate-y-full md:opacity-0 md:transition-all md:duration-300 md:group-hover:translate-y-0 md:group-hover:opacity-100">
//                   <button
//                     onClick={() => {
//                       setSelectedProduct(product);
//                       setOpen(true);
//                     }}
//                     className="w-full rounded-lg bg-gold px-6 py-1.5 lg:py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-black backdrop-blur-md transition-colors hover:bg-gold hover:text-near-black"
//                   >
//                    View details
//                   </button>
//                 </div>
//               </div>

//               {/* Content */}
//               <div className="flex flex-1 flex-col gap-1.5 p-4.5 pb-5">
//                 <div className="flex items-center justify-between">
//                   <span className="text-[9px] font-semibold uppercase tracking-[0.18em]  text-gold">
//                     {product.category ?? ""}
//                   </span>
//                 </div>

//                 <h3 className="font-display text-xs lg:text-[17px] font-semibold leading-[1.2] text-near-black">
//                   {product.name}
//                 </h3>

//                 <span className="text-[11px] tracking-[0.06em] text-[#999]">
//                   {product.materials[0]?.name ?? ""}
//                 </span>

//                 {product.colors.length > 0 && (
//                   <div className="mt-0.5 flex gap-1.25">
//                     {product.colors.slice(0, 3).map((color) => (
//                       <div
//                         key={color.id}
//                         title={color.name}
//                         className="h-3 w-3 rounded-full border border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
//                         style={{ backgroundColor: color.hexCode }}
//                       />
//                     ))}

//                     {product.colors.length > 3 && (
//                       <span className="text-[10px] leading-3 text-[#999]">
//                         +{product.colors.length - 3}
//                       </span>
//                     )}
//                   </div>
//                 )}
//                 <h3 className="font-display text-[17px] font-semibold leading-[1.2] text-near-black">
//                   ₦{product.basePrice}
//                 </h3>
//               </div>
//             </article>
//           );
//         })}
//       </div>

//       {selectedProduct && (
//         <ViewModal
//           products={selectedProduct}
//           open={open}
//           onOpenChange={setOpen}
//         />
//       )}
//     </Container>
//   );
// };

// export default Products;

"use client";

import Image from "next/image";
import Container from "@/components/ui/shared/Container";
import { HeartIcon } from "lucide-react";
import ViewModal from "../ViewModal";
import { useState } from "react";
import { Product } from "@/types/website";
import ProductSkeleton from "./Skeleton";
import EmptyProductsState from "../EmptyState";

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
        <ProductSkeleton />{" "}
      </Container>
    );
  }

  // Empty
  if (products.length === 0) {
    return <EmptyProductsState />;
  }

  return (
    <Container className="min-h-screen">
      <div className="my-8 grid grid-cols-2 md:grid-cols-3 gap-5">
        {products.map((product) => {
          const primaryImage =
            product.images.find((img) => img.isPrimary) ?? product.images[0];

          const hoverImage = product.images[0] ?? primaryImage;
          return (
            <article
              key={product.id}
              className="group flex  flex-col overflow-hidden rounded-2xl border border-black/5 shadow-[0_8px_40px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
            >
<div className="relative overflow-hidden rounded-t-lg border-b border-black/10 bg-[linear-gradient(135deg,#BDBDBD_0%,#D4D4D4_35%,#E7E7E7_65%,#F8F8F8_100%)]">  <div className="relative h-70 overflow-hidden">
    {primaryImage && (
      <Image
        src={primaryImage.imageUrl}
        alt={primaryImage.altText || product.name}
        width={500}
        height={500}
        className="absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:opacity-0"
      />
    )}

    {hoverImage && (
      <Image
        src={hoverImage.imageUrl}
        alt={hoverImage.altText || product.name}
        width={700}
        height={700}
        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:opacity-100"
      />
    )}
  </div>
{/* 
  <button className="absolute top-3 right-3 z-10 flex h-8.5 w-8.5 items-center justify-center rounded-full bg-white/90 transition-transform">
    <HeartIcon />
  </button> */}

  <div className="absolute right-0 bottom-0 left-0 z-10 flex translate-y-full justify-center p-3 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-y-0 group-hover:opacity-100">
    <button
      onClick={() => {
        setSelectedProduct(product);
        setOpen(true);
      }}
      className="w-full rounded-lg bg-near-black/90 px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-off-white backdrop-blur-md transition-colors hover:bg-gold hover:text-near-black"
    >
      View details
    </button>
  </div>

  <div className="absolute right-0 bottom-0 left-0 z-10 flex justify-center p-3 opacity-100 md:translate-y-full md:opacity-0 md:transition-all md:duration-300 md:group-hover:translate-y-0 md:group-hover:opacity-100">
    <button
      onClick={() => {
        setSelectedProduct(product);
        setOpen(true);
      }}
      className="w-full rounded-lg bg-gold px-6 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-black backdrop-blur-md transition-colors hover:bg-gold hover:text-near-black lg:py-2.5"
    >
      View details
    </button>
  </div>
</div>
              {/* Content */}
              <div className="flex flex-1 flex-col bg-[white] gap-1.5 p-4.5 pb-5">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-gold">
                    {product.category ?? ""}
                  </span>
                </div>

                <h3 className="font-display text-xs lg:text-[17px] font-semibold leading-[1.2] text-near-black">
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
