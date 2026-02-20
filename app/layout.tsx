import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { getLocale } from "next-intl/server";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isEs = locale === "es";
  return {
    title: {
      default: isEs
        ? "James Pilco — Médico y Artista Plástico · Cuenca, Ecuador"
        : "James Pilco — Surgeon & Visual Artist · Cuenca, Ecuador",
      template: "%s | James Pilco",
    },
    description: isEs
      ? "Galería de arte del Dr. James Pilco Luzuriaga — médico cirujano, artista plástico y gestor cultural de Cuenca, Ecuador. Óleos originales, retratos y arte figurativo."
      : "Art gallery of Dr. James Pilco Luzuriaga — surgeon, visual artist & cultural manager from Cuenca, Ecuador. Original oil paintings, portraits, and figurative art.",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${cormorant.variable} ${inter.variable} font-body antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
