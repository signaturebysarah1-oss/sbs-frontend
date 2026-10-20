"use client";

import { getCustomizatioons } from "@/providers/query";
import { CustomizationsResponse } from "@/types/website";
import { useQuery } from "@tanstack/react-query";

interface ShoeStyleProps {
  selections: Record<string, string>;
  select: (key: string, value: string) => void;
}

const Material = ({ selections, select }: ShoeStyleProps) => {
  const {
    data: materialsData,
    isLoading,
    error,
  } = useQuery<CustomizationsResponse>({
    queryKey: ["customizations"],
    queryFn: getCustomizatioons,
  });

  const materialsCategory = materialsData?.data?.find(
    (category) => category.slug?.toLowerCase() === "materials"
  );

  const materials = materialsCategory?.options ?? [];

  if (isLoading) {
    return (
      <div>
        <h2 className="mb-2 font-display text-4xl font-bold text-near-black">
          Choose Your Material
        </h2>
        <p className="mb-10 text-sm text-[#888]">
          Loading materials...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2 className="mb-2 font-display text-4xl font-bold text-near-black">
          Choose Your Material
        </h2>
        <p className="mb-10 text-sm text-red-500">
          Failed to load materials.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-2 font-display text-4xl font-bold text-near-black">
        Choose Your Material
      </h2>

      <p className="mb-10 text-sm text-[#888]">
        Every leather is sourced from certified tanneries.
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {materials.map((material) => {
          const isSelected = selections.material === material.name;

          return (
            <button
              key={material.id}
              type="button"
              onClick={() => select("material", material.name)}
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
                {material.name}
              </h3>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Material;