const Hero = ()  =>{
    return (
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0B0B0B] px-10 pt-[120px] pb-20">
        {/* Watermark */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-display text-[clamp(80px,18vw,220px)] font-bold leading-none tracking-[0.2em] text-[#FAD90C]/[0.04]">
          ACADEMY
        </div>
  
        {/* Content */}
        <div className="relative z-10 max-w-[860px] text-center">
          {/* Kicker */}
          <div className="mb-8 inline-flex items-center gap-3">
            <div className="h-px w-10 bg-[#FAD90C]" />
  
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#FAD90C]">
            Master the Art of Bespoke Shoemaking
            </span>
  
            <div className="h-px w-10 bg-[#FAD90C]" />
          </div>
  
          <h1 className="font-display text-[clamp(48px,8vw,96px)] font-bold leading-[1.05] tracking-[-0.02em] text-white">
            SBS Academy
          </h1>
  
          {/* Gold Accent */}
          <div className="mx-auto mt-7 mb-8 h-[3px] w-16 bg-[#FAD90C]" />
  
          <p className="mx-auto mb-12 max-w-[800px] text-lg  text-white/70">
          At SBS Academy, we provide intensive, hands-on training designed to equip you with the practical skills, confidence, and professional knowledge needed to excel in bespoke shoemaking. Beyond teaching the craft, we transfer the mindset, discipline, and business principles that transform a skill into a successful career. Our goal is to raise skilled shoemakers who create exceptional footwear and build thriving brands.
          </p>
  
          <a
            href="#pathways"
            className="inline-block bg-[#FAD90C] px-11 py-4 text-[13px] font-bold uppercase tracking-[0.15em] text-[#0B0B0B] transition-opacity duration-200 hover:opacity-85"
          >
            Enroll Now
          </a>
        </div>
      </section>
    );
  }
  export default Hero