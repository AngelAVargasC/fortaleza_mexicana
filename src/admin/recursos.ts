/* Configuracion del panel (DEC-030). Cada recurso declara sus campos una
   vez y de ahi salen la lista, el formulario, la validacion y el guardado
   (src/admin/servidor.ts, src/admin/acciones.ts). Para sumar algo nuevo al
   hub: tabla en src/db/esquema.ts + una entrada aqui + su tabla en
   servidor.ts. Solo datos serializables: tambien lo lee el formulario, que
   es Client Component. Los `nombre` son las columnas de Drizzle. */

export type TipoCampo =
  | "texto" | "textoLargo" | "slug" | "url" | "imagen" | "youtube"
  | "numero" | "booleano" | "fechaHora" | "seleccion" | "relacion";

export interface Campo {
  nombre: string;
  etiqueta: string;
  tipo: TipoCampo;
  requerido?: boolean;
  /** La columna admite NULL: vacio se guarda como NULL, no como "". */
  nulo?: boolean;
  ayuda?: string;
  /** slug: campo del que se genera. */
  desde?: string;
  /** textoLargo: alto en lineas. */
  filas?: number;
  opciones?: { valor: string; etiqueta: string }[];
  /** relacion: recurso al que apunta. */
  recurso?: "canales" | "producciones";
  /** Ocupa las dos columnas del formulario. */
  ancho?: boolean;
  porDefecto?: string | number | boolean;
}

export interface Recurso {
  clave: string;
  singular: string;
  plural: string;
  /** Rotulo del boton de alta: "Nueva publicación", "Nuevo canal". */
  nuevo: string;
  /** Que es, en una linea, para la cabecera de la lista. */
  descripcion: string;
  campos: Campo[];
  /** Columnas de la lista, por nombre de campo. La primera enlaza al formulario. */
  columnas: string[];
  buscarEn: string[];
  orden: { campo: string; dir: "asc" | "desc" };
  /** Donde se ve en el sitio publico. */
  enSitio: (fila: Record<string, unknown>) => string | null;
}

const ESTADO_PUB = [
  { valor: "borrador", etiqueta: "Borrador" },
  { valor: "publicado", etiqueta: "Publicado" },
  { valor: "archivado", etiqueta: "Archivado" },
];

const visible: Campo = { nombre: "visible", etiqueta: "Visible en el sitio", tipo: "booleano", porDefecto: true };
const orden: Campo = { nombre: "orden", etiqueta: "Orden", tipo: "numero", porDefecto: 0, ayuda: "Menor sale primero." };

