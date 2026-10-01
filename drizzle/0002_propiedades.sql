ALTER TABLE "producciones" ADD COLUMN "logo_url" text;--> statement-breakpoint
-- Nombres oficiales de las propiedades (cliente, 2026-10-01). Solo toca las filas
-- de la semilla original (por su slug viejo): lo creado en /admin no se altera.
UPDATE "producciones" SET "titulo" = 'Podcast Fortaleza Mexicana' WHERE "slug" = 'podcast';--> statement-breakpoint
UPDATE "producciones" SET "slug" = 'conversarian', "titulo" = 'Conversarian',
  "descripcion" = 'Personajes históricos, animados con inteligencia artificial, conversan sobre los temas de hoy.'
  WHERE "slug" = 'animacion';--> statement-breakpoint
UPDATE "producciones" SET "slug" = 'pequeno-a-gigante', "titulo" = 'PequeñoAGigante' WHERE "slug" = 'de-pequeno-a-gigante';--> statement-breakpoint
UPDATE "producciones" SET "titulo" = 'CreoEnTi' WHERE "slug" = 'creo-en-ti';
