import "server-only";
import { and, asc, count, desc, eq, ilike, isNotNull, isNull, or, type SQL } from "drizzle-orm";
import type { PgTable, PgColumn } from "drizzle-orm/pg-core";
import { db } from "@/db/cliente";
import * as t from "@/db/esquema";
import { ETIQUETA } from "@/server/contenido";
import { ZONA_HORARIA } from "@/lib/sitio";
import { idYouTube } from "@/lib/youtube";
import type { Campo, Recurso } from "./recursos";

/* Lado servidor del panel: que tabla y que etiqueta de cache corresponde a
   cada recurso, y como se convierte un formulario en fila y viceversa. */

type Tabla = PgTable & Record<string, PgColumn>;

export const TABLAS: Record<string, { tabla: Tabla; etiqueta: string }> = {
  publicaciones: { tabla: t.publicaciones as unknown as Tabla, etiqueta: ETIQUETA.publicaciones },
  funciones: { tabla: t.funciones as unknown as Tabla, etiqueta: ETIQUETA.funciones },
  canales: { tabla: t.canales as unknown as Tabla, etiqueta: ETIQUETA.canales },
  producciones: { tabla: t.producciones as unknown as Tabla, etiqueta: ETIQUETA.producciones },
  aliados: { tabla: t.aliados as unknown as Tabla, etiqueta: ETIQUETA.aliados },
  experiencias: { tabla: t.experiencias as unknown as Tabla, etiqueta: ETIQUETA.experiencias },
};

export const POR_PAGINA = 25;

/* ── Hora de Ciudad de Mexico <-> Date ── */

function desfaseMs(zona: string, instante: Date) {
  const p = Object.fromEntries(new Intl.DateTimeFormat("en-US", {
    timeZone: zona, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  }).formatToParts(instante).map((x) => [x.type, x.value]));
  const comoUtc = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second);
  return comoUtc - instante.getTime();
}

/** "2026-10-24T19:00" (hora de CDMX, lo que da <input type=datetime-local>) -> Date. */
export function desdeHoraLocal(valor: string): Date | null {
  const m = valor.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  if (!m) return null;
  const supuesto = Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5]);
  return new Date(supuesto - desfaseMs(ZONA_HORARIA, new Date(supuesto)));
}

/** Date -> "2026-10-24T19:00" en hora de CDMX. */
export function aHoraLocal(d: Date) {
  const local = new Date(d.getTime() + desfaseMs(ZONA_HORARIA, d));
  return local.toISOString().slice(0, 16);
}

export const fmtFechaHora = new Intl.DateTimeFormat("es-MX", {
  dateStyle: "medium", timeStyle: "short", timeZone: ZONA_HORARIA,
});

export function slugDe(texto: string) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}

/* ── Formulario -> fila ── */

export type Errores = Record<string, string>;

const URL_OK = /^https?:\/\/[^\s]+\.[^\s]+$/i;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function leerFormulario(r: Recurso, f: FormData): { valores: Record<string, unknown>; errores: Errores } {
  const valores: Record<string, unknown> = {};
  const errores: Errores = {};
  const crudo = (c: Campo) => String(f.get(c.nombre) ?? "").trim();

  for (const c of r.campos) {
    const v = crudo(c);
    const vacio = c.nulo ? null : "";

    switch (c.tipo) {
      case "booleano":
        valores[c.nombre] = f.get(c.nombre) === "on";
        continue;
      case "numero": {
        const n = v === "" ? 0 : Number(v);
        if (!Number.isInteger(n)) errores[c.nombre] = "Un número entero.";
        valores[c.nombre] = n;
        continue;
      }
      case "fechaHora": {
        if (!v) {
          if (c.requerido) errores[c.nombre] = "Falta la fecha.";
          valores[c.nombre] = null;
          continue;
        }
        const d = desdeHoraLocal(v);
        if (!d) errores[c.nombre] = "Fecha no válida.";
        valores[c.nombre] = d;
        continue;
      }
      case "seleccion":
        if (!c.opciones?.some((o) => o.valor === v)) errores[c.nombre] = "Elige una opción.";
        valores[c.nombre] = v;
        continue;
      case "relacion":
        if (v && !UUID.test(v)) errores[c.nombre] = "Opción no válida.";
        valores[c.nombre] = v || null;
        continue;
      case "slug": {
        const s = v ? slugDe(v) : slugDe(String(f.get(c.desde ?? "") ?? ""));
        if (!s) errores[c.nombre] = "Hace falta una dirección (se genera del título).";
        valores[c.nombre] = s;
        continue;
      }
      case "url":
      case "youtube":
        if (v && !URL_OK.test(v)) errores[c.nombre] = "Un enlace completo, con https://";
        if (c.tipo === "youtube" && v && !idYouTube(v)) errores[c.nombre] = "No parece un enlace de YouTube.";
        break;
      case "imagen":
        if (v && !URL_OK.test(v) && !v.startsWith("/")) errores[c.nombre] = "Una ruta (/img/…) o un enlace https://";
        break;
    }
    if (c.requerido && !v) errores[c.nombre] = "Obligatorio.";
    valores[c.nombre] = v || vacio;
  }
  return { valores, errores };
}

