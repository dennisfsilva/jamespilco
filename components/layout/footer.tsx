"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useSiteSettings } from "@/lib/site-settings-context";
import { Instagram, Linkedin } from "lucide-react";

export function Footer() {
  const t = useTranslations("Footer");
  const { instagram, linkedin } = useSiteSettings();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <div>
            <Link
              href="/"
              className="font-heading text-lg font-semibold tracking-wide"
            >
              James Pilco
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("tagline")}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-primary"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-primary"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
          &copy; {year} James Pilco. {t("rights")}.
        </div>
      </div>
    </footer>
  );
}
