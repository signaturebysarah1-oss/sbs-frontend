import Container from "@/components/ui/shared/Container";

const About = () => {
  return (
    <section className="bg-[#F8F6F2] py-16 lg:py-28">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
        {/* Text */}
        <div>
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#FAD90C]">
            Our Story
          </p>

          <h2 className="font-display mb-7 text-4xl font-bold leading-tight text-[#0B0B0B] lg:text-5xl">
            About SBS Academy
          </h2>

          <div className="mb-8 h-[3px] w-12 bg-[#FAD90C]" />

          <p className="mb-6 text-[17px] leading-8 text-[#555]">
            SBS Academy exists to raise a new generation of skilled shoemakers
            who will redefine the standard of African craftsmanship. We believe
            shoemaking is more than a vocational skill—it is a profession, a
            business, and a pathway to lasting impact.
          </p>

          <p className="mb-10 text-[17px] leading-8 text-[#555]">
            Our academy equips aspiring shoemakers, entrepreneurs, and fashion
            enthusiasts with practical skills, the right mindset, and business
            knowledge to build successful careers and brands. Beyond individual
            success, we are committed to elevating the standard of Nigerian
            footwear by developing professionals who pursue excellence, embrace
            innovation, and compete confidently on the global stage.
            <br />
            <br />
            At SBS Academy, we are not just teaching shoemaking—we are shaping
            the future of the footwear industry, one craftsman at a time.
          </p>

          <div className="flex flex-wrap gap-10 border-t border-[#E5E0D7] pt-8">
            {/* {[
              ["12+", " Practical Training"],
              ["800+", "Industry & Business Mindset"],
              ["30+", "Build a Profitable Footwear Brand"],
            ].map(([num, label]) => (
              <div key={label}>
                <div className="font-display text-4xl font-bold leading-none text-[#0B0B0B]">
                  {num}
                </div>

                <div className="mt-1 text-xs uppercase tracking-[0.1em] text-[#888]">
                  {label}
                </div>
              </div>
            ))} */}
          </div>
        </div>

        {/* Image */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1607969889240-47791571f4d2?w=700&h=900&fit=crop&auto=format"
            alt="Leathercraft artisan at work"
            className="aspect-[7/9] w-full object-cover"
          />

          <div className="pointer-events-none absolute -right-4 -bottom-4 h-20 w-20 border-[3px] border-[#FAD90C]" />
        </div>
      </Container>
    </section>
  );
};
export default About;
