"use client";

import { useActionState } from "react";
import { crearUsuario, type EstadoFormulario } from "@/admin/acciones";

export function FormUsuario() {
  const [estado, accion, enviando] = useActionState<EstadoFormulario, FormData>(crearUsuario, {});
  const e = estado.errores ?? {};
  return (
    <form action={accion} className="adm-form adm-rejilla">
      <label className={"adm-campo" + (e.nombre ? " con-error" : "")}>
        <span>Nombre</span><input name="nombre" required />
        {e.nombre && <small className="adm-error">{e.nombre}</small>}
      </label>
      <label className={"adm-campo" + (e.email ? " con-error" : "")}>
        <span>Correo</span><input name="email" type="email" required autoComplete="off" />
        {e.email && <small className="adm-error">{e.email}</small>}
      </label>
      <label className={"adm-campo" + (e.clave ? " con-error" : "")}>
        <span>Contraseña inicial</span><input name="clave" type="text" required minLength={10} autoComplete="new-password" />
        {e.clave ? <small className="adm-error">{e.clave}</small> : <small>Al menos 10 caracteres.</small>}
      </label>
      <label className="adm-campo">
        <span>Rol</span>
        <select name="rol" defaultValue="editor"><option value="editor">Edición</option><option value="admin">Administración</option></select>
      </label>
      {estado.mensaje && <p className="adm-error adm-ancho" role="alert">{estado.mensaje}</p>}
      <div className="adm-barra-guardar adm-ancho">
        <button className="btn" type="submit" disabled={enviando}>{enviando ? "Creando…" : "Crear cuenta"}</button>
      </div>
    </form>
  );
}
