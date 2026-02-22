"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { NAV_LINKS } from "@/lib/constants";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { cn } from "@/lib/utils";
import { NavMobile } from "./nav-mobile";
import { LocaleSwitcher } from "./locale-switcher";
import { Menu } from "lucide-react";

export function Navigation() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const { scrollY } = useScrollDirection();
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrolled = scrollY > 60;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500 border-b",
          scrolled
            ? "bg-void/90 backdrop-blur-lg border-charcoal/30 shadow-[0_1px_20px_rgba(0,0,0,0.3)]"
            : "bg-transparent border-transparent"
        )}
      >
        <nav className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link
            href="/"
            className="font-display text-sm font-bold tracking-[0.2em] text-gold hover:text-gold-muted transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/50 rounded-sm"
          >
            JAMES PILCO
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "group relative text-sm font-body transition-colors duration-300 py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/50 rounded-sm",
                    isActive ? "text-gold" : "text-stone hover:text-cream"
                  )}
                >
                  {t(link.labelKey)}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-0 right-0 h-[1.5px] bg-gold transition-transform duration-300 origin-center",
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                </Link>
              );
            })}

            <div className="ml-2 pl-4 border-l border-charcoal/50">
              <LocaleSwitcher />
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-gold p-2 -mr-2 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/50 rounded-sm"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </nav>
      </header>

      <NavMobile open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
