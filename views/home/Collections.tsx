import Container from "@/components/ui/shared/Container"
import { ArrowRight } from "lucide-react"

const Collections = () => {
    const categories = [
      { name: 'Loafers', sub: 'Effortless Sophistication', img:  "https://images.unsplash.com/photo-1711356240240-2516c04b3585?w=900&h=1100&fit=crop&auto=format" },
      { name: 'Boots', sub: 'Bold Authority', img:   "https://images.unsplash.com/photo-1570800493677-12a7ad3d4d86?w=700&h=900&fit=crop&auto=format"},
      { name: 'Sandals', sub: 'Refined Ease', img:  "https://images.unsplash.com/photo-1641893843833-a006778dc00b?w=700&h=900&fit=crop&auto=format"},
      { name: 'Half Shoes', sub: 'Classic Precision', img:  "https://images.unsplash.com/photo-1653868250624-21d56ad36602?w=800&h=1000&fit=crop&auto=format"},
      { name: "Women's", sub: 'Feminine Power', img:   "https://images.unsplash.com/photo-1563433337461-5b65f0834f3a?w=800&h=1000&fit=crop&auto=format"},
    ]
  
    return (
<section className="bg-[#0B0B0B] py-[100px]">
  <Container >
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

      <button className="btn-outline-white">
        View All
      </button>
    </div>

    {/* Categories */}
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
      {categories.map((cat) => (
        <button key={cat.name} className="img-zoom group relative aspect-[3/4] overflow-hidden rounded-2xl p-0 text-left">
          <img src={cat.img} alt={cat.name} className="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />

          {/* Dark gradient */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#0B0B0B]/85 via-transparent to-transparent" />

          {/* Gold top accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FAD90C] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Content */}
          <div className="absolute right-5 bottom-5 left-5">
            <div className="mb-1.5 text-[9px] font-medium uppercase tracking-[0.18em] text-[#FAD90C]">
              {cat.sub}
            </div>

            <div className="font-display text-[22px] font-semibold leading-[1.1] text-[#F8F6F2]">
              {cat.name}
            </div>

            <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-[#F8F6F2]/60">
              <span>Explore</span>
              <ArrowRight size={14} />
            </div>
          </div>
        </button>
      ))}
    </div>
  </Container>
</section>
    )
  }
  

  export default Collections