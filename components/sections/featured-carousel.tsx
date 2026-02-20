"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getLocalizedText, formatPrice } from "@/lib/locale-text";
import { GALLERY_SPACING } from "@/lib/constants";
import type { Artwork } from "@/types/artwork";

interface FeaturedCarouselProps {
  artworks: Artwork[];
}

export function FeaturedCarousel({ artworks }: FeaturedCarouselProps) {
  const t = useTranslations("HomePage");
  const tc = useTranslations("Common");
  const locale = useLocale();
  const featured = artworks;

  const availabilityLabel: Record<string, string> = {
    sold: tc("sold"),
    reserved: tc("reserved"),
    nfs: tc("privateCollection"),
    donated: tc("donated"),
  };

  return (
    <section className={GALLERY_SPACING.section}>
      <div className={GALLERY_SPACING.container}>
        <h2 className="font-heading text-3xl font-light tracking-wide sm:text-4xl">
          {t("featuredWorks")}
        </h2>

        <Carousel
          opts={{ align: "start", loop: true }}
          className="mt-12"
        >
          <CarouselContent className="-ml-4">
            {featured.map((artwork) => (
              <CarouselItem
                key={artwork._id}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <Link
                  href={`/artwork/${artwork.slug.current}`}
                  className="group block"
                >
                  <div
                    className="relative overflow-hidden bg-muted"
                    style={{ aspectRatio: artwork.aspectRatio || 3 / 4 }}
                  >
                    <Image
                      src={artwork.imageUrl || "/images/artwork/uda-gallery-1.jpg"}
                      alt={getLocalizedText(artwork.title, locale)}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {artwork.availability !== "available" && (
                      <div className={`absolute left-3 top-3 px-3 py-1 text-xs uppercase tracking-wider ${
                        artwork.availability === "sold"
                          ? "bg-foreground/80 text-background"
                          : artwork.availability === "donated"
                            ? "bg-blue-600/80 text-white"
                            : "bg-gold text-gold-foreground"
                      }`}>
                        {availabilityLabel[artwork.availability]}
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <h3 className="font-heading text-lg">
                      {getLocalizedText(artwork.title, locale)}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {getLocalizedText(artwork.medium, locale)}, {artwork.year}
                    </p>
                    {artwork.price && artwork.availability === "available" && (
                      <p className="mt-1 text-sm font-medium">
                        {formatPrice(artwork.price)}
                      </p>
                    )}
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
}
