import { count, desc } from "drizzle-orm";
import { db } from "@/db/cliente";
import { registros } from "@/db/esquema";
import { requerirUsuario } from "@/server/auth";
import { cambiarBaja } from "@/admin/acciones";
import { filtroRegistros, fmtFechaHora, POR_PAGINA, type Filtros } from "@/admin/servidor";

export const metadata = { title: "Registros" };

const AVISOS: Record<string, string> = { baja: "Dado de baja: ya no recibe avisos.", alta: "Reactivado." };

export default async function Page({ searchParams }: { searchParams: Promise<Filtros> }) {
  await requerirUsuario();
  const f = await searchParams;
  const pagina = Math.max(1, Number.parseInt(f.pagina ?? "1", 10) || 1);
  const donde = filtroRegistros(f);
  const [filas, [{ total }]] = await Promise.all([
    db().select().from(registros).where(donde).orderBy(desc(registros.creadoEn))
      .limit(POR_PAGINA).offset((pagina - 1) * POR_PAGINA),
    db().select({ total: count() }).from(registros).where(donde),
  ]);
  const paginas = Math.max(1, Math.ceil(total / POR_PAGINA));
  const params = (extra: Record<string, string>) => new URLSearchParams(
    Object.fromEntries(Object.entries({ tipo: f.tipo, medio: f.medio, estado: f.estado, q: f.q, ...extra })
      .filter((e): e is [string, string] => Boolean(e[1]))));

  return (
    <>
      <header className="adm-cab">
        <div>
          <h1 className="adm-h1">Registros</h1>
          <p className="adm-sub">Calendario de actividades y miembros. Exporta la lista de WhatsApp para tu lista de difusión.</p>
        </div>
        <a className="btn" href={"/admin/registros/exportar?" + params({})}>Exportar CSV</a>
      </header>
      {f.ok && AVISOS[f.ok] && <p className="adm-aviso" role="status">{AVISOS[f.ok]}</p>}

      <form className="adm-buscar" role="search">
        <select name="tipo" defaultValue={f.tipo ?? ""} aria-label="Tipo">
          <option value="">Todos los tipos</option><option value="calendario">Calendario</option><option value="miembro">Miembros</option>
        </select>
        <select name="medio" defaultValue={f.medio ?? ""} aria-label="Medio">
          <option value="">WhatsApp y correo</option><option value="whatsapp">WhatsApp</option><option value="correo">Correo</option>
        </select>
        <select name="estado" defaultValue={f.estado ?? ""} aria-label="Estado">
          <option value="">Activos</option><option value="baja">De baja</option><option value="todos">Todos</option>
        </select>
        <input name="q" type="search" defaultValue={f.q ?? ""} placeholder="Nombre o contacto" aria-label="Buscar" />
        <button className="btn btn-borde" type="submit">Filtrar</button>
      </form>

      <p className="adm-sub">{total} {total === 1 ? "registro" : "registros"}</p>
      {filas.length === 0 ? (
        <p className="adm-vacio">No hay registros con estos filtros.</p>
      ) : (
        <div className="adm-tabla-caja"><table className="adm-tabla">
          <thead><tr><th>Nombre</th><th>Tipo</th><th>Contacto</th><th>Intereses</th><th>Origen</th><th>Fecha</th><th><span className="sr-only">Acciones</span></th></tr></thead>
          <tbody>
            {filas.map((r) => (
              <tr key={r.id} className={r.bajaEn ? "adm-de-baja" : undefined}>
                <td>{r.nombre}{r.oficio && <small className="adm-bajo">{r.oficio}</small>}</td>
                <td>{r.tipo === "miembro" ? "Miembro" : "Calendario"}{r.tipo === "miembro" && r.calendario && <small className="adm-bajo">+ calendario</small>}</td>
                <td>
                  {r.medio === "whatsapp"
                    ? <a href={"https://wa.me/" + r.contacto.replace(/\D/g, "")} target="_blank" rel="noopener">WhatsApp {r.contacto}</a>
                    : <a href={"mailto:" + r.contacto}>{r.contacto}</a>}
                </td>
                <td>{r.intereses.join(", ") || "—"}</td>
                <td>{r.ref ?? "sitio"}</td>
                <td>{fmtFechaHora.format(r.creadoEn)}</td>
                <td className="adm-acciones">
                  <form action={cambiarBaja.bind(null, r.id, !r.bajaEn)}>
                    <button type="submit">{r.bajaEn ? "Reactivar" : "Dar de baja"}</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table></div>
      )}

      {paginas > 1 && (
        <nav className="adm-paginas" aria-label="Páginas">
          {pagina > 1 && <a href={"/admin/registros?" + params({ pagina: String(pagina - 1) })}>← Anterior</a>}
          <span>Página {pagina} de {paginas}</span>
          {pagina < paginas && <a href={"/admin/registros?" + params({ pagina: String(pagina + 1) })}>Siguiente →</a>}
        </nav>
      )}
    </>
  );
}
