"use client";

import { getCustomizatioons } from "@/providers/query";
import { CustomizationsResponse } from "@/types/website";
import { useQuery } from "@tanstack/react-query";

interface ShoeStyleProps {
  selections: Record<string, string>;
  select: (key: string, value: string) => void;
}

const Color = ({ selections, select }: ShoeStyleProps) => {
  const {
    data: colorsData,
    isLoading,
    error,
  } = useQuery<CustomizationsResponse>({
    queryKey: ["customizations"],
    queryFn: getCustomizatioons,
  });

  const colorsCategory = colorsData?.data?.find(
    (category) => category.slug?.toLowerCase() === "colours"
  );

  const colors = colorsCategory?.options ?? [];

  if (isLoading) {
    return (
      <div>
        <h2 className="mb-2 font-display text-4xl font-bold text-near-black">
          Choose Your Color
        </h2>

        <p className="mb-10 text-sm text-[#888]">Loading colors...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2 className="mb-2 font-display text-4xl font-bold text-near-black">
          Choose Your Color
        </h2>

        <p className="mb-10 text-sm text-red-500">
          Failed to load colors.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-2 font-display text-4xl font-bold text-near-black">
        Choose Your Color
      </h2>

      <p className="mb-10 text-sm text-[#888]">
        Select from our curated leather color palette.
      </p>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
        {colors.map((color) => {
const isSelected = selections.color === color.name;
          return (
            <button
              key={color.id}
              type="button"
              onClick={() => select("color", color.name)}
              className="flex flex-col items-center gap-3"
            >
              <div
                style={{ backgroundColor: color.name }}
                className={`h-16 w-16 rounded-full shadow-lg transition-all duration-200 ${
                  isSelected
                    ? "border-[3px] border-gold ring-2 ring-gold ring-offset-2"
                    : "border-[3px] border-transparent"
                }`}
              />

              <span className="text-center text-xs font-medium text-near-black">
                {color.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Color;