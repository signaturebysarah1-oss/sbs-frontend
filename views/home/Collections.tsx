"use client"
import Container from "@/components/ui/shared/Container";
import { getProducts } from "@/providers/get";
import { Collection } from "@/types/website";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface CollectionResponse {
  data: Collection[];
}

const Collections = ({ data }: CollectionResponse) => {
  const categories = data || [];
  // if (isLoading) {
  //   return <div className="flex h-screen items-center justify-center">Loading...</div>;
  // }
  return (
    <section className="bg-[#0B0B0B] py-[100px]">
      <Container>
        {/* Header */}
        <div className="mb-14 flex items-end justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="block h-[2px] w-10 bg-[#FAD90C]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FAD90C]">
                Collections
              </span>
            </div>

            <h2 className="font-display text-[clamp(32px,4vw,56px)] font-bold leading-[1.1] tracking-[-0.01em] text-[#F8F6F2]">
              Shop by Style
            </h2>
          </div>

          <button className="btn-outline-white">View All</button>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {categories?.slice(0,5).map((cat: Collection) => (
            <button
              key={cat.id}
              className="img-zoom group relative aspect-[3/4] overflow-hidden rounded-2xl p-0 text-left"
            >
              <img
                src={cat.imageUrl}
                alt={cat.name}
                className="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Dark gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#0B0B0B]/85 via-transparent to-transparent" />

              {/* Gold top accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FAD90C] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Content */}
              <div className="absolute right-5 bottom-5 left-5">
                <div className="mb-1.5 text-[9px] font-medium uppercase tracking-[0.18em] text-[#FAD90C]">
                  {cat?.name}
                </div>

                <div className="font-display text-[22px] font-semibold leading-[1.1] text-[#F8F6F2]">
                  {cat.name}
                </div>

                <Link href={`product?collection=${cat.slug}`} className="mt-2.5 cursor-pointer flex items-center gap-1.5 text-[11px] text-[#F8F6F2]/60">
                  <span>Explore</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Collections;
