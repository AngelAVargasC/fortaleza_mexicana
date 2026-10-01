ALTER TABLE "producciones" ADD COLUMN "lema" text;--> statement-breakpoint
-- Lemas de las propiedades (2026-10-01). Solo si siguen vacios: no pisa lo editado en /admin.
UPDATE "producciones" SET "lema" = 'México, conversado sin prisa' WHERE "slug" = 'podcast' AND "lema" IS NULL;--> statement-breakpoint
UPDATE "producciones" SET "lema" = 'La historia toma la palabra' WHERE "slug" = 'conversarian' AND "lema" IS NULL;--> statement-breakpoint
UPDATE "producciones" SET "lema" = 'Empezar con poco, llegar lejos' WHERE "slug" = 'pequeno-a-gigante' AND "lema" IS NULL;--> statement-breakpoint
UPDATE "producciones" SET "lema" = 'Alguien que apueste por ti' WHERE "slug" = 'creo-en-ti' AND "lema" IS NULL;--> statement-breakpoint
-- Conversarian: descripcion con gancho, solo si sigue la de la migracion 0002.
UPDATE "producciones" SET "descripcion" = 'Los personajes que hicieron México regresan a opinar sobre lo que vivimos hoy. Animados con inteligencia artificial, ponen a la historia frente al presente.'
  WHERE "slug" = 'conversarian' AND "descripcion" = 'Personajes históricos, animados con inteligencia artificial, conversan sobre los temas de hoy.';
