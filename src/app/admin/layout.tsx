import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/styles/admin.css";

/* Panel de administracion (DEC-030). Fuera del sitio publico: sin barra,
   sin pie, sin indexar. */
export const metadata: Metadata = {
  title: { default: "Panel", template: "%s · Panel — Fortaleza Mexicana" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <div className="adm">{children}</div>;
}
