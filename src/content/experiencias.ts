/* Contenido de las experiencias. Es la unica fuente: la home, el catalogo y
   las paginas de detalle leen de aqui. Ninguna cifra ni nombre inventado:
   lo que no esta confirmado se declara ("Proximamente", "por confirmar"). */

export type Tipo = "workshop" | "curso" | "evento" | "comunidad";
export type Estado = "abierto" | "pronto" | "ultimos";

export interface Experiencia {
  slug: string;
  tipo: Tipo;
  /** Etiqueta visible; la clase de color sale de `tipo`. */
  badge: string;
  img: string;
  alt: string;
  /** Titulo con salto de linea opcional (se parte en <br />). */
  titulo: string;
  fecha: string;
  lugar: string;
  modalidad: "presencial" | "linea";
  estado: Estado;
  estadoTexto: string;
  /** Solo las que tienen pagina propia. */
  detalle?: string;
}

export const ESTADO_CLASE: Record<Estado, string> = {
  abierto: "est-abierto",
  pronto: "est-pronto",
  ultimos: "est-ultimos",
};

export const BADGE_CLASE: Record<Tipo, string> = {
  workshop: "b-workshop",
  curso: "b-curso",
  evento: "b-evento",
  comunidad: "b-workshop",
};

export const proximas: Experiencia[] = [
  {
    slug: "economia-de-creadores", tipo: "curso", badge: "Curso", img: "/img/bb-02.webp",
    alt: "Dos personas conversando sobre una mesa de trabajo, con un sol dorado al fondo",
    titulo: "Economía de creadores:\nmodelo, comunidad y futuro",
    fecha: "07 JUN 2026", lugar: "En línea", modalidad: "linea",
    estado: "abierto", estadoTexto: "Inscripciones abiertas",
  },
  {
    slug: "inteligencia-artificial", tipo: "evento", badge: "Evento", img: "/img/bb-15.webp",
    alt: "Cerebro iluminado en dorado sobre fondo negro",
    titulo: "Inteligencia artificial:\n¿y ahora qué?",
    fecha: "19 JUN 2026", lugar: "CDMX", modalidad: "presencial",
    estado: "pronto", estadoTexto: "Próximamente",
  },
  {
    slug: "escribir-para-ser-leido", tipo: "workshop", badge: "Workshop", img: "/img/bb-04.webp",
    alt: "Mano escribiendo con pluma en un cuaderno abierto",
    titulo: "Escribir para\nser leído",
    fecha: "28 JUN 2026", lugar: "En línea", modalidad: "linea",
    estado: "ultimos", estadoTexto: "Últimos lugares",
  },
  {
    slug: "geopolitica-en-tiempo-real", tipo: "curso", badge: "Curso", img: "/img/bb-05.webp",
    alt: "Globo terráqueo sobre un escritorio con mapas, frente a un sol dorado",
    titulo: "Geopolítica\nen tiempo real",
    fecha: "12 JUL 2026", lugar: "En línea", modalidad: "linea",
    estado: "abierto", estadoTexto: "Inscripciones abiertas",
  },
  {
    slug: "encuentro-de-miembros", tipo: "comunidad", badge: "Comunidad", img: "/img/bb-13.webp",
    alt: "Mujer con un libro bajo el brazo en un patio patrimonial",
    titulo: "Encuentro de\nmiembros",
    fecha: "26 JUL 2026", lugar: "CDMX", modalidad: "presencial",
    estado: "pronto", estadoTexto: "Solo miembros",
  },
];

export interface Curso {
  img: string;
  alt: string;
  titulo: string;
  desc: string;
  meta: string;
}

export const cursos: Curso[] = [
  {
    img: "/img/bb-16.webp", alt: "Globo terráqueo y mapas antiguos sobre un escritorio",
    titulo: "Geopolítica para entender el siglo XXI",
    desc: "Claves para comprender el poder, la economía y la política global.",
    meta: "8 semanas · En línea · Certificado",
  },
  {
    img: "/img/bb-06.webp", alt: "Mujer leyendo junto a una ventana con la ciudad al atardecer",
    titulo: "Narrativas que cambian realidades",
    desc: "Storytelling, medios y comunicación estratégica para influir e inspirar.",
    meta: "6 semanas · En línea · Certificado",
  },
];

/** Catalogo: proximas + cursos, todo como tarjeta. */
export const catalogo: Experiencia[] = [
  ...proximas,
  ...cursos.map((c, i) => ({
    slug: "curso-" + (i + 1), tipo: "curso" as Tipo, badge: "Curso", img: c.img, alt: c.alt,
    titulo: c.titulo, fecha: c.meta.split(" · ")[0], lugar: "En línea", modalidad: "linea" as const,
    estado: "abierto" as Estado, estadoTexto: "Inscripciones abiertas",
  })),
];
