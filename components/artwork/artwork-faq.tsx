"use client";

import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GALLERY_SPACING } from "@/lib/constants";

export function ArtworkFAQ() {
  const t = useTranslations("Artwork");

  const faqs = [
    { question: t("shippingQuestion"), answer: t("shippingAnswer") },
    { question: t("framingQuestion"), answer: t("framingAnswer") },
    { question: t("commissionQuestion"), answer: t("commissionAnswer") },
    { question: t("returnsQuestion"), answer: t("returnsAnswer") },
  ];

  return (
    <section className={GALLERY_SPACING.sectionSm}>
      <div className={GALLERY_SPACING.narrowContainer}>
        <h2 className="font-heading text-2xl font-light tracking-wide">
          {t("faq")}
        </h2>
        <Accordion type="single" collapsible className="mt-8">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
