export interface LocalizedString {
  es: string;
  en: string;
}

export interface LocalizedBlock {
  es: unknown[];
  en: unknown[];
}

export interface ArtworkImage {
  _key: string;
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface Artwork {
  _id: string;
  _type: "artwork";
  title: LocalizedString;
  slug: { current: string };
  images: ArtworkImage[];
  medium: LocalizedString;
  dimensions: {
    width: number;
    height: number;
    depth?: number;
  };
  year: number;
  price?: number;
  availability: "available" | "sold" | "reserved" | "nfs" | "donated";
  description?: LocalizedBlock;
  shortDescription?: LocalizedString;
  categories?: Category[];
  featured: boolean;
  order?: number;
  aspectRatio?: number;
  imageUrl?: string;
  related?: Artwork[];
}

export interface Category {
  _id: string;
  title: LocalizedString;
  slug: { current: string };
  type: "medium" | "subject" | "size";
}

export type Availability = Artwork["availability"];
