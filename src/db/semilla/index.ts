/* Siembra la base con el contenido que ya tenia el sitio. Idempotente: lo
   que ya existe (mismo slug) no se toca, asi que se puede correr en
   produccion sin miedo a pisar lo editado en /admin.
   Uso: npm run db:semilla */
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as t from "../esquema";
import { canales, enElFronton, producciones } from "./hub";
import { catalogo } from "./experiencias";

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
      slug: p.id, titulo: p.titulo, formato: p.formato, descripcion: p.desc, portadaUrl: p.img,
      portadaAlt: p.alt, red: p.red ?? null, estadoTexto: p.estadoTexto, enlace: p.enlace ?? null, orden: i,
    }))).onConflictDoNothing({ target: t.producciones.slug }).returning({ id: t.producciones.id }),

    canales.length ? db.insert(t.canales).values(canales.map((c, i) => ({
      slug: slugDe(c.nombre), nombre: c.nombre, tema: c.tema, plataforma: c.plataforma, url: c.url,
      avatarUrl: c.img ?? null, orden: i,
    }))).onConflictDoNothing({ target: t.canales.slug }).returning({ id: t.canales.id }) : [],

    db.insert(t.aliados).values(enElFronton.map((a, i) => ({
      slug: a.id, tipo: a.tipo, nombre: a.nombre, descripcion: a.desc, donde: a.donde ?? null,
      url: a.url, cta: a.cta, orden: i,
    }))).onConflictDoNothing({ target: t.aliados.slug }).returning({ id: t.aliados.id }),

    db.insert(t.experiencias).values(catalogo.map((x, i) => ({
      // Los cursos venian con slug "curso-N": se les da uno legible.
      slug: x.slug.startsWith("curso-") ? slugDe(x.titulo) : x.slug,
      tipo: x.tipo, badge: x.badge, img: x.img, alt: x.alt, titulo: x.titulo, fechaTexto: x.fecha,
      lugar: x.lugar, modalidad: x.modalidad, estado: x.estado, estadoTexto: x.estadoTexto,
      detalle: x.detalle ?? null, orden: i,
    }))).onConflictDoNothing({ target: t.experiencias.slug }).returning({ id: t.experiencias.id }),
  ]);

  const [p, c, a, x] = r.map((l) => l.length);
  console.log(`[semilla] nuevas: ${p} producciones, ${c} canales, ${a} aliados, ${x} experiencias.`);
  await pool.end();
}

main().catch((e) => {
  console.error("[semilla]", e);
  process.exit(1);
});
