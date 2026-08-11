import React from "react";

interface ShoeStyleProps {
  selections: Record<string, string>;
  select: (key: string, value: string) => void;
}

const colors = [
  { id: "cognac", name: "Cognac", hex: "#8B4513" },
  { id: "black", name: "Black", hex: "#0B0B0B" },
  { id: "tan", name: "Tan", hex: "#D2B48C" },
  { id: "navy", name: "Navy Blue", hex: "#1B2A4A" },
  { id: "chestnut", name: "Chestnut", hex: "#6B2E0B" },
  { id: "bone", name: "Bone White", hex: "#F5F0E8" },
];

const Color = ({ selections, select }: ShoeStyleProps) => {
  return (
    <div>
      <h2 className="mb-2 font-display text-4xl font-bold text-near-black">
        Choose Your Color
      </h2>

      <p className="mb-10 text-sm text-[#888]">
        Select from our curated leather color palette.
      </p>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
        {colors.map((c) => {
          const isSelected = selections.color === c.id;

          return (
            <button
              key={c.id}
              type="button"
              onClick={() => select("color", c.id)}
              className="flex flex-col items-center gap-3"
            >
              <div
                className={`h-16 w-16 rounded-full shadow-lg transition-all duration-200 ${
                  isSelected
                    ? "border-[3px] border-gold outline-2  outline-near-black outline-offset-2"
                    : "border-[3px] border-transparent"
                }`}
                style={{ backgroundColor: c.hex }}
              />

              <span className="text-center text-xs font-medium text-near-black">
                {c.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Color;