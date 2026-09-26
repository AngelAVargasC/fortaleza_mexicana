"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __interfaz?: boolean;
  }
}

/* Revelado bidireccional, desplegable de la barra, filtros y carrusel.
   Corre en todas las paginas. La barra ya es solida (DEC-028): no hay capa
   del logotipo que conmutar al pasar la cabecera. */
export function Interfaz() {
  useEffect(() => {
    if (window.__interfaz) return;
    window.__interfaz = true;
    import("@/lib/interfaz").then((m) => m.initInterfaz());
  }, []);
  return null;
}
