import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { GalleryFilters } from "@/components/gallery/gallery-filters";
import { GalleryMasonry } from "@/components/gallery/gallery-masonry";

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
    <div className="relative bg-void min-h-screen pt-28 pb-24 md:pb-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 50% 25% at 50% 8%, oklch(0.25 0.04 72 / 0.3), transparent)" }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 60% 30% at 50% 55%, oklch(0.18 0.03 72 / 0.2), transparent)"
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-[300px]"
        style={{ background: "linear-gradient(to bottom, transparent, var(--color-night))" }}
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-display font-black text-cream text-4xl md:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="font-accent italic text-stone text-lg md:text-xl mt-3 max-w-lg">
            {t("subtitle")}
          </p>
          <div className="gold-line max-w-[60px] mt-6" />
        </div>

        {/* Filters */}
        <div className="mb-8">
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
  );
}
