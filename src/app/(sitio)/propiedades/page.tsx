import { Ico } from "@/components/ui/Icons";
import { Footer } from "@/components/layout/Footer";
import { LogoPropiedad } from "@/components/ui/LogoPropiedad";
import { obtenerProducciones } from "@/server/contenido";

export const metadata = {
  title: "Propiedades",
  description: "Las propiedades de Fortaleza Mexicana: Podcast Fortaleza Mexicana, Conversarian, PequeñoAGigante y CreoEnTi.",
};


// Pagina estatica que se regenera (ISR, DEC-033): se sirve ya armada y se
// rehace a lo mas cada 60 s, o al momento cuando /admin guarda (updateTag).
export const revalidate = 60;

export default async function Page() {
  const producciones = await obtenerProducciones();
  return (
    <>
<header className="cab-chica" id="top">
  <div className="wrap cab-chica-in">
    <div className="stack g5">
      <nav className="migas" aria-label="Ruta"><a href="/">Inicio</a><span>/</span><span>Propiedades</span></nav>
      <span className="eyebrow e-coral">Propiedades</span>
      <h1 className="h1">Lo que hacemos nosotros</h1>
      <p className="lead">Podcast Fortaleza Mexicana, Conversarian, PequeñoAGigante y CreoEnTi.
        Cada una se estrena aquí en cuanto tenga fecha; mientras tanto, se anuncia como próxima.</p>
    </div>
    <div className="stack g4">
      <span className="aviso"><Ico.Reloj /> Estrenos por anunciar.</span>
    </div>
  </div>
</header>

<main id="contenido">
<section className="sec" style={{ paddingTop: "0" }}>
  <div className="wrap">
    {producciones.map((p) => (
      <article className="prod-fila" id={p.id} key={p.id}>
        <div className="figura rv"><img src={p.img} alt={p.alt} loading="lazy" /></div>
        <div className="stack g5 rv">
          <span className="badge b-evento" style={{ alignSelf: "flex-start" }}>{p.formato}</span>
          <div className="prod-logo"><LogoPropiedad slug={p.id} titulo={p.titulo} logo={p.logo} tam="grande" /></div>
          <h2 className="sr-only">{p.titulo}</h2>
          {p.lema && <p className="prod-lema">{p.lema}</p>}
          <p className="lead" style={{ maxWidth: "48ch" }}>{p.desc}</p>
          {p.red && <p className="small red-aliada">{p.red}</p>}
          {p.enlace
            ? <a className="btn" href={p.enlace} target="_blank" rel="noopener" style={{ alignSelf: "flex-start" }}>Ver ahora <Ico.Flecha /></a>
            : <span className="aviso"><Ico.Reloj /> {p.estadoTexto}</span>}
        </div>
      </article>
    ))}
  </div>
</section>
</main>
      <Footer />
    </>
  );
}
