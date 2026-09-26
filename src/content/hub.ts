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

/** Vacia hasta tener la lista confirmada de creadores y canales. */
export const canales: Canal[] = [];

export const CORREO_HUB =
  "mailto:hola@fortalezamexicana.mx?subject=Hub%20%C2%B7%20Sumar%20mi%20canal";
export const CORREO_CARTELERA =
  "mailto:hola@fortalezamexicana.mx?subject=Cartelera%20%C2%B7%20Av%C3%ADsenme%20de%20las%20fechas";
