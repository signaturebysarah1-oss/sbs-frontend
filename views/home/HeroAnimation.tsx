"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/providers/get";
import { HeroCarousel } from "@/types/website";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
  }),
  center: {
    x: 0,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
  }),
};

interface HeroAnimation {
  data: HeroCarousel[];
}

const HeroAnimation = ({ data }: HeroAnimation) => {
  const items = data || [];

  const [activeImage, setActiveImage] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  // const {
  //   data,
  //   isLoading,
  //   error,
  // } = useQuery({
  //   queryKey: ["hero-carousel"],
  //   queryFn: () => getProducts("api/home/carousel"),
  // });

  const heroImages =
    data?.map((item: { imageUrl: string }) => item.imageUrl) || [];

  const showImage = (nextImage: number) => {
    if (nextImage === activeImage) return;

    setSlideDirection(nextImage > activeImage ? 1 : -1);
    setActiveImage(nextImage);
  };

  useEffect(() => {
    if (isHoveringImage || heroImages.length === 0) return;

    const interval = window.setInterval(() => {
      setSlideDirection(1);
      setActiveImage(
        (currentImage) => (currentImage + 1) % heroImages.length
      );
    }, 4500);

    return () => window.clearInterval(interval);
  }, [isHoveringImage, heroImages.length]);

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
      <div className="relative flex h-[calc(100vh-72px)] max-h-[780px] items-center justify-center">
        <div className="absolute top-[10%] right-[6%] z-0 h-[80%] w-[65%] rounded-[20px] border border-[#FAD90C]/25" />

        <div
          className="img-zoom relative z-[1] h-[85%] w-[80%] overflow-hidden rounded-[20px] shadow-[0_32px_80px_rgba(0,0,0,0.12)]"
          onMouseEnter={() => setIsHoveringImage(true)}
          onMouseLeave={() => setIsHoveringImage(false)}
        >
          <AnimatePresence initial={false} custom={slideDirection}>
            <motion.div
              key={heroImages[activeImage]}
              custom={slideDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.75,
                ease: "easeInOut",
              }}
              className="absolute inset-0"
            >
              <Image
                src={heroImages[activeImage]}
                alt={`Signature by Sarah footwear collection, look ${
                  activeImage + 1
                }`}
                fill
                priority={activeImage === 0}
                sizes="(max-width: 1024px) 80vw, 560px"
                className="object-cover object-top"
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute right-0 bottom-0 left-0 z-[1] h-[30px] bg-gradient-to-r from-black to-transparent" />
        </div>

        <div className="pointer-events-none absolute bottom-[4%] left-[6%] z-[1] h-20 w-60 rounded-full bg-gradient-to-r from-[#E3E0D9]/85 via-[#E3E0D9]/45 to-transparent blur-xl" />

        <div
          className="absolute bottom-[7.5%] left-[13%] z-[2] flex items-center gap-1"
          aria-label="Hero image navigation"
        >
          {heroImages.map((image: string, index: number) => {
            const isActive = index === activeImage;

            return (
              <button
                key={index}
                type="button"
                aria-label={`Show image ${index + 1}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => showImage(index)}
                className="flex h-8 w-9 items-center justify-center"
              >
                <motion.span
                  layout
                  transition={{
                    duration: 0.65,
                    ease: "easeInOut",
                  }}
                  className={
                    isActive
                      ? "h-0.5 rounded-full bg-[#FAD90C]"
                      : "h-0.5 rounded-full bg-white"
                  }
                  animate={{
                    width: isActive ? 28 : 24,
                    opacity: isActive ? 1 : 0.65,
                  }}
                />
              </button>
            );
          })}
        </div>

        <div className="absolute bottom-[14%] left-0 z-[2] rounded-xl bg-[#0B0B0B] px-5 py-4 text-[#F8F6F2] shadow-[0_12px_40px_rgba(0,0,0,0.2)]">
          <div className="mb-1.5 text-[9px] uppercase tracking-[0.18em] text-[#FAD90C]">
            New Arrival
          </div>

          <div className="text-[15px] font-semibold">
            The Abuja Loafer
          </div>

          <div className="mt-1 text-xs text-[#F8F6F2]/60">
            Full Grain Leather · ₦185,000
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroAnimation;