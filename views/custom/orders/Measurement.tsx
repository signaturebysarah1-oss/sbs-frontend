
interface ShoeStyleProps {
    selections: Record<string, string>;
    select: (key: string, value: string) => void;
  }
  
  const Measurement = ({ selections, select }: ShoeStyleProps) => {
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
              Measurements
            </h2>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                color: "#888",
                marginBottom: "40px",
              }}
            >
              A perfect fit starts with precise measurements.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "40px",
              }}
            >
              {/* Size type */}
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
                    marginBottom: "16px",
                  }}
                >
                  Size Method
                </label>
                <div
                  style={{ display: "flex", gap: "12px", marginBottom: "32px" }}
                >
                  {["Standard Size", "Custom Measurements"].map((method) => (
                    <button
                      key={method}
                      onClick={() => select("sizeMethod", method)}
                      style={{
                        padding: "14px 20px",
                        border: `2px solid ${
                          selections.sizeMethod === method
                            ? "#FAD90C"
                            : "#EAE6DD"
                        }`,
                        background:
                          selections.sizeMethod === method ? "#0B0B0B" : "#fff",
                        borderRadius: "10px",
                        fontFamily: "var(--font-sans)",
                        fontSize: "11px",
                        fontWeight: 600,
                        color:
                          selections.sizeMethod === method
                            ? "#FAD90C"
                            : "#0B0B0B",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        flex: 1,
                      }}
                    >
                      {method}
                    </button>
                  ))}
                </div>

                {selections.sizeMethod !== "Custom Measurements" && (
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
                      EU Size
                    </label>
                    <div
                      style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
                    >
                      {[39, 40, 41, 42, 43, 44, 45, 46].map((s) => (
                        <button
                          key={s}
                          onClick={() => select("size", String(s))}
                          style={{
                            width: "48px",
                            height: "48px",
                            border: `2px solid ${
                              selections.size === String(s)
                                ? "#FAD90C"
                                : "#EAE6DD"
                            }`,
                            background:
                              selections.size === String(s)
                                ? "#0B0B0B"
                                : "#fff",
                            borderRadius: "8px",
                            fontFamily: "var(--font-sans)",
                            fontSize: "13px",
                            fontWeight: 600,
                            color:
                              selections.size === String(s)
                                ? "#FAD90C"
                                : "#0B0B0B",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                          }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selections.sizeMethod === "Custom Measurements" && (
                  <div style={{ display: "grid", gap: "16px" }}>
                    {[
                      ["Foot Length (cm)", "footLength"],
                      ["Foot Width (cm)", "footWidth"],
                      ["Instep Height (cm)", "instep"],
                      ["Heel-to-Toe (cm)", "heelToe"],
                    ].map(([label, key]) => (
                      <div key={key}>
                        <label
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "11px",
                            fontWeight: 600,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "#0B0B0B",
                            display: "block",
                            marginBottom: "8px",
                          }}
                        >
                          {label}
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          placeholder="0.0"
                          onChange={(e) => select(key, e.target.value)}
                          style={{
                            width: "100%",
                            padding: "12px 16px",
                            border: "2px solid #EAE6DD",
                            borderRadius: "10px",
                            fontFamily: "var(--font-sans)",
                            fontSize: "16px",
                            fontWeight: 500,
                            color: "#0B0B0B",
                            background: "#fff",
                            outline: "none",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Size chart */}
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
                    marginBottom: "16px",
                  }}
                >
                  Size Conversion Chart
                </label>
                <div style={{ overflowX: "auto" }}>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      fontFamily: "var(--font-sans)",
                      fontSize: "12px",
                    }}
                  >
                    <thead>
                      <tr style={{ background: "#0B0B0B" }}>
                        {["EU", "UK", "US Men's", "US Women's", "cm"].map(
                          (h) => (
                            <th
                              key={h}
                              style={{
                                padding: "10px 12px",
                                color: "#FAD90C",
                                fontWeight: 600,
                                letterSpacing: "0.08em",
                                textAlign: "center",
                                fontSize: "10px",
                                textTransform: "uppercase",
                              }}
                            >
                              {h}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["39", "6", "7", "8.5", "24.5"],
                        ["40", "7", "8", "9.5", "25.5"],
                        ["41", "7.5", "8.5", "10", "26"],
                        ["42", "8", "9", "10.5", "26.5"],
                        ["43", "9", "10", "11.5", "27.5"],
                        ["44", "10", "11", "12.5", "28"],
                        ["45", "11", "12", "13.5", "29"],
                        ["46", "12", "13", "14", "29.5"],
                      ].map((row, i) => (
                        <tr
                          key={row[0]}
                          style={{
                            background: i % 2 === 0 ? "#F8F6F2" : "#fff",
                            borderBottom: "1px solid #EAE6DD",
                          }}
                        >
                          {row.map((cell, j) => (
                            <td
                              key={j}
                              style={{
                                padding: "10px 12px",
                                textAlign: "center",
                                color: j === 0 ? "#0B0B0B" : "#666",
                                fontWeight: j === 0 ? 700 : 400,
                              }}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
    </div>
  )
}

export default Measurement