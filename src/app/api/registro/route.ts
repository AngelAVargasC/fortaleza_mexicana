/* Registro de suscripciones (calendario) y de miembros. El sitio no guarda
   datos: valida y reenvia el registro a REGISTRO_WEBHOOK_URL (una hoja de
   Google via Apps Script, Make, Zapier... ver web/README.md). Sin esa
   variable responde 503 y el formulario ofrece el envio por correo: nunca
   se confirma un alta que no quedo guardada. */

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

  const registro = {
    fecha: new Date().toISOString(),
    tipo,
    nombre,
    medio,
    contacto,
    oficio: texto(d.oficio, 120),
    intereses: intereses.join(", "),
    calendario: tipo === "calendario" || d.calendario === true ? "si" : "no",
    ref: texto(d.ref, 40),
  };

  const destino = process.env.REGISTRO_WEBHOOK_URL;
  if (!destino) {
    console.error("[registro] REGISTRO_WEBHOOK_URL no esta configurada; registro no guardado");
    return error("Registro no disponible.", 503);
  }

  try {
    const r = await fetch(destino, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...registro, clave: process.env.REGISTRO_WEBHOOK_CLAVE ?? "" }),
    });
    if (!r.ok) throw new Error("webhook " + r.status);
  } catch (e) {
    console.error("[registro] fallo el envio al webhook:", e);
    return error("Registro no disponible.", 502);
  }

  return Response.json({ ok: true });
}
