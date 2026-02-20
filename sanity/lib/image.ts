import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "../env";
import type { Artwork } from "@/types/artwork";

const imageBuilder = createImageUrlBuilder({ projectId, dataset });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlForImage(source: any) {
  return imageBuilder.image(source).auto("format").fit("max");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function resolveImageUrl(source: any): string {
  // Placeholder data uses plain URLs as asset._ref — pass them through as-is
  const ref = source?.asset?._ref ?? source?._ref ?? source;
  if (typeof ref === "string" && !ref.startsWith("image-")) {
    return ref;
  }
  return urlForImage(source).url();
}

export function resolveArtworkImageUrls(artworks: Artwork[]): Artwork[] {
  return artworks.map((a) => {
    // GROQ `images[0]` returns a single object; `...` spread returns the full array
    const image = Array.isArray(a.images) ? a.images[0] : a.images;
    return {
      ...a,
      imageUrl: image?.asset?._ref ? resolveImageUrl(image) : undefined,
    };
  });
}
