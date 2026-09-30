import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/styles/global.css";

/* Raiz comun al sitio y al panel: documento, fuentes y tokens. La barra,
   el pie y el CSS del sitio viven en (sitio)/layout.tsx; los del panel,
   en admin/layout.tsx. */
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
      <body>{children}</body>
    </html>
  );
}
