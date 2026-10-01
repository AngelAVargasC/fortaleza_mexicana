import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@/styles/global.css";
import { SITIO_URL } from "@/lib/sitio";

/* Raiz comun al sitio y al panel: documento, fuentes y tokens. La barra,
   el pie y el CSS del sitio viven en (sitio)/layout.tsx; los del panel,
   en admin/layout.tsx. */
export const metadata: Metadata = {
  // base de las URL absolutas de Open Graph (vista previa al compartir)
  metadataBase: new URL(SITIO_URL),
  title: {
    default: "Fortaleza Mexicana",
    template: "%s — Fortaleza Mexicana",
  },
  description:
    "Fortaleza Mexicana es un espacio donde la historia, el arte y la cultura se viven y se conversan. Contenidos y encuentros que despiertan el pensamiento crítico.",
  appleWebApp: { capable: true, title: "Fortaleza", statusBarStyle: "black-translucent" },
  formatDetection: { telephone: false },
};

/* Celular primero: el color de la barra del sistema es Piedra y el sitio
   ocupa toda la pantalla, muesca incluida (movil.css respeta los
   safe-area-inset). */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#171512",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es-MX">
      <body>{children}</body>
    </html>
  );
}
