import type { MetadataRoute } from "next";

/* Manifiesto: en el celular, "Agregar a pantalla de inicio" instala el hub
   como app (icono del monograma, sin barra del navegador, color Piedra). */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Fortaleza Mexicana",
    short_name: "Fortaleza",
    description: "Cartelera, videos, producciones y comunidad de Fortaleza Mexicana.",
    lang: "es-MX",
    start_url: "/?ref=app",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#171512",
    theme_color: "#171512",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Cartelera", url: "/cartelera" },
      { name: "Videos", url: "/publicaciones" },
      { name: "Regístrate", url: "/registro" },
    ],
  };
}
