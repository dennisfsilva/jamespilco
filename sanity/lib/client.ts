import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";
import { SITE_SETTINGS_QUERY } from "./queries";
import type { SiteSettings } from "@/types/artist";
import { SITE_CONFIG } from "@/lib/constants";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  stega: {
    studioUrl: "/studio",
  },
});

export async function sanityFetch<T>(
  query: string,
  params?: Record<string, unknown>
): Promise<T> {
  return client.fetch<T>(query, params ?? {}, {
    next: {
      revalidate: 60,
      tags: ["sanity"],
    },
  });
}

const SITE_SETTINGS_FALLBACK: SiteSettings = {
  _id: "site-settings",
  whatsappNumber: SITE_CONFIG.whatsappNumber,
  email: SITE_CONFIG.email,
  instagram: SITE_CONFIG.instagram,
  linkedin: SITE_CONFIG.linkedin,
  location: SITE_CONFIG.location,
};

export async function fetchSiteSettings(): Promise<SiteSettings> {
  const settings = await sanityFetch<SiteSettings | null>(SITE_SETTINGS_QUERY);
  return settings ?? SITE_SETTINGS_FALLBACK;
}
