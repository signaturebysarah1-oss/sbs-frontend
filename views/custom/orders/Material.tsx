import React from 'react'

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
    { id: "patent", name: "Patent Leather", desc: "High-gloss mirror finish" },
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
    <div>  <div>
    <h2
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "36px",
        fontWeight: 700,
        color: "#0B0B0B",
        marginBottom: "8px",
      }}
    >
      Choose Your Material
    </h2>
    <p
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: "14px",
        color: "#888",
        marginBottom: "40px",
      }}
    >
      Every leather is sourced from certified tanneries.
    </p>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "16px",
      }}
    >
      {materials.map((m) => (
        <button
          key={m.id}
          onClick={() => select("material", m.id)}
          style={{
            background:
              selections.material === m.id ? "#0B0B0B" : "#fff",
            border: `2px solid ${
              selections.material === m.id ? "#FAD90C" : "#EAE6DD"
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
              fontSize: "22px",
              fontWeight: 600,
              color:
                selections.material === m.id ? "#FAD90C" : "#0B0B0B",
              marginBottom: "8px",
            }}
          >
            {m.name}
          </div>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              color:
                selections.material === m.id
                  ? "rgba(248,246,242,0.6)"
                  : "#888",
            }}
          >
            {m.desc}
          </div>
        </button>
      ))}
    </div>
  </div></div>
  )
}

export default Material