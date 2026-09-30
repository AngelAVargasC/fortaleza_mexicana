/* Aplica las migraciones pendientes de drizzle/ antes de arrancar
   (`npm start`). Idempotente: drizzle anota las aplicadas en
   drizzle.__drizzle_migrations. Sin DATABASE_URL avisa y deja arrancar:
   el sitio muestra sus estados vacios en vez de caerse. */
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import pg from "pg";

const url = process.env.DATABASE_URL;
if (!url) {
  console.warn("[migrar] DATABASE_URL no esta configurada: se omiten las migraciones.");
  process.exit(0);
}

const pool = new pg.Pool({ connectionString: url, max: 1 });
try {
  await migrate(drizzle(pool), { migrationsFolder: "./drizzle" });
  console.log("[migrar] base de datos al dia.");
} catch (e) {
  console.error("[migrar] fallo la migracion:", e);
  process.exit(1);
} finally {
  await pool.end();
}
