import { sql } from "drizzle-orm";
import {
  boolean, index, integer, pgEnum, pgTable, text, timestamp, uniqueIndex, uuid,
} from "drizzle-orm/pg-core";

/* Esquema de Fortaleza Mexicana (DEC-030). Una tabla por cosa que el equipo
   administra desde /admin. Convenciones:
   - id uuid; slug unico en lo que tiene URL propia.
   - `visible` / `estado` deciden si sale en el sitio; nada se borra por
     esconderlo.
   - `orden` manual donde el cliente decide la posicion.
   - Fechas en timestamptz; el sitio las pinta en hora de Ciudad de Mexico.
   Cambiar este archivo = `npm run db:generar` (crea la migracion en
   drizzle/) y `npm run db:migrar`. */

const tiempos = {
  creadoEn: timestamp("creado_en", { withTimezone: true }).notNull().defaultNow(),
  actualizadoEn: timestamp("actualizado_en", { withTimezone: true }).notNull().defaultNow()
    .$onUpdate(() => new Date()),
};

/* ── Enumeraciones ── */

export const rolUsuario = pgEnum("rol_usuario", ["admin", "editor"]);
export const estadoPublicacion = pgEnum("estado_publicacion", ["borrador", "publicado", "archivado"]);
export const tipoPublicacion = pgEnum("tipo_publicacion", ["video", "articulo", "episodio"]);
export const plataformaCanal = pgEnum("plataforma_canal", ["YouTube", "Podcast", "Medio", "Otro"]);
export const tipoExperiencia = pgEnum("tipo_experiencia", ["workshop", "curso", "evento", "comunidad"]);
export const estadoExperiencia = pgEnum("estado_experiencia", ["abierto", "pronto", "ultimos"]);
export const modalidad = pgEnum("modalidad", ["presencial", "linea"]);
export const tipoRegistro = pgEnum("tipo_registro", ["calendario", "miembro"]);
export const medioAviso = pgEnum("medio_aviso", ["whatsapp", "correo"]);

/* ── Equipo y sesiones ── */

export const usuarios = pgTable("usuarios", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull(),
  nombre: text("nombre").notNull(),
  /** scrypt: "sal:hash" en hex. Nunca la contrasena. */
  claveHash: text("clave_hash").notNull(),
  rol: rolUsuario("rol").notNull().default("editor"),
  activo: boolean("activo").notNull().default(true),
  ultimoAcceso: timestamp("ultimo_acceso", { withTimezone: true }),
  ...tiempos,
}, (t) => [uniqueIndex("usuarios_email_uq").on(sql`lower(${t.email})`)]);

export const sesiones = pgTable("sesiones", {
  /** sha256 del token de la cookie: la base no guarda el token en claro. */
  id: text("id").primaryKey(),
  usuarioId: uuid("usuario_id").notNull().references(() => usuarios.id, { onDelete: "cascade" }),
  expiraEn: timestamp("expira_en", { withTimezone: true }).notNull(),
  creadoEn: timestamp("creado_en", { withTimezone: true }).notNull().defaultNow(),
}, (t) => [index("sesiones_usuario_idx").on(t.usuarioId)]);

/* ── Hub: canales, producciones y publicaciones ── */

export const canales = pgTable("canales", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  nombre: text("nombre").notNull(),
  /** De que habla, en una linea. */
  tema: text("tema").notNull(),
  plataforma: plataformaCanal("plataforma").notNull().default("YouTube"),
  url: text("url").notNull(),
  avatarUrl: text("avatar_url"),
  orden: integer("orden").notNull().default(0),
  visible: boolean("visible").notNull().default(true),
  ...tiempos,
});

export const producciones = pgTable("producciones", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  titulo: text("titulo").notNull(),
  /** Etiqueta del badge: "Podcast", "Animación IA", "Programa". */
  formato: text("formato").notNull(),
  descripcion: text("descripcion").notNull(),
  portadaUrl: text("portada_url").notNull(),
  portadaAlt: text("portada_alt").notNull().default(""),
  /** Red con la que se desarrolla, si la hay. */
  red: text("red"),
  estadoTexto: text("estado_texto").notNull().default("Próximamente"),
  /** Enlace publico (YouTube, Spotify...) cuando exista. */
  enlace: text("enlace"),
  orden: integer("orden").notNull().default(0),
  visible: boolean("visible").notNull().default(true),
  ...tiempos,
});

/** El corazon del hub: videos, articulos y episodios. Un video puede ser de
    un canal afin, de una produccion propia, o de ninguno. */
