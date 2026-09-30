/* Formas que el sitio pinta. Las produce src/server/contenido.ts a partir de
   la base de datos; los componentes solo conocen estas, nunca las tablas.
   Todo es serializable (sin Date): pasa por la cache de Next y por props de
   Client Components sin sorpresas. */

export type TipoExperiencia = "workshop" | "curso" | "evento" | "comunidad";
export type EstadoExperiencia = "abierto" | "pronto" | "ultimos";

export interface Experiencia {
  slug: string;
  tipo: TipoExperiencia;
  badge: string;
  img: string;
  alt: string;
  /** Con salto de linea opcional (\n). */
  titulo: string;
  fecha: string;
  lugar: string;
  modalidad: "presencial" | "linea";
  estado: EstadoExperiencia;
  estadoTexto: string;
  detalle?: string;
}

export const ESTADO_CLASE: Record<EstadoExperiencia, string> = {
  abierto: "est-abierto",
  pronto: "est-pronto",
  ultimos: "est-ultimos",
};

export const BADGE_CLASE: Record<TipoExperiencia, string> = {
  workshop: "b-workshop",
  curso: "b-curso",
  evento: "b-evento",
  comunidad: "b-workshop",
};

export interface Funcion {
  titulo: string;
  /** "24 OCT 2026" */
  fecha: string;
  /** "19:00 h" */
  hora: string;
  sede: string;
  boletos?: string;
  nota?: string;
}

export interface Produccion {
  /** El slug: ancla en /producciones#slug. */
  id: string;
  formato: string;
  titulo: string;
  desc: string;
  img: string;
  alt: string;
  red?: string;
  estadoTexto: string;
  enlace?: string;
}

export interface Canal {
  slug: string;
  nombre: string;
  tema: string;
  url: string;
  img?: string;
  plataforma: "YouTube" | "Podcast" | "Medio" | "Otro";
}

/** Lo que ocurre en el Fronton y se enlaza. */
export interface Vecino {
  id: string;
  tipo: string;
  nombre: string;
  desc: string;
  donde?: string;
  url: string;
  cta: string;
  img?: string;
  alt: string;
}

export type TipoPublicacion = "video" | "articulo" | "episodio";

export const TIPO_PUBLICACION: Record<TipoPublicacion, string> = {
  video: "Video",
  articulo: "Artículo",
  episodio: "Episodio",
};

export interface Publicacion {
  slug: string;
  tipo: TipoPublicacion;
  titulo: string;
  resumen: string;
  cuerpo: string;
  /** Propia o, si falta, la miniatura de YouTube. */
  portada?: string;
  portadaAlt: string;
  youtubeId?: string;
  videoUrl?: string;
  /** "12 SEP 2026" */
  fecha: string;
  fechaIso: string;
  destacada: boolean;
  canal?: { nombre: string; url: string };
  produccion?: { titulo: string; slug: string };
}
