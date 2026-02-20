export const HOMEPAGE_QUERY = `
  *[_type == "homepage"][0]{
    heroPaintings[]->{
      _id, title, slug, images[0], year, medium
    },
    featuredWorks[]->{
      _id, title, slug, images[0], year, medium, price, availability,
      "aspectRatio": images[0].asset->metadata.dimensions.aspectRatio
    },
    selectedWorks[]->{
      _id, title, slug, images[0], year, medium, price, availability, dimensions,
      "aspectRatio": images[0].asset->metadata.dimensions.aspectRatio
    },
    processImages,
    processText
  }
`;

export const ALL_ARTWORKS_QUERY = `
  *[_type == "artwork"] | order(order asc, year desc) {
    _id, title, slug, images[0], medium, dimensions, year,
    price, availability, featured,
    "aspectRatio": images[0].asset->metadata.dimensions.aspectRatio,
    categories[]->{ _id, title, slug, type }
  }
`;

export const ARTWORK_BY_SLUG_QUERY = `
  *[_type == "artwork" && slug.current == $slug][0]{
    ...,
    "aspectRatio": images[0].asset->metadata.dimensions.aspectRatio,
    categories[]->{ _id, title, slug, type },
    "related": *[_type == "artwork" && slug.current != $slug && count(categories[@._ref in ^.^.categories[]._ref]) > 0][0...6]{
      _id, title, slug, images[0], year, medium, price, availability,
      "aspectRatio": images[0].asset->metadata.dimensions.aspectRatio
    }
  }
`;

export const ARTIST_QUERY = `
  *[_type == "artist"][0]{
    name, bio, statement, portrait, studioPhotos,
    exhibitions, press
  }
`;

export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0]
`;

export const CATEGORIES_QUERY = `
  *[_type == "category"] | order(title.en asc) {
    _id, title, slug, type
  }
`;
