"use client";

import { CheckIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import ShoeStyle from "./orders/ShoeStyle";
import Material from "./orders/Material";
import Color from "./orders/Color";
import Sole from "./orders/Sole";
import ToeShape from "./orders/ToeShape";
import Personalize from "./orders/Personalize";
import Measurement from "./orders/Measurement";
import Review from "./orders/Review";

const CustomPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalSteps = 6;

  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState<Record<string, string>>({});

  const steps = [
    "Shoe Style",
    "Material",
    "Color",
    // "Sole",
    // "Toe Shape",
    "Personalize",
    "Measurements",
    "Review",
  ];

  useEffect(() => {
    const urlStep = Number(searchParams.get("step"));

    if (
      !Number.isNaN(urlStep) &&
      urlStep >= 1 &&
      urlStep <= totalSteps
    ) {
      setStep(urlStep);
    }
  }, [searchParams]);


  const changeStep = (newStep: number) => {
    if (newStep < 1 || newStep > totalSteps) return;

    const params = new URLSearchParams(searchParams.toString());

    params.set("step", String(newStep));

    router.replace(`?${params.toString()}`, {
      scroll: false,
    });

    setStep(newStep);
  };


  const select = (key: string, val: string) =>
    setSelections((prev) => ({
      ...prev,
      [key]: val,
    }));


  const renderStep = () => {
    switch (step) {
      case 1:
        return <ShoeStyle selections={selections} select={select} />;

      case 2:
        return <Material selections={selections} select={select} />;

      case 3:
        return <Color selections={selections} select={select} />;

      // case 4:
      //   return <Sole selections={selections} select={select} />;

      // case 5:
      //   return <ToeShape selections={selections} select={select} />;

      case 4:
        return <Personalize selections={selections} select={select} />;

      case 5:
        return <Measurement selections={selections} select={select} />;

      case 6:
        return <Review selections={selections} select={select} />;

      default:
        return null;
    }
  };


  return (
    <div className="min-h-screen bg-[#F8F6F2] pt-[72px]">
      {/* Header */}
      <div className="bg-[#0B0B0B] px-8 py-16">
        <div className="mx-auto max-w-[900px]">

          <div className="mb-4 flex items-center gap-3">
            <span className="block h-[2px] w-10 bg-[#FAD90C]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FAD90C]">
              Bespoke Service
            </span>
          </div>


          <h1 className="mb-8 font-display text-[clamp(36px,5vw,64px)] font-bold leading-none tracking-[-0.02em] text-[#F8F6F2]">
            Custom Order
          </h1>


          {/* Progress */}
          <div className="flex items-center gap-1">
            {steps.map((s, i) => (
              <div
                key={s}
                className={`flex items-center gap-1 ${
                  i < steps.length - 1 ? "flex-1" : ""
                }`}
              >
                <button
                  onClick={() =>
                    i + 1 < step && changeStep(i + 1)
                  }
                  disabled={i + 1 >= step}
                  className={`flex min-w-10 flex-col items-center gap-1 px-1 ${
                    i + 1 < step
                      ? "cursor-pointer"
                      : "cursor-default"
                  }`}
                >

                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full ${
                      i + 1 <= step
                        ? "bg-[#FAD90C]"
                        : "bg-[rgba(248,246,242,0.15)]"
                    }`}
                  >

                    {i + 1 < step ? (
                      <CheckIcon className="h-4 w-4 text-[#0B0B0B]" />
                    ) : (
                      <span
                        className={`text-[11px] font-bold ${
                          i + 1 === step
                            ? "text-[#0B0B0B]"
                            : "text-[rgba(248,246,242,0.4)]"
                        }`}
                      >
                        {i + 1}
                      </span>
                    )}

                  </div>


                  <span
                    className={`whitespace-nowrap text-[8px] font-medium uppercase tracking-[0.08em] ${
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
                    className={`mb-5 h-px flex-1 ${
                      i + 1 < step
                        ? "bg-[#FAD90C]"
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
      <div className="mx-auto  max-w-[900px] px-8 py-14">

        {renderStep()}


        {/* Navigation */}
        <div className="mt-14 flex justify-between border-t border-[#EAE6DD] pt-8">

          <button
            onClick={() => changeStep(step - 1)}
            disabled={step === 1}
            className={`btn-outline ${
              step === 1
                ? "cursor-not-allowed opacity-30"
                : "cursor-pointer"
            }`}
          >
            ← Previous
          </button>


          {step < totalSteps && (
            <button
              onClick={() => changeStep(step + 1)}
              className="btn-gold"
            >
              Next Step →
            </button>
          )}

        </div>

      </div>

    </div>
  );
};

export default CustomPage;