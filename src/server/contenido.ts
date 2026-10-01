import "server-only";
import { and, asc, desc, eq, gte, isNotNull, lte, sql } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { db, hayBase } from "@/db/cliente";
import * as t from "@/db/esquema";
import { ZONA_HORARIA } from "@/lib/sitio";
import { miniaturaYouTube } from "@/lib/youtube";
import type { Canal, Experiencia, Funcion, Produccion, Publicacion, TipoPublicacion, Vecino } from "@/lib/tipos";

/* Lecturas publicas del sitio. Cada una:
   - se cachea con una etiqueta (ETIQUETA.*); el panel la invalida al
     guardar, y `revalidate` es la red de seguridad;
   - devuelve formas de src/lib/tipos.ts, ya formateadas;
   - si la base no responde, registra el error y devuelve vacio: el sitio
     pinta sus estados "por anunciar" en vez de caerse. Lo que falla no se
     cachea (el error ocurre dentro y se atrapa fuera). */

export const ETIQUETA = {
  funciones: "funciones",
  producciones: "producciones",
  canales: "canales",
  aliados: "aliados",
  experiencias: "experiencias",
  publicaciones: "publicaciones",
} as const;

const REVALIDAR = 600;

async function seguro<T>(nombre: string, vacio: T, fn: () => Promise<T>): Promise<T> {
  if (!hayBase()) return vacio;
  try {
    return await fn();
  } catch (e) {
    console.error("[contenido] " + nombre + ":", e);
    return vacio;
  }
}

const fmtFecha = new Intl.DateTimeFormat("es-MX", { day: "2-digit", month: "short", year: "numeric", timeZone: ZONA_HORARIA });
const fmtHora = new Intl.DateTimeFormat("es-MX", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: ZONA_HORARIA });

/** "24 OCT 2026", como las fechas de las experiencias. */
export function fechaCorta(d: Date) {
  const p = Object.fromEntries(fmtFecha.formatToParts(d).map((x) => [x.type, x.value]));
  return (p.day + " " + String(p.month).replace(".", "").toUpperCase() + " " + p.year);
}

const opc = <T,>(v: T | null) => v ?? undefined;

/* ── Cartelera ── */

const _cartelera = unstable_cache(async (): Promise<Funcion[]> => {
  // Desde hace 6 h: la funcion de esta noche sigue visible mientras ocurre.
  const desde = new Date(Date.now() - 6 * 3600_000);
  const filas = await db().select().from(t.funciones)
    .where(and(eq(t.funciones.visible, true), gte(t.funciones.iniciaEn, desde)))
    .orderBy(asc(t.funciones.iniciaEn));
  return filas.map((f) => ({
    titulo: f.titulo, fecha: fechaCorta(f.iniciaEn), hora: fmtHora.format(f.iniciaEn) + " h",
    sede: f.sede, boletos: opc(f.boletosUrl), nota: opc(f.nota),
  }));
}, ["cartelera"], { tags: [ETIQUETA.funciones], revalidate: REVALIDAR });

export const obtenerCartelera = () => seguro("cartelera", [], _cartelera);

/* ── Propiedades (tabla producciones) ── */

const _producciones = unstable_cache(async (): Promise<Produccion[]> => {
  const filas = await db().select().from(t.producciones)
    .where(eq(t.producciones.visible, true))
    .orderBy(asc(t.producciones.orden), asc(t.producciones.titulo));
  return filas.map((p) => ({
    id: p.slug, logo: opc(p.logoUrl), formato: p.formato, titulo: p.titulo, desc: p.descripcion, img: p.portadaUrl,
    alt: p.portadaAlt, red: opc(p.red), estadoTexto: p.estadoTexto, enlace: opc(p.enlace),
  }));
}, ["producciones"], { tags: [ETIQUETA.producciones], revalidate: REVALIDAR });

export const obtenerProducciones = () => seguro("producciones", [], _producciones);

/* ── Canales ── */

const _canales = unstable_cache(async (): Promise<Canal[]> => {
  const filas = await db().select().from(t.canales)
    .where(eq(t.canales.visible, true))
    .orderBy(asc(t.canales.orden), asc(t.canales.nombre));
  return filas.map((c) => ({
    slug: c.slug, nombre: c.nombre, tema: c.tema, url: c.url, img: opc(c.avatarUrl), plataforma: c.plataforma,
  }));
}, ["canales"], { tags: [ETIQUETA.canales], revalidate: REVALIDAR });

export const obtenerCanales = () => seguro("canales", [], _canales);

/* ── Tambien en el Fronton ── */

