"use client";

import { useState, type FormEvent } from "react";
import { Ico } from "@/components/ui/Icons";
import { CORREO } from "@/lib/sitio";

/* Captura corta: solo correo, para "avisame de cursos, workshops y eventos".
   Va al mismo /api/registro (tipo calendario, interes "experiencias"); si el
   correo ya estaba registrado, suma el interes sin borrar nada. Como el
   formulario largo, nunca confirma un alta que no quedo guardada. */
export function FormCorreo({ interes = "experiencias" }: { interes?: string }) {
  const [estado, setEstado] = useState<"listo" | "enviando" | "ok" | "error">("listo");
  const [aviso, setAviso] = useState("");

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const correo = String(f.get("correo") ?? "").trim();
    setEstado("enviando");
    try {
      const r = await fetch("/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo: "calendario", medio: "correo", contacto: correo, nombre: "",
          intereses: [interes], acepta: f.get("acepta") === "si",
          empresa: String(f.get("empresa") ?? ""),
          ref: new URLSearchParams(window.location.search).get("ref")?.slice(0, 40) ?? "",
        }),
      });
      if (r.ok) { setEstado("ok"); return; }
      const j = await r.json().catch(() => ({}));
      setEstado("error");
      setAviso(r.status === 400 && j.mensaje ? j.mensaje
        : "No pudimos guardarlo en este momento. Escríbenos a " + CORREO + ".");
    } catch {
      setEstado("error");
      setAviso("No pudimos guardarlo en este momento. Escríbenos a " + CORREO + ".");
    }
  }

  if (estado === "ok") {
    return (
      <div className="form-ok" role="status">
        <Ico.Check />
        <div className="stack g2">
          <p className="h4">Listo, te avisamos</p>
          <p className="small mut">Te escribimos en cuanto abran los primeros cursos, workshops y eventos.</p>
        </div>
      </div>
    );
  }

  return (
    <form className="form form-correo" onSubmit={enviar}>
      <div className="form-correo-fila">
        <label className="sr-only" htmlFor="correo-aviso">Correo electrónico</label>
        <input id="correo-aviso" name="correo" type="email" autoComplete="email" required maxLength={120}
          placeholder="tu@correo.com" />
        <button className="btn btn-lg" type="submit" disabled={estado === "enviando"}>
          {estado === "enviando" ? "Enviando…" : "Avísame"} <Ico.Flecha />
        </button>
      </div>
      <div className="trampa" aria-hidden="true">
        <label>Empresa <input name="empresa" type="text" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <label className="check-suelto consent">
        <input type="checkbox" name="acepta" value="si" required />
        Acepto recibir correos de Fortaleza Mexicana. Me puedo dar de baja cuando quiera.
      </label>
      {estado === "error" && <p className="form-error" role="alert">{aviso}</p>}
    </form>
  );
}
