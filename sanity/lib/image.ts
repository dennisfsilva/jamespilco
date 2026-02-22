import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "../env";

const imageBuilder = createImageUrlBuilder({ projectId, dataset });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlForImage(source: any) {
  return imageBuilder.image(source).auto("format").fit("max");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function resolveImageUrl(source: any): string {
  const ref = source?.asset?._ref ?? source?._ref ?? source;
  if (typeof ref === "string" && !ref.startsWith("image-")) {
    return ref;
  }
  return urlForImage(source).url();
}
