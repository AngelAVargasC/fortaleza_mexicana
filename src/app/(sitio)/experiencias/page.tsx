import { Ico } from "@/components/ui/Icons";
import { Footer } from "@/components/layout/Footer";
import { Tarjetas } from "@/components/ui/Tarjetas";
import { FormCorreo } from "@/components/cliente/FormCorreo";
import { obtenerExperiencias } from "@/server/contenido";
import { FiltroDesdeHash } from "@/components/cliente/FiltroDesdeHash";

export const metadata = {
  title: "Cursos, workshops y eventos",
  description: "Cursos, workshops y eventos de Fortaleza Mexicana. Déjanos tu correo y te avisamos en cuanto abran.",
};

// Lee de PostgreSQL (cache por etiqueta que invalida /admin).
export const dynamic = "force-dynamic";

/* Sin experiencias reales visibles, la pagina no inventa fichas: explica
   que vienen y capta el correo (DEC-032). Al publicarlas en /admin aparece
   el catalogo con filtros. */
export default async function Page() {
  const catalogo = await obtenerExperiencias();
  return (
    <>
<header className="cab-chica" id="top">
  <div className="wrap cab-chica-in">
    <div className="stack g5">
      <nav className="migas" aria-label="Ruta"><a href="/">Inicio</a><span>/</span><span>Cursos y workshops</span></nav>
      <span className="eyebrow e-coral">Cursos, workshops y eventos</span>
      <h1 className="h1">{catalogo.length > 0 ? "Aprende con Fortaleza Mexicana" : "Los primeros están en preparación"}</h1>
      <p className="lead">Cursos, workshops y eventos para entender el contexto y formar criterio
        propio, con los creadores y las propiedades de Fortaleza Mexicana.</p>
    </div>
  </div>
</header>

<main id="contenido">
<section className="sec" style={{ paddingTop: "0" }}>
  <div className="wrap stack g10">
    {catalogo.length > 0 ? (
      <>
        <div className="chips chips-fila" role="group" aria-label="Filtrar por tipo">
          <button className="chip" type="button" data-f="todas" aria-pressed="true">Todas</button>
          <button className="chip" type="button" data-f="workshop" aria-pressed="false">Workshops</button>
          <button className="chip" type="button" data-f="curso" aria-pressed="false">Cursos</button>
          <button className="chip" type="button" data-f="evento" aria-pressed="false">Eventos</button>
        </div>
        <div className="rejilla" id="carril"><Tarjetas items={catalogo} /></div>
      </>
    ) : (
      <div className="capta">
        <div className="stack g4">
          <h2 className="h2 grande">Sé de los primeros en enterarte</h2>
          <p className="lead" style={{ maxWidth: "50ch" }}>
            Déjanos tu correo para recibir información sobre próximos cursos, workshops y eventos.
          </p>
        </div>
        <FormCorreo />
      </div>
    )}
  </div>
</section>

<section className="sec" style={{ paddingTop: "0" }}>
  <div className="wrap">
    <div className="insc rv">
      <span className="orn" aria-hidden="true"></span>
      <div className="stack g3">
        <span className="eyebrow">¿Buscas algo para tu equipo?</span>
        <h2 className="h2">Escríbenos para una experiencia a medida</h2>
        <p className="lead" style={{ maxWidth: "52ch" }}>Empresas, escuelas y colectivos que quieran trabajar con Fortaleza Mexicana.</p>
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
