"use client";

import { useState, type FormEvent } from "react";
import { Ico } from "@/components/ui/Icons";
import { CORREO } from "@/lib/sitio";

/* Formulario de registro. Dos modos sobre el mismo envio (/api/registro):
   - "calendario": recibir el calendario de actividades por WhatsApp o correo.
   - "miembro": registrarse como parte de Fortaleza Mexicana (/registro,
     destino del QR), con el calendario incluido por defecto.
   Si el servidor no tiene destino configurado o falla, no se finge el alta:
   se ofrece mandar los mismos datos por correo. */

type Modo = "calendario" | "miembro";
type Medio = "whatsapp" | "correo";
type Estado = "listo" | "enviando" | "ok" | "error";

const INTERESES = [
  { id: "cartelera", txt: "Cartelera en Frontón México" },
  { id: "producciones", txt: "Estrenos de las propiedades" },
  { id: "experiencias", txt: "Workshops, cursos y encuentros" },
];

export function FormRegistro({ modo }: { modo: Modo }) {
  const [medio, setMedio] = useState<Medio>("whatsapp");
  const [estado, setEstado] = useState<Estado>("listo");
  const [aviso, setAviso] = useState("");
  const [respaldo, setRespaldo] = useState("");

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const datos = {
      tipo: modo,
      nombre: String(f.get("nombre") ?? "").trim(),
      medio,
      contacto: String(f.get("contacto") ?? "").trim(),
      oficio: String(f.get("oficio") ?? "").trim(),
      intereses: f.getAll("intereses").map(String),
      calendario: modo === "calendario" || f.get("calendario") === "si",
      acepta: f.get("acepta") === "si",
      empresa: String(f.get("empresa") ?? ""), // trampa para bots
      // De donde llega (?ref=qr en los codigos impresos).
      ref: new URLSearchParams(window.location.search).get("ref")?.slice(0, 40) ?? "",
    };

    if (medio === "whatsapp" && datos.contacto.replace(/\D/g, "").length < 10) {
      setEstado("error");
      setAviso("Escribe tu número de WhatsApp con lada: al menos 10 dígitos.");
      setRespaldo("");
      return;
    }

    setEstado("enviando");
    setAviso("");
    try {
      const r = await fetch("/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });
      if (r.ok) {
        setEstado("ok");
        return;
      }
      const j = await r.json().catch(() => ({}));
      if (r.status === 400 && j.mensaje) {
        setEstado("error");
        setAviso(j.mensaje);
        setRespaldo("");
        return;
      }
      throw new Error("sin destino");
    } catch {
      setEstado("error");
      setAviso("No pudimos guardar tu registro en este momento. Puedes mandárnoslo por correo con un clic:");
      setRespaldo(correoRespaldo(datos));
    }
  }

  if (estado === "ok") {
    return (
      <div className="form-ok" role="status">
        <Ico.Check />
        <div className="stack g2">
          <p className="h4">{modo === "miembro" ? "Ya estás en la lista" : "Ya estás en la lista de invitados"}</p>
          <p className="small mut">
            {modo === "miembro"
              ? "Te escribimos con las fechas en el Frontón México, los estrenos y los primeros cursos y workshops."
              : "Te vas a enterar antes que nadie de lo que viene"}
            {modo === "calendario" && (medio === "whatsapp" ? " por WhatsApp." : " por correo.")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={enviar}>
      <div className="campo">
        <label htmlFor={modo + "-nombre"}>Nombre</label>
        <input id={modo + "-nombre"} name="nombre" type="text" autoComplete="name" required maxLength={80} />
      </div>

      <fieldset className="campo">
        <legend>¿Por dónde te avisamos?</legend>
        <div className="medios">
          <label className={medio === "whatsapp" ? "on" : ""}>
            <input type="radio" name="medio" value="whatsapp" checked={medio === "whatsapp"} onChange={() => setMedio("whatsapp")} />
            <Ico.Chat /> WhatsApp
          </label>
          <label className={medio === "correo" ? "on" : ""}>
            <input type="radio" name="medio" value="correo" checked={medio === "correo"} onChange={() => setMedio("correo")} />
            <Ico.Sobre /> Correo
          </label>
        </div>
      </fieldset>

      <div className="campo">
        <label htmlFor={modo + "-contacto"}>{medio === "whatsapp" ? "Número de WhatsApp" : "Correo electrónico"}</label>
        {medio === "whatsapp" ? (
          <input key="tel" id={modo + "-contacto"} name="contacto" type="tel" inputMode="tel" autoComplete="tel"
            placeholder="55 1234 5678" required maxLength={20} />
        ) : (
          <input key="mail" id={modo + "-contacto"} name="contacto" type="email" autoComplete="email"
            placeholder="tu@correo.com" required maxLength={120} />
        )}
      </div>

      {modo === "miembro" && (
        <div className="campo">
          <label htmlFor="miembro-oficio">¿A qué te dedicas? <span className="opc">Opcional</span></label>
          <input id="miembro-oficio" name="oficio" type="text" maxLength={120} />
        </div>
      )}

      {modo === "calendario" ? (
        <fieldset className="campo">
          <legend>Me interesa</legend>
          <div className="checks">
            {INTERESES.map((i) => (
              <label key={i.id}><input type="checkbox" name="intereses" value={i.id} defaultChecked /> {i.txt}</label>
            ))}
          </div>
        </fieldset>
      ) : (
        <label className="check-suelto">
          <input type="checkbox" name="calendario" value="si" defaultChecked /> Mándame también el calendario de actividades.
        </label>
      )}

      {/* Trampa para bots: fuera de pantalla, sin tabulacion. */}
      <div className="trampa" aria-hidden="true">
        <label>Empresa <input name="empresa" type="text" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <label className="check-suelto consent">
        <input type="checkbox" name="acepta" value="si" required />
        Acepto recibir mensajes de Fortaleza Mexicana por el medio que elegí. Me puedo dar de baja cuando quiera.
      </label>

      <button className="btn btn-lg" type="submit" disabled={estado === "enviando"}>
        {estado === "enviando" ? "Enviando…" : modo === "miembro" ? "Registrarme" : "Quiero estar en la lista"} <Ico.Flecha />
      </button>

      {estado === "error" && (
        <p className="form-error" role="alert">
          {aviso}
          {respaldo && <> <a href={respaldo}>Enviar por correo</a></>}
        </p>
      )}
    </form>
  );
}

function correoRespaldo(d: {
  tipo: Modo; nombre: string; medio: Medio; contacto: string; oficio: string; intereses: string[]; calendario: boolean;
}) {
  const asunto = d.tipo === "miembro" ? "Registro · Quiero ser parte de Fortaleza Mexicana" : "Calendario · Quiero recibirlo";
  const cuerpo = [
    "Nombre: " + d.nombre,
    "Avisarme por: " + (d.medio === "whatsapp" ? "WhatsApp" : "Correo"),
    (d.medio === "whatsapp" ? "WhatsApp: " : "Correo: ") + d.contacto,
    d.oficio && "A qué me dedico: " + d.oficio,
    d.intereses.length ? "Me interesa: " + d.intereses.join(", ") : "",
    d.tipo === "miembro" ? "Calendario de actividades: " + (d.calendario ? "sí" : "no") : "",
  ].filter(Boolean).join("\n");
  return "mailto:" + CORREO + "?subject=" + encodeURIComponent(asunto) + "&body=" + encodeURIComponent(cuerpo);
}
