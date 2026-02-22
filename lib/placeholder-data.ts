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
    shortDescription: {
      es: "En esta obra, un rostro de niña emerge entre la luz del trópico y el peso dulce de una sandía. Para James, la infancia es el territorio donde la humanidad aún no ha aprendido a disfrazarse, donde cada gesto es verdad. La precisión anatómica del retrato se funde con una ternura que solo nace de observar al ser humano desde dos orillas: la del cirujano que comprende el cuerpo, y la del artista que comprende el alma.",
      en: "In this work, a girl's face emerges between tropical light and the sweet weight of a watermelon. For James, childhood is the territory where humanity has not yet learned to disguise itself, where every gesture is truth. The anatomical precision of the portrait merges with a tenderness that only comes from observing the human being from two shores: that of the surgeon who understands the body, and that of the artist who understands the soul.",
    },
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
    shortDescription: {
      es: "El título lo dice todo: el alma visible en el rostro. James pinta lo que ve al otro lado de la mesa de operaciones, no órganos ni tejidos, sino la persona completa, su historia escrita en cada arruga, en cada mirada. Este retrato es la demostración de que, para James, retratar un rostro no es un ejercicio técnico sino un acto de escucha.",
      en: "The title says it all: the soul visible in the face. James paints what he sees across the operating table, not organs or tissue, but the whole person, their story written in every wrinkle, every gaze. This portrait is proof that, for James, painting a face is not a technical exercise but an act of listening.",
    },
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
    shortDescription: {
      es: "Los niños del río Tomebamba, que atraviesa el corazón de Cuenca, son los protagonistas de esta obra. James los captura con una franqueza que rechaza la idealización: estos no son niños de postal, sino seres humanos enteros, con su juego, su desafío y su verdad. La paleta terrosa ancla la escena en lo real, mientras la composición revela la mirada de un artista que nunca ha subestimado a su público, ni a sus sujetos.",
      en: "The children of the Tomebamba river, which runs through the heart of Cuenca, are the protagonists of this work. James captures them with a frankness that rejects idealization: these are not postcard children, but whole human beings, with their play, their defiance, and their truth. The earthy palette anchors the scene in reality, while the composition reveals the gaze of an artist who has never underestimated his audience, or his subjects.",
    },
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
    shortDescription: {
      es: "Batman no es un capricho: es una pregunta. ¿Qué convierte a un ser humano en símbolo? ¿Dónde termina la persona y empieza el mito? James aborda la cultura popular con la misma seriedad que la medicina, porque para él, todo lo que la humanidad crea merece ser mirado con atención. El Caballero de Gotham es un ejercicio de libertad: la prueba de que un artista abierto a todas las expresiones puede encontrar profundidad donde otros solo ven entretenimiento.",
      en: "Batman is not a whim: it is a question. What turns a human being into a symbol? Where does the person end and the myth begin? James approaches popular culture with the same seriousness he brings to medicine, because for him, everything humanity creates deserves to be looked at with care. The Knight of Gotham is an exercise in freedom: proof that an artist open to all expressions can find depth where others see only entertainment.",
    },
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
    shortDescription: {
      es: "Esta pieza es el puente más directo entre las dos vocaciones de James. Técnica mixta sobre tabla: grafito, acrílico, óleo. Con la rigidez anatómica de quien conoce el cuerpo humano por dentro. Las «memorias» que invoca no son nostalgia: son las huellas que la ciencia y la experiencia dejan sobre nuestra carne. Es la misma pregunta que articula su mural en la Universidad del Azuay: detrás de todos los avances científicos, ¿queda todavía un ser humano?",
      en: "This piece is the most direct bridge between James's two vocations. Mixed media on board: graphite, acrylic, oil. With the anatomical rigor of someone who knows the human body from the inside. The 'memories' it invokes are not nostalgia: they are the marks that science and experience leave upon our flesh. It poses the same question as his mural at the Universidad del Azuay: behind all scientific advances, does a human being still remain?",
    },
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
  { title: "James Pilco combina el lado humano del médico con el arte", publication: "Universidad del Azuay, Prensa", date: "2023-06-15" },
  { title: "Facultad de Medicina: 20 años", publication: "Universidad del Azuay, Casa Editora", date: "2023-10-24" },
  { title: "Collage de Vida", publication: "Universidad del Azuay, Casa Editora", date: "2022-11-16" },
  { title: "Arte: El Lado Humano de la Medicina", publication: "IntraMed", date: "2007-05-01" },
];

