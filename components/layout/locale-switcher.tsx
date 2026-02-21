"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = locale === "es" ? "en" : "es";

  return (
    <button
      onClick={() => router.replace(pathname, { locale: switchTo })}
      className="text-sm font-body flex items-center gap-1.5"
    >
      <span className={cn(locale === "es" ? "text-gold" : "text-stone hover:text-gold transition-colors")}>
        ES
      </span>
      <span className="text-ash">/</span>
      <span className={cn(locale === "en" ? "text-gold" : "text-stone hover:text-gold transition-colors")}>
        EN
      </span>
    </button>
  );
}
