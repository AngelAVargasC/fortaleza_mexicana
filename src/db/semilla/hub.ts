/* SEMILLA (DEC-030): el contenido con el que arranca la base de datos. Ya
   no es la fuente del sitio: el sitio lee de PostgreSQL y se edita en
   /admin. `npm run db:semilla` lo inserta sin pisar lo que ya exista. */

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

/* ── Propiedades (tabla producciones) ── */

export interface Produccion {
  id: string;
  /** Etiqueta del badge. */
  formato: string;
  lema?: string;
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
    id: "podcast", formato: "Podcast", lema: "México tiene mucho que contarnos", titulo: "Podcast Fortaleza Mexicana",
    desc: "Un podcast para descubrir México, escuchar otras miradas y hacernos nuevas preguntas. Historias e ideas que nos emocionan y nos invitan a pensar por nosotros mismos.",
    img: "/img/bb-01.webp", alt: "Grupo reunido alrededor de una mesa llena de fotografías y documentos",
    estadoTexto: "Próximamente",
  },
  {
    id: "conversarian", formato: "Animación IA", lema: "La historia toma la palabra", titulo: "Conversarian",
    desc: "Los personajes que hicieron México regresan a opinar sobre lo que vivimos hoy. Animados con inteligencia artificial, ponen a la historia frente al presente.",
    img: "/img/bb-19.webp", alt: "Mujer leyendo un libro del que surgen una pirámide, una catedral, un águila y un busto antiguo",
    estadoTexto: "Próximamente",
  },
  {
    id: "pequeno-a-gigante", formato: "Programa", lema: "Empezar con poco, llegar lejos", titulo: "PequeñoAGigante",
    desc: "Historias de quienes empezaron con poco y llegaron lejos, contadas para el que apenas empieza.",
    img: "/img/bb-07.webp", alt: "Mujer joven mirando al cielo en un patio patrimonial al anochecer",
    red: RED, estadoTexto: "Próximamente",
  },
  {
    id: "creo-en-ti", formato: "Programa", lema: "Alguien que apueste por ti", titulo: "CreoEnTi",
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
    img: "/img/canales/juan-miguel-zunzunegui.jpg",
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
  img?: string;
  alt?: string;
}

export const enElFronton: Vecino[] = [
  {
    id: "malinche", tipo: "Teatro musical", nombre: "Malinche, el musical",
    desc: "La historia de Malinche contada con música en vivo, baile y una gran puesta en escena.",
    url: "https://malinchethemusical.com/", cta: "Ver la obra",
    img: "/img/aliados/malinche.jpg", alt: "Cartel de Malinche, el musical: el título en dorado sobre un penacho de plumas",
  },
  {
    id: "pelota-mestiza", tipo: "Restaurante", nombre: "Pelota Mestiza",
    desc: "Cocina mexicana contemporánea, con ingredientes nativos y la memoria culinaria del país.",
    donde: "Tercer piso del Frontón", url: "https://pelotamestiza.com.mx/", cta: "Conocer el restaurante",
    img: "/img/aliados/pelota-mestiza.jpg", alt: "Logotipo de Pelota Mestiza sobre un postre de chocolate con fresas y moras",
  },
];


