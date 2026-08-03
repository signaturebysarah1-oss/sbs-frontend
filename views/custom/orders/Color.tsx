import React from 'react'

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
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "36px",
                fontWeight: 700,
                color: "#0B0B0B",
                marginBottom: "8px",
              }}
            >
              Choose Your Color
            </h2>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                color: "#888",
                marginBottom: "40px",
              }}
            >
              Select from our curated leather color palette.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(6, 1fr)",
                gap: "16px",
              }}
            >
              {colors.map((c) => (
                <button
                  key={c.id}
                  onClick={() => select("color", c.id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      background: c.hex,
                      border:
                        selections.color === c.id
                          ? "3px solid #FAD90C"
                          : "3px solid transparent",
                      outline:
                        selections.color === c.id
                          ? "2px solid #0B0B0B"
                          : "2px solid transparent",
                      outlineOffset: "2px",
                      transition: "all 0.2s ease",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "11px",
                      fontWeight: 500,
                      color: "#0B0B0B",
                      textAlign: "center",
                    }}
                  >
                    {c.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
  )
}

export default Color