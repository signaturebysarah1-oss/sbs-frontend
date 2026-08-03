
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
              Toe Shape
            </h2>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                color: "#888",
                marginBottom: "40px",
              }}
            >
              The silhouette is in the details.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "16px",
              }}
            >
              {toeShapes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => select("toe", t.id)}
                  style={{
                    background: selections.toe === t.id ? "#0B0B0B" : "#fff",
                    border: `2px solid ${
                      selections.toe === t.id ? "#FAD90C" : "#EAE6DD"
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
                      color: selections.toe === t.id ? "#FAD90C" : "#0B0B0B",
                      marginBottom: "8px",
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "13px",
                      color:
                        selections.toe === t.id
                          ? "rgba(248,246,242,0.6)"
                          : "#888",
                    }}
                  >
                    {t.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>
    </div>
  )
}

export default ToeShape