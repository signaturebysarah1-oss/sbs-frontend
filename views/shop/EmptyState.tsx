import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/shared/Container";

const EmptyProductsState = () => {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <Image
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&q=80"
          alt="No products"
          width={320}
          height={320}
          className="mb-8 h-60 w-60 rounded-2xl object-cover"
        />

        <span className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A227]">
          Signature By Sarah
        </span>

        <h2 className="font-display text-3xl font-bold text-near-black">
          No Products Found
        </h2>

        <p className="mt-4 max-w-md text-sm leading-7 text-[#777]">
          We couldn't find any products matching your current filters.
          Try adjusting your selections or browse our complete collection.
        </p>

        <Link
          href="/product"
          className="mt-8 rounded-xl bg-near-black px-8 py-3 text-xs font-bold uppercase tracking-[0.15em]  text-gold transition hover:opacity-90"
        >
          View All Products
        </Link>
      </div>
    </Container>
  );
};

export default EmptyProductsState;