"use client";
import Container from "@/components/ui/shared/Container";
import ScrollTypewriter from "@/components/ui/shared/Typewriter";
import { Collection } from "@/types/website";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface CollectionResponse {
  data: Collection[];
}

const Collections = ({ data }: CollectionResponse) => {
  const categories = data || [];

  return (
    <section className="bg-near-black py-25">
      <Container>
        <div className="mb-14 flex items-end justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="block h-0.5 w-10 bg-gold" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
                Categories
              </span>
            </div>

            <h2 className="font-display text-[clamp(32px,4vw,56px)] font-bold leading-[1.1] tracking-[-0.01em] text-off-white">
              <ScrollTypewriter text={"Shop by Style"} />
            </h2>
          </div>

          <Link href={"/product"} className="btn-outline-white">View All</Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {categories?.slice(0, 5).map((cat: Collection) => (
            // <button
            //   key={cat.id}
            //   className="img-zoom group relative aspect-3/4 overflow-hidden rounded-2xl p-0 text-left"
            // >
            <Link
              key={cat.id}
              href={`product?collection=${cat.slug}`}
              className="img-zoom group relative aspect-3/4 overflow-hidden rounded-2xl p-0 text-left"
            >
              <img
                src={cat.imageUrl}
                alt={cat.name}
                className="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 rounded-2xl bg-linear-to-t from-near-black/85 via-transparent to-transparent" />

              <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-gold to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="absolute right-5 bottom-5 left-5">
                <div className="font-display text-sm lg:text-[22px] font-semibold leading-[1.1] text-off-white">
                  {cat.name}
                </div>
              <div className="flex items-center gap-1 text-[#ffffffb2] mt-1 text-sm">
              <span>Explore</span>
              <ArrowRight size={14} />
              </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Collections;
