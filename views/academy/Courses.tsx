"use client";

import Container from "@/components/ui/shared/Container";
import {
  BookOpen,
  BriefcaseBusiness,
  Crown,
  Palette,
  Sparkles,
  ArrowDown,
} from "lucide-react";

const programmes = [
  {
    number: "01",
    title: "Foundation Programme",
    level: "Beginner Level",
    icon: BookOpen,
    description:
      "Designed for individuals with little or no experience. Learn the fundamentals of bespoke shoemaking—from foot measurement and pattern making to lasting, sole construction, finishing, and quality craftsmanship.",
    skills: [
      "Foot Measurement",
      "Pattern Making",
      "Lasting",
      "Sole Construction",
    ],
  },
  {
    number: "02",
    title: "Professional Programme",
    level: "Intermediate Level",
    icon: Sparkles,
    description:
      "Refine your craftsmanship, improve product quality, master advanced construction techniques, and confidently solve real production challenges.",
    skills: [
      "Advanced Construction",
      "Quality Control",
      "Precision Craft",
      "Production Skills",
    ],
  },
  {
    number: "03",
    title: "Master Craftsman",
    level: "Advanced Level",
    icon: Crown,
    description:
      "Produce world-class footwear through luxury craftsmanship, advanced finishing, product development, quality assurance, and international production standards.",
    skills: [
      "Luxury Craft",
      "Quality Assurance",
      "Product Development",
      "International Standards",
    ],
  },
  {
    number: "04",
    title: "Business & Brand Development",
    level: "Business Programme",
    icon: BriefcaseBusiness,
    description:
      "Learn branding, pricing, marketing, customer experience, sales, and business strategy needed to build a profitable footwear brand.",
    skills: [
      "Brand Strategy",
      "Pricing",
      "Marketing",
      "Sales",
    ],
  },
  {
    number: "05",
    title: "Footwear Design",
    level: "Creative Programme",
    icon: Palette,
    description:
      "Develop original footwear concepts through sketching, design thinking, collection development, and creative problem-solving.",
    skills: [
      "Sketching",
      "Collection Design",
      "Concept Development",
      "Creative Thinking",
    ],
  },
  {
    number: "06",
    title: "Patina & Luxury Leather Finishing",
    level: "Specialization",
    icon: Sparkles,
    description:
      "Master premium dyeing techniques, colour blending, antique effects, restoration, and luxury leather finishing.",
    skills: [
      "Patina",
      "Leather Dyeing",
      "Restoration",
      "Luxury Finish",
    ],
  },
];

const ProgrammeCard = ({
  programme,
  reverse,
}: {
  programme: (typeof programmes)[0];
  reverse?: boolean;
}) => {
  const Icon = programme.icon;

  return (
    <div
      className={`relative flex items-center gap-10 ${
        reverse ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Card */}
      <div className="group w-full rounded-3xl border border-white/10 bg-[#141414] p-8 transition-all duration-500 hover:-translate-y-2 hover:border-[#FAD90C]/40 hover:bg-[#1A1A1A] lg:w-[46%]">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#FAD90C]">
              {programme.level}
            </p>

            <h3 className="font-display mt-3 text-3xl font-bold text-white">
              {programme.title}
            </h3>
          </div>

          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FAD90C]/10 ring-1 ring-[#FAD90C]/20">
            <Icon className="h-8 w-8 text-[#FAD90C]" />
          </div>
        </div>

        <p className="leading-8 text-white/60">
          {programme.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {programme.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-[#FAD90C]/20 bg-[#FAD90C]/5 px-4 py-2 text-xs uppercase tracking-wider text-[#FAD90C]"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#FAD90C] bg-[#0B0B0B]">
          <span className="font-display text-3xl font-bold text-[#FAD90C]">
            {programme.number}
          </span>

          <div className="absolute -bottom-24 left-1/2 h-24 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#FAD90C] to-transparent" />
        </div>
      </div>

      <div className="hidden lg:block lg:w-[46%]" />
    </div>
  );
};

const Courses = () => {
  return (
    <section className="bg-[#0B0B0B]  py-24 ">
      <Container className="">
        {/* Header */}

        <div className="mx-auto mb-24 max-w-3xl text-center">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#FAD90C]">
            SBS CURRICULUM
          </p>

          <h2 className="font-display text-4xl font-bold text-white lg:text-6xl">
            Our Training Programmes
          </h2>

          <div className="mx-auto my-8 h-[3px] w-20 bg-[#FAD90C]" />

          <p className="text-lg leading-8 text-white/60">
            Every programme is intentionally designed to move you from learning
            the fundamentals to mastering luxury bespoke footwear while building
            a successful business and career.
          </p>
        </div>

        {/* Journey */}

        <div className="relative space-y-24">
          <div className="absolute left-1/2 top-0 hidden h-full w-[2px] -translate-x-1/2 bg-[#FAD90C]/20 lg:block" />

          {programmes.map((programme, index) => (
            <div key={programme.number}>
              <ProgrammeCard
                programme={programme}
                reverse={index % 2 !== 0}
              />

              {index !== programmes.length - 1 && (
                <div className="mt-10 flex justify-center lg:hidden">
                  <ArrowDown className="h-8 w-8 text-[#FAD90C]" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}

  
      </Container  >
    </section>
  );
};

export default Courses;