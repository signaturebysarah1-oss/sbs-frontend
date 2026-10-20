import Container from "@/components/ui/shared/Container";
import Link from "next/link";

const ProcessSection = () => {
  const steps = [
    {
      n: "01",
      title: "Consultation",
      desc: "We begin with a private one-on-one session to understand your vision, requirements, and lifestyle.",
    },
    {
      n: "02",
      title: "Material Selection",
      desc: "Choose from our curated archive of fine leathers — full-grain, suede, nubuck, patent, and more.",
    },
    {
      n: "03",
      title: "Measurements",
      desc: "Detailed foot measurements ensure a fit that feels like a second skin from the first wear.",
    },
    {
      n: "04",
      title: "Crafting",
      desc: "Your shoes take shape over 60+ hours of skilled handwork in our Lagos atelier.",
    },
    {
      n: "05",
      title: "Quality Inspection",
      desc: "Every stitch and edge is scrutinized against our uncompromising standard before it leaves the workshop.",
    },
    {
      n: "06",
      title: "Nationwide Delivery",
      desc: "Your finished masterpiece arrives in our signature black box, insured and delivered to your door.",
    },
  ];

  return (
    <section className="bg-off-white py-24 lg:py-30">
      <Container>
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="block h-0.5 w-10 bg-gold" />
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-near-black">
                The Process
              </span>
            </div>

            <h2 className="mb-12 font-display text-[clamp(30px,3.5vw,50px)] font-bold leading-[1.1] tracking-[-0.01em] text-near-black">
              Your Custom Shoe,
              <br />
              <em>Step by Step.</em>
            </h2>

            <div className="flex flex-col">
              {steps.map((step, i) => (
                <div key={step.n} className="relative flex gap-6">
                  {/* Timeline */}
                  <div className="flex  shrink-0 flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-near-black">
                      <span className="font-display text-[13px] font-bold text-gold">
                        {step.n}
                      </span>
                    </div>

                    {i < steps.length - 1 && (
                      <div className="my-2 min-h-8 flex-1 w-px bg-linear-to-b from-border to-transparent" />
                    )}
                  </div>

                  <div className={i < steps.length - 1 ? "pb-8" : ""}>
                    <h3 className="mb-1.5 font-sans text-sm font-semibold uppercase tracking-[0.06em] text-near-black">
                      {step.title}
                    </h3>

                    <p className="font-sans text-[13px] font-light leading-7 text-[#888]">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <Link href={"/custom"} className="btn-gold">Start Custom Order</Link>
            </div>
          </div>

          {/* Right */}
          <div className="img-zoom relative hidden lg:flex  h-165 overflow-hidden rounded-[20px]">
            <img
              src="https://images.unsplash.com/photo-1653868250624-21d56ad36602?w=800&h=1000&fit=crop&auto=format"
              alt="SBS atelier craftsperson at work"
              className="h-full w-full object-cover"
            />

            <div className="absolute right-6 bottom-6 left-6 rounded-xl bg-[rgba(11,11,11,0.85)] p-5 backdrop-blur-md">
              <div className="mb-1.5 font-sans text-[9px] uppercase tracking-[0.2em] text-gold">
                Production Time
              </div>

              <div className="font-display text-lg font-semibold text-off-white">
                3–4 Weeks · Nationwide Delivery
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProcessSection;