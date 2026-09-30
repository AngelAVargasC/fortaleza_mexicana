import type { ReactNode } from "react";
import { requerirUsuario } from "@/server/auth";
import { salir } from "@/admin/acciones";
import { MENU, RECURSOS } from "@/admin/recursos";

/* Marco del panel: menu lateral y usuario. Cada pagina y cada accion vuelve
   a comprobar la sesion; este layout solo pinta. */
export default async function PanelLayout({ children }: { children: ReactNode }) {
  const u = await requerirUsuario();
  return (
    <div className="adm-marco">
      <aside className="adm-menu">
        <a href="/admin" className="adm-marca"><img src="/marca/logo-blanco.webp" alt="Fortaleza Mexicana" /></a>
        <nav aria-label="Panel">
          <a href="/admin">Tablero</a>
          <span className="adm-menu-tit">Contenido</span>
          {MENU.map((k) => <a key={k} href={"/admin/" + k}>{RECURSOS[k].plural}</a>)}
          <span className="adm-menu-tit">Comunidad</span>
          <a href="/admin/registros">Registros</a>
          {u.rol === "admin" && <a href="/admin/equipo">Equipo</a>}
        </nav>
        <div className="adm-yo">
          <span>{u.nombre}<small>{u.rol === "admin" ? "Administración" : "Edición"}</small></span>
          <a href="/" target="_blank" rel="noopener">Ver el sitio</a>
          <form action={salir}><button type="submit">Salir</button></form>
        </div>
      </aside>
      <main className="adm-main">{children}</main>
    </div>
  );
}
