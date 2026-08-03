interface ShoeStyleProps {
  selections: Record<string, string>;
  select: (key: string, value: string) => void;
}

const Review = ({ selections, select }: ShoeStyleProps) => {
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
        Review Your Order
      </h2>
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "14px",
          color: "#888",
          marginBottom: "40px",
        }}
      >
        Your bespoke shoes, one final look before we begin crafting.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
          alignItems: "start",
        }}
      >
        <div
          style={{
            background: "#0B0B0B",
            borderRadius: "20px",
            padding: "36px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "28px",
            }}
          >
            {/* <img
            // src={sbsLogo}
            alt="SBS"
            style={{
              height: "36px",
              width: "36px",
              objectFit: "contain",
            }}
          /> */}
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "18px",
                fontWeight: 600,
                color: "#F8F6F2",
              }}
            >
              Order Summary
            </div>
          </div>
          {[
            ["Style", selections.style],
            ["Material", selections.material],
            ["Color", selections.color],
            ["Sole", selections.sole],
            ["Toe Shape", selections.toe],
            ["Initials", selections.initials || "—"],
            ["Size", selections.size || "Custom"],
          ].map(([label, value]) => (
            <div
              key={label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid rgba(248,246,242,0.08)",
                padding: "12px 0",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "12px",
                  color: "rgba(248,246,242,0.45)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {label}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#FAD90C",
                  textTransform: "capitalize",
                }}
              >
                {value || "—"}
              </span>
            </div>
          ))}
          <div
            style={{
              marginTop: "24px",
              padding: "20px",
              background: "rgba(250,217,12,0.08)",
              borderRadius: "12px",
              border: "1px solid rgba(250,217,12,0.2)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "10px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#FAD90C",
                marginBottom: "8px",
              }}
            >
              Timeline
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "16px",
                fontWeight: 600,
                color: "#F8F6F2",
                marginBottom: "4px",
              }}
            >
              3–4 Weeks Production
            </div>
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "12px",
                color: "rgba(248,246,242,0.5)",
              }}
            >
              + 5–10 Business Days Delivery
            </div>
          </div>
        </div>
        <div>
          <div
            style={{
              background: "#F8F6F2",
              border: "2px solid #EAE6DD",
              borderRadius: "20px",
              padding: "36px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#888",
                marginBottom: "8px",
              }}
            >
              Estimated Starting Price
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "40px",
                fontWeight: 700,
                color: "#0B0B0B",
                letterSpacing: "-0.02em",
              }}
            >
              ₦185,000
              <span style={{ fontSize: "18px", color: "#888" }}>+</span>
            </div>
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "12px",
                color: "#888",
                marginTop: "8px",
              }}
            >
              Final quote provided within 24 hours of request
            </div>
          </div>
          <button
            className="btn-gold"
            style={{
              width: "100%",
              padding: "18px",
              fontSize: "13px",
              borderRadius: "12px",
            }}
          >
            Request Custom Quote
          </button>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              color: "#aaa",
              textAlign: "center",
              marginTop: "16px",
              lineHeight: 1.6,
            }}
          >
            No payment required. Our team will contact you within 24 hours to
            discuss your order, confirm pricing, and arrange payment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Review;
