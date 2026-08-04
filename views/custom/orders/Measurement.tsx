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
  extra: ExtraMeasurement[];
}

interface MeasurementProps {
  selections: Record<string, any>;
  select: (key: string, value: any) => void;
}

const Measurement = ({ selections, select }: MeasurementProps) => {
  const [measurements, setMeasurements] = useState<CustomMeasurements>(
    selections.customMeasurements || {
      leftFront: "",
      rightFront: "",
      leftBack: "",
      rightBack: "",
      extra: [],
    }
  );
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
            <h2 className="mb-2 font-display text-4xl font-bold text-[#0B0B0B]">
              Measurements
            </h2>

            <p className="text-sm text-[#777]">
              A perfect fit starts with accurate measurements.
            </p>
            <button
              type="button"
              onClick={() => setOpenMeasurementGuide(true)}
              className="rounded-xl mt-3 bg-black px-5 py-3 text-sm font-semibold text-[white] transition hover:bg-[#FFF9D9]"
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
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#0B0B0B]">
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
                  className="w-full rounded-xl border border-[#EAE6DD] bg-white px-4 py-3 outline-none transition focus:border-[#FAD90C]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#0B0B0B]">
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
                  className="w-full rounded-xl border border-[#EAE6DD] bg-white px-4 py-3 outline-none transition focus:border-[#FAD90C]"
                />
              </div>
            </div>

            {/* Back */}
            <div className="grid gap-10 grid-cols-2 w-full justify-between mt-10">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#0B0B0B]">
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
                  className="w-full rounded-xl border border-[#EAE6DD] bg-white px-4 py-3 outline-none transition focus:border-[#FAD90C]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#0B0B0B]">
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
                  className="w-full rounded-xl border border-[#EAE6DD] bg-white px-4 py-3 outline-none transition focus:border-[#FAD90C]"
                />
              </div>
            </div>

            {measurements.extra.map((item, index) => (
              <div
                key={index}
                className="mt-8 rounded-xl border border-[#EAE6DD] bg-white p-5"
              >
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold text-[#0B0B0B]">
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
                      className="w-full rounded-xl border border-[#EAE6DD] px-4 py-3 outline-none transition focus:border-[#FAD90C]"
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
                      className="w-full rounded-xl border border-[#EAE6DD] px-4 py-3 outline-none transition focus:border-[#FAD90C]"
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
        <label className="mb-4 block text-xs font-semibold uppercase tracking-wider text-[#0B0B0B]">
          Size Conversion Chart
        </label>

        <div className="overflow-hidden rounded-2xl border border-[#EAE6DD]">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-[#0B0B0B]">
                  {["EU", "UK", "US Men's", "US Women's", "cm"].map(
                    (head) => (
                      <th
                        key={head}
                        className="px-3 py-4 text-center text-[10px] font-semibold uppercase tracking-wider text-[#FAD90C]"
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
                    className={`border-b border-[#EAE6DD] ${
                      index % 2 === 0 ? "bg-[#F8F6F2]" : "bg-white"
                    }`}
                  >
                    {row.map((cell, i) => (
                      <td
                        key={i}
                        className={`px-3 py-4 text-center ${
                          i === 0 ? "font-bold text-[#0B0B0B]" : "text-[#666]"
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
        }}
        onChange={updateMeasurement}
      />
    </div>
  );
};

export default Measurement;