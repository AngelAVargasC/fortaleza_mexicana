import { Ico } from "@/components/ui/Icons";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Contacto",
  description: "Prensa, patrocinios y alianzas de Fortaleza Mexicana. Escríbenos a hola@fortalezamexicana.mx.",
};

export default function Page() {
  return (
    <>
<header className="cab-chica" id="top">
  <div className="wrap cab-chica-in">
    <div className="stack g5">
      <nav className="migas" aria-label="Ruta"><a href="/">Inicio</a><span>/</span><span>Contacto</span></nav>
      <span className="eyebrow e-coral">Contacto</span>
      <h1 className="h1">Hablemos</h1>
      <p className="lead">Un solo correo para todo, con el asunto ya puesto según lo que necesites.
        Contestamos en días hábiles.</p>
    </div>
    <div className="datos">
      <div className="dato"><span className="k">Correo</span><a className="v" href="mailto:hola@fortalezamexicana.mx">hola@fortalezamexicana.mx</a></div>
      <div className="dato"><span className="k">Ciudad</span><span className="v">Ciudad de México</span></div>
      <div className="dato"><span className="k">Horario</span><span className="v">Lunes a viernes, 10:00 – 18:00</span></div>
    </div>
  </div>
</header>

<main id="contenido">
<section className="sec" style={{ paddingTop: "0" }}>
  <div className="wrap vias">
    <div className="via rv" id="prensa">
      <span className="eyebrow e-coral">Prensa</span>
      <p>Entrevistas, acreditaciones para eventos y material gráfico de la marca. El logotipo y
        las fotografías se comparten bajo solicitud, con su guía de uso.</p>
      <a className="lnk lnk-coral" href="mailto:hola@fortalezamexicana.mx?subject=Prensa">Escribir a prensa <Ico.Flecha /></a>
    </div>
    <div className="via rv" id="patrocinios">
      <span className="eyebrow e-coral">Patrocinios</span>
      <p>Marcas e instituciones que quieran acompañar una edición o un programa. El patrocinio
        nunca decide el contenido: así lo dicen nuestros principios editoriales.</p>
      <a className="lnk lnk-coral" href="mailto:hola@fortalezamexicana.mx?subject=Patrocinios">Proponer un patrocinio <Ico.Flecha /></a>
    </div>
    <div className="via rv" id="alianzas">
      <span className="eyebrow e-coral">Alianzas</span>
      <p>Universidades, centros culturales, medios y colectivos para producir ediciones conjuntas,
        y empresas o escuelas que quieran una experiencia a medida.</p>
      <a className="lnk lnk-coral" href="mailto:hola@fortalezamexicana.mx?subject=Alianzas">Proponer una alianza <Ico.Flecha /></a>
    </div>
  </div>
</section>

<section className="sec" style={{ paddingTop: "0" }}>
  <div className="wrap dos">
    <div className="stack g5 pegado rv">
      <span className="eyebrow e-coral">Antes de escribir</span>
      <h2 className="h2">Tres respuestas<br />que ahorran un correo</h2>
    </div>
    <ol className="principios">
      <li className="rv"><div><h3>¿Cómo me entero de los eventos?</h3><p>Entra a la lista de invitados desde la página de inicio: los próximos eventos se anuncian primero ahí, por WhatsApp o por correo.</p></div></li>
      <li className="rv"><div><h3>¿Hay cursos y workshops?</h3><p>Estamos preparando los primeros. Deja tu correo en la página de cursos y te escribimos en cuanto abran.</p></div></li>
      <li className="rv"><div><h3>¿Dónde son los eventos en vivo?</h3><p>En el Frontón México, en la Plaza de la República de la Ciudad de México.</p></div></li>
    </ol>
  </div>
</section>

<section className="sec" style={{ paddingTop: "0" }}>
  <div className="wrap">
    <div className="insc rv">
      <span className="orn" aria-hidden="true"></span>
      <div className="stack g3">
        <span className="eyebrow">Boletín</span>
        <h2 className="h2">Lo que se confirma, llega primero por correo</h2>
        <p className="lead" style={{ maxWidth: "52ch" }}>Fechas, sedes y aperturas de cupo. Sin frecuencia fija: solo cuando hay algo que decir.</p>
      </div>
      <a className="btn btn-lg" href="mailto:hola@fortalezamexicana.mx?subject=Bolet%C3%ADn%20%C2%B7%20Quiero%20recibirlo">Quiero recibirlo <Ico.Flecha /></a>
    </div>
  </div>
</section>
</main>
      <Footer />

    </>
  );
}
