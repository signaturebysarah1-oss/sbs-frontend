"use client";

import Container from "@/components/ui/shared/Container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Clock,
  GraduationCap,
  Users,
  Award,
  CheckCircle2,
  CalendarDays,
} from "lucide-react";

const faqs = [
  {
    q: "Do I need prior shoemaking experience?",
    a: "No. Our Foundation Programme is designed for complete beginners with no prior experience, while our Professional Programme and Master Craftsman Programme are ideal for shoemakers looking to refine their skills and advance their expertise.",
  },
  {
    q: "What programmes does SBS Academy offer?",
    a: "SBS Academy offers Foundation Programme (6 Months), Professional Programme (3 Months), Master Craftsman Programme (1 Month), as well as specialized training in Footwear Business & Brand Development, Footwear Design & Product Development, and Patina & Luxury Leather Finishing.",
  },
  {
    q: "How long does each programme last?",
    a: "Foundation Programme lasts 6 months, Professional Programme lasts 3 months, and Master Craftsman Programme lasts 1 month.",
  },
  {
    q: "What are the tuition fees?",
    a: "Foundation Programme: ₦600,000. Professional Programme: ₦400,000. Master Craftsman Programme: ₦300,000. Additional costs include the application form, SBS Craft Kit, and Academy T-Shirt.",
  },
  {
    q: "Are training materials included in tuition?",
    a: "No. Students purchase their own training materials throughout the programme. This helps students understand sourcing, material quality, pricing, and product costing.",
  },
  {
    q: "Will I receive a certificate after graduation?",
    a: "Yes. Students who successfully complete their programme requirements receive an SBS Academy Certificate of Completion.",
  },
  {
    q: "How do I apply?",
    a: "Purchase the application form, complete and submit it, receive admission confirmation, pay your tuition, obtain your required kit, and begin training on the scheduled date.",
  },
  {
    q: "Will I become part of the SIAC community?",
    a: "Yes. Every SBS Academy student becomes part of Shoemakers in Abuja Connect (SIAC), a community for networking, collaboration, and continuous professional growth.",
  },
];

const trainingInfo = [
  {
    icon: CalendarDays,
    title: "Training Mode",
    text: "Physical (On-site)",
  },
  {
    icon: Clock,
    title: "Schedule",
    text: "Monday - Friday | 8:30 AM - 5:00 PM",
  },
  {
    icon: GraduationCap,
    title: "Programme Duration",
    text: "1 Month, 3 Months, 6 Months & 12 Months",
  },
];

const applicants = [
  "Complete beginners with no prior experience",
  "Aspiring entrepreneurs building footwear brands",
  "Existing shoemakers improving craftsmanship",
  "Fashion enthusiasts passionate about footwear design",
  "Professionals transitioning into footwear",
];

const benefits = [
  "Certificate of Completion",
  "Hands-on practical training with real projects",
  "Personal mentorship from experienced instructors",
  "Access to SIAC professional community",
  "Opportunity to purchase SBS Apprentice Kit",
];

const FAQSection = () => {
  return (
    <section className="bg-off-white py-24">
      <Container>
        {/* HEADER */}

        <div className="mb-20 text-center">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#C9A227]">
            Academy Information
          </p>

          <h2 className="font-display text-5xl font-bold text-[#111]">
            Everything You Need To Know
          </h2>
        </div>

        {/* TRAINING FORMAT */}

        <div className="rounded-[35px] bg-[#111] p-10 lg:p-14">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.3em]  text-gold">
              Training Format
            </p>

            <h3 className="mt-3 font-display text-4xl font-bold text-white">
              Learn Through Experience
            </h3>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {trainingInfo.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <Icon className="mb-5 h-8 w-8  text-gold" />

                  <h4 className="font-semibold text-white">{item.title}</h4>

                  <p className="mt-2 text-sm text-white/60">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* WHO CAN APPLY + RECEIVE */}

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div className="rounded-[30px] bg-white p-10">
            <div className="mb-8 flex items-center gap-4">
              <Users className="h-8 w-8 text-[#C9A227]" />

              <h3 className="font-display text-3xl font-bold">
                Who Can Apply?
              </h3>
            </div>

            <div className="space-y-5">
              {applicants.map((item) => (
                <div key={item} className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#C9A227]" />

                  <p className="text-[#555]">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[30px] bg-white p-10">
            <div className="mb-8 flex items-center gap-4">
              <Award className="h-8 w-8 text-[#C9A227]" />

              <h3 className="font-display text-3xl font-bold">
                What You'll Receive
              </h3>
            </div>

            <div className="space-y-5">
              {benefits.map((item) => (
                <div key={item} className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#C9A227]" />

                  <p className="text-[#555]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ */}

        <div className="mx-auto max-w-3xl">

{/* Header */}
<div className="my-16 text-center">
  <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#C9A227]">
    Questions
  </p>

  <h2 className="font-display text-4xl font-bold text-[#111] lg:text-5xl">
    Frequently Asked
  </h2>

  <div className="mx-auto mt-8 h-0.75 w-20 bg-[#C9A227]" />
</div>


{/* Accordion */}
<div className="border-y border-border">

  <Accordion >

    {faqs.map((faq, index) => (
      <AccordionItem
        key={faq.q}
        value={`faq-${index}`}
        className="border-border"
      >

        <AccordionTrigger className="py-6 text-left font-display text-lg font-semibold text-[#111] hover:no-underline [&>svg]:text-[#C9A227]">
          {faq.q}
        </AccordionTrigger>


        <AccordionContent className="pb-6 text-[15px] leading-7 text-[#666]">
          {faq.a}
        </AccordionContent>


      </AccordionItem>
    ))}

  </Accordion>

</div>

</div>

        {/* <div className="mt-28 rounded-[32px] border border-gold/20 bg-linear-to-r from-[#151515] via-[#181818] to-[#151515] px-8 py-14 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.35em]  text-gold">
            Not Sure Where To Begin?
          </p>

          <h3 className="font-display text-4xl font-bold text-white">
            Find Your Learning Path
          </h3>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-white/60">
            Whether you're completely new to shoemaking or already crafting
            footwear professionally, we'll help you choose the programme that
            matches your experience and goals.
          </p>

          <button className="mt-10 rounded-xl bg-gold px-8 py-4 text-sm font-bold uppercase tracking-[0.25em] text-black transition hover:scale-105">
            Enrol Now
          </button>
        </div> */}
      </Container>
    </section>
  );
};
export default FAQSection;
