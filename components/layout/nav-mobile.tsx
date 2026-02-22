"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NAV_LINKS } from "@/lib/constants";
import { LocaleSwitcher } from "./locale-switcher";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
const ease = [0.22, 1, 0.36, 1] as const;

interface NavMobileProps {
  open: boolean;
  onClose: () => void;
}

export function NavMobile({ open, onClose }: NavMobileProps) {
  const t = useTranslations("nav");

  // Lock body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] bg-void/95 backdrop-blur-sm"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gold p-3 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/50 rounded-sm"
            aria-label="Close menu"
          >
            <X size={28} />
          </button>

          <nav className="flex flex-col items-center justify-center h-full gap-10">
            <Link
              href="/"
              onClick={onClose}
              className="font-display text-sm font-bold tracking-[0.25em] text-gold mb-8"
            >
              JAMES PILCO
            </Link>

            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.1 + i * 0.1,
                  duration: 0.5,
                  ease,
                }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="font-display text-2xl font-semibold text-gold hover:text-gold-muted transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/50 rounded-sm px-1"
                >
                  {t(link.labelKey)}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <LocaleSwitcher />
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
