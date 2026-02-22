import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-void flex items-center justify-center px-6">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 50% 50% at 50% 45%, oklch(0.22 0.04 72 / 0.3), transparent)" }}
      />
      <div className="relative text-center">
        <h1 className="font-display font-black text-cream text-3xl md:text-4xl">
          Obra no encontrada
        </h1>
        <p className="font-accent italic text-stone text-base mt-2">
          Work not found
        </p>
        <p className="font-accent italic text-ash text-sm mt-4 max-w-sm mx-auto">
          La pieza que buscas no está en esta galería.
          <br />
          <span className="text-ash/70">The piece you&apos;re looking for isn&apos;t in this gallery.</span>
        </p>
        <div className="flex items-center justify-center gap-4 mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gold hover:text-gold-muted font-body text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/50 rounded-sm px-1"
          >
            &larr; Volver al inicio / Back home
          </Link>
        </div>
      </div>
    </div>
  );
}
