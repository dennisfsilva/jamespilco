import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3, Cormorant_Garamond } from "next/font/google";
import { getLocale } from "next-intl/server";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
  display: "swap",
  variable: "--font-playfair",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  display: "swap",
  variable: "--font-source-sans",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: {
    default: "James Pilco Luzuriaga | Cirujano y Artista Visual",
    template: "%s | James Pilco Luzuriaga",
  },
  description:
    "Arte figurativo original por el Dr. James Pilco Luzuriaga, cirujano, artista visual y profesor en Cuenca, Ecuador. Donde la medicina se encuentra con el lienzo.",
  metadataBase: new URL("https://jamespilco.com"),
  openGraph: {
    type: "website",
    locale: "es_EC",
    alternateLocale: "en_US",
    siteName: "James Pilco Luzuriaga",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`dark ${playfair.variable} ${sourceSans.variable} ${cormorant.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
