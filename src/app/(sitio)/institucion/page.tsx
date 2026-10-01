import { Ico } from "@/components/ui/Icons";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Quiénes somos",
  description: "Fortaleza Mexicana es un recinto donde la historia, la cultura y la creación se encuentran para mirar a México desde su propia fuerza. Manifiesto, personalidad y principios editoriales.",
};

export default function Page() {
  return (
    <>
<header className="cab-foto" id="top">
  <img src="/img/bb-06.webp" alt="Mujer leyendo junto a una ventana con la ciudad al atardecer" />
  <div className="wrap">
    <div className="stack g5" style={{ maxWidth: "760px" }}>
      <nav className="migas" aria-label="Ruta"><a href="/">Inicio</a><span>/</span><span>Quiénes somos</span></nav>
      <span className="eyebrow e-coral">Institución</span>
      <h1 className="h1">Mirar a México desde su propia fuerza.</h1>
      <p className="lead" style={{ color: "rgba(230,217,200,.85)", maxWidth: "54ch" }}>
        Fortaleza Mexicana es un recinto donde la historia, la cultura y la creación se
        encuentran. Un espacio vivo para las ideas, el arte, la conversación y el encuentro.
      </p>
    </div>
  </div>
</header>

<main id="contenido">

<section className="sec marfil manif" id="manifiesto">
  <div className="wrap dos">
    <div className="stack g6 rv">
      <span className="eyebrow">Manifiesto</span>
      <blockquote className="manifiesto-cita">Un pueblo que recuerda quién es, recuerda de lo que es capaz.</blockquote>
    </div>
    <div className="prosa rv" style={{ color: "rgba(23,21,18,.8)" }}>
      <p><strong>Un lugar que reconoce lo que somos</strong>, celebra lo que hemos construido y abre las
        puertas a todo lo que todavía podemos llegar a ser.</p>
      <p>No repartimos conclusiones: entregamos herramientas para el criterio propio. Cada
        experiencia parte de material real, se discute en voz alta y termina con una pieza
        escrita que cada persona puede defender fuera del aula.</p>
      <p>Observamos a México con respeto y potencia contemporánea. No lo folclorizamos, no lo
        idealizamos en el pasado ni lo damos por perdido en el presente.</p>
    </div>
  </div>
</section>

<section className="sec" id="personalidad">
  <div className="wrap dos">
    <div className="stack g5 pegado rv">
      <span className="eyebrow e-coral">Personalidad</span>
      <h2 className="h2">Una voz sólida,<br />cultural y abierta.</h2>
      <p className="lead" style={{ maxWidth: "36ch" }}>Capaz de comunicar identidad, pensamiento y experiencia con carácter propio.</p>
    </div>
    <div className="stack g8">
      <div className="stack g4 rv">
        <span className="tiny mut" style={{ letterSpacing: ".14em", textTransform: "uppercase" }}>Lo que es</span>
        <div className="rasgos">
          <span className="rasgo">Sólida</span><span className="rasgo">Cultural</span><span className="rasgo">Atemporal</span>
          <span className="rasgo">Abierta</span><span className="rasgo">Sofisticada</span><span className="rasgo">Convocante</span>
        </div>
      </div>
      <div className="stack g4 rv">
        <span className="tiny mut" style={{ letterSpacing: ".14em", textTransform: "uppercase" }}>Lo que no es</span>
        <div className="rasgos">
          <span className="rasgo no">Cerrada</span><span className="rasgo no">Folclórica</span><span className="rasgo no">Nostálgica</span>
          <span className="rasgo no">Proteccionista</span><span className="rasgo no">Corporativa</span><span className="rasgo no">Panfletaria</span>
        </div>
      </div>
    </div>
  </div>
</section>

<section className="sec" id="principios" style={{ paddingTop: "0" }}>
  <div className="wrap dos">
    <div className="stack g5 pegado rv">
      <span className="eyebrow e-coral">Principios editoriales</span>
      <h2 className="h2">Cinco reglas<br />que no se negocian.</h2>
    </div>
    <ol className="principios">
      <li className="rv"><div><h3>Material real, siempre</h3><p>Datos, archivo, prensa, testimonios. Ninguna experiencia se construye sobre opiniones sueltas.</p></div></li>
      <li className="rv"><div><h3>El desacuerdo se argumenta</h3><p>Se puede discrepar de todo, con razones. Lo que no se admite es el descalificativo.</p></div></li>
      <li className="rv"><div><h3>Nadie se va sin escribir</h3><p>El criterio se demuestra en una pieza propia, no en la asistencia.</p></div></li>
      <li className="rv"><div><h3>No se anuncia lo que no está confirmado</h3><p>Sedes, fechas, facilitadores y precios se publican cuando existen. Antes, se dice que están por confirmar.</p></div></li>
      <li className="rv"><div><h3>Independencia editorial</h3><p>Ningún patrocinio ni alianza decide el contenido de una experiencia ni de una publicación.</p></div></li>
    </ol>
  </div>
</section>

<section className="sec" id="publicaciones" style={{ paddingTop: "0" }}>
  <div className="wrap stack g8">
    <div className="between rv">
      <span className="eyebrow e-coral">Contenidos</span>
      <span className="aviso"><Ico.Reloj /> Estrenos y fechas se anuncian en cuanto se confirman.</span>
    </div>
    <div className="pasos">
      <a className="paso rv" href="/cartelera"><span className="n"><Ico.Cal /></span><h3>Cartelera en Frontón México</h3><p>Conferencias, conversaciones y encuentros en vivo en la Ciudad de México.</p></a>
      <a className="paso rv" href="/propiedades"><span className="n"><Ico.Mod /></span><h3>Propiedades</h3><p>Podcast Fortaleza Mexicana, Conversarian, PequeñoAGigante y CreoEnTi.</p></a>
      <a className="paso rv" href="/canales"><span className="n"><Ico.Pin /></span><h3>Canales afines</h3><p>Un hub con los canales de nuestros creadores y de medios que piensan México.</p></a>
    </div>
  </div>
</section>

<section className="sec">
  <div className="wrap">
    <div className="insc rv">
      <span className="orn" aria-hidden="true"></span>
      <div className="stack g3">
        <span className="eyebrow">Sé parte</span>
        <h2 className="h2">La forma de estar dentro es la membresía.</h2>
        <p className="lead" style={{ maxWidth: "52ch" }}>Acceso a contenidos, encuentros privados, red de miembros y prioridad en las experiencias.</p>
      </div>
      <a className="btn btn-lg" href="/membresia">Conocer la membresía <Ico.Flecha /></a>
    </div>
  </div>
</section>
</main>
      <Footer />

    </>
  );
}
