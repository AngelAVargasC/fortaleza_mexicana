/* Constantes del sitio que no son contenido editable. */

/** Dominio principal (sin www; next.config.ts redirige www aqui). */
export const SITIO_URL = process.env.NEXT_PUBLIC_SITIO_URL || "https://fortalezamexicana.com";

export const SEDE = {
  nombre: "Frontón México",
  zona: "Plaza de la República · CDMX",
};

/** Buzon general y respaldo del formulario de registro. */
export const CORREO = "hola@fortalezamexicana.mx";

export const CORREO_HUB =
  "mailto:" + CORREO + "?subject=Hub%20%C2%B7%20Sumar%20mi%20canal";

/** Las fechas se pintan siempre en la hora de la sede. */
export const ZONA_HORARIA = "America/Mexico_City";