const _aliados = unstable_cache(async (): Promise<Vecino[]> => {
  const filas = await db().select().from(t.aliados)
    .where(eq(t.aliados.visible, true))
    .orderBy(asc(t.aliados.orden), asc(t.aliados.nombre));
  return filas.map((a) => ({
    id: a.slug, tipo: a.tipo, nombre: a.nombre, desc: a.descripcion, donde: opc(a.donde), url: a.url, cta: a.cta,
    img: opc(a.imagenUrl), alt: a.imagenAlt,
  }));
}, ["aliados"], { tags: [ETIQUETA.aliados], revalidate: REVALIDAR });

export const obtenerAliados = () => seguro("aliados", [], _aliados);

/* ── Experiencias ── */

const _experiencias = unstable_cache(async (): Promise<Experiencia[]> => {
  const filas = await db().select().from(t.experiencias)
    .where(eq(t.experiencias.visible, true))
    .orderBy(asc(t.experiencias.orden), asc(t.experiencias.titulo));
  return filas.map((x) => ({
    slug: x.slug, tipo: x.tipo, badge: x.badge, img: x.img, alt: x.alt, titulo: x.titulo,
    fecha: x.fechaTexto, lugar: x.lugar, modalidad: x.modalidad, estado: x.estado,
    estadoTexto: x.estadoTexto, detalle: opc(x.detalle),
  }));
}, ["experiencias"], { tags: [ETIQUETA.experiencias], revalidate: REVALIDAR });

export const obtenerExperiencias = () => seguro("experiencias", [], _experiencias);

/* ── Publicaciones ── */

const columnasPublicacion = {
  pub: t.publicaciones,
  canalNombre: t.canales.nombre,
  canalUrl: t.canales.url,
  prodTitulo: t.producciones.titulo,
  prodSlug: t.producciones.slug,
};

type FilaPublicacion = {
  pub: typeof t.publicaciones.$inferSelect;
  canalNombre: string | null; canalUrl: string | null;
  prodTitulo: string | null; prodSlug: string | null;
};

function aPublicacion(f: FilaPublicacion): Publicacion {
  const p = f.pub;
  const fecha = p.publicadaEn ?? p.creadoEn;
  return {
    slug: p.slug, tipo: p.tipo, titulo: p.titulo, resumen: p.resumen, cuerpo: p.cuerpo,
    portada: p.portadaUrl ?? (p.youtubeId ? miniaturaYouTube(p.youtubeId) : undefined),
    portadaAlt: p.portadaAlt, youtubeId: opc(p.youtubeId), videoUrl: opc(p.videoUrl),
    fecha: fechaCorta(fecha), fechaIso: fecha.toISOString(), destacada: p.destacada,
    canal: f.canalNombre && f.canalUrl ? { nombre: f.canalNombre, url: f.canalUrl } : undefined,
    produccion: f.prodTitulo && f.prodSlug ? { titulo: f.prodTitulo, slug: f.prodSlug } : undefined,
  };
}

/** Publicadas y con fecha ya cumplida: programar = poner fecha futura. */
const publicada = () => and(
  eq(t.publicaciones.estado, "publicado"),
  isNotNull(t.publicaciones.publicadaEn),
  lte(t.publicaciones.publicadaEn, sql`now()`),
);

const _publicaciones = unstable_cache(async (tipo: TipoPublicacion | "todas", limite: number): Promise<Publicacion[]> => {
  const filas = await db().select(columnasPublicacion).from(t.publicaciones)
    .leftJoin(t.canales, eq(t.publicaciones.canalId, t.canales.id))
    .leftJoin(t.producciones, eq(t.publicaciones.produccionId, t.producciones.id))
    .where(tipo === "todas" ? publicada() : and(publicada(), eq(t.publicaciones.tipo, tipo)))
    .orderBy(desc(t.publicaciones.destacada), desc(t.publicaciones.publicadaEn))
    .limit(limite);
  return filas.map(aPublicacion);
}, ["publicaciones"], { tags: [ETIQUETA.publicaciones], revalidate: REVALIDAR });

export const obtenerPublicaciones = (tipo: TipoPublicacion | "todas" = "todas", limite = 48) =>
  seguro("publicaciones", [], () => _publicaciones(tipo, Math.min(limite, 200)));

const _publicacion = unstable_cache(async (slug: string): Promise<Publicacion | null> => {
  const [f] = await db().select(columnasPublicacion).from(t.publicaciones)
    .leftJoin(t.canales, eq(t.publicaciones.canalId, t.canales.id))
    .leftJoin(t.producciones, eq(t.publicaciones.produccionId, t.producciones.id))
    .where(and(publicada(), eq(t.publicaciones.slug, slug)))
    .limit(1);
  return f ? aPublicacion(f) : null;
}, ["publicacion"], { tags: [ETIQUETA.publicaciones], revalidate: REVALIDAR });

export const obtenerPublicacion = (slug: string) => seguro("publicacion", null, () => _publicacion(slug));
