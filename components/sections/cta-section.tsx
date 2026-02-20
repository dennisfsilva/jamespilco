"use client";

import { useTranslations } from "next-intl";
import { GALLERY_SPACING } from "@/lib/constants";
import { useSiteSettings } from "@/lib/site-settings-context";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  const t = useTranslations("HomePage");
  const tc = useTranslations("Common");
  const { whatsappNumber } = useSiteSettings();

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(tc("whatsappGeneric"))}`;

  return (
    <section className={GALLERY_SPACING.section}>
      <div className={GALLERY_SPACING.narrowContainer}>
        <div className="text-center">
          <h2 className="font-heading text-3xl font-light tracking-wide sm:text-4xl md:text-5xl">
            {t("ctaTitle")}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            {t("ctaDescription")}
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="gap-2">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" />
                {t("ctaButton")}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
