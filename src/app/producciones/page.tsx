import { Ico } from "@/components/ui/Icons";
import { Footer } from "@/components/layout/Footer";
import { producciones } from "@/content/hub";

export const metadata = {
  title: "Producciones propias",
  description: "Las producciones de Fortaleza Mexicana: el podcast, la animación de personajes históricos, De pequeño a Gigante y Creo en ti.",
};

export default function Page() {
  return (
    <>
<header className="cab-chica" id="top">
  <div className="wrap cab-chica-in">
    <div className="stack g5">
      <nav className="migas" aria-label="Ruta"><a href="/">Inicio</a><span>/</span><span>Producciones</span></nav>
      <span className="eyebrow e-coral">Producciones propias</span>
      <h1 className="h1">Lo que hacemos nosotros.</h1>
      <p className="lead">Un podcast, una serie animada y dos programas. Cada uno se estrena aquí en
        cuanto tenga fecha; mientras tanto, se anuncia como próximo.</p>
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
          <h2 className="h2">{p.titulo}</h2>
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
