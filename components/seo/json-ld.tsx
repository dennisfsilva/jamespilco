import type { Artwork } from "@/types/artwork";
import { getLocalizedText, formatDimensions } from "@/lib/locale-text";

interface ArtworkJsonLdProps {
  artwork: Artwork;
  locale: string;
  imageUrl: string;
}

export function ArtworkJsonLd({ artwork, locale, imageUrl }: ArtworkJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    name: getLocalizedText(artwork.title, locale),
    image: imageUrl,
    dateCreated: String(artwork.year),
    artform: "painting",
    artMedium: getLocalizedText(artwork.medium, locale),
    ...(artwork.dimensions && {
      width: {
        "@type": "Distance",
        name: `${artwork.dimensions.width} cm`,
      },
      height: {
        "@type": "Distance",
        name: `${artwork.dimensions.height} cm`,
      },
    }),
    ...(artwork.price &&
      artwork.availability === "available" && {
        offers: {
          "@type": "Offer",
          price: artwork.price,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      }),
    creator: {
      "@type": "Person",
      name: "James Pilco Luzuriaga",
      url: "https://jamespilco.com",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function PersonJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "James Pilco Luzuriaga",
    url: "https://jamespilco.com",
    jobTitle: "Surgeon & Visual Artist",
    description:
      "Ecuadorian surgeon, visual artist and cultural manager from Cuenca, Ecuador. Self-taught painter since age four, founding professor of the Faculty of Medicine at Universidad del Azuay.",
    sameAs: [
      "https://instagram.com/jamespilcoluzuriaga",
      "https://www.linkedin.com/in/james-stanley-pilco-luzuriaga-5a557040/",
    ],
    nationality: {
      "@type": "Country",
      name: "Ecuador",
    },
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "Universidad de Cuenca",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "Universidad Nacional Autónoma de México (UNAM)",
      },
    ],
    worksFor: {
      "@type": "CollegeOrUniversity",
      name: "Universidad del Azuay",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
