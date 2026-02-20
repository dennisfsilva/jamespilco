import { getLocale } from "next-intl/server";
import { sanityFetch } from "@/sanity/lib/client";
import { resolveImageUrl, resolveArtworkImageUrls } from "@/sanity/lib/image";
import { HOMEPAGE_QUERY, ARTIST_QUERY } from "@/sanity/lib/queries";
import { getLocalizedBlock } from "@/lib/locale-text";
import {
  placeholderArtworks,
  placeholderHeroImages,
  placeholderProcessImages,
  placeholderArtist,
} from "@/lib/placeholder-data";
import { Hero } from "@/components/sections/hero";
import { FeaturedCarousel } from "@/components/sections/featured-carousel";
import { ArtistStatement } from "@/components/sections/artist-statement";
import { SelectedGalleryGrid } from "@/components/sections/selected-gallery-grid";
import { ProcessSection } from "@/components/sections/process-section";
import { CTASection } from "@/components/sections/cta-section";
import type { Artwork } from "@/types/artwork";

interface HomepageData {
  heroPaintings?: Array<{ images: Array<{ asset: { _ref: string } }> }>;
  featuredWorks?: Artwork[];
  selectedWorks?: Artwork[];
  processImages?: Array<{ asset: { _ref: string } }>;
}

interface ArtistData {
  statement?: { es: unknown[]; en: unknown[] };
}

export default async function HomePage() {
  const locale = await getLocale();

  const [homepage, artist] = await Promise.all([
    sanityFetch<HomepageData | null>(HOMEPAGE_QUERY),
    sanityFetch<ArtistData | null>(ARTIST_QUERY),
  ]);

  // Hero images
  const heroImages =
    homepage?.heroPaintings && homepage.heroPaintings.length > 0
      ? homepage.heroPaintings.map((p) => resolveImageUrl(p.images))
      : placeholderHeroImages;

  // Featured works
  const featuredWorks =
    homepage?.featuredWorks && homepage.featuredWorks.length > 0
      ? resolveArtworkImageUrls(homepage.featuredWorks)
      : resolveArtworkImageUrls(
          placeholderArtworks.filter((a) => a.featured)
        );

  // Selected works
  const selectedWorks =
    homepage?.selectedWorks && homepage.selectedWorks.length > 0
      ? resolveArtworkImageUrls(homepage.selectedWorks)
      : resolveArtworkImageUrls(placeholderArtworks.slice(0, 6));

  // Artist statement
  const statement = artist?.statement
    ? getLocalizedBlock(artist.statement as any, locale)
    : locale === "es"
      ? placeholderArtist.statementEs
      : placeholderArtist.statementEn;

  // Process images
  const processImages =
    homepage?.processImages && homepage.processImages.length > 0
      ? homepage.processImages.map((img) => resolveImageUrl(img))
      : placeholderProcessImages;

  return (
    <>
      <Hero images={heroImages} />
      <FeaturedCarousel artworks={featuredWorks} />
      <ArtistStatement statement={statement} />
      <SelectedGalleryGrid artworks={selectedWorks} />
      <ProcessSection images={processImages} />
      <CTASection />
    </>
  );
}
