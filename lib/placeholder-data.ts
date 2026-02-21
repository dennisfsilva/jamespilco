import type { Artwork, Category } from "@/types/artwork";
import type { Exhibition, PressItem } from "@/types/artist";

export const placeholderCategories: Category[] = [
  { _id: "cat-1", title: { es: "Óleo", en: "Oil" }, slug: { current: "oil" }, type: "medium" },
  { _id: "cat-2", title: { es: "Técnica Mixta", en: "Mixed Media" }, slug: { current: "mixed-media" }, type: "medium" },
  { _id: "cat-3", title: { es: "Retrato", en: "Portrait" }, slug: { current: "portrait" }, type: "subject" },
  { _id: "cat-4", title: { es: "Infancia", en: "Childhood" }, slug: { current: "childhood" }, type: "subject" },
  { _id: "cat-5", title: { es: "Medicina", en: "Medicine" }, slug: { current: "medicine" }, type: "subject" },
  { _id: "cat-6", title: { es: "Sociedad y Cultura", en: "Society & Culture" }, slug: { current: "society-culture" }, type: "subject" },
];

export const placeholderArtworks: Artwork[] = [
  {
    _id: "art-1",
    _type: "artwork",
    title: { es: "Inocencia I", en: "Innocence I" },
    slug: { current: "innocence-i" },
    images: [{ _key: "img1", _type: "image", asset: { _ref: "/images/artwork/uda-gallery-3.jpg", _type: "reference" } }],
    medium: { es: "Óleo sobre lienzo", en: "Oil on canvas" },
    dimensions: { width: 70, height: 100 },
    aspectRatio: 0.75,
    year: 2024,
    price: 2800,
    availability: "available",
    categories: [placeholderCategories[0], placeholderCategories[2], placeholderCategories[3]],
    featured: true,
  },
  {
    _id: "art-2",
    _type: "artwork",
    title: { es: "Con el Alma en el Rostro", en: "With the Soul in the Face" },
    slug: { current: "with-the-soul-in-the-face" },
    images: [{ _key: "img1", _type: "image", asset: { _ref: "/images/artwork/uda-gallery-5.jpg", _type: "reference" } }],
    medium: { es: "Óleo sobre lienzo", en: "Oil on canvas" },
    dimensions: { width: 60, height: 90 },
    aspectRatio: 1.33,
    year: 2023,
    availability: "sold",
    categories: [placeholderCategories[0], placeholderCategories[2]],
    featured: true,
  },
  {
    _id: "art-3",
    _type: "artwork",
    title: { es: "Niños del Tomebamba", en: "Children of the Tomebamba" },
    slug: { current: "children-of-the-tomebamba" },
    images: [{ _key: "img1", _type: "image", asset: { _ref: "/images/artwork/uda-gallery-4.jpg", _type: "reference" } }],
    medium: { es: "Óleo sobre lienzo", en: "Oil on canvas" },
    dimensions: { width: 90, height: 120 },
    aspectRatio: 0.75,
    year: 2024,
    price: 3500,
    availability: "available",
    categories: [placeholderCategories[0], placeholderCategories[3]],
    featured: true,
  },
  {
    _id: "art-4",
    _type: "artwork",
    title: { es: "El Caballero de Gotham", en: "The Knight of Gotham" },
    slug: { current: "the-knight-of-gotham" },
    images: [{ _key: "img1", _type: "image", asset: { _ref: "/images/artwork/uda-gallery-1.jpg", _type: "reference" } }],
    medium: { es: "Óleo sobre lienzo", en: "Oil on canvas" },
    dimensions: { width: 80, height: 110 },
    aspectRatio: 1.33,
    year: 2024,
    price: 2200,
    availability: "available",
    categories: [placeholderCategories[0], placeholderCategories[5]],
    featured: false,
  },
  {
    _id: "art-5",
    _type: "artwork",
    title: { es: "Memorias del Cuerpo II", en: "Memories of the Body II" },
    slug: { current: "memories-of-the-body-ii" },
    images: [{ _key: "img1", _type: "image", asset: { _ref: "/images/artwork/uda-gallery-2.jpg", _type: "reference" } }],
    medium: { es: "Técnica mixta sobre tabla", en: "Mixed media on board" },
    dimensions: { width: 120, height: 80 },
    aspectRatio: 0.81,
    year: 2024,
    availability: "nfs",
    categories: [placeholderCategories[1], placeholderCategories[4]],
    featured: true,
  },
];

