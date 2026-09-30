import { asc } from "drizzle-orm";
import { db } from "@/db/cliente";
import { usuarios } from "@/db/esquema";
import { requerirUsuario } from "@/server/auth";
import { cambiarActivo } from "@/admin/acciones";
import { fmtFechaHora } from "@/admin/servidor";
import { FormUsuario } from "@/admin/ui/FormUsuario";

export const metadata = { title: "Equipo" };

const AVISOS: Record<string, string> = {
  creado: "Cuenta creada. Comparte la contraseña por un canal privado.",
  activado: "Cuenta activada.", desactivado: "Cuenta desactivada: ya no puede entrar.",
};

export default async function Page({ searchParams }: { searchParams: Promise<{ ok?: string; error?: string }> }) {
  const yo = await requerirUsuario("admin");
  const { ok, error } = await searchParams;
  const filas = await db().select({
    id: usuarios.id, email: usuarios.email, nombre: usuarios.nombre, rol: usuarios.rol,
    activo: usuarios.activo, ultimoAcceso: usuarios.ultimoAcceso,
  }).from(usuarios).orderBy(asc(usuarios.nombre));

  return (
    <>
      <header className="adm-cab">
        <div>
          <h1 className="adm-h1">Equipo</h1>
          <p className="adm-sub">Quién puede entrar al panel. Edición publica contenido; administración además gestiona el equipo.</p>
        </div>
      </header>
      {ok && AVISOS[ok] && <p className="adm-aviso" role="status">{AVISOS[ok]}</p>}
      {error === "propio" && <p className="adm-aviso adm-aviso-error">No puedes desactivar tu propia cuenta.</p>}

      <div className="adm-tabla-caja"><table className="adm-tabla">
        <thead><tr><th>Nombre</th><th>Correo</th><th>Rol</th><th>Último acceso</th><th><span className="sr-only">Acciones</span></th></tr></thead>
        <tbody>
          {filas.map((u) => (
            <tr key={u.id} className={u.activo ? undefined : "adm-de-baja"}>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>{u.rol === "admin" ? "Administración" : "Edición"}</td>
              <td>{u.ultimoAcceso ? fmtFechaHora.format(u.ultimoAcceso) : "Nunca"}</td>
              <td className="adm-acciones">
                {u.id !== yo.id && (
                  <form action={cambiarActivo.bind(null, u.id, !u.activo)}>
                    <button type="submit">{u.activo ? "Desactivar" : "Activar"}</button>
                  </form>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table></div>

      <section className="adm-bloque">
        <h2 className="adm-h2">Nueva cuenta</h2>
        <FormUsuario />
      </section>
    </>
  );
}
