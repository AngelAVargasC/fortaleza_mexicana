import { notFound } from "next/navigation";
import { requerirUsuario } from "@/server/auth";
import { cambiarEstadoPublicacion } from "@/admin/acciones";
import { recurso, type Campo } from "@/admin/recursos";
import { fmtFechaHora, listar, POR_PAGINA } from "@/admin/servidor";
import { miniaturaYouTube } from "@/lib/youtube";

type Props = {
  params: Promise<{ recurso: string }>;
  searchParams: Promise<{ q?: string; pagina?: string; ok?: string }>;
};

const AVISOS: Record<string, string> = { guardado: "Guardado. Ya está en el sitio.", eliminado: "Eliminado." };

export async function generateMetadata({ params }: Props) {
  return { title: recurso((await params).recurso)?.plural ?? "Panel" };
}

function celda(c: Campo | undefined, v: unknown) {
  if (!c) return String(v ?? "");
  if (c.tipo === "booleano") return v ? "Sí" : "No";
  if (v instanceof Date) return fmtFechaHora.format(v);
  if (c.tipo === "seleccion") return c.opciones?.find((o) => o.valor === v)?.etiqueta ?? String(v);
  if (v === null || v === undefined || v === "") return "—";
  return String(v).replace(/\n/g, " ");
}

export default async function Page({ params, searchParams }: Props) {
  await requerirUsuario();
  const { recurso: clave } = await params;
  const r = recurso(clave);
  if (!r) notFound();
  const { q = "", pagina: p = "1", ok } = await searchParams;
  const pagina = Math.max(1, Number.parseInt(p, 10) || 1);
  const { filas, total } = await listar(clave, r, q.trim().slice(0, 100), pagina);
  const paginas = Math.max(1, Math.ceil(total / POR_PAGINA));
  const campo = (n: string) => r.campos.find((c) => c.nombre === n);
  const url = (n: number) => "/admin/" + clave + "?" + new URLSearchParams({ ...(q ? { q } : {}), pagina: String(n) });

  return (
    <>
      <header className="adm-cab">
        <div>
          <h1 className="adm-h1">{r.plural}</h1>
          <p className="adm-sub">{r.descripcion}</p>
        </div>
        <a className="btn" href={"/admin/" + clave + "/nuevo"}>{r.nuevo}</a>
      </header>
      {ok && AVISOS[ok] && <p className="adm-aviso" role="status">{AVISOS[ok]}</p>}

      <form className="adm-buscar" role="search">
        <input name="q" type="search" defaultValue={q} placeholder={"Buscar en " + r.plural.toLowerCase()} aria-label="Buscar" />
        <button className="btn btn-borde" type="submit">Buscar</button>
        {q && <a href={"/admin/" + clave}>Limpiar</a>}
      </form>

      {filas.length === 0 ? (
        <p className="adm-vacio">{q ? "Nada coincide con «" + q + "»." : "Todavía no hay nada aquí."}</p>
      ) : (
        <div className="adm-tabla-caja"><table className="adm-tabla">
          <thead>
            <tr>
              {r.columnas.map((n) => <th key={n}>{campo(n)?.etiqueta ?? n}</th>)}
              <th><span className="sr-only">Acciones</span></th>
            </tr>
          </thead>
          <tbody>
            {filas.map((f) => {
              const id = String(f.id);
              const ver = r.enSitio(f);
              return (
                <tr key={id}>
                  {r.columnas.map((n, i) => (
                    <td key={n}>
                      {i === 0 ? (
                        <a className="adm-fila-tit" href={"/admin/" + clave + "/" + id}>
                          {clave === "publicaciones" && (
                            f.portadaUrl || f.youtubeId
                              ? <img src={String(f.portadaUrl || miniaturaYouTube(String(f.youtubeId)))} alt="" />
                              : <span className="adm-mini-vacia" />
                          )}
                          <span>{celda(campo(n), f[n])}</span>
                        </a>
                      ) : n === "estado" && clave === "publicaciones" ? (
                        <span className={"adm-pildora adm-" + String(f.estado)}>{celda(campo(n), f[n])}</span>
                      ) : celda(campo(n), f[n])}
                    </td>
                  ))}
                  <td className="adm-acciones">
                    {clave === "publicaciones" && (
                      <form action={cambiarEstadoPublicacion.bind(null, id, f.estado === "publicado" ? "borrador" : "publicado")}>
                        <button type="submit">{f.estado === "publicado" ? "Despublicar" : "Publicar"}</button>
                      </form>
                    )}
                    {ver && <a href={ver} target="_blank" rel="noopener">Ver</a>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table></div>
      )}

      {paginas > 1 && (
        <nav className="adm-paginas" aria-label="Páginas">
          {pagina > 1 && <a href={url(pagina - 1)}>← Anterior</a>}
          <span>Página {pagina} de {paginas} · {total} en total</span>
          {pagina < paginas && <a href={url(pagina + 1)}>Siguiente →</a>}
        </nav>
      )}
    </>
  );
}
