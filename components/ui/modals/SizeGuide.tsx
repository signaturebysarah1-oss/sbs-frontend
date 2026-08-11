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
  leftLength: string;
  rightLength: string;
}

interface MeasurementGuideModalProps {
  open: boolean;
  onClose: () => void;
  values: GuideValues;
  onChange: (key: keyof GuideValues, value: string) => void;
}

const LENGTH_STEPS = [
  "Place a piece of paper larger than your foot against the wall — make sure the wall (and any skirting) is flat.",
  "Stand on the paper with your heel against the wall, on a hard floor, so the paper doesn't slide.",
  "Mark the paper where your longest toe reaches — don't tuck the pencil under the toe.",
  "Measure the distance from the wall edge of the paper to the toe mark.",
  "Repeat with your other foot and use the longer of the two measurements.",
];

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
    `Length: ${values.leftLength || "-"} cm`,
    "---",
    "RIGHT FOOT",
    `Front Width: ${values.rightFront || "-"} cm`,
    `Back Width: ${values.rightBack || "-"} cm`,
    `Length: ${values.rightLength || "-"} cm`,
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
      <DialogContent className="max-h-[92vh] max-w-[60%]! overflow-y-auto rounded-[35px] border-none bg-off-white p-6 md:p-10">
        <DialogTitle className="sr-only">Create Your Fit Profile</DialogTitle>

        <DialogDescription className="sr-only">
          Enter your foot measurements to create your SBS bespoke footwear
          profile.
        </DialogDescription>

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
            Please take all measurements in centimeters (cm) and measure
            both feet — one foot may be slightly larger than the other.
          </p>
        </div>

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
                <Check className="h-4 w-4 text-gold" />
                {tip}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
         <div className="flex gap-2">
         <MeasurementCard
            step="01"
            title="Front Width"
            imageUrl="/step1.png"
            description="Wrap the measuring tape around the widest part of your forefoot, from the first metatarsal joint to the fifth metatarsal joint. Record the measurement in centimeters (cm)."
            leftValue={values.leftFront}
            rightValue={values.rightFront}
            leftChange={(v) => onChange("leftFront", v)}
            rightChange={(v) => onChange("rightFront", v)}
          />

          <MeasurementCard
            step="02"
            title="Back Width"
            imageUrl="/step2.png"
            description="Wrap the measuring tape around the midfoot, passing around the deepest part of your arch and the navicular bone (tarsal bone). Record the measurement in centimeters (cm)."
            leftValue={values.leftBack}
            rightValue={values.rightBack}
            leftChange={(v) => onChange("leftBack", v)}
            rightChange={(v) => onChange("rightBack", v)}
          />
          </div>

          <div className="rounded-[30px] bg-white p-8 shadow-sm">
            <div className="mb-5 flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111] text-sm font-bold text-gold">
                03
              </div>

              <h3 className="font-display text-2xl font-bold">Foot Length</h3>
            </div>

            {/* Placeholder illustration — swap with a real image */}
            <div className="mb-6 flex h-120 items-center justify-center rounded-2xl bg-off-white text-sm text-[#999]">
             <img src="/sizeguide.png" className="w-full h-full"/>
            </div>

            <ol className="mb-6 space-y-3">
              {LENGTH_STEPS.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm leading-6 text-[#666]">
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#C9A227]/15 text-[10px] font-bold text-[#C9A227]">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>

            <div className="grid gap-4 sm:grid-cols-2">
              <InputBox
                label="Left Foot"
                value={values.leftLength ?? ""}
                onChange={(v) => onChange("leftLength", v)}
              />
              <InputBox
                label="Right Foot"
                value={values.rightLength ?? ""}
                onChange={(v) => onChange("rightLength", v)}
              />
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-[30px] bg-[#111] p-8 text-white">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold">
            Your Fit Profile
          </p>

          <h3 className="mb-5 font-display text-3xl font-bold">
            Measurement Summary
          </h3>

          <textarea
            readOnly
            value={profile}
            className="h-52 w-full resize-none rounded-2xl bg-white/10 p-5 text-sm leading-7 whitespace-pre-wrap text-white outline-none"
          />

          <button
            onClick={copyProfile}
            className="mt-5 flex w-full items-center justify-center gap-3 rounded-xl bg-gold py-4 text-sm font-bold uppercase tracking-[0.15em] text-[#111]"
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
  imageUrl
}: {
  step: string;
  title: string;
  description: string;
  leftValue: string;
  rightValue: string;
  leftChange: (v: string) => void;
  rightChange: (v: string) => void;
  imageUrl?:string
}) => {
  return (
    <div className="rounded-[30px] bg-white p-8 shadow-sm">
      <div className="mb-5 flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111] text-sm font-bold text-gold">
          {step}
        </div>

        <h3 className="font-display text-2xl font-bold">{title}</h3>
      </div>

      <div className="mb-6 flex h-60 items-center justify-center rounded-2xl bg-off-white text-sm text-[#999]">
      <img src={imageUrl} className="w-full h-full object-contain"/>
      </div>

      <p className="mb-6 text-sm leading-7 text-[#666]">{description}</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <InputBox label="Left Foot" value={leftValue ?? ""} onChange={leftChange} />
        <InputBox label="Right Foot" value={rightValue ?? ""} onChange={rightChange} />
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
          className="w-full rounded-xl border border-[#E5E0D7] bg-off-white px-5 py-4 text-sm outline-none transition focus:border-[#C9A227]"
        />

        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#999]">
          cm
        </span>
      </div>
    </div>
  );
};

export default MeasurementGuideModal;