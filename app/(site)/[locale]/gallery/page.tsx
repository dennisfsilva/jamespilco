import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { GalleryFilters } from "@/components/gallery/gallery-filters";
import { GalleryMasonry } from "@/components/gallery/gallery-masonry";
import { FilmGrain } from "@/components/shared/film-grain";
import { GALLERY_SPACING } from "@/lib/constants";

export async function generateMetadata() {
  const t = await getTranslations("gallery");
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function GalleryPage() {
  const t = await getTranslations("gallery");

  return (
    <>
      <FilmGrain opacity={0.03} />

      <div className={`bg-void min-h-screen pt-24 ${GALLERY_SPACING.section}`}>
        <div className={GALLERY_SPACING.wideContainer}>
          {/* Header */}
          <div className="mb-12">
            <h1 className="font-display font-black text-cream text-4xl md:text-5xl">
              {t("title")}
            </h1>
            <p className="font-accent italic text-stone text-lg mt-3">
              {t("subtitle")}
            </p>
          </div>

          {/* Filters */}
          <div className="mb-10">
            <Suspense>
              <GalleryFilters />
            </Suspense>
          </div>

          {/* Masonry Grid */}
          <Suspense>
            <GalleryMasonry />
          </Suspense>
        </div>
      </div>
    </>
  );
}
