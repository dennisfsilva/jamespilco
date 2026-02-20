import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { sanityFetch } from "@/sanity/lib/client";
import { resolveImageUrl } from "@/sanity/lib/image";
import { ARTIST_QUERY } from "@/sanity/lib/queries";
import {
  placeholderArtist,
  placeholderExhibitions,
  placeholderPress,
} from "@/lib/placeholder-data";
import { GALLERY_SPACING } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PersonJsonLd } from "@/components/seo/json-ld";
import { getLocalizedText, getLocalizedBlock } from "@/lib/locale-text";
import type { Artist } from "@/types/artist";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: locale === "es" ? "Sobre el Artista" : "About the Artist",
    description:
      locale === "es"
        ? "Conoce al Dr. James Pilco Luzuriaga — médico cirujano, artista plástico y gestor cultural de Cuenca, Ecuador."
        : "Learn about Dr. James Pilco Luzuriaga — surgeon, visual artist & cultural manager from Cuenca, Ecuador.",
  };
}

export default async function AboutPage() {
  const t = await getTranslations("About");
  const locale = await getLocale();

  const cmsArtist = await sanityFetch<Artist | null>(ARTIST_QUERY);

  // Portrait
  const portrait = cmsArtist?.portrait
    ? resolveImageUrl(cmsArtist.portrait)
    : placeholderArtist.portrait;

  // Name
  const name = cmsArtist?.name || placeholderArtist.name;

  // Bio
  const bio = cmsArtist?.bio
    ? getLocalizedBlock(cmsArtist.bio, locale)
    : locale === "es"
      ? placeholderArtist.bioEs
      : placeholderArtist.bioEn;

  // Statement
  const statement = cmsArtist?.statement
    ? getLocalizedBlock(cmsArtist.statement, locale)
    : locale === "es"
      ? placeholderArtist.statementEs
      : placeholderArtist.statementEn;

  // Exhibitions and press
  const exhibitions = cmsArtist?.exhibitions && cmsArtist.exhibitions.length > 0
    ? cmsArtist.exhibitions
    : placeholderExhibitions;

  const press = cmsArtist?.press && cmsArtist.press.length > 0
    ? cmsArtist.press
    : placeholderPress;

  return (
    <>
      <PersonJsonLd />

      {/* Hero portrait section */}
      <section className={GALLERY_SPACING.section}>
        <div className={GALLERY_SPACING.container}>
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="relative aspect-[3/4] overflow-hidden bg-muted">
              <Image
                src={portrait}
                alt={name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="lg:sticky lg:top-24">
              <h1 className="font-heading text-4xl font-light tracking-wide sm:text-5xl">
                {t("title")}
              </h1>
              <p className="mt-8 leading-relaxed text-muted-foreground">
                {bio}
              </p>

              <Separator className="my-8" />

              <h2 className="font-heading text-2xl font-light">
                {t("statement")}
              </h2>
              <blockquote className="mt-6 border-l-2 border-primary pl-6 font-heading text-lg italic leading-relaxed text-foreground/80">
                {statement}
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Exhibitions */}
      <section className={`${GALLERY_SPACING.section} bg-secondary/50`}>
        <div className={GALLERY_SPACING.container}>
          <h2 className="font-heading text-3xl font-light tracking-wide">
            {t("exhibitions")}
          </h2>
          <div className="mt-10 space-y-6">
            {exhibitions.map((exhibition, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 border-b border-border/40 pb-6 last:border-none sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="font-heading text-lg">
                    {getLocalizedText(exhibition.title, locale)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {exhibition.venue}, {exhibition.location}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">{t(exhibition.type)}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {exhibition.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press */}
      <section className={GALLERY_SPACING.section}>
        <div className={GALLERY_SPACING.container}>
          <h2 className="font-heading text-3xl font-light tracking-wide">
            {t("press")}
          </h2>
          <div className="mt-10 space-y-6">
            {press.map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-1 border-b border-border/40 pb-6 last:border-none sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="font-heading text-lg">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.publication}
                  </p>
                </div>
                {item.date && (
                  <span className="text-sm text-muted-foreground">
                    {new Date(item.date).getFullYear()}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
