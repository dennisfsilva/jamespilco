"use client";

export function FilmGrain({ opacity = 0.035 }: { opacity?: number }) {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg
        className="absolute"
        style={{
          width: "300%",
          height: "300%",
          top: "-100%",
          left: "-100%",
          animation: "grain 8s steps(10) infinite",
        }}
      >
        <filter id="grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter)" />
      </svg>
    </div>
  );
}
