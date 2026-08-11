import Container from "@/components/ui/shared/Container";
import ScrollTypewriter from "@/components/ui/shared/Typewriter";

const Hero = () => {
  return (
    <div className="bg-off-white pt-18">
      <div className="relative flex min-h-[420px] items-center overflow-hidden bg-near-black">
        <div className="absolute top-0 right-0 bottom-0 w-[55%]">
          <img
            src="https://images.unsplash.com/photo-1711356240240-2516c04b3585?w=900&h=500&fit=crop&auto=format"
            alt=""
            className="h-full w-full object-cover opacity-35"
          />

          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0B0B0B_15%,transparent_55%,#0B0B0B_100%)]" />
        </div>

        <div className="pointer-events-none absolute right-[-10px] bottom-[-20px] z-0 select-none font-display text-[clamp(100px,18vw,260px)] font-black leading-none tracking-[-0.04em] text-transparent [-webkit-text-stroke:1px_rgba(250,217,12,0.18)]">
          SBS
        </div>
        <Container className="relative z-10 mx-auto   py-20">
          <div className="mb-[18px] flex items-center gap-[14px]">
            <span className="block h-0.5 w-11 bg-gold" />

            <span className="text-[10px] font-bold uppercase tracking-[0.22em]  text-gold">
              The Collection
            </span>
          </div>

          <h1 className="mb-6 font-display text-[clamp(48px,7vw,100px)] font-bold leading-[0.95] tracking-[-0.03em] text-off-white">
            All
            <br />
            <em className="font-normal italic  text-gold">
              <ScrollTypewriter text={"Products"} />
            </em>
          </h1>

          <p className="max-w-[460px] text-sm font-light leading-7 text-off-white/55">
            Every piece in the SBS catalogue — handcrafted in Lagos from the
            world's finest leathers. Explore the full range of footwear and
            accessories.
          </p>

          <div className="mt-10 flex gap-8">
            {[
              ["12", "Styles"],
              ["4", "Collections"],
              ["8", "Materials"],
            ].map(([number, label]) => (
              <div key={label}>
                <div className="font-display text-[28px] font-bold tracking-[-0.02em]  text-gold">
                  {number}
                </div>

                <div className="mt-0.5 text-[10px] uppercase tracking-[0.14em] text-off-white/40">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Hero;
