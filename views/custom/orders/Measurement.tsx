"use client";

import MeasurementGuideModal from "@/components/ui/modals/SizeGuide";
import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface ExtraMeasurement {
  label: string;
  value: string;
}

interface CustomMeasurements {
  leftFront: string;
  rightFront: string;
  leftBack: string;
  rightBack: string;
  leftLength: string;
  rightLength: string;
  extra: ExtraMeasurement[];
}

interface MeasurementProps {
  selections: Record<string, any>;
  select: (key: string, value: any) => void;
}

const Measurement = ({ selections, select }: MeasurementProps) => {
  const [measurements, setMeasurements] = useState<CustomMeasurements>({
    leftFront: selections.customMeasurements?.leftFront ?? "",
    rightFront: selections.customMeasurements?.rightFront ?? "",
    leftBack: selections.customMeasurements?.leftBack ?? "",
    rightBack: selections.customMeasurements?.rightBack ?? "",
    leftLength: selections.customMeasurements?.leftLength ?? "",
    rightLength: selections.customMeasurements?.rightLength ?? "",
    extra: selections.customMeasurements?.extra ?? [],
  });
  const [openMeasurementGuide, setOpenMeasurementGuide] = useState(false);

  useEffect(() => {
    select("customMeasurements", measurements);
  }, [measurements]);

  const updateMeasurement = (
    key: keyof Omit<CustomMeasurements, "extra">,
    value: string
  ) => {
    setMeasurements((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const addExtraMeasurement = () => {
    setMeasurements((prev) => ({
      ...prev,
      extra: [...prev.extra, { label: "", value: "" }],
    }));
  };

  const updateExtraMeasurement = (
    index: number,
    field: "label" | "value",
    value: string
  ) => {
    setMeasurements((prev) => ({
      ...prev,
      extra: prev.extra.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const removeExtraMeasurement = (index: number) => {
    setMeasurements((prev) => ({
      ...prev,
      extra: prev.extra.filter((_, i) => i !== index),
    }));
  };

  return (
    <div>
      <div>
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h2 className="mb-2 font-display text-4xl font-bold text-near-black">
              Measurements
            </h2>

            <p className="text-sm text-[#777]">
              A perfect fit starts with accurate measurements. Please
              measure both feet in centimeters (cm) — one foot may be
              slightly larger than the other.
            </p>
            <button
              type="button"
              onClick={() => setOpenMeasurementGuide(true)}
              className="rounded-xl mt-3 bg-black px-5 py-3 text-sm font-semibold text-[white] transition cursor-pointer"
            >
              How to Measure
            </button>
          </div>
        </div>

        <div className="flex justify-between gap-10">
          <div className="w-full ">
            {/* Front */}
            <div className="grid gap-10 grid-cols-2 w-full justify-between">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-near-black">
                  Left Foot Front (cm)
                </label>

                <input
                  type="number"
                  step="0.1"
                  value={measurements.leftFront}
                  onChange={(e) =>
                    updateMeasurement("leftFront", e.target.value)
                  }
                  placeholder="e.g. 27"
                  className="w-full rounded-xl border border-border bg-white px-4 py-3 outline-none transition focus:border-gold"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-near-black">
                  Right Foot Front (cm)
                </label>

                <input
                  type="number"
                  step="0.1"
                  value={measurements.rightFront}
                  onChange={(e) =>
                    updateMeasurement("rightFront", e.target.value)
                  }
                  placeholder="e.g. 10"
                  className="w-full rounded-xl border border-border bg-white px-4 py-3 outline-none transition focus:border-gold"
                />
              </div>
            </div>

            {/* Back */}
            <div className="grid gap-10 grid-cols-2 w-full justify-between mt-10">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-near-black">
                  Left Foot Back (cm)
                </label>

                <input
                  type="number"
                  step="0.1"
                  value={measurements.leftBack}
                  onChange={(e) =>
                    updateMeasurement("leftBack", e.target.value)
                  }
                  placeholder="e.g. 27"
                  className="w-full rounded-xl border border-border bg-white px-4 py-3 outline-none transition focus:border-gold"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-near-black">
                  Right Foot Back (cm)
                </label>

                <input
                  type="number"
                  step="0.1"
                  value={measurements.rightBack}
                  onChange={(e) =>
                    updateMeasurement("rightBack", e.target.value)
                  }
                  placeholder="e.g. 10"
                  className="w-full rounded-xl border border-border bg-white px-4 py-3 outline-none transition focus:border-gold"
                />
              </div>
            </div>

            {/* Length */}
            <div className="grid gap-10 grid-cols-2 w-full justify-between mt-10">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-near-black">
                  Left Foot Length (cm)
                </label>

                <input
                  type="number"
                  step="0.1"
                  value={measurements.leftLength}
                  onChange={(e) =>
                    updateMeasurement("leftLength", e.target.value)
                  }
                  placeholder="e.g. 26.5"
                  className="w-full rounded-xl border border-border bg-white px-4 py-3 outline-none transition focus:border-gold"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-near-black">
                  Right Foot Length (cm)
                </label>

                <input
                  type="number"
                  step="0.1"
                  value={measurements.rightLength}
                  onChange={(e) =>
                    updateMeasurement("rightLength", e.target.value)
                  }
                  placeholder="e.g. 26.5"
                  className="w-full rounded-xl border border-border bg-white px-4 py-3 outline-none transition focus:border-gold"
                />
              </div>
            </div>

            {measurements.extra.map((item, index) => (
              <div
                key={index}
                className="mt-8 rounded-xl border border-border bg-white p-5"
              >
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold text-near-black">
                    Extra Measurement {index + 1}
                  </p>

                  <button
                    type="button"
                    onClick={() => removeExtraMeasurement(index)}
                    className="text-red-500 transition hover:text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider">
                      Measurement Name
                    </label>

                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) =>
                        updateExtraMeasurement(index, "label", e.target.value)
                      }
                      placeholder="e.g. Ankle Circumference"
                      className="w-full rounded-xl border border-border px-4 py-3 outline-none transition focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider">
                      Value
                    </label>

                    <input
                      type="text"
                      value={item.value}
                      onChange={(e) =>
                        updateExtraMeasurement(index, "value", e.target.value)
                      }
                      placeholder="e.g. 22 cm"
                      className="w-full rounded-xl border border-border px-4 py-3 outline-none transition focus:border-gold"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addExtraMeasurement}
              className="flex mt-8 items-center gap-2 rounded-xl border border-dashed border-[#C9A227] px-5 py-3 font-medium text-[#C9A227] transition hover:bg-[#FFF9D9]"
            >
              <Plus size={18} />
              Add Another Measurement
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10 w-full">
        <label className="mb-4 block text-xs font-semibold uppercase tracking-wider text-near-black">
          Size Conversion Chart
        </label>

        <div className="overflow-hidden rounded-2xl border border-border">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-near-black">
                  {["EU", "UK", "US Men's", "US Women's", "cm"].map(
                    (head) => (
                      <th
                        key={head}
                        className="px-3 py-4 text-center text-[10px] font-semibold uppercase tracking-wider  text-gold"
                      >
                        {head}
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody>
                {[
                  ["39", "6", "7", "8.5", "24.5"],
                  ["40", "7", "8", "9.5", "25.5"],
                  ["41", "7.5", "8.5", "10", "26"],
                  ["42", "8", "9", "10.5", "26.5"],
                  ["43", "9", "10", "11.5", "27.5"],
                  ["44", "10", "11", "12.5", "28"],
                  ["45", "11", "12", "13.5", "29"],
                  ["46", "12", "13", "14", "29.5"],
                ].map((row, index) => (
                  <tr
                    key={row[0]}
                    className={`border-b border-border ${
                      index % 2 === 0 ? "bg-off-white" : "bg-white"
                    }`}
                  >
                    {row.map((cell, i) => (
                      <td
                        key={i}
                        className={`px-3 py-4 text-center ${
                          i === 0 ? "font-bold text-near-black" : "text-[#666]"
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <MeasurementGuideModal
        open={openMeasurementGuide}
        onClose={() => setOpenMeasurementGuide(false)}
        
        values={{
          leftFront: measurements.leftFront,
          rightFront: measurements.rightFront,
          leftBack: measurements.leftBack,
          rightBack: measurements.rightBack,
          leftLength: measurements.leftLength,
          rightLength: measurements.rightLength,
        }}
        onChange={updateMeasurement}
      />
    </div>
  );
};

export default Measurement;