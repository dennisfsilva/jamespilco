import type { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import { ALL_ARTWORKS_QUERY } from "@/sanity/lib/queries";
import { placeholderArtworks } from "@/lib/placeholder-data";
import type { Artwork } from "@/types/artwork";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://jamespilco.com";

  const cmsArtworks = await sanityFetch<Artwork[] | null>(ALL_ARTWORKS_QUERY);
  const artworks =
    cmsArtworks && cmsArtworks.length > 0 ? cmsArtworks : placeholderArtworks;

  const artworkUrls = artworks.flatMap((artwork) => [
    {
      url: `${baseUrl}/artwork/${artwork.slug.current}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/artwork/${artwork.slug.current}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ]);

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/gallery`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/en/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...artworkUrls,
  ];
}
