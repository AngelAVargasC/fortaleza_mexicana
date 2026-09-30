"use client";

import { useActionState, useRef, useState } from "react";
import type { EstadoFormulario } from "@/admin/acciones";
import type { Campo } from "@/admin/recursos";
import { CampoYouTube } from "./CampoYouTube";

/* Formulario generico: pinta los campos de src/admin/recursos.ts. Guarda
   con la Server Action que le pasan (ya atada a recurso e id). El slug se
   escribe solo a partir del titulo mientras nadie lo toque a mano. */

type Opciones = Record<"canales" | "producciones", { valor: string; etiqueta: string }[]>;

function slugDe(texto: string) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}

export function FormularioRecurso({
  campos, valores, opciones, accion, eliminar, singular,
}: {
  campos: Campo[];
  valores: Record<string, string | boolean>;
  opciones: Opciones;
  accion: (estado: EstadoFormulario, f: FormData) => Promise<EstadoFormulario>;
  eliminar?: () => Promise<void>;
  singular: string;
}) {
  const [estado, enviar, enviando] = useActionState(accion, {});
  const form = useRef<HTMLFormElement>(null);
  const campoSlug = campos.find((c) => c.tipo === "slug");
  const [slugTocado, setSlugTocado] = useState(Boolean(valores[campoSlug?.nombre ?? ""]));
  const [imagenes, setImagenes] = useState<Record<string, string>>(() =>
    Object.fromEntries(campos.filter((c) => c.tipo === "imagen").map((c) => [c.nombre, String(valores[c.nombre] ?? "")])));
  const err = estado.errores ?? {};
  const actuales = estado.valores ?? valores;

  function alEscribirOrigen(v: string) {
    if (!campoSlug || slugTocado || !form.current) return;
    const input = form.current.elements.namedItem(campoSlug.nombre) as HTMLInputElement | null;
    if (input) input.value = slugDe(v);
  }

  /** Desde la vista previa de YouTube: llena el titulo si esta vacio. */
  function usarTitulo(titulo: string) {
    const input = form.current?.elements.namedItem("titulo") as HTMLInputElement | null;
    if (!input) return;
    input.value = titulo;
    alEscribirOrigen(titulo);
    input.focus();
  }

  return (
    <form ref={form} action={enviar} className="adm-form adm-rejilla">
      {estado.mensaje && <p className="adm-aviso adm-aviso-error adm-ancho" role="alert">{estado.mensaje}</p>}

      {campos.map((c) => {
        const id = "c-" + c.nombre;
        const v = actuales[c.nombre];
        const clase = "adm-campo" + (c.ancho ? " adm-ancho" : "") + (err[c.nombre] ? " con-error" : "");
        const ayuda = err[c.nombre]
          ? <small className="adm-error" id={id + "-e"}>{err[c.nombre]}</small>
          : c.ayuda && <small id={id + "-e"}>{c.ayuda}</small>;
        const comun = { id, name: c.nombre, "aria-describedby": id + "-e", "aria-invalid": Boolean(err[c.nombre]) || undefined };

        if (c.tipo === "booleano") {
          return (
            <label className={"adm-check" + (c.ancho ? " adm-ancho" : "")} key={c.nombre}>
              <input type="checkbox" {...comun} defaultChecked={Boolean(v)} /> {c.etiqueta}
            </label>
          );
        }
        if (c.tipo === "youtube") {
          return (
            <div className={clase} key={c.nombre}>
              <label htmlFor={id}>{c.etiqueta}</label>
              <CampoYouTube {...comun} valorInicial={String(v ?? "")} alTitulo={usarTitulo} />
              {ayuda}
            </div>
          );
        }

        let control;
        switch (c.tipo) {
          case "textoLargo":
            control = <textarea {...comun} rows={c.filas ?? 4} defaultValue={String(v ?? "")} required={c.requerido}
              onChange={c.nombre === campoSlug?.desde ? (e) => alEscribirOrigen(e.target.value) : undefined} />;
            break;
          case "seleccion":
            control = (
              <select {...comun} defaultValue={String(v ?? "")}>
                {c.opciones?.map((o) => <option key={o.valor} value={o.valor}>{o.etiqueta}</option>)}
              </select>
            );
            break;
          case "relacion":
            control = (
              <select {...comun} defaultValue={String(v ?? "")}>
                <option value="">— Ninguno —</option>
                {opciones[c.recurso!]?.map((o) => <option key={o.valor} value={o.valor}>{o.etiqueta}</option>)}
              </select>
            );
            break;
          case "fechaHora":
            control = <input {...comun} type="datetime-local" defaultValue={String(v ?? "")} required={c.requerido} />;
            break;
          case "numero":
            control = <input {...comun} type="number" step={1} defaultValue={String(v ?? "0")} />;
            break;
          case "url":
            control = <input {...comun} type="url" inputMode="url" placeholder="https://" defaultValue={String(v ?? "")} required={c.requerido} />;
            break;
          case "slug":
            control = <input {...comun} type="text" defaultValue={String(v ?? "")} pattern="[a-z0-9\-]*"
              onChange={() => setSlugTocado(true)} placeholder="se-genera-solo" />;
            break;
          case "imagen":
            control = (
              <div className="adm-imagen">
                <input {...comun} type="text" defaultValue={String(v ?? "")} required={c.requerido} placeholder="/img/… o https://…"
                  onChange={(e) => setImagenes((m) => ({ ...m, [c.nombre]: e.target.value.trim() }))} />
                {imagenes[c.nombre] && <img src={imagenes[c.nombre]} alt="" />}
              </div>
            );
            break;
          default:
            control = <input {...comun} type="text" defaultValue={String(v ?? "")} required={c.requerido}
              onChange={c.nombre === campoSlug?.desde ? (e) => alEscribirOrigen(e.target.value) : undefined} />;
        }
        return (
          <div className={clase} key={c.nombre}>
            <label htmlFor={id}>{c.etiqueta}{c.requerido && <span aria-hidden="true"> *</span>}</label>
            {control}
            {ayuda}
          </div>
        );
      })}

      <div className="adm-barra-guardar adm-ancho">
        <button className="btn" type="submit" disabled={enviando}>{enviando ? "Guardando…" : "Guardar"}</button>
        {eliminar && (
          <button className="adm-borrar" type="submit" formAction={eliminar} formNoValidate
            onClick={(e) => { if (!window.confirm("¿Eliminar esta " + singular + "? No se puede deshacer.")) e.preventDefault(); }}>
            Eliminar
          </button>
        )}
      </div>
    </form>
  );
}
