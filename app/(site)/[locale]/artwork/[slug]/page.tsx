import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/client";
import { resolveImageUrl } from "@/sanity/lib/image";
import { ARTWORK_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { placeholderArtworks } from "@/lib/placeholder-data";
import { ArtworkImageViewer } from "@/components/artwork/artwork-image-viewer";
import { ArtworkSidebar } from "@/components/artwork/artwork-sidebar";
import { ArtworkFAQ } from "@/components/artwork/artwork-faq";
import { RelatedWorks } from "@/components/artwork/related-works";
import { ArtworkJsonLd } from "@/components/seo/json-ld";
import { Separator } from "@/components/ui/separator";
import { getLocalizedText } from "@/lib/locale-text";
import type { Artwork } from "@/types/artwork";

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

function resolveArtworkImages(artwork: Artwork): string[] {
  // `...` spread query returns full array; `images[0]` returns single object
  const images = Array.isArray(artwork.images) ? artwork.images : [artwork.images];
  return images.filter(Boolean).map((img) => resolveImageUrl(img));
}

function addImageUrl(artwork: Artwork): Artwork {
  // GROQ `images[0]` returns a single object; `...` spread returns the full array
  const image = Array.isArray(artwork.images) ? artwork.images[0] : artwork.images;
  return {
    ...artwork,
    imageUrl: image ? resolveImageUrl(image) : undefined,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;

  const cmsArtwork = await sanityFetch<Artwork | null>(ARTWORK_BY_SLUG_QUERY, {
    slug,
  });
  const artwork =
    cmsArtwork || placeholderArtworks.find((a) => a.slug.current === slug);
  if (!artwork) return {};

  const title = getLocalizedText(artwork.title, locale);
  const medium = getLocalizedText(artwork.medium, locale);
  const firstImage = Array.isArray(artwork.images) ? artwork.images[0] : artwork.images;
  const imageUrl = firstImage ? resolveImageUrl(firstImage) : undefined;

  return {
    title,
    description: `${title} — ${medium}, ${artwork.year}. By James Pilco Luzuriaga.`,
    openGraph: {
      title: `${title} | James Pilco`,
      description: `${medium}, ${artwork.year}`,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function ArtworkDetailPage({ params }: Props) {
  const { slug, locale } = await params;

  const cmsArtwork = await sanityFetch<(Artwork & { related?: Artwork[] }) | null>(
    ARTWORK_BY_SLUG_QUERY,
    { slug }
  );

  const artwork = cmsArtwork
    ? cmsArtwork
    : placeholderArtworks.find((a) => a.slug.current === slug);

  if (!artwork) {
    notFound();
  }

  // Resolve related works
  let related: Artwork[];
  if (cmsArtwork?.related && cmsArtwork.related.length > 0) {
    related = cmsArtwork.related.map(addImageUrl);
  } else {
    related = placeholderArtworks
      .filter(
        (a) =>
          a._id !== artwork._id &&
          a.categories?.some((c) =>
            artwork.categories?.some((ac) => ac._id === c._id)
          )
      )
      .slice(0, 4)
      .map(addImageUrl);
  }

  const images = resolveArtworkImages(artwork);

  return (
    <>
      <ArtworkJsonLd
        artwork={artwork}
        locale={locale}
        imageUrl={images[0]}
      />
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-3">
            <ArtworkImageViewer images={images} title={artwork.title.en} />
          </div>
          <div className="lg:col-span-2">
            <ArtworkSidebar artwork={artwork} />
          </div>
        </div>
      </section>

      <Separator className="mx-auto max-w-7xl" />

      <RelatedWorks artworks={related} />
      <ArtworkFAQ />
    </>
  );
}
