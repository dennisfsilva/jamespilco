"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

interface ArtworkImageViewerProps {
  images: string[];
  title: string;
}

export function ArtworkImageViewer({ images, title }: ArtworkImageViewerProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  return (
    <>
      <div className="space-y-4">
        {/* Main image */}
        <button
          onClick={() => {
            setLightboxIndex(0);
            setLightboxOpen(true);
          }}
          className="relative block w-full cursor-zoom-in overflow-hidden bg-muted"
        >
          <div className="relative aspect-[3/4]">
            <Image
              src={images[0]}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
              quality={90}
              priority
            />
          </div>
        </button>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="flex gap-2">
            {images.map((src, index) => (
              <button
                key={index}
                onClick={() => {
                  setLightboxIndex(index);
                  setLightboxOpen(true);
                }}
                className="relative h-20 w-20 overflow-hidden bg-muted"
              >
                <Image
                  src={src}
                  alt={`${title} detail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={images.map((src) => ({ src }))}
        plugins={[Zoom]}
        zoom={{ maxZoomPixelRatio: 3 }}
      />
    </>
  );
}
