import Image from "next/image";

export default function PageLoader() {
  return (
    <div
      className="sbs-loader fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-near-black"
      role="status"
      aria-live="polite"
      aria-label="Loading Signature by Sarah"
    >
      {/* subtle gold glow */}
      <div className="absolute h-[500px] w-[500px] rounded-full bg-gold/5 blur-[120px]" />

      <div className="relative flex flex-col items-center text-center">
        <div className="sbs-logo mb-8">
          <Image
            src="/sarah-logo.jpg"
            alt="Signature by Sarah"
            width={160}
            height={160}
            priority
            className="h-32 w-32 object-contain sm:h-40 sm:w-40"
          />
        </div>

        <h1 className="sbs-title font-display text-3xl font-bold tracking-[-0.03em] text-off-white sm:text-5xl">
          Signature by Sarah
        </h1>

        <p className="sbs-subtitle mt-4 text-[10px] uppercase tracking-[0.35em]  text-gold">
          Handcrafted Leather Footwear
        </p>

        <div className="mt-10 h-px w-40 overflow-hidden bg-white/10">
          <span className="block h-full bg-gold" />
        </div>
      </div>

      <style>{`
        .sbs-logo {
          animation: reveal 1.4s cubic-bezier(.22,1,.36,1) both;
        }

        .sbs-title {
          animation: fadeUp 1s .5s ease both;
        }

        .sbs-subtitle {
          animation: fadeUp 1s .8s ease both;
        }

        .sbs-loader span {
          animation: line 2s ease-in-out infinite;
        }


        @keyframes reveal {
          from {
            opacity:0;
            transform:translateY(20px) scale(.95);
          }
          to {
            opacity:1;
            transform:translateY(0) scale(1);
          }
        }


        @keyframes fadeUp {
          from {
            opacity:0;
            transform:translateY(15px);
          }
          to {
            opacity:1;
            transform:translateY(0);
          }
        }


        @keyframes line {
          0%,100% {
            transform:scaleX(.2);
            opacity:.4;
          }
          50% {
            transform:scaleX(1);
            opacity:1;
          }
        }


        @media(prefers-reduced-motion:reduce){
          *,
          *::before,
          *::after{
            animation:none!important;
          }
        }
      `}</style>
    </div>
  );
}