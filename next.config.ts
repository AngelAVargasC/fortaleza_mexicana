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
    ];
  },
};

export default nextConfig;
