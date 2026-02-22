"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

interface TimelineEntry {
  year: string;
  title: { es: string; en: string };
  description?: { es: string; en: string };
  note?: { es: string; en: string };
}

const TIMELINE_DATA: TimelineEntry[] = [
  { year: "1968", title: { es: "Nace en Cuenca, Ecuador", en: "Born in Cuenca, Ecuador" } },
  { year: "1972", title: { es: "Comienza a pintar a los 4 años", en: "Begins painting at age 4" }, note: { es: "Sin academias, sin guías, simplemente la pasión.", en: "No academies, no guides, just the passion." } },
  { year: "1980", title: { es: "12 años de educación jesuita", en: "12 years of Jesuit education" } },
  { year: "1985", title: { es: "Primera exposición a los 17", en: "First exhibition at 17" }, description: { es: "Galería del Banco del Pacífico", en: "Galería del Banco del Pacífico" } },
  { year: "~1990", title: { es: "Título de Medicina, Universidad de Cuenca", en: "Medical degree, Universidad de Cuenca" } },
  { year: "~1993", title: { es: "Especialización en UNAM, Ciudad de México", en: "Specialization at UNAM, Mexico City" }, note: { es: "Los bisturís pagados con pinceles.", en: "Scalpels paid for with brushstrokes." } },
  { year: "1996", title: { es: "Museo Mural Diego Rivera", en: "Museo Mural Diego Rivera" }, description: { es: "Ciudad de México", en: "Mexico City" }, note: { es: "«Nunca dejes de pintar, nunca dejes de escribir.»", en: "'Never stop painting, never stop writing.'" } },
  { year: "~2004", title: { es: "Profesor fundador, Facultad de Medicina, UDA", en: "Founding professor, Faculty of Medicine, UDA" } },
  { year: "2022", title: { es: "Exposición \"Collage de Vida\"", en: "\"Collage de Vida\" exhibition" } },
  { year: "2024", title: { es: "Mural \"Memorias del Cuerpo\" develado en UDA", en: "\"Memorias del Cuerpo\" mural unveiled at UDA" }, note: { es: "¿Puede la ciencia jugar a ser Dios sin perder su humanidad?", en: "Can science play God without losing its humanity?" } },
];

export function Timeline() {
  const t = useTranslations("about");
  const locale = useLocale();

  return (
    <section
      className="relative py-20 md:py-28"
      style={{
        background: "linear-gradient(180deg, transparent 0%, oklch(0.12 0.015 60) 15%, oklch(0.12 0.015 60) 85%, transparent 100%)"
      }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
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
              const noteText = entry.note
                ? locale === "en" ? entry.note.en : entry.note.es
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
                    ease: [0.22, 1, 0.36, 1],
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
                    <span className="font-display font-bold text-gold text-base md:text-lg">
                      {entry.year}
                    </span>
                    <h3 className="font-body text-cream text-base mt-1">
                      {titleText}
                    </h3>
                    {descText && (
                      <p className="text-stone text-sm mt-0.5">{descText}</p>
                    )}
                    {noteText && (
                      <p className="font-accent italic text-ash text-sm mt-1">{noteText}</p>
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
