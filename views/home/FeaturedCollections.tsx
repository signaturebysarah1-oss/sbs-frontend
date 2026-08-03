"use client"
import Container from "@/components/ui/shared/Container";
import { getProducts } from "@/providers/get";
import { Collection } from "@/types/website";
import { useQuery } from "@tanstack/react-query";



interface CollectionResponse {
  data: Collection[];
}

const FeaturedCollection = ({ data }: CollectionResponse) => {
  const items = data || [];

  return (
    <section className="bg-[#F8F6F2] py-[120px]">
    <Container>
  
      <div className="mb-[80px] text-center">
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="block h-px w-10 bg-[#FAD90C]" />
  
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#0B0B0B]">
            Featured
          </span>
  
          <span className="block h-px w-10 bg-[#FAD90C]" />
        </div>
  
        <h2 className="font-display text-[clamp(36px,4vw,60px)] font-bold tracking-[-0.01em] text-[#0B0B0B]">
          The Collection
        </h2>
      </div>
  
  
      <div className="flex flex-col">
        {items?.slice(0,3).map((item:Collection, i:number) => (
          <div key={item.id}>
  
            <div className={`grid min-h-[520px] grid-cols-2 items-center ${i % 2 === 0 ? "" : ""}`}>
  
              {/* Image */}
              <div className={`img-zoom h-[520px] overflow-hidden ${i % 2 === 0 ? "order-1" : "order-2"}`}>
                <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
              </div>
  
  
              {/* Text */}
              <div className={`${i % 2 === 0 ? "order-2 pl-[72px]" : "order-1 pr-[72px]"} flex flex-col justify-center gap-5`}>
  
                {/* <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#FAD90C]">
                  {item.sub}
                </div> */}
  
                <h3 className="font-display text-[clamp(28px,3vw,48px)] font-bold leading-[1.1] tracking-[-0.01em] text-[#0B0B0B]">
                  {item.name}
                </h3>
  
                <p className="max-w-[380px] text-[14px] font-light leading-[1.8] text-[#666]">
                  {item.description}
                </p>
  
  
                <div className="flex items-center gap-4">
                  <span className="block h-px w-6 bg-[#EAE6DD]" />
  
                  <span className="text-[10px] tracking-[0.12em] text-[#999]">
                    {/* {item.material} */}asdasd
                  </span>
                </div>
  
  
                {/* <div className="font-display text-[26px] font-semibold text-[#0B0B0B]">
                  {item.}
                </div> */}
  
  
                <div className="flex gap-3">
                  <button className="btn-gold text-[11px] px-7 py-3">
                    Add to Cart
                  </button>
  
                  <button className="btn-outline text-[11px] px-7 py-[11px]">
                    View Details
                  </button>
                </div>
  
              </div>
  
            </div>
  
  
            {i < items.length - 1 && (
              <div className="flex items-center gap-4 py-10">
                <div className="h-px flex-1 bg-[#EAE6DD]" />
  
                <div className="h-1.5 w-1.5 rotate-45 bg-[#FAD90C]" />
  
                <div className="h-px flex-1 bg-[#EAE6DD]" />
              </div>
            )}
  
          </div>
        ))}
      </div>
  
    </Container>
  </section>
  );
};
export default FeaturedCollection