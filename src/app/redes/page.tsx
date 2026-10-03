import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/styles/redes.css";
import { REDES } from "@/lib/sitio";
import { Clarity } from "@/components/cliente/Clarity";

/* Enlace de bio: una sola direccion para compartir en grupos de WhatsApp y
   en las bios de redes. Vive fuera de (sitio): sin barra ni pie, carga
   minima en el celular. Estatica: no toca la base. */
export const metadata: Metadata = {
  title: "Redes",
  description: "Sigue a Fortaleza Mexicana en YouTube, Instagram, TikTok y Facebook.",
  alternates: { canonical: "/redes" },
  openGraph: {
    title: "Fortaleza Mexicana — México nos reúne, las ideas nos mueven",
    description: "Sigue a Fortaleza Mexicana en YouTube, Instagram, TikTok y Facebook.",
    url: "/redes",
    images: ["/icons/icon-512.png"],
  },
};

function Svg({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

const ENLACES = [
  {
    nombre: "Página web", detalle: "fortalezamexicana.com", href: "/",
    ico: <Svg><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" /></Svg>,
  },
  {
    nombre: "YouTube", detalle: "Videos y conversaciones", href: REDES.youtube,
    ico: <Svg><rect x="2.5" y="5" width="19" height="14" rx="4" /><path d="M10 9v6l5-3z" /></Svg>,
  },
  {
    nombre: "Instagram", detalle: "@fortalezamexicana", href: REDES.instagram,
    ico: <Svg><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r=".6" fill="currentColor" /></Svg>,
  },
  {
    nombre: "TikTok", detalle: "@fortalezamexicana", href: REDES.tiktok,
    ico: <Svg><path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" /><path d="M14 3c.4 2.7 2.3 4.6 5 5" /></Svg>,
  },
  {
    nombre: "Facebook", detalle: "Fortaleza Mexicana", href: REDES.facebook,
    ico: <Svg><path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V10H6.5v3.5H9V21h3.5v-7.5H15l.5-3.5h-3V7a1 1 0 0 1 1-1H15z" /></Svg>,
  },
];

export default function Page() {
  return (
    <main className="redes">
      <div className="redes-in">
        <a href="/" className="redes-marca" aria-label="Fortaleza Mexicana — inicio">
          <img src="/marca/monograma-blanco.webp" alt="" width={96} height={96} />
        </a>
        <h1 className="redes-titulo">Fortaleza Mexicana</h1>
        <p className="redes-lema">México nos reúne, las ideas nos mueven</p>

        <ul className="redes-lista">
          {ENLACES.map((e) => {
            const fuera = e.href.startsWith("http");
            return (
              <li key={e.nombre}>
                <a className="redes-enlace" href={e.href}
                  {...(fuera ? { target: "_blank", rel: "noopener" } : {})}>
                  <span className="redes-ico">{e.ico}</span>
                  <span className="redes-txt">
                    <strong>{e.nombre}</strong>
                    <span>{e.detalle}</span>
                  </span>
                  <svg className="redes-flecha" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </a>
              </li>
            );
          })}
        </ul>

        <a className="redes-registro" href="/registro">Regístrate para recibir novedades</a>
      </div>
      <Clarity />
    </main>
  );
}
