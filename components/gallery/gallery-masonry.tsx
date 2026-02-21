"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { placeholderArtworks } from "@/lib/placeholder-data";
import { ArtworkCard } from "./artwork-card";
import type { Artwork } from "@/types/artwork";

export function GalleryMasonry() {
  const searchParams = useSearchParams();
  const t = useTranslations("gallery");
  const activeFilter = searchParams.get("filter") || "all";

  const filtered =
    activeFilter === "all"
      ? placeholderArtworks
      : placeholderArtworks.filter((a: Artwork) =>
          a.categories?.some((c) => c.slug.current === activeFilter)
        );

  return (
    <AnimatePresence mode="wait">
      {filtered.length === 0 ? (
        <motion.p
          key="no-results"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-center text-stone font-accent italic text-lg py-20"
        >
          {t("noResults")}
        </motion.p>
      ) : (
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="masonry"
        >
          {filtered.map((artwork, i) => (
            <ArtworkCard key={artwork._id} artwork={artwork} index={i} />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
