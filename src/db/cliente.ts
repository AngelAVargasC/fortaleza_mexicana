import "server-only";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as esquema from "./esquema";

/* Un solo pool por proceso. En desarrollo Next recarga modulos: el pool se
   cuelga de globalThis para no abrir conexiones nuevas en cada cambio.
   El pool se crea al primer uso, no al importar: `next build` no necesita
   base de datos. */

type Db = NodePgDatabase<typeof esquema>;
const g = globalThis as unknown as { __fmPool?: Pool; __fmDb?: Db };

export function hayBase() {
  return Boolean(process.env.DATABASE_URL);
}

export function db(): Db {
  if (g.__fmDb) return g.__fmDb;
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL no esta configurada");
  g.__fmPool = new Pool({
    connectionString: url,
    max: Number(process.env.DB_POOL_MAX ?? 10),
    idleTimeoutMillis: 30_000,
  });
  g.__fmDb = drizzle(g.__fmPool, { schema: esquema });
  return g.__fmDb;
}
