import { Ico } from "@/components/ui/Icons";
import { Footer } from "@/components/layout/Footer";
import { FilasCartelera } from "@/components/ui/Hub";
import { SEDE, cartelera, CORREO_CARTELERA } from "@/content/hub";

export const metadata = {
  title: "Cartelera · Frontón México",
  description: "La cartelera de Fortaleza Mexicana en el Frontón México: conferencias, conversaciones y encuentros en vivo en la Ciudad de México.",
};

export default function Page() {
  return (
    <>
<header className="cab-foto" id="top">
  <img src="/img/bb-17.webp" alt="Un hombre habla de pie ante un grupo sentado a una mesa, en un patio con faroles" />
  <div className="wrap">
    <div className="stack g5" style={{ maxWidth: "760px" }}>
      <nav className="migas" aria-label="Ruta"><a href="/">Inicio</a><span>/</span><span>Cartelera</span></nav>
      <span className="eyebrow e-coral">Cartelera · {SEDE.nombre}</span>
      <h1 className="h1">Fortaleza Mexicana, en vivo.</h1>
      <p className="lead" style={{ color: "rgba(230,217,200,.85)", maxWidth: "52ch" }}>
        Conferencias, conversaciones y encuentros con público en el {SEDE.nombre}, en el
        corazón de la Ciudad de México.
      </p>
    </div>
  </div>
</header>

<main id="contenido">
<section className="sec">
  <div className="wrap stack g8">
    <div className="between rv">
      <span className="eyebrow e-coral">Próximas funciones</span>
      <span className="aviso"><Ico.Pin /> {SEDE.nombre} · {SEDE.zona}</span>
    </div>
    <div className="funciones rv"><FilasCartelera items={cartelera} /></div>
  </div>
</section>

<section className="sec" style={{ paddingTop: "0" }}>
  <div className="wrap">
    <div className="insc rv">
      <span className="orn" aria-hidden="true"></span>
      <div className="stack g3">
        <span className="eyebrow">Avísame</span>
        <h2 className="h2">Entérate primero de cada función.</h2>
        <p className="lead" style={{ maxWidth: "52ch" }}>Escríbenos y te avisamos por correo cuando se abra la venta de boletos.</p>
      </div>
      <a className="btn btn-lg" href={CORREO_CARTELERA}>Quiero enterarme <Ico.Flecha /></a>
    </div>
  </div>
</section>
</main>
      <Footer />
    </>
  );
}
