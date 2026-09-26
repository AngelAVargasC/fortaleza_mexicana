import { Ico } from "@/components/ui/Icons";
import { Footer } from "@/components/layout/Footer";
import { Tarjetas } from "@/components/ui/Tarjetas";
import { proximas, catalogo } from "@/content/experiencias";
import { FiltroDesdeHash } from "@/components/cliente/FiltroDesdeHash";

export const metadata = {
  title: "Todas las experiencias",
  description: "Workshops, cursos, eventos y encuentros de Fortaleza Mexicana: el calendario completo, filtrable por tipo.",
};

export default function Page() {
  return (
    <>
<header className="cab-chica" id="top">
  <div className="wrap cab-chica-in">
    <div className="stack g5">
      <nav className="migas" aria-label="Ruta"><a href="/">Inicio</a><span>/</span><span>Experiencias</span></nav>
      <span className="eyebrow e-coral">Calendario 2026</span>
      <h1 className="h1">Todas las experiencias</h1>
      <p className="lead">Workshops de un día, cursos de varias semanas, eventos abiertos y encuentros
        de miembros. Lo que está confirmado aparece con fecha; lo que no, se anuncia como próximo.</p>
    </div>
    <div className="stack g4">
      <span className="aviso"><Ico.Cal /> Se añaden ediciones conforme se confirman sede y fecha.</span>
    </div>
  </div>
</header>

<main id="contenido">
<section className="sec" style={{ paddingTop: "0" }}>
  <div className="wrap stack g10">
    <div className="between rv">
      <div className="chips chips-fila" role="group" aria-label="Filtrar por tipo">
        <button className="chip" type="button" data-f="todas" aria-pressed="true">Todas</button>
        <button className="chip" type="button" data-f="workshop" aria-pressed="false">Workshops</button>
        <button className="chip" type="button" data-f="curso" aria-pressed="false">Cursos</button>
        <button className="chip" type="button" data-f="evento" aria-pressed="false">Eventos</button>
        <button className="chip" type="button" data-f="comunidad" aria-pressed="false">Comunidad</button>
      </div>
      <a className="lnk lnk-coral" href="/membresia">Ver la membresía <Ico.Flecha /></a>
    </div>
    <div className="rejilla" id="carril">
      <Tarjetas items={catalogo} />
    </div>
  </div>
</section>

<section className="sec" style={{ paddingTop: "0" }}>
  <div className="wrap">
    <div className="insc rv">
      <span className="orn" aria-hidden="true"></span>
      <div className="stack g3">
        <span className="eyebrow">¿Buscas algo para tu equipo?</span>
        <h2 className="h2">Las experiencias también se diseñan a medida.</h2>
        <p className="lead" style={{ maxWidth: "52ch" }}>Workshops cerrados para empresas, escuelas y colectivos, con el mismo método de los abiertos.</p>
      </div>
      <a className="btn btn-lg" href="/contacto#alianzas">Escríbenos <Ico.Flecha /></a>
    </div>
  </div>
</section>
</main>
      <Footer />
      <FiltroDesdeHash />
    </>
  );
}