export const publicaciones = pgTable("publicaciones", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  tipo: tipoPublicacion("tipo").notNull().default("video"),
  titulo: text("titulo").notNull(),
  resumen: text("resumen").notNull().default(""),
  /** Texto largo; parrafos separados por una linea en blanco. */
  cuerpo: text("cuerpo").notNull().default(""),
  /** Si falta y hay video de YouTube, se usa su miniatura. */
  portadaUrl: text("portada_url"),
  portadaAlt: text("portada_alt").notNull().default(""),
  videoUrl: text("video_url"),
  /** Se deriva de video_url al guardar. */
  youtubeId: text("youtube_id"),
  canalId: uuid("canal_id").references(() => canales.id, { onDelete: "set null" }),
  produccionId: uuid("produccion_id").references(() => producciones.id, { onDelete: "set null" }),
  estado: estadoPublicacion("estado").notNull().default("borrador"),
  destacada: boolean("destacada").notNull().default(false),
  publicadaEn: timestamp("publicada_en", { withTimezone: true }),
  autorId: uuid("autor_id").references(() => usuarios.id, { onDelete: "set null" }),
  ...tiempos,
}, (t) => [
  index("publicaciones_listado_idx").on(t.estado, t.publicadaEn.desc()),
  index("publicaciones_canal_idx").on(t.canalId),
  index("publicaciones_produccion_idx").on(t.produccionId),
]);

/* ── Cartelera y sede ── */

export const funciones = pgTable("funciones", {
  id: uuid("id").primaryKey().defaultRandom(),
  titulo: text("titulo").notNull(),
  iniciaEn: timestamp("inicia_en", { withTimezone: true }).notNull(),
  sede: text("sede").notNull().default("Frontón México"),
  /** Sin enlace, la fila dice "Boletos pronto". */
  boletosUrl: text("boletos_url"),
  nota: text("nota"),
  visible: boolean("visible").notNull().default(true),
  ...tiempos,
}, (t) => [index("funciones_fecha_idx").on(t.iniciaEn)]);

/** Lo que ya ocurre en el Fronton y se enlaza (Malinche, Pelota Mestiza). */
export const aliados = pgTable("aliados", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  tipo: text("tipo").notNull(),
  nombre: text("nombre").notNull(),
  descripcion: text("descripcion").notNull(),
  donde: text("donde"),
  url: text("url").notNull(),
  cta: text("cta").notNull().default("Visitar"),
  /** Imagen de su sitio (la de vista previa), guardada en /public/img/aliados/. */
  imagenUrl: text("imagen_url"),
  imagenAlt: text("imagen_alt").notNull().default(""),
  orden: integer("orden").notNull().default(0),
  visible: boolean("visible").notNull().default(true),
  ...tiempos,
});

/* ── Experiencias ── */

export const experiencias = pgTable("experiencias", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  tipo: tipoExperiencia("tipo").notNull(),
  /** Etiqueta visible; la clase de color sale de `tipo`. */
  badge: text("badge").notNull(),
  img: text("img").notNull(),
  alt: text("alt").notNull().default(""),
  /** Titulo con salto de linea opcional (\n se pinta como <br />). */
  titulo: text("titulo").notNull(),
  /** Texto visible: "24 OCT 2026" o "8 semanas". */
  fechaTexto: text("fecha_texto").notNull(),
  lugar: text("lugar").notNull(),
  modalidad: modalidad("modalidad").notNull(),
  estado: estadoExperiencia("estado").notNull().default("pronto"),
  estadoTexto: text("estado_texto").notNull(),
  /** Ruta de su pagina propia, si la tiene. */
  detalle: text("detalle"),
  orden: integer("orden").notNull().default(0),
  visible: boolean("visible").notNull().default(true),
  ...tiempos,
});

/* ── Registros: calendario y miembros ── */

export const registros = pgTable("registros", {
  id: uuid("id").primaryKey().defaultRandom(),
  tipo: tipoRegistro("tipo").notNull(),
  nombre: text("nombre").notNull(),
  medio: medioAviso("medio").notNull(),
  /** WhatsApp en +52..., o correo en minusculas. */
  contacto: text("contacto").notNull(),
  oficio: text("oficio"),
  intereses: text("intereses").array().notNull().default(sql`'{}'::text[]`),
  calendario: boolean("calendario").notNull().default(true),
  /** De donde llego: "qr", campana... */
  ref: text("ref"),
  aceptoEn: timestamp("acepto_en", { withTimezone: true }).notNull().defaultNow(),
  bajaEn: timestamp("baja_en", { withTimezone: true }),
  ...tiempos,
}, (t) => [
  // La misma persona no se duplica: registrarse otra vez actualiza.
  uniqueIndex("registros_contacto_uq").on(t.tipo, t.medio, t.contacto),
  index("registros_creado_idx").on(t.creadoEn.desc()),
]);
