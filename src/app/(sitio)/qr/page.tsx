import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { CodigosQR } from "@/components/cliente/CodigosQR";

/* Herramienta interna: no se enlaza desde el sitio ni se indexa. */
export const metadata: Metadata = {
  title: "Códigos QR",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <>
<header className="cab-chica" id="top">
  <div className="wrap cab-chica-in">
    <div className="stack g5">
      <span className="eyebrow e-coral">Códigos QR</span>
      <h1 className="h1">Para imprimir</h1>
      <p className="lead">Uno lleva a la página y otro al registro. Descarga el SVG para imprenta
        o el PNG para pantallas y redes.</p>
    </div>
  </div>
</header>
<main id="contenido">
<section className="sec" style={{ paddingTop: "0" }}>
  <div className="wrap"><CodigosQR /></div>
</section>
</main>
      <Footer />
    </>
  );
}
