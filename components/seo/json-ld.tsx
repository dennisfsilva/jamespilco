import type { Artwork } from "@/types/artwork";
import { getLocalizedText } from "@/lib/locale-text";
import { resolveImageUrl } from "@/sanity/lib/image";
import { SITE_CONFIG } from "@/lib/constants";

export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "James Pilco Luzuriaga",
    jobTitle: "Visual Artist & Surgeon",
    url: SITE_CONFIG.siteUrl,
    sameAs: [SITE_CONFIG.instagram, SITE_CONFIG.linkedin],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cuenca",
      addressCountry: "EC",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ArtworkJsonLd({
  artwork,
  locale,
}: {
  artwork: Artwork;
  locale: string;
}) {
  const title = getLocalizedText(artwork.title, locale);
  const imageUrl = resolveImageUrl(artwork.images[0]);

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    name: title,
    image: imageUrl,
    artist: {
      "@type": "Person",
      name: "James Pilco Luzuriaga",
    },
    artMedium: getLocalizedText(artwork.medium, locale),
    dateCreated: String(artwork.year),
  };

  if (artwork.dimensions) {
    data.width = { "@type": "Distance", name: `${artwork.dimensions.width} cm` };
    data.height = { "@type": "Distance", name: `${artwork.dimensions.height} cm` };
  }

  if (artwork.availability === "available" && artwork.price) {
    data.offers = {
      "@type": "Offer",
      price: artwork.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
