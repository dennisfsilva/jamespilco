"use client";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

interface ArtworkLightboxProps {
  open: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
}

export function ArtworkLightbox({ open, onClose, imageUrl, title }: ArtworkLightboxProps) {
  return (
    <Lightbox
      open={open}
      close={onClose}
      slides={[{ src: imageUrl, alt: title }]}
      plugins={[Zoom]}
      styles={{
        container: { backgroundColor: "oklch(0.08 0.01 60 / 0.95)" },
      }}
      zoom={{
        maxZoomPixelRatio: 3,
        scrollToZoom: true,
      }}
    />
  );
}
