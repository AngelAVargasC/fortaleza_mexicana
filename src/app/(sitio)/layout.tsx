import type { ReactNode } from "react";
import "@/styles/subpaginas.css";
import "@/styles/detalle.css";
import "@/styles/institucion.css";
import "@/styles/hub.css";
import "@/styles/clasico.css";
import "@/styles/propiedades.css";
import "@/styles/movil.css";
import { Nav } from "@/components/layout/Nav";
import { Interfaz } from "@/components/cliente/Interfaz";
import { BarraMovil } from "@/components/cliente/BarraMovil";
import { Clarity } from "@/components/cliente/Clarity";

export default function SitioLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="sr-only" href="#contenido">Saltar al contenido</a>
      <Nav />
      {children}
      <BarraMovil />
      <Clarity />
      {/* revelado, desplegable, filtros y carrusel: en todas las paginas */}
      <Interfaz />
    </>
  );
}
