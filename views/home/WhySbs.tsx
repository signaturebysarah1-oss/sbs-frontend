import Container from "@/components/ui/shared/Container"

const WhySBSSection = () =>{
    const features = [
      { icon: '◆', title: 'Handcrafted Leather', desc: 'Every pair is shaped and finished by master artisans, not machines.' },
      { icon: '◈', title: 'Premium Materials', desc: 'Only the finest full-grain and vegetable-tanned hides from certified tanneries.' },
      { icon: '◉', title: 'Custom Made', desc: 'Your measurements, your vision, realized to perfection by our craftspeople.' },
      { icon: '▶', title: 'Worldwide Delivery', desc: 'Discreet, insured shipping to over 30 countries worldwide.' },
      { icon: '◐', title: 'Expert Craftsmanship', desc: 'Decades of combined experience in the world\'s finest leatherworking traditions.' },
      { icon: '◑', title: 'Built to Last', desc: 'Resoleable construction means your investment appreciates with every repair.' },
      { icon: '◇', title: 'Bespoke Experience', desc: 'A private consultation process as refined as the shoes themselves.' },
    ]
  
    return (
        <section className="bg-[#0B0B0B] py-[120px]">
        <Container>
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">
      
            {/* Left */}
            <div className="lg:sticky lg:top-[100px]">
              <div className="mb-5 flex items-center gap-3">
                <span className="block h-[2px] w-10 bg-[#FAD90C]" />
      
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FAD90C]">
                  Why SBS
                </span>
              </div>
      
              <h2 className="mb-6 font-display text-[clamp(32px,3.5vw,52px)] font-bold leading-[1.1] tracking-[-0.01em] text-[#F8F6F2]">
                Where Craft
                <br />
                Meets
                <br />
                <em className="text-[#FAD90C]">Distinction.</em>
              </h2>
      
              <p className="max-w-[320px] text-[14px] font-light leading-[1.8] text-[#F8F6F2]/50">
                Signature by Sarah was born from the belief that African craftsmanship deserves to stand alongside the world's finest luxury houses.
              </p>
            </div>
      
      
            {/* Right: Grid */}
            <div className="grid grid-cols-1 gap-[2px] sm:grid-cols-2">
              {features.map((f, i) => (
                <div
                  key={f.title}
                  className={`cursor-default border border-[#F8F6F2]/[0.06] p-8 transition-colors duration-300 hover:border-[#FAD90C]/20 hover:bg-[#FAD90C]/[0.07] ${i % 3 === 0 ? "bg-[#FAD90C]/[0.04]" : "bg-[#F8F6F2]/[0.02]"}`}
                >
                  <div className="mb-4 font-display text-2xl text-[#FAD90C]">
                    {f.icon}
                  </div>
      
                  <h3 className="mb-2.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#F8F6F2]">
                    {f.title}
                  </h3>
      
                  <p className="text-[13px] font-light leading-[1.7] text-[#F8F6F2]/50">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
      
          </div>
        </Container>
      </section>
    )
  }
  export default WhySBSSection