export const placeholderExhibitions: Exhibition[] = [
  { title: { es: "Memorias del Cuerpo", en: "Memories of the Body" }, venue: "Museo de Medicina, Universidad del Azuay", location: "Cuenca, Ecuador", year: 2024, type: "solo" },
  { title: { es: "Collage de Vida", en: "Collage of Life" }, venue: "UDA SALUD, Universidad del Azuay", location: "Cuenca, Ecuador", year: 2022, type: "solo" },
  { title: { es: "IV Exposición de Arte Médico", en: "IV Medical Art Exhibition" }, venue: "Museo de Medicina, Colegio de Médicos del Azuay", location: "Cuenca, Ecuador", year: 2007, type: "group" },
  { title: { es: "Con el alma en el rostro", en: "With the Soul in the Face" }, venue: "Museo Mural Diego Rivera", location: "Ciudad de México, México", year: 1996, type: "solo" },
  { title: { es: "Primera Exposición", en: "First Exhibition" }, venue: "Galería del Banco del Pacífico", location: "Ecuador", year: 1985, type: "solo" },
];

export const placeholderPress: PressItem[] = [
  { title: "Develamiento del mural 'Memorias del Cuerpo'", publication: "Universidad del Azuay", date: "2024-12-07" },
  { title: "James Pilco combina el lado humano del médico con el arte", publication: "Universidad del Azuay — Prensa", date: "2023-06-15" },
  { title: "Facultad de Medicina: 20 años", publication: "Universidad del Azuay — Casa Editora", date: "2023-10-24" },
  { title: "Collage de Vida", publication: "Universidad del Azuay — Casa Editora", date: "2022-11-16" },
  { title: "Arte: El Lado Humano de la Medicina", publication: "IntraMed", date: "2007-05-01" },
];

export const placeholderArtist = {
  name: "Dr. James Pilco Luzuriaga",
  statementEs: "El arte es la expresión humana más importante, porque a través de él se puede hacer a las personas más conscientes, ayudarlas a tener una mejor perspectiva del mundo. Pinto desde los cuatro años — autodidacta, sin herencia artística familiar — y creo que la gente debe disfrutar de un arte fácil de entender. Es responsabilidad del artista no subestimar al público. Mi obra nace donde la medicina se encuentra con el lienzo: la misma curiosidad que me lleva a comprender el cuerpo humano me impulsa a capturar la inocencia de los niños, la complejidad de la condición humana y las historias que habitan en cada rostro.",
  statementEn: "Art is the most important form of human expression — through it, we can awaken awareness and offer a more humane perspective of the world. I have painted since the age of four, self-taught, with no artistic heritage in my family, and I believe people deserve art that speaks to them directly. It is the artist's responsibility never to underestimate the viewer. My work is born where medicine meets the canvas: the same curiosity that drives me to understand the human body compels me to capture the innocence of children, the complexity of the human condition, and the stories that inhabit every face.",
  bioEs: "Nacido en Cuenca, Ecuador, James Pilco Luzuriaga ha vivido entre dos vocaciones desde los cuatro años: la medicina y el arte. Formado en doce años de educación jesuita, obtuvo su título de Doctor en Medicina y Cirugía en la Universidad de Cuenca y se especializó en Cirugía Digestiva, Endoscopia Intervencionista y Cirugía Laparoscópica Avanzada en la UNAM de Ciudad de México — donde financió sus estudios de especialidad a través de la venta de su propia obra. Realizó su primera exposición individual a los 17 años en la Galería del Banco del Pacífico y desde entonces ha expuesto en Ecuador, México y Estados Unidos, incluyendo el Museo Mural Diego Rivera en Ciudad de México. Posee una Maestría en Bioética de la Universidad del Azuay, donde es profesor fundador de la Facultad de Medicina. Es autor de libros sobre cirugía, arte y poesía, y ha creado murales permanentes en dicha universidad.",
  bioEn: "Born in Cuenca, Ecuador, James Pilco Luzuriaga has lived between two vocations since the age of four: medicine and art. Shaped by twelve years of Jesuit education, he earned his Doctor of Medicine and Surgery degree from the Universidad de Cuenca and specialized in Digestive Surgery, Interventional Endoscopy, and Advanced Laparoscopic Surgery at UNAM in Mexico City — where he funded his surgical training through the sale of his own artwork. He held his first solo exhibition at 17 at the Galería del Banco del Pacífico and has since exhibited in Ecuador, Mexico, and the United States, including at the Museo Mural Diego Rivera in Mexico City. He holds a Master's in Bioethics from the Universidad del Azuay, where he is a founding professor of the Faculty of Medicine. He is the author of books on surgery, art, and poetry, and has created permanent murals at the university.",
  portrait: "/images/artist/portrait-bw.jpg",
};
