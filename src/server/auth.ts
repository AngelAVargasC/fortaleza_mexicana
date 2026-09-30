import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { and, eq, gt, lt, sql } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { db } from "@/db/cliente";
import { sesiones, usuarios } from "@/db/esquema";

/* Sesiones del panel. La cookie lleva un token aleatorio; la base guarda
   solo su sha256, asi que una copia de la base no sirve para entrar. Las
   sesiones viven en PostgreSQL: cualquier instancia de Railway las valida
   (la app no guarda estado en memoria salvo el freno de intentos). */

export const COOKIE = "fm_sesion";
const DURACION_MS = 30 * 24 * 3600_000;

export type Rol = "admin" | "editor";
export interface Usuario { id: string; email: string; nombre: string; rol: Rol }

const huella = (token: string) => createHash("sha256").update(token).digest("hex");

export async function abrirSesion(usuarioId: string) {
  const token = randomBytes(32).toString("base64url");
  const expiraEn = new Date(Date.now() + DURACION_MS);
  await db().insert(sesiones).values({ id: huella(token), usuarioId, expiraEn });
  // De paso, limpia las vencidas de todo el equipo.
  await db().delete(sesiones).where(lt(sesiones.expiraEn, new Date()));
  (await cookies()).set(COOKIE, token, {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax",
    path: "/", expires: expiraEn,
  });
}

export async function cerrarSesion() {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (token) await db().delete(sesiones).where(eq(sesiones.id, huella(token)));
  jar.delete(COOKIE);
}

/** El usuario de esta peticion, o null. Memorizado por render. */
export const usuarioActual = cache(async (): Promise<Usuario | null> => {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  const [u] = await db().select({ id: usuarios.id, email: usuarios.email, nombre: usuarios.nombre, rol: usuarios.rol })
    .from(sesiones).innerJoin(usuarios, eq(sesiones.usuarioId, usuarios.id))
    .where(and(eq(sesiones.id, huella(token)), gt(sesiones.expiraEn, sql`now()`), eq(usuarios.activo, true)))
    .limit(1);
  return u ?? null;
});

/** Para paginas y Server Actions del panel: sin sesion, a /admin/entrar.
    Las acciones lo llaman siempre; el layout no basta para protegerlas. */
export async function requerirUsuario(rol?: Rol): Promise<Usuario> {
  const u = await usuarioActual();
  if (!u) redirect("/admin/entrar");
  if (rol === "admin" && u.rol !== "admin") redirect("/admin?error=permiso");
  return u;
}

/* Freno de fuerza bruta por instancia: 5 intentos fallidos por correo e IP
   cada 15 min. Con varias instancias cada una cuenta aparte; para mas, mover
   a la base o a Redis. */
const intentos = new Map<string, { n: number; hasta: number }>();
export function frenado(clave: string) {
  const i = intentos.get(clave);
  return Boolean(i && i.hasta > Date.now() && i.n >= 5);
}
export function anotarFallo(clave: string) {
  const ahora = Date.now();
  const i = intentos.get(clave);
  if (!i || i.hasta < ahora) intentos.set(clave, { n: 1, hasta: ahora + 15 * 60_000 });
  else i.n++;
  if (intentos.size > 5000) for (const [k, v] of intentos) if (v.hasta < ahora) intentos.delete(k);
}
export function limpiarFallos(clave: string) {
  intentos.delete(clave);
}
