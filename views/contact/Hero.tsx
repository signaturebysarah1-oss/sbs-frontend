import Container from "@/components/ui/shared/Container";

const Hero = () => {
  return (
    <div className="bg-near-black pt-30 px-8 pb-20">
      <Container className="">
        <div className="mb-4 flex items-center gap-3">
          <span className="block h-0.5 w-10 bg-gold" />

          <span className="text-[10px] font-semibold uppercase tracking-[0.22em]  text-gold">
            Get in Touch
          </span>
        </div>

        <h1 className="font-display text-4xl font-bold tracking-[-0.02em] text-off-white md:text-5xl lg:text-7xl">
          Contact Us
        </h1>
      </Container>
    </div>
  );
};

export default Hero;
