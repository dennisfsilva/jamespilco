import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-void flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-display font-black text-cream text-3xl md:text-4xl">
          Obra no encontrada
        </h1>
        <p className="font-accent italic text-stone text-lg mt-4">
          La obra que buscas no está en esta galería.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gold hover:text-gold-muted font-body text-sm mt-8 transition-colors"
        >
          &larr; Volver al inicio
        </Link>
      </div>
    </div>
  );
}
