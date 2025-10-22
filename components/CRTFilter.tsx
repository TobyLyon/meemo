"use client";

export default function CRTFilter() {
  return (
    <div className="crt-overlay">
      <div className="crt-scanlines" />
      <div className="crt-rgb" />
      <div className="crt-flicker" />
      <div className="crt-vignette" />

      <style jsx>{`
        .crt-overlay {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 2147483647;
          mix-blend-mode: normal;
          filter: contrast(1.03) saturate(1.08) brightness(0.98);
        }

        /* Horizontal scanlines */
        .crt-scanlines {
          position: absolute;
          inset: 0;
          background:
            repeating-linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0.04) 0px,
              rgba(255, 255, 255, 0.04) 1px,
              rgba(0, 0, 0, 0.0) 2px,
              rgba(0, 0, 0, 0.0) 3px
            );
          opacity: 0.22;
          transform: translateZ(0);
        }

        /* RGB subpixel mask */
        .crt-rgb {
          position: absolute;
          inset: 0;
          background:
            repeating-linear-gradient(
              to right,
              rgba(255, 0, 0, 0.06) 0px, rgba(255, 0, 0, 0.06) 1px,
              rgba(0, 255, 0, 0.06) 1px, rgba(0, 255, 0, 0.06) 2px,
              rgba(0, 0, 255, 0.06) 2px, rgba(0, 0, 255, 0.06) 3px
            );
          opacity: 0.08;
          mix-blend-mode: screen;
          transform: translateZ(0);
        }

        /* Subtle brightness flicker */
        .crt-flicker {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 50% 20%,
            rgba(255, 255, 255, 0.03),
            rgba(0, 0, 0, 0) 60%
          );
          animation: crt-flicker 8s infinite steps(1, end);
          opacity: 0.05;
        }

        /* Darkened corners for tube-like vignette */
        .crt-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            120% 100% at 50% 50%,
            rgba(0, 0, 0, 0) 55%,
            rgba(0, 0, 0, 0.15) 75%,
            rgba(0, 0, 0, 0.35) 100%
          );
          box-shadow:
            inset 0 0 80px rgba(0, 0, 0, 0.35),
            inset 0 0 140px rgba(0, 0, 0, 0.25);
        }

        @keyframes crt-flicker {
          0% { opacity: 0.03; }
          8% { opacity: 0.06; }
          10% { opacity: 0.02; }
          20% { opacity: 0.05; }
          25% { opacity: 0.04; }
          35% { opacity: 0.07; }
          45% { opacity: 0.03; }
          50% { opacity: 0.06; }
          60% { opacity: 0.04; }
          70% { opacity: 0.07; }
          80% { opacity: 0.03; }
          90% { opacity: 0.05; }
          100% { opacity: 0.03; }
        }
      `}</style>
    </div>
  );
}


