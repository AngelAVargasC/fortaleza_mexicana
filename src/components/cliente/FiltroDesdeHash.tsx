"use client";

import { useEffect } from "react";

/* Catalogo: /experiencias#curso (o #workshop, #evento, #comunidad) llega
   con ese filtro pulsado. Los chips los conecta lib/interfaz.js. */
export function FiltroDesdeHash() {
  useEffect(() => {
    const f = (location.hash || "").slice(1);
    const chip = f && document.querySelector<HTMLButtonElement>('.chip[data-f="' + f + '"]');
    /* interfaz.js registra los chips en su propio efecto: se espera un tick */
    const t = setTimeout(() => chip && chip.click(), 0);
    return () => clearTimeout(t);
  }, []);
  return null;
}
