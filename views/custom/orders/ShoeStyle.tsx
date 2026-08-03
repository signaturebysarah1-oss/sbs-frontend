import { CheckIcon } from "lucide-react";

interface ShoeStyleProps {
  selections: Record<string, string>;
  select: (key: string, value: string) => void;
}

const ShoeStyle = ({ selections, select }: ShoeStyleProps) => {
  const shoeStyles = [
    {
      id: "loafer",
      name: "Loafer",
      desc: "Effortless elegance",
      img: "https://images.unsplash.com/photo-1563433337461-5b65f0834f3a?w=800&h=1000&fit=crop&auto=format",
    },
    {
      id: "boot",
      name: "Boot",
      desc: "Bold authority",
      img: "https://images.unsplash.com/photo-1570800493677-12a7ad3d4d86?w=700&h=900&fit=crop&auto=format",
    },
    {
      id: "sandal",
      name: "Sandal",
      desc: "Refined ease",
      img: "https://images.unsplash.com/photo-1641893843833-a006778dc00b?w=700&h=900&fit=crop&auto=format",
    },
    {
      id: "halfshoe",
      name: "Half Shoe",
      desc: "Classic precision",
      img: "https://images.unsplash.com/photo-1563433337461-5b65f0834f3a?w=800&h=1000&fit=crop&auto=format",
    },
  ];

  return (
    <div>
      <h2 className="mb-2 font-display text-4xl font-bold text-[#0B0B0B]">
        Choose Your Style
      </h2>

      <p className="mb-10 text-sm text-[#888]">
        Select the silhouette that speaks to you.
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {shoeStyles.map((style) => {
          const isSelected = selections.style === style.id;

          return (
            <button
              key={style.id}
              onClick={() => select("style", style.id)}
              className={`overflow-hidden rounded-2xl border-2 bg-white text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                isSelected
                  ? "border-[#FAD90C]"
                  : "border-[#EAE6DD] hover:border-[#FAD90C]/40"
              }`}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={style.img}
                  alt={style.name}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="p-4">
                <h3 className="font-display text-lg font-semibold text-[#0B0B0B]">
                  {style.name}
                </h3>

                <p className="mt-1 text-xs text-[#888]">
                  {style.desc}
                </p>

                {isSelected && (
                  <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-[#0B0B0B]">
                    <CheckIcon className="h-4 w-4 text-[#FAD90C]" />
                    Selected
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ShoeStyle;