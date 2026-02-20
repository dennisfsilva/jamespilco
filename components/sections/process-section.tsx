"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { GALLERY_SPACING } from "@/lib/constants";

interface ProcessSectionProps {
  images: string[];
}

export function ProcessSection({ images }: ProcessSectionProps) {
  const t = useTranslations("HomePage");

  return (
    <section className={`${GALLERY_SPACING.section} bg-secondary/50`}>
      <div className={GALLERY_SPACING.container}>
        <h2 className="font-heading text-3xl font-light tracking-wide sm:text-4xl">
          {t("process")}
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          {t("processDescription")}
        </p>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {images.map((src, index) => (
            <div
              key={index}
              className="relative aspect-[3/2] overflow-hidden"
            >
              <Image
                src={src}
                alt={`${t("process")} ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
