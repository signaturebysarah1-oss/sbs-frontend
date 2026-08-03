import React from "react";

interface ShoeStyleProps {
  selections: Record<string, string>;
  select: (key: string, value: string) => void;
}
const soles = [
  {
    id: "leather",
    name: "Leather Sole",
    desc: "Traditional, resoleable, breathable",
  },
  { id: "rubber", name: "Rubber Sole", desc: "Durable, all-weather grip" },
  { id: "crepe", name: "Crepe Sole", desc: "Soft, cushioned natural rubber" },
  {
    id: "commando",
    name: "Commando Sole",
    desc: "Heavy-duty lugged outdoor sole",
  },
];

const Sole = ({ selections, select }: ShoeStyleProps) => {
  return (
    <div>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "36px",
          fontWeight: 700,
          color: "#0B0B0B",
          marginBottom: "8px",
        }}
      >
        Choose Your Sole
      </h2>
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "14px",
          color: "#888",
          marginBottom: "40px",
        }}
      >
        The foundation of every great shoe.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "16px",
        }}
      >
        {soles.map((s) => (
          <button
            key={s.id}
            onClick={() => select("sole", s.id)}
            style={{
              background: selections.sole === s.id ? "#0B0B0B" : "#fff",
              border: `2px solid ${
                selections.sole === s.id ? "#FAD90C" : "#EAE6DD"
              }`,
              borderRadius: "16px",
              padding: "28px",
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.2s ease",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "20px",
                fontWeight: 600,
                color: selections.sole === s.id ? "#FAD90C" : "#0B0B0B",
                marginBottom: "8px",
              }}
            >
              {s.name}
            </div>
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                color:
                  selections.sole === s.id ? "rgba(248,246,242,0.6)" : "#888",
              }}
            >
              {s.desc}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sole;
