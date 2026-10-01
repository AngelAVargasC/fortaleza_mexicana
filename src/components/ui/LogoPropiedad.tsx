/* Logotipos de las propiedades (cliente, 2026-10-01). Si la propiedad tiene
   logo oficial subido en /admin (logoUrl), se usa ese. Mientras no, cada una
   tiene su logotipo PROVISIONAL de marca: tipografia y un icono propios
   dentro de la paleta de Fortaleza Mexicana, para que ninguna se sienta
   generica. Son HTML + SVG en linea (no <img>) para usar las fuentes del
   sitio. El nombre real va siempre en texto para lectores de pantalla. */

import type { ReactElement } from "react";

type Tam = "tarjeta" | "grande";

const PROPS = { width: "100%", height: "100%", fill: "none", stroke: "currentColor", strokeWidth: 1.6,
  strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

function Podcast() {
  return (
    <span className="lp lp-podcast">
      <span className="lp-sello">
        <svg viewBox="0 0 48 48" {...PROPS}>
          <circle cx="24" cy="24" r="22" />
          <circle cx="24" cy="24" r="18.5" strokeWidth={0.8} />
          <rect x="19" y="11" width="10" height="17" rx="5" />
          <path d="M15 23a9 9 0 0 0 18 0M24 32v5M19 37h10" />
        </svg>
      </span>
      <span className="lp-txt">
        <span className="lp-pre">Podcast</span>
        <span className="lp-nom">Fortaleza<br />Mexicana</span>
      </span>
    </span>
  );
}

function Conversarian() {
  return (
    <span className="lp lp-conversarian">
      <span className="lp-burbujas">
        <svg viewBox="0 0 56 40" {...PROPS}>
          <path d="M4 6h26a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H15l-6 5v-5H4a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3z" />
          <path d="M33 14h19a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3h-3v5l-6-5H26a3 3 0 0 1-3-3v-2" className="lp-oro" />
          <path d="M8 15h18" strokeWidth={1.2} />
        </svg>
      </span>
      <span className="lp-nom">Convers<em>arian</em></span>
    </span>
  );
}

function PequenoAGigante() {
  return (
    <span className="lp lp-pag">
      <span className="lp-escalon">
        <svg viewBox="0 0 40 40" {...PROPS}>
          <rect x="3" y="28" width="8" height="9" rx="1.5" />
          <rect x="16" y="18" width="8" height="19" rx="1.5" />
          <rect x="29" y="5" width="8" height="32" rx="1.5" className="lp-oro" />
        </svg>
      </span>
      <span className="lp-nom" aria-hidden="true">
        <span className="lp-p">Pequeño</span><span className="lp-a">A</span><span className="lp-g">Gigante</span>
      </span>
    </span>
  );
}

function CreoEnTi() {
  return (
    <span className="lp lp-creo">
      <span className="lp-nom" aria-hidden="true">Creo<span className="lp-enti">EnTi</span></span>
      <span className="lp-chispa">
        <svg viewBox="0 0 24 24" {...PROPS}>
          <path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l3.5 3.5M15.5 15.5 19 19M19 5l-3.5 3.5M8.5 15.5 5 19" />
        </svg>
      </span>
    </span>
  );
}

const LOGOS: Record<string, () => ReactElement> = {
  podcast: Podcast,
  conversarian: Conversarian,
  "pequeno-a-gigante": PequenoAGigante,
  "creo-en-ti": CreoEnTi,
};

export function LogoPropiedad({ slug, titulo, logo, tam = "tarjeta" }: {
  slug: string; titulo: string; logo?: string; tam?: Tam;
}) {
  if (logo) {
    return <span className={"lp-oficial lp-" + tam}><img src={logo} alt={titulo} /></span>;
  }
  const Logo = LOGOS[slug];
  return (
    <span className={"lp-marco lp-" + tam} role="img" aria-label={titulo}>
      {Logo ? <Logo /> : <span className="lp lp-generico"><span className="lp-nom">{titulo}</span></span>}
    </span>
  );
}
