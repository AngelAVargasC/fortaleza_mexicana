import { and, count, desc, gte, isNull, sql } from "drizzle-orm";
import { db } from "@/db/cliente";
import { registros } from "@/db/esquema";
import { requerirUsuario } from "@/server/auth";
import { MENU, RECURSOS } from "@/admin/recursos";
import { contar, fmtFechaHora } from "@/admin/servidor";

export const metadata = { title: "Tablero" };

export default async function Page({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const u = await requerirUsuario();
  const { error } = await searchParams;
  const [totales, [{ activos }], [{ semana }], ultimos] = await Promise.all([
    contar(),
    db().select({ activos: count() }).from(registros).where(isNull(registros.bajaEn)),
    db().select({ semana: count() }).from(registros).where(and(isNull(registros.bajaEn), gte(registros.creadoEn, sql`now() - interval '7 days'`))),
    db().select().from(registros).orderBy(desc(registros.creadoEn)).limit(6),
  ]);

  return (
    <>
      <header className="adm-cab">
        <div>
          <h1 className="adm-h1">Hola, {u.nombre.split(" ")[0]}.</h1>
          <p className="adm-sub">Lo que se guarda aquí sale en el sitio al momento.</p>
        </div>
        <a className="btn" href="/admin/publicaciones/nuevo">Nueva publicación</a>
      </header>
      {error === "permiso" && <p className="adm-aviso adm-aviso-error">Esa sección es solo para administración.</p>}

      <section className="adm-cifras">
        <a className="adm-cifra" href="/admin/registros">
          <b>{activos}</b><span>Registros activos</span><small>{semana} en los últimos 7 días</small>
        </a>
        <a className="adm-cifra" href="/admin/publicaciones">
          <b>{totales.publicaciones}</b><span>Publicaciones</span><small>{totales.borradores} en borrador</small>
        </a>
        {MENU.filter((k) => k !== "publicaciones").map((k) => (
          <a className="adm-cifra" href={"/admin/" + k} key={k}><b>{totales[k]}</b><span>{RECURSOS[k].plural}</span></a>
        ))}
      </section>

      <section className="adm-bloque">
        <div className="adm-bloque-cab">
          <h2 className="adm-h2">Últimos registros</h2>
          <a href="/admin/registros">Ver todos</a>
        </div>
        {ultimos.length === 0 ? (
          <p className="adm-vacio">Todavía no hay registros. Llegan desde los formularios del sitio y del QR.</p>
        ) : (
          <div className="adm-tabla-caja"><table className="adm-tabla">
            <thead><tr><th>Nombre</th><th>Tipo</th><th>Contacto</th><th>Fecha</th></tr></thead>
            <tbody>
              {ultimos.map((r) => (
                <tr key={r.id}>
                  <td>{r.nombre}</td>
                  <td>{r.tipo === "miembro" ? "Miembro" : "Calendario"}</td>
                  <td>{r.medio === "whatsapp" ? "WhatsApp " : ""}{r.contacto}</td>
                  <td>{fmtFechaHora.format(r.creadoEn)}</td>
                </tr>
              ))}
            </tbody>
          </table></div>
        )}
      </section>
    </>
  );
}
