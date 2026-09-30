"use client";

import { useActionState } from "react";
import { entrar, type EstadoFormulario } from "@/admin/acciones";

export function FormEntrar() {
  const [estado, accion, enviando] = useActionState<EstadoFormulario, FormData>(entrar, {});
  return (
    <form action={accion} className="adm-form">
      <label className="adm-campo">
        <span>Correo</span>
        <input name="email" type="email" autoComplete="username" required autoFocus
          defaultValue={String(estado.valores?.email ?? "")} />
      </label>
      <label className="adm-campo">
        <span>Contraseña</span>
        <input name="clave" type="password" autoComplete="current-password" required />
      </label>
      {estado.mensaje && <p className="adm-error" role="alert">{estado.mensaje}</p>}
      <button className="btn" type="submit" disabled={enviando}>{enviando ? "Entrando…" : "Entrar"}</button>
    </form>
  );
}
