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

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
      <button
        onClick={() => setFilter("all")}
        className={cn(
          "flex-shrink-0 px-4 py-2 rounded-full text-sm font-body transition-all duration-300",
          activeFilter === "all"
            ? "bg-gold text-void"
            : "border border-charcoal text-stone hover:border-gold hover:text-gold"
        )}
      >
        {t("filterAll")}
      </button>
      {placeholderCategories.map((cat) => (
        <button
          key={cat._id}
          onClick={() => setFilter(cat.slug.current)}
          className={cn(
            "flex-shrink-0 px-4 py-2 rounded-full text-sm font-body transition-all duration-300",
            activeFilter === cat.slug.current
              ? "bg-gold text-void"
              : "border border-charcoal text-stone hover:border-gold hover:text-gold"
          )}
        >
          {getLocalizedText(cat.title, locale)}
        </button>
      ))}
    </div>
  );
}
