import { defineConfig } from "drizzle-kit";

/* drizzle-kit: `npm run db:generar` compara src/db/esquema.ts con las
   migraciones de drizzle/ y escribe la siguiente. Las migraciones se
   versionan en git y se aplican al arrancar (scripts/migrar.mjs). */
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/esquema.ts",
  out: "./drizzle",
  dbCredentials: { url: process.env.DATABASE_URL ?? "" },
  strict: true,
});
