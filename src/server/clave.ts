import { randomBytes, scrypt as _scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

/* Contrasenas con scrypt (node:crypto, sin dependencias). Formato guardado:
   "scrypt$<sal hex>$<hash hex>". Sin "server-only" a proposito: lo usa
   tambien scripts/crear-admin.ts, fuera de Next. */

const scrypt = promisify(_scrypt) as (clave: string, sal: Buffer, largo: number) => Promise<Buffer>;
const LARGO = 64;

export const CLAVE_MINIMA = 10;

export async function cifrarClave(clave: string) {
  const sal = randomBytes(16);
  const hash = await scrypt(clave.normalize("NFKC"), sal, LARGO);
  return "scrypt$" + sal.toString("hex") + "$" + hash.toString("hex");
}

export async function verificarClave(clave: string, guardado: string) {
  const [alg, salHex, hashHex] = guardado.split("$");
  if (alg !== "scrypt" || !salHex || !hashHex) return false;
  const esperado = Buffer.from(hashHex, "hex");
  const hash = await scrypt(clave.normalize("NFKC"), Buffer.from(salHex, "hex"), esperado.length);
  return hash.length === esperado.length && timingSafeEqual(hash, esperado);
}
