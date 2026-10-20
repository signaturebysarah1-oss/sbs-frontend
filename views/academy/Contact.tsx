"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight, Check, GraduationCap, Sparkles } from "lucide-react";
import Container from "@/components/ui/shared/Container";
import { useRegisterAcademy } from "@/hooks/useSubmitContacts";
import SuccessModal from "@/components/ui/modals/SuccesModal";

const AcademyRegistration = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const { mutate: registerAcademy, isPending } = useRegisterAcademy();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    experienceLevel: "" as "" | "beginner" | "intermediate" | "advanced",
    motivation: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.fullName.trim()) {
      toast.error("Please enter your full name");
      return;
    }

    if (!form.email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    if (!form.phone.trim()) {
      toast.error("Please enter your phone number");
      return;
    }

    if (!form.country.trim()) {
      toast.error("Please enter your country");
      return;
    }

    if (!form.experienceLevel) {
      toast.error("Please select your experience level");
      return;
    }

    if (!form.motivation.trim()) {
      toast.error("Please tell us why you want to join");
      return;
    }

    registerAcademy(
      {
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        country: form.country.trim(),
        experienceLevel: form.experienceLevel,
        motivation: form.motivation.trim(),
      },
      {
        onSuccess: () => {
          // toast.success("Application submitted successfully");
          setShowSuccess(true);

          setForm({
            fullName: "",
            email: "",
            phone: "",
            country: "",
            experienceLevel: "",
            motivation: "",
          });
        },

        onError: (error: any) => {
          console.error(error);
          toast.error(
            error?.message || "Failed to submit application. Please try again."
          );
        },
      }
    );
  };

  const experienceLevels = [
    {
      value: "beginner" as const,
      title: "Beginner",
      description: "I'm completely new",
    },
    {
      value: "intermediate" as const,
      title: "Intermediate",
      description: "I have some experience",
    },
    {
      value: "advanced" as const,
      title: "Advanced",
      description: "I want to refine my craft",
    },
  ];

  return (
    <section className="bg-[#0B0B0B] py-20 text-white lg:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-20">
          {/* Left side */}
          <div className="lg:sticky lg:top-10">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#FAD90C]/20 bg-[#FAD90C]/5 px-4 py-2">
              <GraduationCap className="h-4 w-4 text-[#FAD90C]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FAD90C]">
                SBS Academy
              </span>
            </div>

            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              Learn the craft.
              <span className="mt-2 block text-[#FAD90C]">
                Create with purpose.
              </span>
            </h1>

            <p className="mt-7 max-w-lg text-sm leading-7 text-[#999]">
              Step into the world of leather craftsmanship with SBS Academy.
              Learn practical techniques, develop your creativity, and build the
              confidence to create exceptional pieces by hand.
            </p>

            <div className="mt-10 space-y-5">
              {[
                "Hands-on leather craftsmanship",
                "Learn from experienced artisans",
                "Practical skills you can build on",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FAD90C] text-[#0B0B0B]">
                    <Check className="h-3.5 w-3.5" />
                  </div>

                  <span className="text-sm text-[#D0D0D0]">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 border-l-2 border-[#FAD90C] pl-5">
              <Sparkles className="mb-3 h-5 w-5 text-[#FAD90C]" />

              <p className="text-sm italic leading-6 text-[#999]">
                "Craftsmanship isn't just about making something. It's about
                learning to see possibility in every piece of leather."
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-3xl border border-white/10 bg-[#121212] p-6 sm:p-8 lg:p-10">
            <div className="mb-9">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#FAD90C]">
                Start your journey
              </p>

              <h2 className="font-display text-3xl font-bold tracking-[-0.02em] sm:text-4xl">
                Apply to SBS Academy
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#777]">
                Tell us a little about yourself and what you hope to learn.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-[#888]">
                    Full Name
                  </label>

                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    type="text"
                    placeholder="Your full name"
                    className="w-full rounded-xl border border-white/10 bg-[#0B0B0B] px-4 py-4 text-sm text-white outline-none placeholder:text-[#555] focus:border-[#FAD90C]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-[#888]">
                    Email Address
                  </label>

                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-white/10 bg-[#0B0B0B] px-4 py-4 text-sm text-white outline-none placeholder:text-[#555] focus:border-[#FAD90C]"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-[#888]">
                    Phone Number
                  </label>

                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    type="tel"
                    placeholder="+234 801 234 5678"
                    className="w-full rounded-xl border border-white/10 bg-[#0B0B0B] px-4 py-4 text-sm text-white outline-none placeholder:text-[#555] focus:border-[#FAD90C]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-[#888]">
                    Country
                  </label>

                  <input
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    type="text"
                    placeholder="Nigeria"
                    className="w-full rounded-xl border border-white/10 bg-[#0B0B0B] px-4 py-4 text-sm text-white outline-none placeholder:text-[#555] focus:border-[#FAD90C]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-3 block text-[10px] font-bold uppercase tracking-[0.14em] text-[#888]">
                  Experience Level
                </label>

                <div className="grid gap-3 sm:grid-cols-3">
                  {experienceLevels.map((level) => {
                    const selected = form.experienceLevel === level.value;

                    return (
                      <button
                        key={level.value}
                        type="button"
                        onClick={() =>
                          setForm((prev) => ({
                            ...prev,
                            experienceLevel: level.value,
                          }))
                        }
                        className={`rounded-xl border p-4 text-left transition-all ${
                          selected
                            ? "border-[#FAD90C] bg-[#FAD90C]/10"
                            : "border-white/10 bg-[#0B0B0B] hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-xs font-bold ${
                              selected ? "text-[#FAD90C]" : "text-white"
                            }`}
                          >
                            {level.title}
                          </span>

                          {selected && (
                            <Check className="h-4 w-4 text-[#FAD90C]" />
                          )}
                        </div>

                        <p className="mt-1 text-[11px] text-[#666]">
                          {level.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-[#888]">
                  Why do you want to join?
                </label>

                <textarea
                  name="motivation"
                  value={form.motivation}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell us about what you want to learn, your goals, or what inspired you to apply..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-[#0B0B0B] px-4 py-4 text-sm leading-6 text-white outline-none placeholder:text-[#555] focus:border-[#FAD90C]"
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#FAD90C] py-5 text-xs font-bold uppercase tracking-[0.15em] text-[#0B0B0B] transition-all hover:bg-[#FFE63B] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPending ? "Submitting Application..." : "Submit Application"}

                {!isPending && (
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                )}
              </button>

              <p className="text-center text-[11px] leading-5 text-[#555]">
                By submitting this application, you agree to be contacted by SBS
                Academy regarding your application.
              </p>
            </form>
          </div>
        </div>
      </Container>
      <SuccessModal
  open={showSuccess}
  onOpenChange={setShowSuccess}
  title="Application Submitted!"
  description="Thank you for applying to SBS Academy. We've received your application and will be in touch with you soon."
/>
    </section>
  );
};

export default AcademyRegistration;
