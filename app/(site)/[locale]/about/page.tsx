import { getTranslations } from "next-intl/server";
import { PortraitHero } from "@/components/about/portrait-hero";
import { BioNarrative } from "@/components/about/bio-narrative";
import { ArtistStatement } from "@/components/about/artist-statement";
import { ArtistEssay } from "@/components/about/artist-essay";
import { Timeline } from "@/components/about/timeline";
import { ExhibitionsList } from "@/components/about/exhibitions-list";
import { PressList } from "@/components/about/press-list";

export async function generateMetadata() {
  const t = await getTranslations("about");
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default function AboutPage() {
  return (
    <>
      <PortraitHero />
      <BioNarrative />
      <ArtistStatement />
      <ArtistEssay />
      <Timeline />
      <ExhibitionsList />
      <PressList />
    </>
  );
}