export const RECURSOS: Record<string, Recurso> = {
  publicaciones: {
    clave: "publicaciones", nuevo: "Nueva publicación", singular: "publicación", plural: "Publicaciones",
    descripcion: "Videos, artículos y episodios del hub. Pega un enlace de YouTube y se arma solo.",
    campos: [
      { nombre: "videoUrl", etiqueta: "Video de YouTube", tipo: "youtube", nulo: true, ancho: true,
        ayuda: "Enlace de YouTube (watch, youtu.be, shorts o live). Se ve la vista previa al pegarlo." },
      { nombre: "titulo", etiqueta: "Título", tipo: "texto", requerido: true, ancho: true },
      { nombre: "slug", etiqueta: "Dirección (slug)", tipo: "slug", desde: "titulo",
        ayuda: "Se genera del título. Queda en /publicaciones/<slug>." },
      { nombre: "tipo", etiqueta: "Tipo", tipo: "seleccion", porDefecto: "video", opciones: [
        { valor: "video", etiqueta: "Video" }, { valor: "articulo", etiqueta: "Artículo" }, { valor: "episodio", etiqueta: "Episodio" },
      ] },
      { nombre: "resumen", etiqueta: "Resumen", tipo: "textoLargo", filas: 3, ancho: true,
        ayuda: "Una o dos frases. Sale en la tarjeta y al compartir." },
      { nombre: "cuerpo", etiqueta: "Texto", tipo: "textoLargo", filas: 12, ancho: true,
        ayuda: "Opcional. Separa los párrafos con una línea en blanco." },
      { nombre: "portadaUrl", etiqueta: "Portada", tipo: "imagen", nulo: true,
        ayuda: "Vacía = la miniatura del video. Ruta (/img/...) o enlace https." },
      { nombre: "portadaAlt", etiqueta: "Descripción de la portada", tipo: "texto",
        ayuda: "Para lectores de pantalla." },
      { nombre: "canalId", etiqueta: "Canal", tipo: "relacion", recurso: "canales", nulo: true },
      { nombre: "produccionId", etiqueta: "Propiedad", tipo: "relacion", recurso: "producciones", nulo: true },
      { nombre: "estado", etiqueta: "Estado", tipo: "seleccion", porDefecto: "borrador", opciones: ESTADO_PUB },
      { nombre: "publicadaEn", etiqueta: "Fecha de publicación", tipo: "fechaHora", nulo: true,
        ayuda: "Hora de CDMX. Vacía al publicar = ahora. Futura = programada." },
      { nombre: "destacada", etiqueta: "Destacada (sale primero)", tipo: "booleano", porDefecto: false },
    ],
    columnas: ["titulo", "tipo", "estado", "publicadaEn"],
    buscarEn: ["titulo", "resumen"],
    orden: { campo: "creadoEn", dir: "desc" },
    enSitio: (f) => (f.estado === "publicado" ? "/publicaciones/" + f.slug : null),
  },

  funciones: {
    clave: "funciones", nuevo: "Nueva función", singular: "función", plural: "Cartelera",
    descripcion: "Funciones en el Frontón México. Las pasadas dejan de verse solas.",
    campos: [
      { nombre: "titulo", etiqueta: "Título", tipo: "texto", requerido: true, ancho: true },
      { nombre: "iniciaEn", etiqueta: "Fecha y hora", tipo: "fechaHora", requerido: true, ayuda: "Hora de CDMX." },
      { nombre: "sede", etiqueta: "Sede", tipo: "texto", requerido: true, porDefecto: "Frontón México" },
      { nombre: "boletosUrl", etiqueta: "Enlace de boletos", tipo: "url", nulo: true, ancho: true,
        ayuda: "Sin enlace, la fila dice «Boletos pronto»." },
      { nombre: "nota", etiqueta: "Nota", tipo: "textoLargo", filas: 2, nulo: true, ancho: true },
      visible,
    ],
    columnas: ["titulo", "iniciaEn", "sede", "visible"],
    buscarEn: ["titulo"],
    orden: { campo: "iniciaEn", dir: "desc" },
    enSitio: () => "/cartelera",
  },

  canales: {
    clave: "canales", nuevo: "Nuevo canal", singular: "canal", plural: "Canales",
    descripcion: "Creadores y medios afines del hub.",
    campos: [
      { nombre: "nombre", etiqueta: "Nombre", tipo: "texto", requerido: true },
      { nombre: "slug", etiqueta: "Slug", tipo: "slug", desde: "nombre" },
      { nombre: "tema", etiqueta: "De qué habla", tipo: "texto", requerido: true, ancho: true },
      { nombre: "plataforma", etiqueta: "Plataforma", tipo: "seleccion", porDefecto: "YouTube", opciones: [
        { valor: "YouTube", etiqueta: "YouTube" }, { valor: "Podcast", etiqueta: "Podcast" },
        { valor: "Medio", etiqueta: "Medio" }, { valor: "Otro", etiqueta: "Otro" },
      ] },
      { nombre: "url", etiqueta: "Enlace al canal", tipo: "url", requerido: true },
      { nombre: "avatarUrl", etiqueta: "Foto o avatar", tipo: "imagen", nulo: true },
      orden, visible,
    ],
    columnas: ["nombre", "plataforma", "orden", "visible"],
    buscarEn: ["nombre", "tema"],
    orden: { campo: "orden", dir: "asc" },
    enSitio: () => "/canales",
  },

  producciones: {
    clave: "producciones", nuevo: "Nueva propiedad", singular: "propiedad", plural: "Propiedades",
    descripcion: "Las propiedades de Fortaleza Mexicana: Podcast, Conversarian, PequeñoAGigante, CreoEnTi.",
    campos: [
      { nombre: "titulo", etiqueta: "Título", tipo: "texto", requerido: true },
      { nombre: "slug", etiqueta: "Slug", tipo: "slug", desde: "titulo", ayuda: "Ancla en /propiedades#slug. No lo cambies en las cuatro de origen: su logotipo provisional depende de él." },
      { nombre: "logoUrl", etiqueta: "Logotipo oficial", tipo: "imagen", nulo: true, ancho: true,
        ayuda: "SVG o PNG con fondo transparente, en claro (va sobre foto oscura). Vacío = logotipo provisional del sitio." },
      { nombre: "formato", etiqueta: "Formato", tipo: "texto", requerido: true, ayuda: "Podcast, Animación IA, Programa…" },
      { nombre: "lema", etiqueta: "Lema", tipo: "texto", nulo: true, ancho: true,
        ayuda: "Frase corta con gancho, sin punto final. Va en la tarjeta de la home en lugar del formato." },
      { nombre: "estadoTexto", etiqueta: "Estado visible", tipo: "texto", requerido: true, porDefecto: "Próximamente" },
      { nombre: "descripcion", etiqueta: "Descripción", tipo: "textoLargo", filas: 3, requerido: true, ancho: true },
      { nombre: "portadaUrl", etiqueta: "Portada", tipo: "imagen", requerido: true },
      { nombre: "portadaAlt", etiqueta: "Descripción de la portada", tipo: "texto" },
      { nombre: "red", etiqueta: "Red aliada", tipo: "texto", nulo: true, ancho: true },
      { nombre: "enlace", etiqueta: "Enlace público", tipo: "url", nulo: true, ancho: true, ayuda: "Cuando exista (YouTube, Spotify…)." },
      orden, visible,
    ],
    columnas: ["titulo", "formato", "estadoTexto", "orden", "visible"],
    buscarEn: ["titulo", "descripcion"],
    orden: { campo: "orden", dir: "asc" },
    enSitio: (f) => "/propiedades#" + f.slug,
  },

  aliados: {
    clave: "aliados", nuevo: "Nuevo aliado", singular: "aliado", plural: "En el Frontón",
    descripcion: "Lo que ya ocurre en el Frontón México y se enlaza (obra, restaurante…).",
    campos: [
      { nombre: "nombre", etiqueta: "Nombre", tipo: "texto", requerido: true },
      { nombre: "slug", etiqueta: "Slug", tipo: "slug", desde: "nombre" },
      { nombre: "tipo", etiqueta: "Rótulo", tipo: "texto", requerido: true, ayuda: "Teatro musical, Restaurante…" },
      { nombre: "donde", etiqueta: "Dónde, dentro del Frontón", tipo: "texto", nulo: true },
      { nombre: "descripcion", etiqueta: "Descripción", tipo: "textoLargo", filas: 2, requerido: true, ancho: true },
      { nombre: "url", etiqueta: "Enlace", tipo: "url", requerido: true },
      { nombre: "cta", etiqueta: "Texto del enlace", tipo: "texto", requerido: true, porDefecto: "Visitar" },
      { nombre: "imagenUrl", etiqueta: "Imagen", tipo: "imagen", nulo: true, ayuda: "Horizontal, 1200×630 (la de vista previa de su sitio)." },
      { nombre: "imagenAlt", etiqueta: "Descripción de la imagen", tipo: "texto" },
      orden, visible,
    ],
    columnas: ["nombre", "tipo", "orden", "visible"],
    buscarEn: ["nombre"],
    orden: { campo: "orden", dir: "asc" },
    enSitio: () => "/cartelera",
  },

  experiencias: {
    clave: "experiencias", nuevo: "Nueva experiencia", singular: "experiencia", plural: "Experiencias",
    descripcion: "Workshops, cursos, eventos y encuentros.",
    campos: [
      { nombre: "titulo", etiqueta: "Título", tipo: "textoLargo", filas: 2, requerido: true, ancho: true,
        ayuda: "Un salto de línea parte el título en la tarjeta." },
      { nombre: "slug", etiqueta: "Slug", tipo: "slug", desde: "titulo" },
      { nombre: "tipo", etiqueta: "Tipo", tipo: "seleccion", porDefecto: "workshop", opciones: [
        { valor: "workshop", etiqueta: "Workshop" }, { valor: "curso", etiqueta: "Curso" },
        { valor: "evento", etiqueta: "Evento" }, { valor: "comunidad", etiqueta: "Comunidad" },
      ] },
      { nombre: "badge", etiqueta: "Etiqueta", tipo: "texto", requerido: true },
      { nombre: "fechaTexto", etiqueta: "Fecha visible", tipo: "texto", requerido: true, ayuda: "«24 OCT 2026» u «8 semanas»." },
      { nombre: "lugar", etiqueta: "Lugar", tipo: "texto", requerido: true },
      { nombre: "modalidad", etiqueta: "Modalidad", tipo: "seleccion", porDefecto: "presencial", opciones: [
        { valor: "presencial", etiqueta: "Presencial" }, { valor: "linea", etiqueta: "En línea" },
      ] },
      { nombre: "estado", etiqueta: "Estado", tipo: "seleccion", porDefecto: "pronto", opciones: [
        { valor: "abierto", etiqueta: "Inscripciones abiertas" }, { valor: "pronto", etiqueta: "Próximamente" },
        { valor: "ultimos", etiqueta: "Últimos lugares" },
      ] },
      { nombre: "estadoTexto", etiqueta: "Estado visible", tipo: "texto", requerido: true },
      { nombre: "img", etiqueta: "Imagen", tipo: "imagen", requerido: true },
      { nombre: "alt", etiqueta: "Descripción de la imagen", tipo: "texto" },
      { nombre: "detalle", etiqueta: "Página propia", tipo: "texto", nulo: true, ayuda: "Ruta, si la tiene." },
      orden, visible,
    ],
    columnas: ["titulo", "tipo", "fechaTexto", "orden", "visible"],
    buscarEn: ["titulo"],
    orden: { campo: "orden", dir: "asc" },
    enSitio: () => "/experiencias",
  },
};

/** Orden del menu del panel. */
export const MENU = ["publicaciones", "funciones", "canales", "producciones", "aliados", "experiencias"] as const;

export function recurso(clave: string): Recurso | null {
  return Object.prototype.hasOwnProperty.call(RECURSOS, clave) ? RECURSOS[clave] : null;
}
