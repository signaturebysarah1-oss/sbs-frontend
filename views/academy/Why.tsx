import Container from "@/components/ui/shared/Container";
import {
  Hammer,
  Award,
  BriefcaseBusiness,
  Users,
  Wrench,
  GraduationCap,
  Network,
} from "lucide-react";

export const whyCards = [
  {
    title: "100% Practical Training",
    desc: "Learn through intensive, hands-on training designed to build confidence, competence, and mastery in bespoke shoemaking.",
    icon: Hammer,
  },
  {
    title: "Excellence-Driven Learning",
    desc: "Develop the precision, craftsmanship, and attention to detail required to create footwear that meets world-class standards.",
    icon: Award,
  },
  {
    title: "Business & Brand Development",
    desc: "Gain practical knowledge in branding, pricing, customer experience, and entrepreneurship to build a profitable footwear business.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Personalized Mentorship",
    desc: "Benefit from small class sizes, one-on-one guidance, and close support from experienced instructors throughout your training.",
    icon: Users,
  },
  {
    title: "Industry-Relevant Skills",
    desc: "Master modern shoemaking techniques, material selection, and professional production processes that prepare you for today's market.",
    icon: Wrench,
  },
  {
    title: "Support Beyond Graduation",
    desc: "Your learning doesn't end after graduation. We continue to provide mentorship, guidance, and support as you grow your career and build your brand.",
    icon: GraduationCap,
  },
  {
    title: "Shoemakers in Abuja Connect (SIAC)",
    desc: "Join a growing footwear community built around collaboration, innovation, networking, and raising the standard of African craftsmanship.",
    icon: Network,
  },
];

const WhyCard = ({ card, featured = false }: any) => {
  const Icon = card.icon;

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border border-white/10 p-8 transition-all duration-500 ${
        featured
          ? "bg-gold text-[#111]"
          : "bg-[#151515] text-white hover:-translate-y-2 hover:border-gold/40"
      }`}
    >
      <div
        className={`absolute right-0 top-0 h-32 w-32 rounded-full blur-3xl ${
          featured ? "bg-black/10" : "bg-gold/10"
        }`}
      />

      <div
        className={`relative mb-8 flex h-14 w-14 items-center justify-center rounded-2xl ${
          featured ? "bg-[#111]" : "border border-gold/30 bg-gold/10"
        }`}
      >
        <Icon
          className={`h-7 w-7 ${
            featured ? " text-gold" : " text-gold"
          }`}
          strokeWidth={1.7}
        />
      </div>

      <h3
        className={`relative mb-4 font-display text-2xl font-bold ${
          featured ? "text-[#111]" : "text-white"
        }`}
      >
        {card.title}
      </h3>

      <p
        className={`relative leading-7 ${
          featured ? "text-[#111]/70" : "text-white/60"
        }`}
      >
        {card.desc}
      </p>
    </div>
  );
};

const WhyLearn = () => {
  return (
    <section className="bg-near-black py-24">
      <Container>
        <div className="mb-16 text-center">
          <p className="text-[11px] uppercase tracking-[0.3em]  text-gold">
            The SBS Difference
          </p>

          <h2 className="mt-4 font-display text-5xl font-bold text-white">
            Why Learn at SBS Academy?
          </h2>
        </div>

        <div className="space-y-0 border-t border-white/10">
          {whyCards.map((card, index) => (
            <div
              key={card.title}
              className={`
            group grid gap-6 border-b border-white/10 py-10 transition
            md:grid-cols-[80px_1fr_2fr]
            ${
              index === 6
                ? "bg-gold px-8 rounded-3xl my-8 border-none"
                : ""
            }
            `}
            >
              <span
                className={`
              font-display text-4xl font-bold
              ${index === 6 ? "text-black/30" : " text-gold/40"}
              `}
              >
                0{index + 1}
              </span>

              <h3
                className={`
              font-display text-2xl font-bold
              ${index === 6 ? "text-black" : "text-white"}
              `}
              >
                {card.title}
              </h3>

              <p
                className={`
              leading-8
              ${index === 6 ? "text-black/70" : "text-white/60"}
              `}
              >
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default WhyLearn;
