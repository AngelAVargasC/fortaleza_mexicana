ALTER TABLE "aliados" ADD COLUMN "imagen_url" text;--> statement-breakpoint
ALTER TABLE "aliados" ADD COLUMN "imagen_alt" text DEFAULT '' NOT NULL;