import type { LocalizedString, LocalizedBlock } from "@/types/artwork";

export function getLocalizedText(
  obj: LocalizedString | undefined | null,
  locale: string
): string {
  if (!obj) return "";
  return obj[locale as keyof LocalizedString] || obj.es || obj.en || "";
}

export function formatDimensions(
  dimensions: { width: number; height: number; depth?: number } | undefined
): string {
  if (!dimensions) return "";
  const { width, height, depth } = dimensions;
  if (depth) {
    return `${height} \u00d7 ${width} \u00d7 ${depth} cm`;
  }
  return `${height} \u00d7 ${width} cm`;
}

export function formatPrice(price: number | undefined): string {
  if (!price) return "";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toPlainText(blocks: any[] | undefined | null): string {
  if (!blocks || !Array.isArray(blocks)) return "";
  return blocks
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .filter((block: any) => block._type === "block" && block.children)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((block: any) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      block.children.map((child: any) => child.text || "").join("")
    )
    .join("\n\n");
}

export function getLocalizedBlock(
  obj: LocalizedBlock | undefined | null,
  locale: string
): string {
  if (!obj) return "";
  const blocks = obj[locale as keyof LocalizedBlock] || obj.es || obj.en;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return toPlainText(blocks as any[]);
}
