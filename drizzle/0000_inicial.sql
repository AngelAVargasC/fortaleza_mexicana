CREATE TYPE "public"."estado_experiencia" AS ENUM('abierto', 'pronto', 'ultimos');--> statement-breakpoint
CREATE TYPE "public"."estado_publicacion" AS ENUM('borrador', 'publicado', 'archivado');--> statement-breakpoint
CREATE TYPE "public"."medio_aviso" AS ENUM('whatsapp', 'correo');--> statement-breakpoint
CREATE TYPE "public"."modalidad" AS ENUM('presencial', 'linea');--> statement-breakpoint
CREATE TYPE "public"."plataforma_canal" AS ENUM('YouTube', 'Podcast', 'Medio', 'Otro');--> statement-breakpoint
CREATE TYPE "public"."rol_usuario" AS ENUM('admin', 'editor');--> statement-breakpoint
CREATE TYPE "public"."tipo_experiencia" AS ENUM('workshop', 'curso', 'evento', 'comunidad');--> statement-breakpoint
CREATE TYPE "public"."tipo_publicacion" AS ENUM('video', 'articulo', 'episodio');--> statement-breakpoint
CREATE TYPE "public"."tipo_registro" AS ENUM('calendario', 'miembro');--> statement-breakpoint
CREATE TABLE "aliados" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"tipo" text NOT NULL,
	"nombre" text NOT NULL,
	"descripcion" text NOT NULL,
	"donde" text,
	"url" text NOT NULL,
	"cta" text DEFAULT 'Visitar' NOT NULL,
	"orden" integer DEFAULT 0 NOT NULL,
	"visible" boolean DEFAULT true NOT NULL,
	"creado_en" timestamp with time zone DEFAULT now() NOT NULL,
	"actualizado_en" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "aliados_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "canales" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"nombre" text NOT NULL,
	"tema" text NOT NULL,
	"plataforma" "plataforma_canal" DEFAULT 'YouTube' NOT NULL,
	"url" text NOT NULL,
	"avatar_url" text,
	"orden" integer DEFAULT 0 NOT NULL,
	"visible" boolean DEFAULT true NOT NULL,
	"creado_en" timestamp with time zone DEFAULT now() NOT NULL,
	"actualizado_en" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "canales_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "experiencias" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"tipo" "tipo_experiencia" NOT NULL,
	"badge" text NOT NULL,
	"img" text NOT NULL,
	"alt" text DEFAULT '' NOT NULL,
	"titulo" text NOT NULL,
	"fecha_texto" text NOT NULL,
	"lugar" text NOT NULL,
	"modalidad" "modalidad" NOT NULL,
	"estado" "estado_experiencia" DEFAULT 'pronto' NOT NULL,
	"estado_texto" text NOT NULL,
	"detalle" text,
	"orden" integer DEFAULT 0 NOT NULL,
	"visible" boolean DEFAULT true NOT NULL,
	"creado_en" timestamp with time zone DEFAULT now() NOT NULL,
	"actualizado_en" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "experiencias_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "funciones" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"titulo" text NOT NULL,
	"inicia_en" timestamp with time zone NOT NULL,
	"sede" text DEFAULT 'Frontón México' NOT NULL,
	"boletos_url" text,
	"nota" text,
	"visible" boolean DEFAULT true NOT NULL,
	"creado_en" timestamp with time zone DEFAULT now() NOT NULL,
	"actualizado_en" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "producciones" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"titulo" text NOT NULL,
	"formato" text NOT NULL,
	"descripcion" text NOT NULL,
	"portada_url" text NOT NULL,
	"portada_alt" text DEFAULT '' NOT NULL,
	"red" text,
	"estado_texto" text DEFAULT 'Próximamente' NOT NULL,
	"enlace" text,
	"orden" integer DEFAULT 0 NOT NULL,
	"visible" boolean DEFAULT true NOT NULL,
	"creado_en" timestamp with time zone DEFAULT now() NOT NULL,
	"actualizado_en" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "producciones_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "publicaciones" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"tipo" "tipo_publicacion" DEFAULT 'video' NOT NULL,
	"titulo" text NOT NULL,
	"resumen" text DEFAULT '' NOT NULL,
	"cuerpo" text DEFAULT '' NOT NULL,
	"portada_url" text,
	"portada_alt" text DEFAULT '' NOT NULL,
	"video_url" text,
	"youtube_id" text,
	"canal_id" uuid,
	"produccion_id" uuid,
	"estado" "estado_publicacion" DEFAULT 'borrador' NOT NULL,
	"destacada" boolean DEFAULT false NOT NULL,
	"publicada_en" timestamp with time zone,
	"autor_id" uuid,
	"creado_en" timestamp with time zone DEFAULT now() NOT NULL,
	"actualizado_en" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "publicaciones_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "registros" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tipo" "tipo_registro" NOT NULL,
	"nombre" text NOT NULL,
	"medio" "medio_aviso" NOT NULL,
	"contacto" text NOT NULL,
	"oficio" text,
	"intereses" text[] DEFAULT '{}'::text[] NOT NULL,
	"calendario" boolean DEFAULT true NOT NULL,
	"ref" text,
	"acepto_en" timestamp with time zone DEFAULT now() NOT NULL,
	"baja_en" timestamp with time zone,
	"creado_en" timestamp with time zone DEFAULT now() NOT NULL,
	"actualizado_en" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sesiones" (
	"id" text PRIMARY KEY NOT NULL,
	"usuario_id" uuid NOT NULL,
	"expira_en" timestamp with time zone NOT NULL,
	"creado_en" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "usuarios" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"nombre" text NOT NULL,
	"clave_hash" text NOT NULL,
	"rol" "rol_usuario" DEFAULT 'editor' NOT NULL,
	"activo" boolean DEFAULT true NOT NULL,
	"ultimo_acceso" timestamp with time zone,
	"creado_en" timestamp with time zone DEFAULT now() NOT NULL,
	"actualizado_en" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "publicaciones" ADD CONSTRAINT "publicaciones_canal_id_canales_id_fk" FOREIGN KEY ("canal_id") REFERENCES "public"."canales"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "publicaciones" ADD CONSTRAINT "publicaciones_produccion_id_producciones_id_fk" FOREIGN KEY ("produccion_id") REFERENCES "public"."producciones"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "publicaciones" ADD CONSTRAINT "publicaciones_autor_id_usuarios_id_fk" FOREIGN KEY ("autor_id") REFERENCES "public"."usuarios"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sesiones" ADD CONSTRAINT "sesiones_usuario_id_usuarios_id_fk" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuarios"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "funciones_fecha_idx" ON "funciones" USING btree ("inicia_en");--> statement-breakpoint
CREATE INDEX "publicaciones_listado_idx" ON "publicaciones" USING btree ("estado","publicada_en" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "publicaciones_canal_idx" ON "publicaciones" USING btree ("canal_id");--> statement-breakpoint
CREATE INDEX "publicaciones_produccion_idx" ON "publicaciones" USING btree ("produccion_id");--> statement-breakpoint
CREATE UNIQUE INDEX "registros_contacto_uq" ON "registros" USING btree ("tipo","medio","contacto");--> statement-breakpoint
CREATE INDEX "registros_creado_idx" ON "registros" USING btree ("creado_en" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "sesiones_usuario_idx" ON "sesiones" USING btree ("usuario_id");--> statement-breakpoint
CREATE UNIQUE INDEX "usuarios_email_uq" ON "usuarios" USING btree (lower("email"));