import React from 'react'

interface ShoeStyleProps {
    selections: Record<string, string>;
    select: (key: string, value: string) => void;
  }
  
  const Personalize = ({ selections, select }: ShoeStyleProps) => {
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
              Personalize
            </h2>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                color: "#888",
                marginBottom: "40px",
              }}
            >
              Add optional initials or a monogram to make them truly yours.
            </p>
            <div style={{ maxWidth: "480px" }}>
              <div style={{ marginBottom: "24px" }}>
                <label
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#0B0B0B",
                    display: "block",
                    marginBottom: "10px",
                  }}
                >
                  Initials (up to 3 characters)
                </label>
                <input
                  type="text"
                  maxLength={3}
                  placeholder="e.g. E.O.A"
                  defaultValue={selections.initials}
                  onChange={(e) => select("initials", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "16px 20px",
                    border: "2px solid #EAE6DD",
                    borderRadius: "12px",
                    fontFamily: "var(--font-display)",
                    fontSize: "20px",
                    fontWeight: 600,
                    color: "#0B0B0B",
                    background: "#fff",
                    outline: "none",
                    letterSpacing: "0.12em",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#0B0B0B",
                    display: "block",
                    marginBottom: "10px",
                  }}
                >
                  Monogram Position
                </label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "10px",
                  }}
                >
                  {["Insole", "Heel Counter", "None"].map((pos) => (
                    <button
                      key={pos}
                      onClick={() => select("monogramPos", pos)}
                      style={{
                        padding: "14px",
                        border: `2px solid ${
                          selections.monogramPos === pos ? "#FAD90C" : "#EAE6DD"
                        }`,
                        background:
                          selections.monogramPos === pos ? "#0B0B0B" : "#fff",
                        borderRadius: "10px",
                        fontFamily: "var(--font-sans)",
                        fontSize: "12px",
                        fontWeight: 600,
                        color:
                          selections.monogramPos === pos
                            ? "#FAD90C"
                            : "#0B0B0B",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {pos}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
  )
}

export default Personalize