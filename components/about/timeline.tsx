"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { fadeInUp, galleryEase } from "@/lib/animations";
import { GALLERY_SPACING } from "@/lib/constants";

interface TimelineEntry {
  year: string;
  title: { es: string; en: string };
  description?: { es: string; en: string };
}

const TIMELINE_DATA: TimelineEntry[] = [
  { year: "1968", title: { es: "Nace en Cuenca, Ecuador", en: "Born in Cuenca, Ecuador" } },
  { year: "1972", title: { es: "Comienza a pintar a los 4 años", en: "Begins painting at age 4" } },
  { year: "1980", title: { es: "12 años de educación jesuita", en: "12 years of Jesuit education" } },
  { year: "1985", title: { es: "Primera exposición a los 17", en: "First exhibition at 17" }, description: { es: "Banco del Pacífico", en: "Banco del Pacífico" } },
  { year: "~1990", title: { es: "Título de Medicina, Universidad de Cuenca", en: "Medical degree, Universidad de Cuenca" } },
  { year: "~1993", title: { es: "Especialización en UNAM, Ciudad de México", en: "Specialization at UNAM, Mexico City" }, description: { es: "Financiada con la venta de su arte", en: "Funded by art sales" } },
  { year: "1996", title: { es: "Museo Mural Diego Rivera", en: "Museo Mural Diego Rivera" }, description: { es: "Ciudad de México", en: "Mexico City" } },
  { year: "~2004", title: { es: "Profesor fundador, Facultad de Medicina, UDA", en: "Founding professor, Faculty of Medicine, UDA" } },
  { year: "2022", title: { es: "Exposición \"Collage de Vida\"", en: "\"Collage de Vida\" exhibition" } },
  { year: "2024", title: { es: "Mural \"Memorias del Cuerpo\" develado en UDA", en: "\"Memorias del Cuerpo\" mural unveiled at UDA" } },
];

export function Timeline() {
  const t = useTranslations("about");
  const locale = useLocale();

  return (
    <section className={`bg-void ${GALLERY_SPACING.section}`}>
      <div className={GALLERY_SPACING.container}>
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-body font-semibold text-gold text-xs tracking-[0.3em] uppercase mb-16 text-center"
        >
          {t("timeline")}
        </motion.p>

        <div className="relative">
          {/* Gold thread line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-[0.5px] top-0 bottom-0 w-[1px] bg-gold/30" />

          <div className="space-y-12">
            {TIMELINE_DATA.map((entry, i) => {
              const isLeft = i % 2 === 0;
              const titleText = locale === "en" ? entry.title.en : entry.title.es;
              const descText = entry.description
                ? locale === "en" ? entry.description.en : entry.description.es
                : null;

              return (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    delay: i * 0.05,
                    duration: 0.6,
                    ease: galleryEase as unknown as number[],
                  }}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    isLeft ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Gold dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gold border-2 border-void z-10 mt-1" />

                  {/* Content */}
                  <div
                    className={`ml-12 md:ml-0 md:w-1/2 ${
                      isLeft ? "md:pr-12 md:text-right" : "md:pl-12"
                    }`}
                  >
                    <span className="font-display font-bold text-gold text-lg">
                      {entry.year}
                    </span>
                    <h3 className="font-body text-cream text-base mt-1">
                      {titleText}
                    </h3>
                    {descText && (
                      <p className="text-stone text-sm mt-0.5">{descText}</p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
