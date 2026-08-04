const Hero = () => {
  return (
    <div>
      {" "}
      <div
        style={{
          background: "#0B0B0B",
          padding: "64px 32px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-5%",
            top: "-20%",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(120px, 20vw, 280px)",
            fontWeight: 900,
            color: "transparent",
            WebkitTextStroke: "1px rgba(250,217,12,0.06)",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          QUOTE
        </div>
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "16px",
            }}
            className="pt-10"

          >
            <span
              style={{
                display: "block",
                width: "40px",
                height: "2px",
                background: "#FAD90C",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#FAD90C",
              }}
            >
              Bespoke Request
            </span>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 6vw, 80px)",
              fontWeight: 700,
              color: "#F8F6F2",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            Quote Cart
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
