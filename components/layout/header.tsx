"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { NAV_LINKS } from "@/lib/constants";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeToggle } from "./theme-toggle";
import { NavMobile } from "./nav-mobile";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { cn } from "@/lib/utils";

export function Header() {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const { direction, isAtTop } = useScrollDirection();

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md transition-all duration-300",
        direction === "down" && !isAtTop
          ? "-translate-y-full"
          : "translate-y-0",
        isAtTop ? "border-transparent" : "border-border/40"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-heading text-xl font-semibold tracking-wide text-foreground"
        >
          James Pilco
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm uppercase tracking-widest transition-colors hover:text-primary",
                pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {t(link.labelKey)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <ThemeToggle />
          <NavMobile />
        </div>
      </div>
    </header>
  );
}
