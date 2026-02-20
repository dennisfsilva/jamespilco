import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { sanityFetch } from "@/sanity/lib/client";
import { resolveArtworkImageUrls } from "@/sanity/lib/image";
import { ALL_ARTWORKS_QUERY, CATEGORIES_QUERY } from "@/sanity/lib/queries";
import {
  placeholderArtworks,
  placeholderCategories,
} from "@/lib/placeholder-data";
import { GalleryFilters } from "@/components/gallery/gallery-filters";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { GALLERY_SPACING } from "@/lib/constants";
import { Suspense } from "react";
import type { Artwork, Category } from "@/types/artwork";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: locale === "es" ? "Galería" : "Gallery",
    description:
      locale === "es"
        ? "Explora la colección completa de óleos originales del Dr. James Pilco Luzuriaga. Retratos, figurativo y más."
        : "Browse the complete collection of original oil paintings by Dr. James Pilco Luzuriaga. Portraits, figurative work, and more.",
  };
}

export default async function GalleryPage() {
  const t = await getTranslations("Gallery");

  const [cmsArtworks, cmsCategories] = await Promise.all([
    sanityFetch<Artwork[] | null>(ALL_ARTWORKS_QUERY),
    sanityFetch<Category[] | null>(CATEGORIES_QUERY),
  ]);

  const artworks =
    cmsArtworks && cmsArtworks.length > 0
      ? resolveArtworkImageUrls(cmsArtworks)
      : resolveArtworkImageUrls(placeholderArtworks);

  const categories =
    cmsCategories && cmsCategories.length > 0
      ? cmsCategories
      : placeholderCategories;

  return (
    <section className={GALLERY_SPACING.section}>
      <div className={GALLERY_SPACING.container}>
        <h1 className="font-heading text-4xl font-light tracking-wide sm:text-5xl">
          {t("title")}
        </h1>
        <div className="mt-10">
          <Suspense>
            <GalleryFilters categories={categories} />
          </Suspense>
        </div>
        <div className="mt-10">
          <Suspense>
            <GalleryGrid artworks={artworks} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
