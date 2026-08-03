"use client";
import { useQuery } from "@tanstack/react-query";
import Collections from "./Collections";
import FeaturedCollection from "./FeaturedCollections";
import Hero from "./Hero";
import ProcessSection from "./Process";
import WhySBSSection from "./WhySbs";
import { getProducts } from "@/providers/get";
import HeroAnimation from "./HeroAnimation";
import Container from "@/components/ui/shared/Container";
import PageLoader from "@/components/ui/PageLoader";

const HomePage = () => {
  const {
    data: items,
    isLoading: featuredLoading,
    error: featuredError,
  } = useQuery({
    queryKey: ["featured-collections"],
    queryFn: () => getProducts("api/collections?featured=true"),
  });
  
  const {
    data: collection,
    isLoading: collectionLoading,
    error: collectionError,
  } = useQuery({
    queryKey: ["home-collections"],
    queryFn: () => getProducts("api/collections"),
  });
  
  const {
    data: animation,
    isLoading: animationLoading,
    error: animationError,
  } = useQuery({
    queryKey: ["hero-carousel"],
    queryFn: () => getProducts("api/home/carousel"),
  });
  
  
  const isLoading =
    featuredLoading ||
    collectionLoading ||
    animationLoading;
  
  
  const error =
    featuredError ||
    collectionError ||
    animationError;
  
  
  if (isLoading || collectionLoading || animationLoading) {
    return <PageLoader />;
  }
  
  
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F6F2]">
        <span className="text-sm font-medium uppercase tracking-[0.2em] text-[#0B0B0B]">
          Failed to load homepage
        </span>
      </div>
    );
  }
  

  // if (isLoading) {
  //   return <div className="flex h-screen items-center justify-center">Loading...</div>;
  // }

  // if (error || heroImages.length === 0) {
  //   return (
  //     <div className="flex h-screen items-center justify-center">
  //       Failed to load carousel images
  //     </div>
  //   );
  // }
  return (
    <div>
      <section
        style={{
          minHeight: "100vh",
          background: "#F8F6F2",
          paddingTop: "72px",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "stretch",
        }}
      >
        {/* watermark text */}
        <div className="absolute top-1/2 left-[-3%] z-0 -translate-y-1/2 select-none pointer-events-none whitespace-nowrap font-display text-[clamp(80px,14vw,200px)] font-black tracking-[-0.02em] leading-none text-transparent [-webkit-text-stroke:1px_rgba(11,11,11,0.06)]">
          HANDCRAFTED
        </div>

        {/* Gold  triangle  */}
        <div className="absolute bottom-[12%] right-[42%] z-0 h-0 w-0 border-l-28 border-r-28 border-b-48 border-l-transparent border-r-transparent border-b-gold/20" />

        <div className="absolute top-[18%] right-[38%] z-0 h-0 w-0 border-y-18 border-y-transparent border-l-30 border-l-gold/10" />
        <Container>
          <div className="relative z-[1] mx-auto grid  grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="py-10">
              <div className="mb-8 flex items-center gap-3">
                <span className="gold-line" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#0B0B0B]">
                  Abuja · Nigeria · Est. 2020
                </span>
              </div>

              <h1 className="mb-7 text-[70px] font-display leading-18.5 font-bold  tracking-[-0.01em] text-[#0B0B0B]">
                Handcrafted
                <br />
                Leather Footwear
                <br />
                <em className="font-normal italic  text-[#0B0B0B]">
                  Made for Distinction.
                </em>
              </h1>

              <p className="mb-11 max-w-105 text-[15px] font-light leading-[1.75] text-[#666]">
                Every pair tells a story of mastery. Sourced from the finest
                leathers, shaped by expert hands, worn by those who demand
                nothing less than extraordinary.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="btn-gold rounded-sm">Shop Collection</button>
                <button className="btn-outline rounded-sm">Custom Order</button>
              </div>
            </div>

            <HeroAnimation  data={animation?.data}/>
          </div>
        </Container>
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#999]">
            Scroll
          </span>

          <div className="h-10 w-px bg-linear-to-b from-[#999] to-transparent" />
        </div>
      </section>
      <Collections data={collection?.data} />
      <FeaturedCollection data={items?.data} />
      <WhySBSSection />
      <ProcessSection />
    </div>
  );
};

export default HomePage;
