const Hero = ()  =>{
  return (
    <section className="relative flex min-h-[500px] items-center justify-center overflow-hidden bg-near-black px-10 pt-[120px] pb-20">
      {/* Watermark */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-display text-[clamp(80px,18vw,220px)] font-bold leading-none tracking-[0.2em]  text-gold/[0.04]">
        GALLERY
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[860px] text-center">
        {/* Kicker */}
        <div className="mb-8 inline-flex items-center gap-3">
          <div className="h-px w-10 bg-gold" />

          <span className="text-[11px] font-semibold uppercase tracking-[0.3em]  text-gold">
        Come on a journey with us
          </span>

          <div className="h-px w-10 bg-gold" />
        </div>

        <h1 className="font-display text-[clamp(48px,8vw,96px)] font-bold leading-[1.05] tracking-[-0.02em] text-white">
         PHOTO GALLERY
        </h1>

        {/* Gold Accent */}
        <div className="mx-auto mt-1 mb-8 h-[3px] w-16 bg-transparent" /> <p className="mx-auto mb-12 max-w-[800px] text-lg  text-white/70">
        From quiet details to moments of craftsmanship, this is where we share
        the images, stories, and inspiration that shape Signature By Sarah.          </p>
      </div>
    </section>
  );
}
export default Hero