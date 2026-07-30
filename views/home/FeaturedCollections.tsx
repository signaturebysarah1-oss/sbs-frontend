const FeaturedCollection = () => {
  const items = [
    {
      name: "The Lagos Oxford",
      sub: "Men's Collection",
      desc: "A masterwork in full-grain calf leather. Hand-welted construction meets a razor-sharp silhouette for the discerning professional.",
      price: "₦225,000",
      material: "Full Grain Calf Leather · Goodyear Welted",
      img: "https://images.unsplash.com/photo-1711356240240-2516c04b3585?w=900&h=1100&fit=crop&auto=format",
    },
    {
      name: "The Eko Chelsea Boot",
      sub: "Men's Collection",
      desc: "Eight hours of work go into every pair. The clean pull-on profile conceals handstitched elastic gussets and a supple nubuck upper.",
      price: "₦280,000",
      material: "Premium Nubuck · Leather Sole",
      img: "https://images.unsplash.com/photo-1563433337461-5b65f0834f3a?w=800&h=1000&fit=crop&auto=format",
    },
    {
      name: "The Victoria Mule",
      sub: "Women's Collection",
      desc: "Architectural minimalism meets the ease of a modern lifestyle. Crafted in vegetable-tanned leather that deepens with every wear.",
      price: "₦195,000",
      material: "Vegetable-Tanned · Hand-Burnished",
      img: "https://images.unsplash.com/photo-1641893843833-a006778dc00b?w=700&h=900&fit=crop&auto=format",
    },
  ];

  return (
    <section className="bg-[#F8F6F2] py-[120px]">
    <div className="mx-auto max-w-[1400px] px-8">
  
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
        {items.map((item, i) => (
          <div key={item.name}>
  
            <div className={`grid min-h-[520px] grid-cols-2 items-center ${i % 2 === 0 ? "" : ""}`}>
  
              {/* Image */}
              <div className={`img-zoom h-[520px] overflow-hidden ${i % 2 === 0 ? "order-1" : "order-2"}`}>
                <img src={item.img} alt={item.name} className="h-full w-full object-cover" />
              </div>
  
  
              {/* Text */}
              <div className={`${i % 2 === 0 ? "order-2 pl-[72px]" : "order-1 pr-[72px]"} flex flex-col justify-center gap-5`}>
  
                <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#FAD90C]">
                  {item.sub}
                </div>
  
                <h3 className="font-display text-[clamp(28px,3vw,48px)] font-bold leading-[1.1] tracking-[-0.01em] text-[#0B0B0B]">
                  {item.name}
                </h3>
  
                <p className="max-w-[380px] text-[14px] font-light leading-[1.8] text-[#666]">
                  {item.desc}
                </p>
  
  
                <div className="flex items-center gap-4">
                  <span className="block h-px w-6 bg-[#EAE6DD]" />
  
                  <span className="text-[10px] tracking-[0.12em] text-[#999]">
                    {item.material}
                  </span>
                </div>
  
  
                <div className="font-display text-[26px] font-semibold text-[#0B0B0B]">
                  {item.price}
                </div>
  
  
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
  
    </div>
  </section>
  );
};
export default FeaturedCollection