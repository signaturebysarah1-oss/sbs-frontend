"use client";

import { Check, Copy, Ruler } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

interface GuideValues {
  leftFront: string;
  rightFront: string;
  leftBack: string;
  rightBack: string;
}

interface MeasurementGuideModalProps {
  open: boolean;
  onClose: () => void;
  values: GuideValues;
  onChange: (key: keyof GuideValues, value: string) => void;
}

const MeasurementGuideModal = ({
  open,
  onClose,
  values,
  onChange,
}: MeasurementGuideModalProps) => {
  const profileLines = [
    "SBS BESPOKE FIT PROFILE",
    "---",
    "LEFT FOOT",
    `Front Width: ${values.leftFront || "-"} cm`,
    `Back Width: ${values.leftBack || "-"} cm`,
    "---",
    "RIGHT FOOT",
    `Front Width: ${values.rightFront || "-"} cm`,
    `Back Width: ${values.rightBack || "-"} cm`,
    "---",
  ];

  const profile = profileLines.join("\n");

  const copyProfile = async () => {
    try {
      await navigator.clipboard.writeText(profile);
      toast.success("Fit profile copied");
    } catch (error) {
      console.error(error);
      toast.error("Couldn't copy. Please select and copy the text manually.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogContent className="max-h-[92vh] max-w-[900px]! overflow-y-auto rounded-[35px] border-none bg-[#F8F6F2] p-6 md:p-10">
        <DialogTitle className="sr-only">
          Create Your Fit Profile
        </DialogTitle>

        <DialogDescription className="sr-only">
          Enter your foot measurements to create your SBS bespoke footwear
          profile.
        </DialogDescription>

        {/* HEADER */}

        <div className="mb-12 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#C9A227]/10">
            <Ruler className="h-8 w-8 text-[#C9A227]" />
          </div>

          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#C9A227]">
            SBS Bespoke Fitting System
          </p>

          <h2 className="font-display text-4xl font-bold text-[#111] md:text-5xl">
            Create Your Fit Profile
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-[#666]">
            Every SBS shoe begins with precision. Follow our measurement
            guide and provide your exact foot dimensions so our craftsmen
            can create footwear made specifically for you.
          </p>
        </div>

        {/* STEPS */}

        <div className="mb-12 flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-[0.2em]">
          <div className="flex items-center gap-2 text-[#C9A227]">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#111] text-[#FAD90C]">
              01
            </span>
            Measure
          </div>

          <div className="h-px w-10 bg-[#C9A227]" />

          <div className="text-[#999]">02 Review</div>

          <div className="h-px w-10 bg-[#ddd]" />

          <div className="text-[#999]">03 Submit</div>
        </div>

        {/* TIPS */}

        <div className="mb-10 rounded-3xl bg-[#111] p-6 text-white">
          <h3 className="mb-4 font-display text-xl font-bold">
            Measurement Tips
          </h3>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              "Measure barefoot",
              "Use centimeters only",
              "Measure both feet",
              "Keep tape relaxed",
              "Repeat twice",
            ].map((tip) => (
              <div
                key={tip}
                className="flex items-center gap-2 text-sm text-white/70"
              >
                <Check className="h-4 w-4 text-[#FAD90C]" />
                {tip}
              </div>
            ))}
          </div>
        </div>

        {/* MEASUREMENTS */}

        <div className="grid gap-8 md:grid-cols-2">
          <MeasurementCard
            step="01"
            title="Front Width"
            description="Wrap the measuring tape around the widest part of your forefoot, from the first metatarsal joint to the fifth metatarsal joint."
            leftValue={values.leftFront}
            rightValue={values.rightFront}
            leftChange={(v) => onChange("leftFront", v)}
            rightChange={(v) => onChange("rightFront", v)}
          />

          <MeasurementCard
            step="02"
            title="Back Width"
            description="Wrap the tape around the midfoot, passing through the deepest part of your arch and navicular bone area."
            leftValue={values.leftBack}
            rightValue={values.rightBack}
            leftChange={(v) => onChange("leftBack", v)}
            rightChange={(v) => onChange("rightBack", v)}
          />
        </div>

        {/* PROFILE */}

        <div className="mt-10 rounded-[30px] bg-[#111] p-8 text-white">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#FAD90C]">
            Your Fit Profile
          </p>

          <h3 className="mb-5 font-display text-3xl font-bold">
            Measurement Summary
          </h3>

          <textarea
            readOnly
            value={profile}
            className="h-44 w-full resize-none rounded-2xl bg-white/10 p-5 text-sm leading-7 whitespace-pre-wrap text-white outline-none"
          />

          <button
            onClick={copyProfile}
            className="mt-5 flex w-full items-center justify-center gap-3 rounded-xl bg-[#FAD90C] py-4 text-sm font-bold uppercase tracking-[0.15em] text-[#111]"
          >
            <Copy size={18} />
            Copy Fit Profile
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const MeasurementCard = ({
  step,
  title,
  description,
  leftValue,
  rightValue,
  leftChange,
  rightChange,
}: {
  step: string;
  title: string;
  description: string;
  leftValue: string;
  rightValue: string;
  leftChange: (v: string) => void;
  rightChange: (v: string) => void;
}) => {
  return (
    <div className="rounded-[30px] bg-white p-8 shadow-sm">
      <div className="mb-5 flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111] text-sm font-bold text-[#FAD90C]">
          {step}
        </div>

        <h3 className="font-display text-2xl font-bold">{title}</h3>
      </div>

      <div className="mb-6 flex h-52 items-center justify-center rounded-2xl bg-[#F8F6F2] text-sm text-[#999]">
        Measurement Illustration
      </div>

      <p className="mb-6 text-sm leading-7 text-[#666]">{description}</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <InputBox label="Left Foot" value={leftValue} onChange={leftChange} />
        <InputBox label="Right Foot" value={rightValue} onChange={rightChange} />
      </div>
    </div>
  );
};

const InputBox = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) => {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#555]">
        {label}
      </label>

      <div className="relative">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0.0"
          className="w-full rounded-xl border border-[#E5E0D7] bg-[#F8F6F2] px-5 py-4 text-sm outline-none transition focus:border-[#C9A227]"
        />

        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#999]">
          cm
        </span>
      </div>
    </div>
  );
};

export default MeasurementGuideModal;