export const placeholderArtist = {
  name: "Dr. James Pilco Luzuriaga",
  dualityEs: "Para mí ha sido un aprendizaje dual: si yo no pintara, no podría ver en otros lados al ser humano. Eso me ha permitido abordarlo de mejor forma, humana, científica, pero sobre todo más objetiva. Mi obra nace donde la medicina se encuentra con el lienzo.",
  dualityEn: "For me it has been a dual learning: if I didn't paint, I couldn't see the human being from other sides. That has allowed me to approach people in a better way, human, scientific, but above all more objective. My work is born where medicine meets the canvas.",
  statementEs: "La pasión por la pintura empieza desde los cuatro años, en una época donde no existían academias ni guías artísticas, simplemente la pasión. Un profesor de primer grado vio algo de talento, y en el transcurso del colegio y la universidad me tocó gente con sensibilidad artística que siempre impulsó en mí la capacidad de crear. Para mí ha sido un aprendizaje dual: si yo no pintara, no podría ver en otros lados al ser humano. Eso me ha permitido abordarlo de mejor forma, humana, científica, pero sobre todo más objetiva. Mi obra nace donde la medicina se encuentra con el lienzo: la misma curiosidad que me lleva a comprender el cuerpo humano me impulsa a capturar la inocencia de los niños, la complejidad de nuestra condición y las historias que habitan en cada rostro. Creo que la gente merece un arte fácil de entender. Es responsabilidad del artista no subestimar al público.",
  statementEn: "The passion for painting begins at the age of four, in an era when there were no academies or artistic guides, just the passion itself. A first-grade teacher saw a spark of talent, and throughout school and university I crossed paths with people of artistic sensibility who always nurtured in me the capacity to create. For me it has been a dual learning: if I didn't paint, I couldn't see the human being from other sides. That has allowed me to approach people in a better way, human, scientific, but above all more objective. My work is born where medicine meets the canvas: the same curiosity that drives me to understand the human body compels me to capture the innocence of children, the complexity of our condition, and the stories that inhabit every face. I believe people deserve art that is easy to understand. It is the artist's responsibility never to underestimate the viewer.",
  bioEs: "James Pilco Luzuriaga pinta desde los cuatro años. No había academias, no había guías, solo la insistencia de una pasión que nunca pidió permiso. Nacido en Cuenca, Ecuador, se formó en doce años de educación jesuita antes de graduarse como Doctor en Medicina y Cirugía en la Universidad de Cuenca. Se especializó en Cirugía Digestiva y Laparoscópica Avanzada en la UNAM de Ciudad de México, donde financió su formación quirúrgica vendiendo sus propios cuadros, los bisturís pagados con pinceles. En México, sus mentores le dijeron algo que nunca olvidó: «James, nunca dejes de pintar, nunca dejes de escribir. Eso te va a hacer diferente al resto de colegas.» A los 17 años realizó su primera exposición individual en la Galería del Banco del Pacífico. Desde entonces ha expuesto en Ecuador, México y Estados Unidos, incluyendo el Museo Mural Diego Rivera en Ciudad de México. Posee una Maestría en Bioética de la Universidad del Azuay, donde es profesor fundador de la Facultad de Medicina. Es autor de libros sobre cirugía, arte y poesía. En 2024 develó su mural permanente «Memorias del Cuerpo», una narración bioética que entrelaza máscaras pandémicas, el cerebro como árbitro ético, la danza como libertad, y la pregunta de si la ciencia puede jugar a ser Dios sin perder su humanidad.",
  bioEn: "James Pilco Luzuriaga has been painting since the age of four. There were no academies, no guides, just the insistence of a passion that never asked permission. Born in Cuenca, Ecuador, he was shaped by twelve years of Jesuit education before earning his Doctor of Medicine and Surgery degree from the Universidad de Cuenca. He specialized in Digestive and Advanced Laparoscopic Surgery at UNAM in Mexico City, where he funded his surgical training by selling his own paintings, scalpels paid for with brushstrokes. In Mexico, his mentors told him something he never forgot: 'James, never stop painting, never stop writing. That is what will make you different from the rest.' At 17, he held his first solo exhibition at the Galería del Banco del Pacífico. He has since exhibited in Ecuador, Mexico, and the United States, including at the Museo Mural Diego Rivera in Mexico City. He holds a Master's in Bioethics from the Universidad del Azuay, where he is a founding professor of the Faculty of Medicine. He is the author of books on surgery, art, and poetry. In 2024 he unveiled his permanent mural 'Memories of the Body', a bioethical narrative weaving pandemic masks, the brain as ethical arbiter, dance as freedom, and the question of whether science can play God without losing its humanity.",
  essayEs: "Es la edad los nacidos en los años 65, es una época sencilla, sin muchas ataduras, no es un catálogo triste ni sobre ciudades y pinturas tristes, de un cuencano, que no ha perdido el sentimiento idealizador de su tierra, y me declaro orgullosamente morlaco, de leva y de saco, con una niñez que vive con nuestra memoria, o mejor dicho con nuestra propia memoria, y en la edad que solo disponemos de la verdad en la cabeza, aquella verdad que se deteriora con el tiempo.\n\nLa edad de James, es una edad común, en la que se convivía con abuelos, tíos, primos amigos, con la única certeza de que cuando el día acabe la llamada del atardecer era nuestro celular, todo era extraordinario, subirse en la parte posterior del bus, una especie de acto heroico y de complicidad, como si esa travesura cambiaria el rumbo ya trazado, las canicas que se pretendía que estas permanezcan en un círculo.\n\nDespués de todo uno pretende vivir con convicciones, o al menos pretendo seguir haciéndolo pintar mi mejor cuadro cuando esté cerca de abandonar este planeta, tampoco pretendo vivir siendo un estorbo, si uno abandona las convicciones no queda nada, en estos cuadros siempre pretendo imaginar lo que se ve, cualquier pequeño acontecimiento hasta el más común e insignificante, puede ser extraordinario toda la vida. En algunos cuadros retrato acontecimientos aparentemente transitorios como la vacunación, aquella tortura estudiantil, pero están los recuerdos de la próxima vejez en donde pretendo decirme o mostrar que no me he dejado contaminar.",
  essayEn: "It is the age of those born in the year 65, it is a simple era, without many ties, it is not a sad catalogue nor about sad cities and sad paintings, of someone from Cuenca, who has not lost the idealizing sentiment for his land, and I declare myself proudly morlaco, of coat and jacket, with a childhood that lives in our memory, or rather in our own memory, and at the age when all we have left is the truth in our heads, that truth that deteriorates over time.\n\nThe age of James, is an ordinary age, in which one lived with grandparents, uncles, cousins, friends, with the only certainty that when the day ended the call of dusk was our cellphone, everything was extraordinary, climbing onto the back of the bus, a kind of heroic act of complicity, as if that mischief would change the course already traced, the marbles we tried to keep inside a circle.\n\nAfter all one tries to live with convictions, or at least I intend to keep doing so paint my best painting when I am close to leaving this planet, nor do I intend to live being a burden, if one abandons convictions nothing remains, in these paintings I always try to imagine what is seen, any small event even the most common and insignificant, can be extraordinary for a lifetime. In some paintings I portray seemingly transitory events like vaccination, that student torture, but there are the memories of the coming old age where I intend to tell myself or show that I have not let myself be contaminated.",
  portrait: "/images/artist/portrait-bw.jpg",
};
