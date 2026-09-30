import { sql } from "drizzle-orm";
import { db, hayBase } from "@/db/cliente";

/* Diagnostico de despliegue: /api/salud dice si el sitio llega a la base y
   cuanto contenido ve. No expone la URL ni credenciales: solo si la variable
   existe, si apunta a la red privada de Railway o a una publica, y conteos. */

export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.DATABASE_URL ?? "";
  const red = !url ? null : url.includes(".railway.internal") ? "privada" : "publica";
  if (!hayBase()) {
    return Response.json({ ok: false, base: "DATABASE_URL no esta configurada en este servicio" }, { status: 503 });
  }
  try {
    const r = await db().execute(sql`select
      (select count(*) from publicaciones)::int as publicaciones,
      (select count(*) from experiencias)::int as experiencias,
      (select count(*) from canales)::int as canales,
      (select count(*) from aliados)::int as aliados,
      (select count(*) from usuarios)::int as usuarios`);
    return Response.json({ ok: true, base: "conectada", red, conteos: r.rows[0] });
  } catch (e) {
    const err = e as { cause?: { code?: string; message?: string }; code?: string; message?: string };
    const causa = err.cause ?? err;
    return Response.json({
      ok: false, base: "no responde", red,
      error: causa.code ?? String(causa.message ?? "desconocido").slice(0, 160),
    }, { status: 503 });
  }
}
