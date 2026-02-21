import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import { fetchSiteSettings } from "@/sanity/lib/client";
import { SiteSettingsProvider } from "@/lib/site-settings-context";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFab } from "@/components/layout/whatsapp-fab";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [messages, settings, locale] = await Promise.all([
    getMessages(),
    fetchSiteSettings(),
    getLocale(),
  ]);

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <SiteSettingsProvider settings={settings}>
        <SmoothScrollProvider>
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppFab />
        </SmoothScrollProvider>
      </SiteSettingsProvider>
    </NextIntlClientProvider>
  );
}
