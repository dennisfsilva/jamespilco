import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="font-heading text-6xl font-light">404</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        La página que busca no existe.
      </p>
      <p className="text-lg text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-8 border border-primary px-8 py-3 text-sm uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
      >
        Inicio / Home
      </Link>
    </div>
  );
}
