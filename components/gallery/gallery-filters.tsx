"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { placeholderCategories } from "@/lib/placeholder-data";
import { getLocalizedText } from "@/lib/locale-text";
import { cn } from "@/lib/utils";

export function GalleryFilters() {
  const t = useTranslations("gallery");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeFilter = searchParams.get("filter") || "all";

  const setFilter = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug === "all") {
      params.delete("filter");
    } else {
      params.set("filter", slug);
    }
    const query = params.toString();
    router.replace(`${pathname}${query ? `?${query}` : ""}`, { scroll: false });
  };

  const filters = [
    { slug: "all", label: t("filterAll") },
    ...placeholderCategories.map((cat) => ({
      slug: cat.slug.current,
      label: getLocalizedText(cat.title, locale),
    })),
  ];

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.slug;
        return (
          <button
            key={filter.slug}
            onClick={() => setFilter(filter.slug)}
            className={cn(
              "py-2 text-sm font-body font-semibold transition-all duration-200 cursor-pointer border-b-[1.5px]",
              isActive
                ? "text-gold border-gold/60"
                : "text-stone border-transparent hover:text-cream"
            )}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
