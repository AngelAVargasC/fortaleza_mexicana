import type { ReactNode } from "react";
import { Ico } from "@/components/ui/Icons";
import { FormRegistro } from "@/components/cliente/FormRegistro";

/* Bloque de registro: texto a la izquierda, formulario a la derecha. El
   mismo para suscribirse al calendario (home, cartelera) y para registrarse
   como parte de Fortaleza Mexicana (membresia, /registro). */
export function Registro({
  modo, id, eyebrow, titulo, texto, h1 = false,
}: {
  modo: "calendario" | "miembro";
  id?: string;
  eyebrow: string;
  titulo: ReactNode;
  texto: string;
  /** En /registro el bloque es la pagina entera: su titulo es el h1. */
  h1?: boolean;
}) {
  const Titulo = h1 ? "h1" : "h2";
  return (
    <div className="registro rv" id={id}>
      <div className="stack g5">
        <span className="eyebrow e-coral">{eyebrow}</span>
        <Titulo className="h2">{titulo}</Titulo>
        <p className="lead" style={{ maxWidth: "46ch" }}>{texto}</p>
        <ul className="registro-lista">
          <li><Ico.Chat /> Por WhatsApp o por correo, tú eliges.</li>
          <li><Ico.Cal /> Solo cuando hay algo nuevo en el calendario.</li>
          <li><Ico.Check /> Te das de baja cuando quieras.</li>
        </ul>
      </div>
      <FormRegistro modo={modo} />
    </div>
  );
}
