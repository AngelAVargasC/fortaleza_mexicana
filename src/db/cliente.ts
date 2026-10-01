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
  // Durante `next build` no se toca la base: en Railway la red privada no
  // existe en el build y la conexion se quedaria colgada. Las paginas ISR se
  // arman vacias en el build y se regeneran con datos al primer acceso
  // (instrumentation.ts las calienta al arrancar).
  if (process.env.NEXT_PHASE === "phase-production-build") return false;
  return Boolean(process.env.DATABASE_URL);
}

export function db(): Db {
  if (g.__fmDb) return g.__fmDb;
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL no esta configurada");
  g.__fmPool = new Pool({
    connectionString: url,
    // 20 por instancia: con picos de registros simultaneos la fila de espera
    // del pool es la que manda (prueba de carga, DEC-033). Railway Postgres
    // acepta ~100 conexiones: 20 x replicas debe quedar por debajo.
    max: Number(process.env.DB_POOL_MAX ?? 20),
    idleTimeoutMillis: 30_000,
    // Esperar turno hasta 20 s antes de rendirse: en un pico es mejor un
    // registro lento que uno perdido. Si la base esta caida de verdad, el
    // sitio pinta sus estados vacios y el registro ofrece el correo.
    connectionTimeoutMillis: 20_000,
  });
  g.__fmDb = drizzle(g.__fmPool, { schema: esquema });
  return g.__fmDb;
}