/** El formulario tal cual llego, para devolverlo con los errores. */
export function formularioCrudo(r: Recurso, f: FormData): Record<string, string | boolean> {
  return Object.fromEntries(r.campos.map((c) => [
    c.nombre, c.tipo === "booleano" ? f.get(c.nombre) === "on" : String(f.get(c.nombre) ?? ""),
  ]));
}

/* ── Fila -> valores del formulario (todo texto) ── */

export function aFormulario(r: Recurso, fila: Record<string, unknown> | null): Record<string, string | boolean> {
  const out: Record<string, string | boolean> = {};
  for (const c of r.campos) {
    const v = fila ? fila[c.nombre] : c.porDefecto;
    if (c.tipo === "booleano") out[c.nombre] = v === undefined || v === null ? Boolean(c.porDefecto) : Boolean(v);
    else if (v instanceof Date) out[c.nombre] = aHoraLocal(v);
    else out[c.nombre] = v === undefined || v === null ? "" : String(v);
  }
  return out;
}

/* ── Consultas genericas ── */

export async function listar(clave: string, r: Recurso, q: string, pagina: number) {
  const { tabla } = TABLAS[clave];
  const filtro: SQL | undefined = q
    ? or(...r.buscarEn.map((c) => ilike(tabla[c], "%" + q.replace(/[%_\\]/g, "\\$&") + "%")))
    : undefined;
  const col = tabla[r.orden.campo];
  const [filas, [{ total }]] = await Promise.all([
    db().select().from(tabla).where(filtro)
      .orderBy(r.orden.dir === "asc" ? asc(col) : desc(col), desc(tabla.creadoEn))
      .limit(POR_PAGINA).offset((pagina - 1) * POR_PAGINA),
    db().select({ total: count() }).from(tabla).where(filtro),
  ]);
  return { filas: filas as Record<string, unknown>[], total };
}

export async function obtener(clave: string, id: string) {
  if (!UUID.test(id)) return null;
  const { tabla } = TABLAS[clave];
  const [fila] = await db().select().from(tabla).where(eq(tabla.id, id)).limit(1);
  return (fila as Record<string, unknown>) ?? null;
}

/** Opciones de los campos relacion: id + nombre visible. */
export async function opcionesRelacion() {
  const [c, p] = await Promise.all([
    db().select({ valor: t.canales.id, etiqueta: t.canales.nombre }).from(t.canales).orderBy(asc(t.canales.nombre)),
    db().select({ valor: t.producciones.id, etiqueta: t.producciones.titulo }).from(t.producciones).orderBy(asc(t.producciones.titulo)),
  ]);
  return { canales: c, producciones: p };
}

export async function contar() {
  const claves = Object.keys(TABLAS);
  const totales = await Promise.all(claves.map((k) => db().select({ n: count() }).from(TABLAS[k].tabla)));
  const pub = await db().select({ n: count() }).from(t.publicaciones)
    .where(and(eq(t.publicaciones.estado, "borrador")));
  return { ...Object.fromEntries(claves.map((k, i) => [k, totales[i][0].n])), borradores: pub[0].n } as Record<string, number>;
}

/* ── Registros ── */

export type Filtros = { tipo?: string; medio?: string; estado?: string; q?: string; pagina?: string; ok?: string };

/** Mismos filtros para la lista y para la exportacion. */
export function filtroRegistros(f: Filtros): SQL | undefined {
  const partes: (SQL | undefined)[] = [];
  if (f.tipo === "calendario" || f.tipo === "miembro") partes.push(eq(t.registros.tipo, f.tipo));
  if (f.medio === "whatsapp" || f.medio === "correo") partes.push(eq(t.registros.medio, f.medio));
  partes.push(f.estado === "baja" ? isNotNull(t.registros.bajaEn) : f.estado === "todos" ? undefined : isNull(t.registros.bajaEn));
  const q = (f.q ?? "").trim().slice(0, 100).replace(/[%_\\]/g, "\\$&");
  if (q) partes.push(or(ilike(t.registros.nombre, "%" + q + "%"), ilike(t.registros.contacto, "%" + q + "%")));
  return and(...partes);
}
