"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

export function LocaleSwitcher() {
  const t = useTranslations("Common");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function toggleLocale() {
    const next = locale === "es" ? "en" : "es";
    router.replace(pathname, { locale: next });
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLocale}
      title={t("switchLanguage")}
    >
      <Languages className="h-4 w-4" />
      <span className="sr-only">
        {t("switchLanguageLabel")}
      </span>
    </Button>
  );
}
