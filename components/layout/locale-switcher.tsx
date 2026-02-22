"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = (target: "es" | "en") => {
    if (target === locale) return;
    router.replace(pathname, { locale: target });
  };

  return (
    <div className="text-sm font-body flex items-center gap-0.5">
      <button
        onClick={() => switchTo("es")}
        disabled={locale === "es"}
        className={cn(
          "transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/50 rounded-sm px-2 py-1.5 min-h-[44px] min-w-[44px] flex items-center justify-center",
          locale === "es"
            ? "text-gold cursor-default"
            : "text-stone hover:text-gold"
        )}
      >
        ES
      </button>
      <span className="text-charcoal">/</span>
      <button
        onClick={() => switchTo("en")}
        disabled={locale === "en"}
        className={cn(
          "transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/50 rounded-sm px-2 py-1.5 min-h-[44px] min-w-[44px] flex items-center justify-center",
          locale === "en"
            ? "text-gold cursor-default"
            : "text-stone hover:text-gold"
        )}
      >
        EN
      </button>
    </div>
  );
}
