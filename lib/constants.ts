export const GALLERY_SPACING = {
  section: "py-24 md:py-32",
  sectionSm: "py-16 md:py-24",
  container: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
  narrowContainer: "mx-auto max-w-4xl px-4 sm:px-6 lg:px-8",
  wideContainer: "mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8",
} as const;

export const NAV_LINKS = [
  { href: "/gallery", labelKey: "gallery" },
  { href: "/about", labelKey: "about" },
  { href: "/contact", labelKey: "contact" },
] as const;

export const SITE_CONFIG = {
  whatsappNumber: "593999256686",
  email: "james@jamespilco.com",
  instagram: "https://instagram.com/jamespilcoluzuriaga",
  instagramHandle: "@jamespilcoluzuriaga",
  linkedin:
    "https://www.linkedin.com/in/james-stanley-pilco-luzuriaga-5a557040/",
  location: "Cuenca, Ecuador",
  siteUrl: "https://jamespilco.com",
  artistName: "James Pilco Luzuriaga",
} as const;
