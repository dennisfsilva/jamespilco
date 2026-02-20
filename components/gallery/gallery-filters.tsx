"use client";

import { useTranslations, useLocale } from "next-intl";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getLocalizedText } from "@/lib/locale-text";
import { useCallback } from "react";
import type { Category } from "@/types/artwork";

interface GalleryFiltersProps {
  categories: Category[];
}

export function GalleryFilters({ categories }: GalleryFiltersProps) {
  const t = useTranslations("Gallery");
  const tc = useTranslations("Common");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentMedium = searchParams.get("medium") || "all";
  const currentSubject = searchParams.get("subject") || "all";
  const currentAvailability = searchParams.get("availability") || "all";

  const mediumCategories = categories.filter(
    (c) => c.type === "medium"
  );
  const subjectCategories = categories.filter(
    (c) => c.type === "subject"
  );

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "all") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
      {/* Medium filter */}
      <div>
        <span className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
          {t("filterMedium")}
        </span>
        <Tabs
          value={currentMedium}
          onValueChange={(v) => updateFilter("medium", v)}
        >
          <TabsList>
            <TabsTrigger value="all">{t("filterAll")}</TabsTrigger>
            {mediumCategories.map((cat) => (
              <TabsTrigger key={cat._id} value={cat.slug.current}>
                {getLocalizedText(cat.title, locale)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Subject filter */}
      <div>
        <span className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
          {t("filterSubject")}
        </span>
        <Tabs
          value={currentSubject}
          onValueChange={(v) => updateFilter("subject", v)}
        >
          <TabsList>
            <TabsTrigger value="all">{t("filterAll")}</TabsTrigger>
            {subjectCategories.map((cat) => (
              <TabsTrigger key={cat._id} value={cat.slug.current}>
                {getLocalizedText(cat.title, locale)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Availability filter */}
      <div>
        <span className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
          {t("filterAvailability")}
        </span>
        <Tabs
          value={currentAvailability}
          onValueChange={(v) => updateFilter("availability", v)}
        >
          <TabsList>
            <TabsTrigger value="all">{t("filterAll")}</TabsTrigger>
            <TabsTrigger value="available">
              {tc("available")}
            </TabsTrigger>
            <TabsTrigger value="sold">
              {tc("sold")}
            </TabsTrigger>
            <TabsTrigger value="donated">
              {tc("donated")}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
