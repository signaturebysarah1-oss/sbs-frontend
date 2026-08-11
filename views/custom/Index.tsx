"use client";

import { CheckIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ShoeStyle from "./orders/ShoeStyle";
import Material from "./orders/Material";
import Color from "./orders/Color";
import ToeShape from "./orders/ToeShape";
import Measurement from "./orders/Measurement";
import Review from "./orders/Review";

const CustomPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalSteps = 6;

  const [step, setStep] = useState(1);

  const [selections, setSelections] = useState<Record<string, any>>({
    shoeNameSnapshot: "",
    material: "",
    color: "",
    toeStyleSnapshot: "",
    customMeasurements: {},
  });

  const steps = [
    "Shoe Style",
    "Material",
    "Color",
    "Toe Shape",
    "Measurements",
    "Review",
  ];

  useEffect(() => {
    const savedSelections = localStorage.getItem("sbs-custom-order");

    if (savedSelections) {
      setSelections(JSON.parse(savedSelections));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(selections).length > 0) {
      localStorage.setItem("sbs-custom-order", JSON.stringify(selections));
    }
  }, [selections]);

  useEffect(() => {
    const urlStep = Number(searchParams.get("step"));

    if (!Number.isNaN(urlStep) && urlStep >= 1 && urlStep <= totalSteps) {
      setStep(urlStep);
    }
  }, [searchParams]);

  const validateStep = (currentStep: number): string | null => {
    switch (currentStep) {
      case 1:
        if (!selections.shoeNameSnapshot) return "Please select a shoe style.";
        return null;

      case 2:
        if (!selections.material) return "Please select a material.";
        return null;

      case 3:
        if (!selections.color) return "Please select a color.";
        return null;

      case 4:
        if (!selections.toeStyleSnapshot) return "Please select a toe shape.";
        return null;

      case 5: {
        const m = selections.customMeasurements || {};
        const hasCoreMeasurements =
          m.leftFront && m.rightFront && m.leftBack && m.rightBack;

        if (!hasCoreMeasurements) {
          return "Please fill in all four measurements before continuing.";
        }
        return null;
      }

      default:
        return null;
    }
  };

  const changeStep = (newStep: number) => {
    if (newStep < 1 || newStep > totalSteps) return;

    // Only validate when moving forward — going back is always allowed
    if (newStep > step) {
      const error = validateStep(step);
      if (error) {
        toast.error(error);
        return;
      }
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set("step", String(newStep));

    router.replace(`?${params.toString()}`, { scroll: false });

    setStep(newStep);
  };

  const select = (key: string, value: any) => {
    setSelections((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // const clearCustomOrder = () => {
  //   localStorage.removeItem("sbs-custom-order");

  //   setSelections({
  //     shoeNameSnapshot: "",
  //     material: "",
  //     color: "",
  //     toeStyleSnapshot: "",
  //     customMeasurements: {},
  //   });
  // };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <ShoeStyle selections={selections} select={select} />;
      case 2:
        return <Material selections={selections} select={select} />;
      case 3:
        return <Color selections={selections} select={select} />;
      case 4:
        return <ToeShape selections={selections} select={select} />;
      case 5:
        return <Measurement selections={selections} select={select} />;
      case 6:
        return <Review selections={selections} select={select} />;
      default:
        return null;
    }
  };

  return (
    <div className=" bg-off-white pt-18">
      <div className="bg-near-black px-8 py-16">
        <div className="mx-auto w-full lg:max-w-225">
          <div className="mb-4 flex items-center gap-3">
            <span className="block h-0.5 w-10 bg-gold" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.22em]  text-gold">
              Bespoke Service
            </span>
          </div>

          <h1 className="mb-8 font-display text-[clamp(36px,5vw,64px)] font-bold leading-none tracking-[-0.02em] text-off-white">
            Custom Order
          </h1>

          <div className="flex items-center gap-1">
            {steps.map((s, i) => (
              <div
                key={s}
                className={`flex items-center gap-1 ${
                  i < steps.length - 1 ? "flex-1" : ""
                }`}
              >
                <button
                  onClick={() => i + 1 < step && changeStep(i + 1)}
                  disabled={i + 1 >= step}
                  className={`flex min-w-10 flex-col  items-center gap-1 px-1 ${
                    i + 1 < step ? "cursor-pointer" : "cursor-default"
                  }`}
                >
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full ${
                      i + 1 <= step
                        ? "bg-gold"
                        : "bg-[rgba(248,246,242,0.15)]"
                    }`}
                  >
                    {i + 1 < step ? (
                      <CheckIcon className="h-4 w-4 text-near-black" />
                    ) : (
                      <span
                        className={`text-[11px] font-bold ${
                          i + 1 === step
                            ? "text-near-black"
                            : "text-[rgba(248,246,242,0.4)]"
                        }`}
                      >
                        {i + 1}
                      </span>
                    )}
                  </div>

                  <span
                    className={`hidden lg:flex whitespace-nowrap text-[8px] font-medium uppercase tracking-[0.08em] ${
                      i + 1 <= step
                        ? "text-[rgba(248,246,242,0.8)]"
                        : "text-[rgba(248,246,242,0.3)]"
                    }`}
                  >
                    {s}
                  </span>
                </button>

                {i < steps.length - 1 && (
                  <div
                    className={`mb-5 hidden h-px md:flex-1 ${
                      i + 1 < step
                        ? "bg-gold"
                        : "bg-[rgba(248,246,242,0.15)]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto w-full lg:max-w-225 px-8 py-14">
        {renderStep()}

        {/* Navigation */}
        <div className="mt-14 flex gap-4 justify-between border-t border-border pt-8">
          <button
            onClick={() => changeStep(step - 1)}
            disabled={step === 1}
            className={`btn-outline  rounded-lg ${
              step === 1 ? "cursor-not-allowed opacity-30" : "cursor-pointer"
            }`}
          >
            ← Previous
          </button>

          {step < totalSteps && (
            <button onClick={() => changeStep(step + 1)} className="btn-gold rounded-lg">
              Next Step →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomPage;