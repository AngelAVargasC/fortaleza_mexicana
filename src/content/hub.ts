/* Contenidos del hub (DEC-027): cartelera en Frontón México, producciones
   propias y canales afines. Unica fuente para la home y las paginas
   /cartelera, /producciones y /canales. Mismo criterio que experiencias.ts:
   nada inventado. Las listas vacias se pintan como estado honesto
   ("por anunciar", "en integracion"); al llenarlas aparecen solas. */

/* ── Cartelera ── */

export const SEDE = {
  nombre: "Frontón México",
  zona: "Plaza de la República · CDMX",
};

export interface Funcion {
  /** Nombre de la funcion, conferencia o encuentro. */
  titulo: string;
  /** Fecha visible, mismo formato que las experiencias: "24 OCT 2026". */
  fecha: string;
  hora: string;
  /** Enlace de boletos; sin el, la fila dice "Boletos pronto". */
  boletos?: string;
  nota?: string;
}

/** Vacia hasta que el cliente confirme fechas. La primera es la destacada. */
export const cartelera: Funcion[] = [];

/* ── Producciones propias ── */

export interface Produccion {
  id: string;
  /** Etiqueta del badge. */
  formato: string;
  titulo: string;
  desc: string;
  img: string;
  alt: string;
  /** Red con la que se desarrolla, si la hay. */
  red?: string;
  estadoTexto: string;
  /** Enlace publico (YouTube, Spotify...) cuando exista. */
  enlace?: string;
}

const RED = "Con la red de Mexicanos Fuertes y Somos Grandes";

export const producciones: Produccion[] = [
  {
    id: "podcast", formato: "Podcast", titulo: "Podcast Fortaleza Mexicana",
    desc: "Conversaciones largas sobre México: su historia, su cultura y las ideas que lo están moviendo.",
    img: "/img/bb-01.webp", alt: "Grupo reunido alrededor de una mesa llena de fotografías y documentos",
    estadoTexto: "Próximamente",
  },
  {
    id: "animacion", formato: "Animación IA", titulo: "Personajes históricos",
    desc: "Personajes históricos, animados con inteligencia artificial, hablan de los temas de hoy.",
    img: "/img/bb-19.webp", alt: "Mujer leyendo un libro del que surgen una pirámide, una catedral, un águila y un busto antiguo",
    estadoTexto: "Próximamente",
  },
  {
    id: "de-pequeno-a-gigante", formato: "Programa", titulo: "De pequeño a Gigante",
    desc: "Historias de quienes empezaron con poco y llegaron lejos, contadas para el que apenas empieza.",
    img: "/img/bb-07.webp", alt: "Mujer joven mirando al cielo en un patio patrimonial al anochecer",
    red: RED, estadoTexto: "Próximamente",
  },
  {
    id: "creo-en-ti", formato: "Programa", titulo: "Creo en ti",
    desc: "Un programa para acompañar y respaldar a quien tiene un proyecto y necesita que alguien apueste por él.",
    img: "/img/bb-20.webp", alt: "Mujer mayor conversando con un grupo alrededor de una mesa con velas",
    red: RED, estadoTexto: "Próximamente",
  },
];

/* ── Canales afines ── */

export interface Canal {
  nombre: string;
  /** De que habla, en una linea. */
  tema: string;
  url: string;
  /** Foto o avatar en /public/img/canales/. */
  img?: string;
  plataforma: "YouTube" | "Podcast" | "Medio" | "Otro";
}

/** Solo los confirmados por el cliente. */
export const canales: Canal[] = [
  {
    nombre: "Juan Miguel Zunzunegui",
    tema: "Historia, filosofía y la identidad de México.",
    url: "https://www.youtube.com/@JMZunzu",
    plataforma: "YouTube",
  },
];

/* ── Tambien en el Fronton ──
   Lo que ya ocurre en la misma sede y el cliente pidio enlazar. Son
   proyectos de terceros: se describe lo que son y se enlaza a su sitio;
   fechas, precios y horarios los da cada sitio, no este. */

export interface Vecino {
  id: string;
  /** Rotulo corto: "Teatro musical", "Restaurante". */
  tipo: string;
  nombre: string;
  desc: string;
  /** Donde esta dentro del Fronton, si aplica. */
  donde?: string;
  url: string;
  cta: string;
}

export const enElFronton: Vecino[] = [
  {
    id: "malinche", tipo: "Teatro musical", nombre: "Malinche, el musical",
    desc: "La historia de Malinche contada con música en vivo, baile y una gran puesta en escena.",
    url: "https://malinchethemusical.com/", cta: "Ver la obra",
  },
  {
    id: "pelota-mestiza", tipo: "Restaurante", nombre: "Pelota Mestiza",
    desc: "Cocina mexicana contemporánea, con ingredientes nativos y la memoria culinaria del país.",
    donde: "Tercer piso del Frontón", url: "https://pelotamestiza.com.mx/", cta: "Conocer el restaurante",
  },
];

export const CORREO_HUB =
  "mailto:hola@fortalezamexicana.mx?subject=Hub%20%C2%B7%20Sumar%20mi%20canal";
/** Buzon al que cae el registro si el formulario no puede enviarse. */
export const CORREO = "hola@fortalezamexicana.mx";

