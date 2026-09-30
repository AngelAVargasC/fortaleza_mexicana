import { sql } from "drizzle-orm";
import { db, hayBase } from "@/db/cliente";
import { registros } from "@/db/esquema";

/* Registro de suscripciones (calendario) y de miembros, en PostgreSQL
   (DEC-030; antes iba a un webhook, DEC-029). Registrarse otra vez con el
   mismo contacto actualiza la fila y la reactiva si se habia dado de baja.
   Si la base no responde, 503: el formulario ofrece el envio por correo y
   nunca se confirma un alta que no quedo guardada. */

const MEDIOS = ["whatsapp", "correo"];
const TIPOS = ["calendario", "miembro"];
const INTERESES = ["cartelera", "producciones", "experiencias"];

function texto(v: unknown, max: number) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function error(mensaje: string, status = 400) {
  return Response.json({ ok: false, mensaje }, { status });
}

export async function POST(req: Request) {
  let d: Record<string, unknown>;
  try {
    d = await req.json();
  } catch {
    return error("Datos ilegibles.");
  }

  // Trampa para bots: se responde como si nada para no darles pistas.
  if (texto(d.empresa, 200)) return Response.json({ ok: true });

  const tipo = texto(d.tipo, 20);
  const medio = texto(d.medio, 20);
  const nombre = texto(d.nombre, 80);
  let contacto = texto(d.contacto, 120);

  if (!TIPOS.includes(tipo) || !MEDIOS.includes(medio)) return error("Datos incompletos.");
  if (!nombre) return error("Escribe tu nombre.");
  if (d.acepta !== true) return error("Necesitamos tu permiso para escribirte.");

  if (medio === "whatsapp") {
    const digitos = contacto.replace(/\D/g, "");
    if (digitos.length < 10 || digitos.length > 15) return error("Escribe tu número de WhatsApp con lada: al menos 10 dígitos.");
    // 10 digitos = numero mexicano sin lada de pais: se guarda listo para WhatsApp.
    contacto = "+" + (digitos.length === 10 ? "52" + digitos : digitos);
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contacto)) {
    return error("Revisa tu correo electrónico.");
  }

  const intereses = Array.isArray(d.intereses)
    ? d.intereses.filter((i): i is string => typeof i === "string" && INTERESES.includes(i))
    : [];

  const fila = {
    tipo: tipo as "calendario" | "miembro",
    nombre,
    medio: medio as "whatsapp" | "correo",
    contacto: medio === "correo" ? contacto.toLowerCase() : contacto,
    oficio: texto(d.oficio, 120) || null,
    intereses,
    calendario: tipo === "calendario" || d.calendario === true,
    ref: texto(d.ref, 40) || null,
  };

  if (!hayBase()) {
    console.error("[registro] DATABASE_URL no esta configurada; registro no guardado");
    return error("Registro no disponible.", 503);
  }

  try {
    await db().insert(registros).values(fila).onConflictDoUpdate({
      target: [registros.tipo, registros.medio, registros.contacto],
      set: {
        nombre: fila.nombre, oficio: fila.oficio, intereses: fila.intereses, calendario: fila.calendario,
        ref: sql`coalesce(${registros.ref}, excluded.ref)`, aceptoEn: new Date(), bajaEn: null,
      },
    });
  } catch (e) {
    console.error("[registro] no se pudo guardar:", e);
    return error("Registro no disponible.", 503);
  }

  return Response.json({ ok: true });
}
