/* Siembra la base con el contenido que ya tenia el sitio. Idempotente: lo
   que ya existe (mismo slug) no se toca, asi que se puede correr en
   produccion sin miedo a pisar lo editado en /admin.
   Uso: npm run db:semilla */
import { and, eq, isNull } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as t from "../esquema";
import { canales, enElFronton, producciones } from "./hub";
import { catalogo } from "./experiencias";
import { CANAL_ZUNZUNEGUI, videosZunzunegui } from "./publicaciones";

function slugDe(texto: string) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL no esta configurada");
  const pool = new Pool({ connectionString: url, max: 1 });
  const db = drizzle(pool);

  const r = await Promise.all([
    db.insert(t.producciones).values(producciones.map((p, i) => ({
      slug: p.id, titulo: p.titulo, formato: p.formato, lema: p.lema ?? null, descripcion: p.desc, portadaUrl: p.img,
      portadaAlt: p.alt, red: p.red ?? null, estadoTexto: p.estadoTexto, enlace: p.enlace ?? null, orden: i,
    }))).onConflictDoNothing({ target: t.producciones.slug }).returning({ id: t.producciones.id }),

    canales.length ? db.insert(t.canales).values(canales.map((c, i) => ({
      slug: slugDe(c.nombre), nombre: c.nombre, tema: c.tema, plataforma: c.plataforma, url: c.url,
      avatarUrl: c.img ?? null, orden: i,
    }))).onConflictDoNothing({ target: t.canales.slug }).returning({ id: t.canales.id }) : [],

    db.insert(t.aliados).values(enElFronton.map((a, i) => ({
      slug: a.id, tipo: a.tipo, nombre: a.nombre, descripcion: a.desc, donde: a.donde ?? null,
      url: a.url, cta: a.cta, imagenUrl: a.img ?? null, imagenAlt: a.alt ?? "", orden: i,
    }))).onConflictDoNothing({ target: t.aliados.slug }).returning({ id: t.aliados.id }),

    db.insert(t.experiencias).values(catalogo.map((x, i) => ({
      // Los cursos venian con slug "curso-N": se les da uno legible.
      slug: x.slug.startsWith("curso-") ? slugDe(x.titulo) : x.slug,
      tipo: x.tipo, badge: x.badge, img: x.img, alt: x.alt, titulo: x.titulo, fechaTexto: x.fecha,
      lugar: x.lugar, modalidad: x.modalidad, estado: x.estado, estadoTexto: x.estadoTexto,
      // Ilustrativas: entran ocultas (DEC-032). Las reales se crean en /admin.
      detalle: x.detalle ?? null, orden: i, visible: false,
    }))).onConflictDoNothing({ target: t.experiencias.slug }).returning({ id: t.experiencias.id }),
  ]);

  // Imagenes que llegaron despues de la primera siembra: solo se llenan si
  // siguen vacias, para no pisar lo que se haya cambiado en /admin.
  for (const c of canales) {
    if (c.img) await db.update(t.canales).set({ avatarUrl: c.img })
      .where(and(eq(t.canales.slug, slugDe(c.nombre)), isNull(t.canales.avatarUrl)));
  }
  for (const a of enElFronton) {
    if (a.img) await db.update(t.aliados).set({ imagenUrl: a.img, imagenAlt: a.alt ?? "" })
      .where(and(eq(t.aliados.slug, a.id), isNull(t.aliados.imagenUrl)));
  }

  // Videos del canal de Zunzunegui, ligados a su canal.
  const [canal] = await db.select({ id: t.canales.id }).from(t.canales).where(eq(t.canales.slug, CANAL_ZUNZUNEGUI)).limit(1);
  const pubs = await db.insert(t.publicaciones).values(videosZunzunegui.map((v) => ({
    slug: slugDe(v.titulo), tipo: "video" as const, titulo: v.titulo, resumen: v.resumen,
    videoUrl: "https://www.youtube.com/watch?v=" + v.youtubeId, youtubeId: v.youtubeId,
    canalId: canal?.id ?? null, estado: "publicado" as const, publicadaEn: new Date(v.publicadaEn),
  }))).onConflictDoNothing({ target: t.publicaciones.slug }).returning({ id: t.publicaciones.id });

  const [p, c, a, x] = r.map((l) => l.length);
  console.log(`[semilla] nuevas: ${p} producciones, ${c} canales, ${a} aliados, ${x} experiencias, ${pubs.length} publicaciones.`);
  await pool.end();
}

main().catch((e) => {
  console.error("[semilla]", e);
  process.exit(1);
});
