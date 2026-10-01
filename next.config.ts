import type { NextConfig } from "next";

/* Dominio principal: fortalezamexicana.com (sin www). Quien entre por
   www.fortalezamexicana.com llega a la misma ruta en el dominio principal,
   con 301: una sola direccion para buscadores, QR y enlaces compartidos. */
const nextConfig: NextConfig = {
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
    ];
  },
};

export default nextConfig;
