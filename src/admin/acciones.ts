"use server";

import { eq, sql } from "drizzle-orm";
import { updateTag } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db/cliente";
import { publicaciones, registros, usuarios } from "@/db/esquema";
import { abrirSesion, anotarFallo, cerrarSesion, frenado, limpiarFallos, requerirUsuario } from "@/server/auth";
import { CLAVE_MINIMA, cifrarClave, verificarClave } from "@/server/clave";
import { idYouTube } from "@/lib/youtube";
import { recurso } from "./recursos";
import { formularioCrudo, leerFormulario, TABLAS, type Errores } from "./servidor";

/* Server Actions del panel. Todas empiezan por requerirUsuario(): una
   accion es un endpoint publico aunque solo la llame el panel. */

export interface EstadoFormulario {
  errores?: Errores;
  mensaje?: string;
  /** Lo que se envio: React reinicia el formulario tras la accion, y asi
      vuelve con lo escrito en vez de vaciarse cuando hay errores. */
  valores?: Record<string, string | boolean>;
}

/* ── Sesion ── */

export async function entrar(_: EstadoFormulario, f: FormData): Promise<EstadoFormulario> {
  const email = String(f.get("email") ?? "").trim().toLowerCase();
  const clave = String(f.get("clave") ?? "");
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0].trim() ?? "local";
  const llave = email + "|" + ip;

  if (frenado(llave)) return { mensaje: "Demasiados intentos. Espera 15 minutos.", valores: { email } };
  const [u] = await db().select().from(usuarios)
    .where(sql`lower(${usuarios.email}) = ${email}`).limit(1);
  // Mismo mensaje exista o no el correo: no se revela quien tiene cuenta.
  if (!u || !u.activo || !(await verificarClave(clave, u.claveHash))) {
    anotarFallo(llave);
    return { mensaje: "Correo o contraseña incorrectos.", valores: { email } };
  }
  limpiarFallos(llave);
  await abrirSesion(u.id);
  await db().update(usuarios).set({ ultimoAcceso: new Date() }).where(eq(usuarios.id, u.id));
  redirect("/admin");
}

export async function salir() {
  await cerrarSesion();
  redirect("/admin/entrar");
}

/* ── CRUD generico ── */

export async function guardar(clave: string, id: string | null, _: EstadoFormulario, f: FormData): Promise<EstadoFormulario> {
  const u = await requerirUsuario();
  const r = recurso(clave);
  if (!r) return { mensaje: "Recurso desconocido." };
  const { tabla, etiqueta } = TABLAS[clave];

  const { valores, errores } = leerFormulario(r, f);
  const devolver = (e: EstadoFormulario) => ({ ...e, valores: formularioCrudo(r, f) });
  if (Object.keys(errores).length) return devolver({ errores, mensaje: "Revisa los campos marcados." });

  if (clave === "publicaciones") {
    valores.youtubeId = idYouTube(valores.videoUrl as string | null);
    // Publicar sin fecha = publicar ahora.
    if (valores.estado === "publicado" && !valores.publicadaEn) valores.publicadaEn = new Date();
    if (!id) valores.autorId = u.id;
  }

  try {
    if (id) await db().update(tabla).set(valores).where(eq(tabla.id, id));
    else await db().insert(tabla).values(valores);
  } catch (e) {
    const codigo = (e as { cause?: { code?: string }; code?: string }).cause?.code ?? (e as { code?: string }).code;
    if (codigo === "23505") return devolver({ errores: { slug: "Ya existe otro con esta dirección." }, mensaje: "Dirección repetida." });
    console.error("[admin] guardar " + clave + ":", e);
    return devolver({ mensaje: "No se pudo guardar. Intenta de nuevo." });
  }

  updateTag(etiqueta);
  redirect("/admin/" + clave + "?ok=guardado");
}

export async function eliminar(clave: string, id: string) {
  await requerirUsuario();
  const r = recurso(clave);
  if (!r) return;
  const { tabla, etiqueta } = TABLAS[clave];
  await db().delete(tabla).where(eq(tabla.id, id));
  updateTag(etiqueta);
  redirect("/admin/" + clave + "?ok=eliminado");
}

/* ── YouTube ── */

/** Titulo y canal de un video via oEmbed (publico, sin clave de API). */
export async function datosYouTube(url: string): Promise<{ titulo: string; autor: string } | null> {
  await requerirUsuario();
  const id = idYouTube(url);
  if (!id) return null;
  try {
    const r = await fetch("https://www.youtube.com/oembed?format=json&url=" +
      encodeURIComponent("https://www.youtube.com/watch?v=" + id), { signal: AbortSignal.timeout(5000) });
    if (!r.ok) return null;
    const j = await r.json();
    return { titulo: String(j.title ?? ""), autor: String(j.author_name ?? "") };
  } catch {
    return null;
  }
}

/* ── Registros ── */

export async function cambiarBaja(id: string, baja: boolean) {
  await requerirUsuario();
  await db().update(registros).set({ bajaEn: baja ? new Date() : null }).where(eq(registros.id, id));
  redirect("/admin/registros?ok=" + (baja ? "baja" : "alta"));
}

/* ── Equipo (solo admin) ── */

export async function crearUsuario(_: EstadoFormulario, f: FormData): Promise<EstadoFormulario> {
  await requerirUsuario("admin");
  const email = String(f.get("email") ?? "").trim().toLowerCase();
  const nombre = String(f.get("nombre") ?? "").trim();
  const clave = String(f.get("clave") ?? "");
  const rol = f.get("rol") === "admin" ? "admin" : "editor";
  const errores: Errores = {};
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errores.email = "Correo no válido.";
  if (!nombre) errores.nombre = "Obligatorio.";
  if (clave.length < CLAVE_MINIMA) errores.clave = "Al menos " + CLAVE_MINIMA + " caracteres.";
  if (Object.keys(errores).length) return { errores, mensaje: "Revisa los campos marcados." };
  try {
    await db().insert(usuarios).values({ email, nombre, rol, claveHash: await cifrarClave(clave) });
  } catch (e) {
    const codigo = (e as { cause?: { code?: string } }).cause?.code;
    if (codigo === "23505") return { errores: { email: "Ese correo ya tiene cuenta." } };
    throw e;
  }
  redirect("/admin/equipo?ok=creado");
}

export async function cambiarActivo(id: string, activo: boolean) {
  const yo = await requerirUsuario("admin");
  if (id === yo.id) redirect("/admin/equipo?error=propio");
  await db().update(usuarios).set({ activo }).where(eq(usuarios.id, id));
  redirect("/admin/equipo?ok=" + (activo ? "activado" : "desactivado"));
}

/** Publicar o despublicar desde la lista, sin abrir el formulario. */
export async function cambiarEstadoPublicacion(id: string, estado: "publicado" | "borrador") {
  await requerirUsuario();
  await db().update(publicaciones).set({
    estado,
    ...(estado === "publicado" ? { publicadaEn: sql`coalesce(${publicaciones.publicadaEn}, now())` } : {}),
  }).where(eq(publicaciones.id, id));
  updateTag(TABLAS.publicaciones.etiqueta);
  redirect("/admin/publicaciones?ok=guardado");
}
