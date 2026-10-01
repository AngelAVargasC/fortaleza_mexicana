import { Ico } from "@/components/ui/Icons";
import { Footer } from "@/components/layout/Footer";
import { RejillaCanales } from "@/components/ui/Hub";
import { CORREO_HUB } from "@/lib/sitio";
import { obtenerCanales } from "@/server/contenido";

export const metadata = {
  title: "Canales afines",
  description: "El hub de Fortaleza Mexicana: canales de creadores y medios afines sobre historia, cultura e ideas de México.",
};


// Pagina estatica que se regenera (ISR, DEC-033): se sirve ya armada y se
// rehace a lo mas cada 60 s, o al momento cuando /admin guarda (updateTag).
export const revalidate = 60;

export default async function Page() {
  const canales = await obtenerCanales();
  return (
    <>
<header className="cab-chica" id="top">
  <div className="wrap cab-chica-in">
    <div className="stack g5">
      <nav className="migas" aria-label="Ruta"><a href="/">Inicio</a><span>/</span><span>Canales afines</span></nav>
      <span className="eyebrow e-coral">Hub de contenidos</span>
      <h1 className="h1">Las voces que piensan México</h1>
      <p className="lead">Los canales de nuestros creadores y de medios afines, reunidos en un solo
        lugar. Cada enlace lleva a su canal: aquí no se republica nada.</p>
    </div>
    <div className="stack g4">
      <a className="btn" href={CORREO_HUB} style={{ alignSelf: "flex-start" }}>Suma tu canal <Ico.Flecha /></a>
    </div>
  </div>
</header>

<main id="contenido">
<section className="sec" style={{ paddingTop: "0" }}>
  <div className="wrap stack g8">
    {canales.length > 0 ? (
      <div className="rejilla"><RejillaCanales items={canales} /></div>
    ) : (
      <div className="funciones rv">
        <div className="funcion vacia">
          <span className="funcion-fecha">En integración</span>
          <div className="stack g2">
            <h3 className="h4">Los primeros canales se suman en estos días</h3>
            <p className="small mut">Cada canal aparece aquí con su tema y el enlace directo, en cuanto confirme su participación.</p>
          </div>
        </div>
      </div>
    )}
  </div>
</section>

<section className="sec" style={{ paddingTop: "0" }}>
  <div className="wrap">
    <div className="insc rv">
      <span className="orn" aria-hidden="true"></span>
      <div className="stack g3">
        <span className="eyebrow">¿Tienes un canal?</span>
        <h2 className="h2">Si hablas de México con criterio, tu lugar está aquí</h2>
        <p className="lead" style={{ maxWidth: "52ch" }}>Escríbenos con el enlace a tu canal y de qué trata. Te respondemos con cómo sumarte al hub.</p>
      </div>
      <a className="btn btn-lg" href={CORREO_HUB}>Escríbenos <Ico.Flecha /></a>
    </div>
  </div>
</section>
</main>
      <Footer />
    </>
  );
}
