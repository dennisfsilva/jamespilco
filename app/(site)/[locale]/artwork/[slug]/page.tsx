import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { placeholderArtworks } from "@/lib/placeholder-data";
import { getLocalizedText, formatPrice } from "@/lib/locale-text";
import { ArtworkImmersive } from "@/components/artwork/artwork-immersive";
import { ArtworkInfo } from "@/components/artwork/artwork-info";
import { RelatedWorks } from "@/components/artwork/related-works";

interface ArtworkPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: ArtworkPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const artwork = placeholderArtworks.find((a) => a.slug.current === slug);
  if (!artwork) return {};

  const title = getLocalizedText(artwork.title, locale);
  return {
    title,
    description: `${title} | ${getLocalizedText(artwork.medium, locale)}, ${artwork.year}. ${artwork.price ? formatPrice(artwork.price) : ""}`,
  };
}

export default async function ArtworkPage({ params }: ArtworkPageProps) {
  const { slug } = await params;
  const artwork = placeholderArtworks.find((a) => a.slug.current === slug);

  if (!artwork) {
    notFound();
  }

  return (
    <>
      <ArtworkImmersive artwork={artwork} />
      <ArtworkInfo artwork={artwork} />
      <RelatedWorks currentSlug={slug} />
    </>
  );
}
