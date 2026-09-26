import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/styles/global.css";
import "@/styles/subpaginas.css";
import "@/styles/detalle.css";
import "@/styles/institucion.css";
import "@/styles/hub.css";
import "@/styles/clasico.css";
import { Nav } from "@/components/layout/Nav";
import { Interfaz } from "@/components/cliente/Interfaz";

export const metadata: Metadata = {
  title: {
    default: "Fortaleza Mexicana",
    template: "%s — Fortaleza Mexicana",
  },
  description:
    "Contenidos, programas y eventos para desarrollar tu criterio, ampliar tu visión y conectar con una comunidad que construye el futuro.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es-MX">
      <body>
        <a className="sr-only" href="#contenido">Saltar al contenido</a>
        <Nav />
        {children}
        {/* revelado, desplegable, filtros y carrusel: en todas las paginas */}
        <Interfaz />
      </body>
    </html>
  );
}
