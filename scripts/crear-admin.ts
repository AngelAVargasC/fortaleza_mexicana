/* Crea (o restablece) una cuenta del panel desde la terminal.
   Uso:  npm run admin:crear -- correo@dominio.mx "Nombre" "contrasena" [admin|editor]
   En Railway: `railway run npm run admin:crear -- ...` con la base de produccion.
   Si el correo ya existe, cambia su contrasena y la reactiva. */
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { usuarios } from "../src/db/esquema";
import { CLAVE_MINIMA, cifrarClave } from "../src/server/clave";

async function main() {
  const [email, nombre, clave, rol = "admin"] = process.argv.slice(2);
  if (!email || !nombre || !clave) {
    console.error('Uso: npm run admin:crear -- correo@dominio.mx "Nombre" "contrasena" [admin|editor]');
    process.exit(1);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Correo no valido.");
  if (clave.length < CLAVE_MINIMA) throw new Error("La contrasena necesita al menos " + CLAVE_MINIMA + " caracteres.");
  if (rol !== "admin" && rol !== "editor") throw new Error("Rol: admin o editor.");
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL no esta configurada.");

  const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 1 });
  const db = drizzle(pool);
  const claveHash = await cifrarClave(clave);
  const [existe] = await db.select({ id: usuarios.id }).from(usuarios)
    .where(sql`lower(${usuarios.email}) = ${email.toLowerCase()}`).limit(1);
  if (existe) {
    await db.update(usuarios).set({ nombre, claveHash, rol, activo: true }).where(sql`${usuarios.id} = ${existe.id}`);
    console.log(`[admin] actualizado: ${email.toLowerCase()} (${rol}).`);
  } else {
    await db.insert(usuarios).values({ email: email.toLowerCase(), nombre, claveHash, rol });
    console.log(`[admin] creado: ${email.toLowerCase()} (${rol}).`);
  }
  await pool.end();
}

main().catch((e) => {
  console.error("[admin]", e.message ?? e);
  process.exit(1);
});
