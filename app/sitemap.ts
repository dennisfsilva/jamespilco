import type { MetadataRoute } from "next";
import { placeholderArtworks } from "@/lib/placeholder-data";

const BASE_URL = "https://jamespilco.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const artworkRoutes = placeholderArtworks.map((artwork) => ({
    url: `${BASE_URL}/artwork/${artwork.slug.current}`,
    lastModified: new Date(),
    alternates: {
      languages: {
        es: `${BASE_URL}/artwork/${artwork.slug.current}`,
        en: `${BASE_URL}/en/artwork/${artwork.slug.current}`,
      },
    },
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      alternates: {
        languages: { es: BASE_URL, en: `${BASE_URL}/en` },
      },
    },
    {
      url: `${BASE_URL}/gallery`,
      lastModified: new Date(),
      alternates: {
        languages: {
          es: `${BASE_URL}/gallery`,
          en: `${BASE_URL}/en/gallery`,
        },
      },
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      alternates: {
        languages: {
          es: `${BASE_URL}/about`,
          en: `${BASE_URL}/en/about`,
        },
      },
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      alternates: {
        languages: {
          es: `${BASE_URL}/contact`,
          en: `${BASE_URL}/en/contact`,
        },
      },
    },
    ...artworkRoutes,
  ];
}
