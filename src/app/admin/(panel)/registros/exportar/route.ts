import { desc } from "drizzle-orm";
import { db } from "@/db/cliente";
import { registros } from "@/db/esquema";
import { usuarioActual } from "@/server/auth";
import { filtroRegistros } from "@/admin/servidor";

/* CSV de registros con los mismos filtros de la lista. Con BOM para que
   Excel respete los acentos. Formula-safe: una celda que empiece por = + -
   @ se prefija con ' para que ninguna hoja la ejecute. */

function celda(v: unknown) {
  let s = v === null || v === undefined ? "" : v instanceof Date ? v.toISOString() : String(v);
  if (/^[=+\-@\t\r]/.test(s) && !/^\+\d+$/.test(s)) s = "'" + s;
  return '"' + s.replace(/"/g, '""') + '"';
}

export async function GET(req: Request) {
  if (!(await usuarioActual())) return new Response("No autorizado", { status: 401 });
  const q = Object.fromEntries(new URL(req.url).searchParams);
  const filas = await db().select().from(registros).where(filtroRegistros(q)).orderBy(desc(registros.creadoEn));

  const cabecera = ["nombre", "tipo", "medio", "contacto", "oficio", "intereses", "calendario", "origen", "registrado", "baja"];
  const lineas = filas.map((r) => [
    r.nombre, r.tipo, r.medio, r.contacto, r.oficio, r.intereses.join(", "), r.calendario ? "si" : "no",
    r.ref ?? "sitio", r.creadoEn, r.bajaEn,
  ].map(celda).join(","));
  const csv = "﻿" + [cabecera.join(","), ...lineas].join("\r\n");
  const fecha = new Date().toISOString().slice(0, 10);

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="registros-fortaleza-${fecha}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
