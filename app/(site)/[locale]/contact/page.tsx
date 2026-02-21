import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactDirect } from "@/components/contact/contact-direct";
import { FilmGrain } from "@/components/shared/film-grain";
import { GALLERY_SPACING } from "@/lib/constants";

export async function generateMetadata() {
  const t = await getTranslations("contact");
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");

  return (
    <>
      <FilmGrain opacity={0.03} />
      <div className={`bg-void min-h-screen pt-24 ${GALLERY_SPACING.section}`}>
        <div className={GALLERY_SPACING.container}>
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-display font-black text-cream text-4xl md:text-5xl">
              {t("title")}
            </h1>
            <p className="font-accent italic text-stone text-lg mt-4 max-w-xl mx-auto">
              {t("subtitle")}
            </p>
          </div>

          {/* Two columns */}
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16">
            <ContactForm />
            <ContactDirect />
          </div>
        </div>
      </div>
    </>
  );
}
