/**
 * Film grain overlay — pure CSS, zero JS overhead.
 * Uses a static SVG noise texture as a tiled background-image (rendered once, cached).
 * The grain-shift keyframe animates background-position — NOT transform —
 * so the container stays fixed and no edges/squares are visible.
 */
export function FilmGrain({ opacity = 0.035 }: { opacity?: number }) {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1]"
      aria-hidden="true"
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "200px 200px",
        animation: "grain-shift 6s steps(8) infinite",
      }}
    />
  );
}
