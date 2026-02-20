/**
 * Seed Sanity CMS with all current placeholder data:
 * - Categories (6)
 * - Artworks (8) with uploaded images
 * - Artist profile with portrait
 * - Homepage settings with references
 *
 * Run: npx tsx scripts/seed-sanity.ts
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { join } from "path";

const client = createClient({
  projectId: "nt3epn4c",
  dataset: "production",
  apiVersion: "2025-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const PUBLIC_DIR = join(process.cwd(), "public");

// ── Upload a local image to Sanity and return the asset reference ──
async function uploadImage(relativePath: string, label: string) {
  const filePath = join(PUBLIC_DIR, relativePath);
  const buffer = readFileSync(filePath);
  const ext = relativePath.split(".").pop() ?? "jpg";
  const contentType =
    ext === "webp" ? "image/webp" : ext === "png" ? "image/png" : "image/jpeg";

  console.log(`  Uploading ${label} (${relativePath})...`);
  const asset = await client.assets.upload("image", buffer, {
    filename: relativePath.split("/").pop()!,
    contentType,
  });

  return {
    _type: "image" as const,
    asset: { _type: "reference" as const, _ref: asset._id },
  };
}

// ── Seed Categories ──
async function seedCategories() {
  console.log("\n📂 Seeding categories...");
  const categories = [
    { _id: "cat-oil", title: { es: "Óleo", en: "Oil" }, slug: { _type: "slug", current: "oil" }, type: "medium" },
    { _id: "cat-mixed-media", title: { es: "Técnica Mixta", en: "Mixed Media" }, slug: { _type: "slug", current: "mixed-media" }, type: "medium" },
    { _id: "cat-portrait", title: { es: "Retrato", en: "Portrait" }, slug: { _type: "slug", current: "portrait" }, type: "subject" },
    { _id: "cat-childhood", title: { es: "Infancia", en: "Childhood" }, slug: { _type: "slug", current: "childhood" }, type: "subject" },
    { _id: "cat-medicine", title: { es: "Medicina", en: "Medicine" }, slug: { _type: "slug", current: "medicine" }, type: "subject" },
    { _id: "cat-society", title: { es: "Sociedad y Cultura", en: "Society & Culture" }, slug: { _type: "slug", current: "society-culture" }, type: "subject" },
  ];

  for (const cat of categories) {
    await client.createOrReplace({ ...cat, _type: "category" });
    console.log(`  ✓ ${cat.title.en}`);
  }
  return categories;
}

// ── Seed Artworks ──
async function seedArtworks() {
  console.log("\n🎨 Seeding artworks...");

  const artworkData: Array<{
    _id: string;
    title: { es: string; en: string };
    slug: { _type: string; current: string };
    imagePath: string;
    medium: { es: string; en: string };
    dimensions: { width: number; height: number };
    year: number;
    price?: number;
    availability: string;
    categories: string[];
    featured: boolean;
    order: number;
  }> = [
    {
      _id: "artwork-innocence-i",
      title: { es: "Inocencia I", en: "Innocence I" },
      slug: { _type: "slug", current: "innocence-i" },
      imagePath: "/images/artwork/uda-gallery-3.jpg",
      medium: { es: "Óleo sobre lienzo", en: "Oil on canvas" },
      dimensions: { width: 70, height: 100 },
      year: 2024,
      price: 2800,
      availability: "available",
      categories: ["cat-oil", "cat-portrait", "cat-childhood"],
      featured: true,
      order: 1,
    },
    {
      _id: "artwork-with-the-soul-in-the-face",
      title: { es: "Con el Alma en el Rostro", en: "With the Soul in the Face" },
      slug: { _type: "slug", current: "with-the-soul-in-the-face" },
      imagePath: "/images/artwork/uda-gallery-5.jpg",
      medium: { es: "Óleo sobre lienzo", en: "Oil on canvas" },
      dimensions: { width: 60, height: 90 },
      year: 2023,
      availability: "sold",
      categories: ["cat-oil", "cat-portrait"],
      featured: true,
      order: 2,
    },
    {
      _id: "artwork-children-of-the-tomebamba",
      title: { es: "Niños del Tomebamba", en: "Children of the Tomebamba" },
      slug: { _type: "slug", current: "children-of-the-tomebamba" },
      imagePath: "/images/artwork/uda-gallery-4.jpg",
      medium: { es: "Óleo sobre lienzo", en: "Oil on canvas" },
      dimensions: { width: 90, height: 120 },
      year: 2024,
      price: 3500,
      availability: "available",
      categories: ["cat-oil", "cat-childhood"],
      featured: true,
      order: 3,
    },
    {
      _id: "artwork-the-knight-of-gotham",
      title: { es: "El Caballero de Gotham", en: "The Knight of Gotham" },
      slug: { _type: "slug", current: "the-knight-of-gotham" },
      imagePath: "/images/artwork/uda-gallery-1.jpg",
      medium: { es: "Óleo sobre lienzo", en: "Oil on canvas" },
      dimensions: { width: 80, height: 110 },
      year: 2024,
      price: 2200,
      availability: "available",
      categories: ["cat-oil", "cat-society"],
      featured: false,
      order: 4,
    },
    {
      _id: "artwork-the-surgeons-hands",
      title: { es: "Manos del Cirujano", en: "The Surgeon's Hands" },
      slug: { _type: "slug", current: "the-surgeons-hands" },
      imagePath: "/images/artwork/youtube-thumb-1.jpg",
      medium: { es: "Óleo sobre lienzo", en: "Oil on canvas" },
      dimensions: { width: 80, height: 110 },
      year: 2023,
      availability: "donated",
      categories: ["cat-oil", "cat-portrait", "cat-medicine"],
      featured: true,
      order: 5,
    },
    {
      _id: "artwork-memories-of-the-body-ii",
      title: { es: "Memorias del Cuerpo II", en: "Memories of the Body II" },
      slug: { _type: "slug", current: "memories-of-the-body-ii" },
      imagePath: "/images/artwork/uda-gallery-2.jpg",
      medium: { es: "Técnica mixta sobre tabla", en: "Mixed media on board" },
      dimensions: { width: 120, height: 80 },
      year: 2024,
      availability: "nfs",
      categories: ["cat-mixed-media", "cat-medicine"],
      featured: false,
      order: 6,
    },
  ];

  const artworkIds: string[] = [];

  for (const art of artworkData) {
    const { imagePath, categories, ...rest } = art;
    const image = await uploadImage(imagePath, art.title.en);

    await client.createOrReplace({
      ...rest,
      _type: "artwork",
      images: [{ ...image, _key: "main" }],
      categories: categories.map((id) => ({
        _type: "reference",
        _ref: id,
        _key: id,
      })),
    });

    artworkIds.push(art._id);
    console.log(`  ✓ ${art.title.en}`);
  }

  return artworkIds;
}

// ── Seed Artist ──
async function seedArtist() {
  console.log("\n👤 Seeding artist profile...");

  const portrait = await uploadImage(
    "/images/artist/portrait-bw.jpg",
    "Artist portrait"
  );

  const toBlock = (text: string) => [
    {
      _type: "block",
      _key: Math.random().toString(36).slice(2, 10),
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: Math.random().toString(36).slice(2, 10),
          text,
          marks: [],
        },
      ],
    },
  ];

  await client.createOrReplace({
    _id: "artist-james-pilco",
    _type: "artist",
    name: "Dr. James Pilco Luzuriaga",
    bio: {
      es: toBlock(
        "Nacido en Cuenca, Ecuador, James Pilco Luzuriaga ha vivido entre dos vocaciones desde los cuatro años: la medicina y el arte. Formado en doce años de educación jesuita, obtuvo su título de Doctor en Medicina y Cirugía en la Universidad de Cuenca y se especializó en Cirugía Digestiva, Endoscopia Intervencionista y Cirugía Laparoscópica Avanzada en la UNAM de Ciudad de México — donde financió sus estudios de especialidad a través de la venta de su propia obra. Realizó su primera exposición individual a los 17 años en la Galería del Banco del Pacífico y desde entonces ha expuesto en Ecuador, México y Estados Unidos, incluyendo el Museo Mural Diego Rivera en Ciudad de México. Posee una Maestría en Bioética de la Universidad del Azuay, donde es profesor fundador de la Facultad de Medicina. Es autor de libros sobre cirugía, arte y poesía, y ha creado murales permanentes en dicha universidad."
      ),
      en: toBlock(
        "Born in Cuenca, Ecuador, James Pilco Luzuriaga has lived between two vocations since the age of four: medicine and art. Shaped by twelve years of Jesuit education, he earned his Doctor of Medicine and Surgery degree from the Universidad de Cuenca and specialized in Digestive Surgery, Interventional Endoscopy, and Advanced Laparoscopic Surgery at UNAM in Mexico City — where he funded his surgical training through the sale of his own artwork. He held his first solo exhibition at 17 at the Galería del Banco del Pacífico and has since exhibited in Ecuador, Mexico, and the United States, including at the Museo Mural Diego Rivera in Mexico City. He holds a Master's in Bioethics from the Universidad del Azuay, where he is a founding professor of the Faculty of Medicine. He is the author of books on surgery, art, and poetry, and has created permanent murals at the university."
      ),
    },
    statement: {
      es: toBlock(
        "El arte es la expresión humana más importante, porque a través de él se puede hacer a las personas más conscientes, ayudarlas a tener una mejor perspectiva del mundo. Pinto desde los cuatro años — autodidacta, sin herencia artística familiar — y creo que la gente debe disfrutar de un arte fácil de entender. Es responsabilidad del artista no subestimar al público. Mi obra nace donde la medicina se encuentra con el lienzo: la misma curiosidad que me lleva a comprender el cuerpo humano me impulsa a capturar la inocencia de los niños, la complejidad de la condición humana y las historias que habitan en cada rostro."
      ),
      en: toBlock(
        "Art is the most important form of human expression — through it, we can awaken awareness and offer a more humane perspective of the world. I have painted since the age of four, self-taught, with no artistic heritage in my family, and I believe people deserve art that speaks to them directly. It is the artist's responsibility never to underestimate the viewer. My work is born where medicine meets the canvas: the same curiosity that drives me to understand the human body compels me to capture the innocence of children, the complexity of the human condition, and the stories that inhabit every face."
      ),
    },
    portrait,
    exhibitions: [
      { _key: "ex1", title: { es: "Memorias del Cuerpo", en: "Memories of the Body" }, venue: "Museo de Medicina, Universidad del Azuay", location: "Cuenca, Ecuador", year: 2024, type: "solo" },
      { _key: "ex2", title: { es: "Collage de Vida", en: "Collage of Life" }, venue: "UDA SALUD, Universidad del Azuay", location: "Cuenca, Ecuador", year: 2022, type: "solo" },
      { _key: "ex3", title: { es: "IV Exposición de Arte Médico", en: "IV Medical Art Exhibition" }, venue: "Museo de Medicina, Colegio de Médicos del Azuay", location: "Cuenca, Ecuador", year: 2007, type: "group" },
      { _key: "ex4", title: { es: "Con el alma en el rostro", en: "With the Soul in the Face" }, venue: "Museo Mural Diego Rivera", location: "Ciudad de México, México", year: 1996, type: "solo" },
      { _key: "ex5", title: { es: "Primera Exposición", en: "First Exhibition" }, venue: "Galería del Banco del Pacífico", location: "Ecuador", year: 1985, type: "solo" },
    ],
    press: [
      { _key: "pr1", title: "Develamiento del mural 'Memorias del Cuerpo'", publication: "Universidad del Azuay", date: "2024-12-07" },
      { _key: "pr2", title: "James Pilco combina el lado humano del médico con el arte", publication: "Universidad del Azuay — Prensa", date: "2023-06-15" },
      { _key: "pr3", title: "Facultad de Medicina: 20 años", publication: "Universidad del Azuay — Casa Editora", date: "2023-10-24" },
      { _key: "pr4", title: "Collage de Vida", publication: "Universidad del Azuay — Casa Editora", date: "2022-11-16" },
      { _key: "pr5", title: "Arte: El Lado Humano de la Medicina", publication: "IntraMed", date: "2007-05-01" },
    ],
  });

  console.log("  ✓ Artist profile created");
}

// ── Seed Site Settings ──
async function seedSiteSettings() {
  console.log("\n⚙️ Seeding site settings...");

  await client.createOrReplace({
    _id: "site-settings",
    _type: "siteSettings",
    whatsappNumber: "593999256686",
    email: "james@jamespilco.com",
    instagram: "https://instagram.com/jamespilcoluzuriaga",
    linkedin: "https://www.linkedin.com/in/james-stanley-pilco-luzuriaga-5a557040/",
    location: "Cuenca, Ecuador",
  });

  console.log("  ✓ Site settings created");
}

// ── Seed Homepage ──
async function seedHomepage(artworkIds: string[]) {
  console.log("\n🏠 Seeding homepage settings...");

  // Upload process images
  const processImagePaths = [
    "/images/artist/uda-press.jpg",
    "/images/artist/mural-unveiling.webp",
  ];

  const processImages = [];
  for (const path of processImagePaths) {
    const img = await uploadImage(path, `Process: ${path}`);
    processImages.push({ ...img, _key: Math.random().toString(36).slice(2, 10) });
  }

  // Featured artworks for hero, carousel, and grid
  const heroIds = [artworkIds[0], artworkIds[3], artworkIds[2]]; // Innocence, Gotham, Tomebamba
  const featuredIds = [artworkIds[0], artworkIds[1], artworkIds[2], artworkIds[4]]; // Innocence, Soul, Tomebamba, Surgeon
  const selectedIds = [artworkIds[3], artworkIds[4], artworkIds[5]]; // Gotham, Surgeon, Memories II

  await client.createOrReplace({
    _id: "homepage-settings",
    _type: "homepage",
    heroPaintings: heroIds.map((id) => ({
      _type: "reference",
      _ref: id,
      _key: id,
    })),
    featuredWorks: featuredIds.map((id) => ({
      _type: "reference",
      _ref: id,
      _key: `feat-${id}`,
    })),
    selectedWorks: selectedIds.map((id) => ({
      _type: "reference",
      _ref: id,
      _key: `sel-${id}`,
    })),
    processImages,
  });

  console.log("  ✓ Homepage settings created");
}

// ── Main ──
async function main() {
  console.log("🚀 Seeding Sanity CMS for James Pilco Gallery\n");

  if (!process.env.SANITY_API_TOKEN) {
    console.error("❌ SANITY_API_TOKEN is required in .env.local");
    process.exit(1);
  }

  await seedCategories();
  const artworkIds = await seedArtworks();
  await seedArtist();
  await seedSiteSettings();
  await seedHomepage(artworkIds);

  console.log("\n✅ Done! All content seeded to Sanity.");
  console.log("   Open /studio to manage your content.");
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
