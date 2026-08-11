interface ShoeStyleProps {
  selections: Record<string, string>;
  select: (key: string, value: string) => void;
}

const toeShapes = [
  { id: "round", name: "Round Toe", desc: "Classic comfort fit" },
  { id: "square", name: "Square Toe", desc: "Modern architectural edge" },
  { id: "pointed", name: "Pointed Toe", desc: "Elongated, sharp silhouette" },
  { id: "almond", name: "Almond Toe", desc: "Timeless balanced shape" },
];

const ToeShape = ({ selections, select }: ShoeStyleProps) => {
  return (
    <div>
      <h2 className="mb-2 font-display text-4xl font-bold text-near-black">
        Toe Shape
      </h2>

      <p className="mb-10 text-sm text-[#888]">
        The silhouette is in the details.
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {toeShapes.map((t) => {
          const isSelected = selections.toeStyleSnapshot === t.id;

          return (
            <button
              key={t.id}
              type="button"
              onClick={() => select("toeStyleSnapshot", t.id)}
              className={`rounded-2xl border-2 p-7 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                isSelected
                  ? "border-gold bg-near-black"
                  : "border-border bg-white hover:border-gold/40"
              }`}
            >
              <h3
                className={`mb-2 font-display text-xl font-semibold ${
                  isSelected ? "text-gold" : "text-near-black"
                }`}
              >
                {t.name}
              </h3>

              {/* <p
                className={`text-[13px] ${
                  isSelected
                    ? "text-[rgba(248,246,242,0.6)]"
                    : "text-[#888]"
                }`}
              >
                {t.desc}
              </p> */}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ToeShape;