import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { fetchSiteSettings } from "@/sanity/lib/client";
import { SiteSettingsProvider } from "@/lib/site-settings-context";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const [messages, siteSettings] = await Promise.all([
    getMessages(),
    fetchSiteSettings(),
  ]);

  return (
    <NextIntlClientProvider messages={messages}>
      <SiteSettingsProvider settings={siteSettings}>
        <SmoothScrollProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
          </div>
          <WhatsAppButton />
        </SmoothScrollProvider>
      </SiteSettingsProvider>
    </NextIntlClientProvider>
  );
}
