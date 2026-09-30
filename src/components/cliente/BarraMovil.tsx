"use client";

import { usePathname } from "next/navigation";
import { Ico } from "@/components/ui/Icons";

/* Barra inferior de app, solo en celular (movil.css la esconde en
   pantallas anchas). Cinco destinos, el activo en oro. Enlaces <a>
   normales, como el resto del sitio (lib/interfaz.js). */
const DESTINOS = [
  { href: "/", txt: "Inicio", ico: <Ico.Casa /> },
  { href: "/cartelera", txt: "Cartelera", ico: <Ico.Ticket /> },
  { href: "/publicaciones", txt: "Videos", ico: <Ico.Play /> },
  { href: "/canales", txt: "Canales", ico: <Ico.Red /> },
  { href: "/registro", txt: "Únete", ico: <Ico.Persona /> },
];

export function BarraMovil() {
  const ruta = usePathname() ?? "/";
  const activo = (href: string) => (href === "/" ? ruta === "/" : ruta === href || ruta.startsWith(href + "/"));
  return (
    <nav className="tabbar" aria-label="Navegación principal">
      {DESTINOS.map((d) => (
        <a key={d.href} href={d.href} className={activo(d.href) ? "on" : undefined}
          aria-current={activo(d.href) ? "page" : undefined}>
          {d.ico}
          <span>{d.txt}</span>
        </a>
      ))}
    </nav>
  );
}
