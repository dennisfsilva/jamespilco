"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ArtworkCard } from "./artwork-card";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import type { Artwork } from "@/types/artwork";

interface GalleryGridProps {
  artworks: Artwork[];
}

export function GalleryGrid({ artworks }: GalleryGridProps) {
  const searchParams = useSearchParams();
  const t = useTranslations("Gallery");

  const medium = searchParams.get("medium");
  const subject = searchParams.get("subject");
  const availability = searchParams.get("availability");

  const filtered = artworks.filter((artwork: Artwork) => {
    if (medium && medium !== "all") {
      const hasMedium = artwork.categories?.some(
        (c) => c.type === "medium" && c.slug.current === medium
      );
      if (!hasMedium) return false;
    }
    if (subject && subject !== "all") {
      const hasSubject = artwork.categories?.some(
        (c) => c.type === "subject" && c.slug.current === subject
      );
      if (!hasSubject) return false;
    }
    if (availability && availability !== "all") {
      if (artwork.availability !== availability) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    return (
      <div className="py-24 text-center text-muted-foreground">
        {t("noResults")}
      </div>
    );
  }

  return (
    <div>
      <p className="mb-6 text-sm text-muted-foreground">
        {t("showingCount", { count: filtered.length })}
      </p>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((artwork) => (
            <motion.div
              key={artwork._id}
              variants={fadeInUp}
              layout
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.95 }}
              className="break-inside-avoid"
            >
              <ArtworkCard artwork={artwork} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
