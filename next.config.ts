import type { NextConfig } from "next";

/* Dominio principal: fortalezamexicana.com (sin www). Quien entre por
   www.fortalezamexicana.com llega a la misma ruta en el dominio principal,
   con 301: una sola direccion para buscadores, QR y enlaces compartidos. */
const SEMANA = "public, max-age=604800, stale-while-revalidate=86400";

const nextConfig: NextConfig = {
  /* Archivos de public/: Next los sirve con max-age=0 y cada visita los
     vuelve a pedir. Con trafico alto eso es carga inutil. Imagenes y marca:
     una semana en el navegador (los nombres no cambian de contenido a
     menudo). Fuentes: un año, no cambian. */
  async headers() {
    return [
      { source: "/img/:path*", headers: [{ key: "Cache-Control", value: SEMANA }] },
      { source: "/marca/:path*", headers: [{ key: "Cache-Control", value: SEMANA }] },
      { source: "/icons/:path*", headers: [{ key: "Cache-Control", value: SEMANA }] },
      { source: "/fonts/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.fortalezamexicana.com" }],
        destination: "https://fortalezamexicana.com/:path*",
        permanent: true,
      },
      // "Producciones" pasa a "Propiedades" (cliente, 2026-10-01): los enlaces
      // ya compartidos siguen llegando (el #ancla lo conserva el navegador).
      { source: "/producciones", destination: "/propiedades", permanent: true },
      // Lanzamiento (DEC-032): la membresia es de una etapa posterior y la
      // experiencia "Pensar el presente" era ilustrativa.
      { source: "/membresia", destination: "/registro", permanent: false },
      { source: "/experiencias/:slug", destination: "/experiencias", permanent: false },
    ];
  },
};

export default nextConfig;
