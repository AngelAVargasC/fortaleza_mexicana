import { notFound } from "next/navigation";
import { requerirUsuario } from "@/server/auth";
import { eliminar, guardar } from "@/admin/acciones";
import { recurso } from "@/admin/recursos";
import { aFormulario, obtener, opcionesRelacion } from "@/admin/servidor";
import { FormularioRecurso } from "@/admin/ui/FormularioRecurso";

type Props = { params: Promise<{ recurso: string; id: string }> };

export async function generateMetadata({ params }: Props) {
  const { recurso: clave, id } = await params;
  const r = recurso(clave);
  return { title: r ? (id === "nuevo" ? r.nuevo : "Editar " + r.singular) : "Panel" };
}

export default async function Page({ params }: Props) {
  await requerirUsuario();
  const { recurso: clave, id } = await params;
  const r = recurso(clave);
  if (!r) notFound();
  const nuevo = id === "nuevo";
  const fila = nuevo ? null : await obtener(clave, id);
  if (!nuevo && !fila) notFound();
  const necesitaOpciones = r.campos.some((c) => c.tipo === "relacion");
  const opciones = necesitaOpciones ? await opcionesRelacion() : { canales: [], producciones: [] };
  const ver = fila ? r.enSitio(fila) : null;

  return (
    <>
      <header className="adm-cab">
        <div>
          <a className="adm-volver" href={"/admin/" + clave}>← {r.plural}</a>
          <h1 className="adm-h1">{nuevo ? r.nuevo : String(fila?.titulo ?? fila?.nombre ?? "Editar")}</h1>
        </div>
        {ver && <a className="btn btn-borde" href={ver} target="_blank" rel="noopener">Ver en el sitio</a>}
      </header>
      <FormularioRecurso
        campos={r.campos}
        valores={aFormulario(r, fila)}
        opciones={opciones}
        accion={guardar.bind(null, clave, nuevo ? null : id)}
        eliminar={nuevo ? undefined : eliminar.bind(null, clave, id)}
        singular={r.singular}
      />
    </>
  );
}
