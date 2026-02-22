import type { LocalizedString, LocalizedBlock, ArtworkImage } from "./artwork";

export interface Exhibition {
  title: LocalizedString;
  venue: string;
  location: string;
  year: number;
  type: "solo" | "group" | "fair";
}

export interface PressItem {
  title: string;
  publication: string;
  url?: string;
  date?: string;
}

export interface Artist {
  _id: string;
  _type: "artist";
  name: string;
  bio: LocalizedBlock;
  duality: LocalizedString;
  statement: LocalizedBlock;
  essay: LocalizedBlock;
  portrait: ArtworkImage;
  studioPhotos?: ArtworkImage[];
  exhibitions?: Exhibition[];
  press?: PressItem[];
}

export interface SiteSettings {
  _id: string;
  whatsappNumber: string;
  email: string;
  instagram: string;
  linkedin: string;
  location: string;
}
