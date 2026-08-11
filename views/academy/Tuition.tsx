"use client";

import Container from "@/components/ui/shared/Container";
import {
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Package,
  Wallet,
} from "lucide-react";

const steps = [
  "Purchase the Application Form (₦10,000).",
  "Complete and submit the application form.",
  "Receive your admission decision.",
  "Pay the programme tuition and complete registration.",
  "Purchase the SBS Craft Kit & Academy T-shirt.",
  "Begin your training on the scheduled date.",
];

const requirements = [
  "Completed application form",
  "Payment of the application fee",
  "Commitment to attend classes",
  "Willingness to learn and maintain discipline",
  "Purchase of the SBS Craft Kit & Academy T-shirt before practical sessions",
];

const tuition = [
  {
    title: "Foundation Programme",
    duration: "6 Months",
    fee: "₦600,000",
  },
  {
    title: "Professional Programme",
    duration: "3 Months",
    fee: "₦400,000",
  },
  {
    title: "Master Craftsman Programme",
    duration: "1 Month",
    fee: "₦300,000",
  },
];

const kit = [
  "Scissors",
  "Zigzag Scissors",
  "Cutter",
  "Lasting Plier",
  "Lasting Nails",
  "Gum Brush",
  "Face Mask",
  "Masking Tape",
  "Measuring Tape",
  "Ruler",
  "Punches",
  "Handy Hammer",
  "French Curve",
  "Pencils",
  "Eraser",
  "White Pen",
];

const Admissions = () =>{
  return (
    <section className="bg-off-white py-20 lg:py-28">
      <Container className="">
        
        <div className="mb-20 text-center">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#C9A227]">
            Admissions
          </p>

          <h2 className="font-display text-5xl font-bold text-[#111]">
            Admissions & Tuition
          </h2>

          <div className="mx-auto mt-8 h-0.75 w-20 bg-[#C9A227]" />
        </div>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
  {/* Tuition Card */}
  <div className="rounded-[30px] bg-[#111] p-10">
    <div className="mb-10 flex items-center gap-4">
      <Wallet className="h-7 w-7  text-gold" />

      <h3 className="font-display text-3xl font-bold text-white">
        Programme Tuition
      </h3>
    </div>

    <div className="space-y-5">
      {tuition.map((item) => (
        <div
          key={item.title}
          className="rounded-2xl border border-white/10 p-6"
        >
          <div className="lg:flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-white">
                {item.title}
              </h4>

              <p className="mt-1 text-sm text-white/50">
                {item.duration}
              </p>
            </div>

            <span className="font-display text-3xl font-bold  text-gold">
              {item.fee}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>


  {/* Investment Card */}
  <div className="rounded-[30px] border border-border bg-white p-10">
    <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#C9A227]">
      Your Investment
    </p>

    <h3 className="font-display text-4xl font-bold text-[#111]">
      More Than A Skill.
      <br />
      A Career Path.
    </h3>

    <p className="mt-6 leading-8 text-[#555]">
      SBS Academy equips you with the craftsmanship, business knowledge,
      and professional confidence required to build a successful footwear
      career.
    </p>


    <div className="mt-10 space-y-5">
    
      {[
        "100% Practical Training",
        "Industry & Business Mindset",
        "Build a profitable footwear brand",
      ].map((item)=>(
        <div
          key={item}
          className="flex items-center gap-3"
        >
          <CheckCircle2 className="h-5 w-5 text-[#C9A227]" />

          <span className="text-[#333]">
            {item}
          </span>
        </div>
      ))}

    </div>


    <button className="mt-10 rounded-xl bg-[#111] px-8 py-4 text-sm font-bold uppercase tracking-[0.2em]  text-gold transition hover:bg-black">
      Apply Now
    </button>

  </div>
</div>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_.8fr] mt-10">
          {/* LEFT */}

          <div className="flex flex-col justify-between gap-10 lg:gap-20">
            {/* HOW TO APPLY */}

            <div className="rounded-[30px] bg-white p-10 shadow-sm">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/10">
                  <GraduationCap className="h-7 w-7 text-[#C9A227]" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[#C9A227]">
                    Step by Step
                  </p>

                  <h3 className="font-display text-3xl font-bold">
                    How To Apply
                  </h3>
                </div>
              </div>

              <div className="space-y-6">
                {steps.map((step, index) => (
                  <div key={step} className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111] text-sm font-bold  text-gold">
                        {index + 1}
                      </div>

                      {index !== steps.length - 1 && (
                        <div className="mt-2 h-full w-0.5 bg-gold/30" />
                      )}
                    </div>

                    <div className="pb-10">
                      <p className="leading-7 text-[#555]">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* REQUIREMENTS */}

            {/* <div className="rounded-[30px] bg-[#111] p-10">
              <h3 className="font-display mb-8 text-3xl font-bold text-white">
                Admission Requirements
              </h3>

              <div className="space-y-5">
                {requirements.map((item) => (
                  <div key={item} className="flex gap-4">
                    <CheckCircle2 className="mt-1 h-5 w-5  text-gold" />

                    <p className="text-white/70">{item}</p>
                  </div>
                ))}
              </div>
            </div> */}
          </div>

          {/* RIGHT */}

          <div className="space-y-8">
            {/* Tuition */}

        

            {/* KIT */}

            <div className="rounded-[30px] h-full bg-white p-10 shadow-sm">
              <div className="mb-8 flex items-center gap-4">
                <Package className="h-7 w-7 text-[#C9A227]" />

                <h3 className="font-display text-3xl font-bold">
                  SBS Craft Kit
                </h3>
              </div>

              <div className="mb-6 rounded-xl bg-off-white p-5 text-sm font-semibold text-[#444]">
                <strong>Compulsory For:</strong>
                <br />
                Foundation Programme
                <br />
                Professional Programme
              </div>

              <div className="grid grid-cols-2 gap-5">
                {kit.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 rounded-lg bg-off-white px-3 py-2"
                  >
                    <ArrowRight className="h-4 w-4 text-[#C9A227]" />

                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}

            {/* <div className="rounded-[30px] bg-gold p-10 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em]">
                Ready To Begin?
              </p>

              <h3 className="font-display text-4xl font-bold">
                Apply Today
              </h3>

              <button className="mt-8 rounded-xl bg-[#111] px-8 py-4 text-sm font-bold uppercase tracking-[0.2em]  text-gold transition hover:bg-black">
                Purchase Application Form
              </button>
            </div> */}
          </div>
        </div>
      
      </Container>
    </section>
  );
}
export default Admissions;