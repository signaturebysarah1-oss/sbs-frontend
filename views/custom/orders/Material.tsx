import React from "react";

const materials = [
  {
    id: "full-grain",
    name: "Full Grain Leather",
    desc: "The highest quality, improves with age",
  },
  {
    id: "suede",
    name: "Suede",
    desc: "Soft, matte finish with velvet texture",
  },
  {
    id: "patent",
    name: "Patent Leather",
    desc: "High-gloss mirror finish",
  },
  {
    id: "nubuck",
    name: "Nubuck",
    desc: "Buffed grain for a fine velvety surface",
  },
];

interface ShoeStyleProps {
  selections: Record<string, string>;
  select: (key: string, value: string) => void;
}

const Material = ({ selections, select }: ShoeStyleProps) => {
  return (
    <div>
      <h2 className="mb-2 font-display text-4xl font-bold text-near-black">
        Choose Your Material
      </h2>

      <p className="mb-10 text-sm text-[#888]">
        Every leather is sourced from certified tanneries.
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {materials.map((m) => {
          const isSelected = selections.material === m.id;

          return (
            <button
              key={m.id}
              type="button"
              onClick={() => select("material", m.id)}
              className={`rounded-2xl border-2 p-7 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                isSelected
                  ? "border-gold bg-near-black"
                  : "border-border bg-white hover:border-gold/40"
              }`}
            >
              <h3
                className={`mb-2 font-display text-[22px] font-semibold ${
                  isSelected ? "text-gold" : "text-near-black"
                }`}
              >
                {m.name}
              </h3>

              {/* <p
                className={`text-[13px] ${
                  isSelected
                    ? "text-[rgba(248,246,242,0.6)]"
                    : "text-[#888]"
                }`}
              >
                {m.desc}
              </p> */}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Material;