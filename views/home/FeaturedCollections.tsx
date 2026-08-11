"use client";

import Container from "@/components/ui/shared/Container";
import ScrollTypewriter from "@/components/ui/shared/Typewriter";
import { Product } from "@/types/website";
import { useState } from "react";
import ViewModal from "../shop/ViewModal";
import ProductCard from "@/components/ui/shared/ProductCard";

interface NewArrivalsProps {
  data: Product[];
}

const NewArrivals = ({ data }: NewArrivalsProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const items = data || [];

  return (
    <section className="my-10">
      <Container>
        <div className="mb-10">
          <div className="mb-3 flex items-center gap-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-near-black">
              Featured
            </span>

            <span className="block h-px w-10 bg-gold" />
          </div>

          <h2 className="font-display text-[clamp(36px,4vw,60px)] font-bold tracking-[-0.01em] text-near-black">
            <ScrollTypewriter text="New Arrivals" />
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-14">
          {items.slice(0, 8).map((product, i) => (
            <div
              key={product.id}
              data-aos="fade-up"
              data-aos-duration={800 + i * 100}
            >
              <ProductCard
                product={product}
                onViewDetails={handleViewDetails}
              />
            </div>
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
    </section>
  );
};

export default NewArrivals;