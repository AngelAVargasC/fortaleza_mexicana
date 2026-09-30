import { Ico } from "@/components/ui/Icons";
import { Footer } from "@/components/layout/Footer";
import { Tarjetas } from "@/components/ui/Tarjetas";
import { Registro } from "@/components/ui/Registro";
import { obtenerExperiencias } from "@/server/contenido";

export const metadata = {
  title: "Membresía",
  description: "La membresía de Fortaleza Mexicana: acceso a contenidos, encuentros privados, red de miembros y descuentos en experiencias.",
};


// Lee de PostgreSQL (cache por etiqueta que invalida /admin).
export const dynamic = "force-dynamic";

export default async function Page() {
  const catalogo = await obtenerExperiencias();
  return (
    <>
<header className="cab-foto" id="top">
  <img src="/img/bb-11.webp" alt="Grupo conversando de pie en un patio con faroles al atardecer" />
  <div className="wrap">
    <div className="stack g5" style={{ maxWidth: "720px" }}>
      <nav className="migas" aria-label="Ruta"><a href="/">Inicio</a><span>/</span><span>Membresía</span></nav>
      <span className="eyebrow e-coral">Membresía</span>
      <h1 className="h1">Una comunidad que piensa en voz alta.</h1>
      <p className="lead" style={{ color: "rgba(230,217,200,.85)", maxWidth: "52ch" }}>
        La membresía es la forma de estar dentro: acceso a lo que publicamos, a los encuentros
        que no se abren al público y a la red de personas que ya pasaron por las experiencias.
      </p>
    </div>
  </div>
</header>

<main id="contenido">

<section className="sec">
  <div className="wrap dos">
    <div className="stack g5 pegado rv">
      <span className="eyebrow e-coral">Qué incluye</span>
      <h2 className="h2">Lo que tiene<br />una persona miembro.</h2>
    </div>
    <div className="stack g8">
      <ul className="benef rv" style={{ gap: "var(--s5)", fontSize: "1.0625rem" }}>
        <li><Ico.Check /><span><strong>Acceso a contenidos exclusivos.</strong> Lecturas, grabaciones y materiales de las experiencias, antes y después de cada edición.</span></li>
        <li><Ico.Check /><span><strong>Eventos y encuentros privados.</strong> Reuniones de miembros en Ciudad de México y en línea, con cupo reducido.</span></li>
        <li><Ico.Check /><span><strong>Red de miembros y colaboración.</strong> Directorio y canales para encontrar a quien piensa como tú, o justo lo contrario.</span></li>
        <li><Ico.Check /><span><strong>Descuentos en experiencias.</strong> Precio preferente en workshops, cursos y eventos abiertos.</span></li>
        <li><Ico.Check /><span><strong>Prioridad de inscripción.</strong> Las ediciones con cupo se abren primero a miembros.</span></li>
      </ul>
      <span className="aviso rv"><Ico.Reloj /> Cuota anual y fecha de apertura por confirmar. Las primeras plazas se anuncian a quienes se registren.</span>
    </div>
  </div>
</section>

<section className="sec" style={{ paddingTop: "0" }}>
  <div className="wrap stack g10">
    <div className="between rv">
      <span className="eyebrow e-coral">Cómo funciona</span>
      <p className="lead" style={{ maxWidth: "44ch" }}>Tres pasos, sin letra pequeña.</p>
    </div>
    <div className="pasos">
      <div className="paso rv"><span className="n">01</span><h3>Solicitas tu lugar</h3><p>Te registras con tu nombre y a qué te dedicas. No hay filtro de perfil: hay filtro de cupo.</p></div>
      <div className="paso rv"><span className="n">02</span><h3>Recibes la carta de bienvenida</h3><p>Con las fechas de los encuentros del semestre, el acceso a los materiales y el directorio.</p></div>
      <div className="paso rv"><span className="n">03</span><h3>Eliges tu primera experiencia</h3><p>Con precio preferente y prioridad de inscripción desde el primer día.</p></div>
    </div>
  </div>
</section>

<section className="sec marfil">
  <div className="wrap dos">
    <div className="stack g5 pegado rv">
      <span className="eyebrow">Para quién es</span>
      <h2 className="h2">Personas que toman decisiones<br />y quieren tomarlas mejor.</h2>
    </div>
    <div className="prosa rv" style={{ color: "rgba(23,21,18,.8)" }}>
      <p>Emprendedores, directivos, docentes, periodistas, servidores públicos, creadores. No pedimos
        credenciales: pedimos disposición a leer, a discutir y a escribir.</p>
      <p>La membresía no es un club cerrado ni una lista de contactos. Es el grupo de personas que
        vuelve a las experiencias, que sostiene la conversación entre una y otra, y que hace que
        el criterio se ejercite todo el año y no un día.</p>
    </div>
  </div>
</section>

<section className="sec">
  <div className="wrap">
    <Registro
      modo="miembro"
      id="registro"
      eyebrow="Únete"
      titulo={<>Pide tu lugar en<br />la primera generación.</>}
      texto="Te escribimos con la cuota, la fecha de apertura y el calendario de encuentros en cuanto estén confirmados."
    />
  </div>
</section>

<section className="sec otras" style={{ paddingTop: "0" }}>
  <div className="wrap stack g6">
    <div className="between rv">
      <span className="eyebrow e-coral">Próximas experiencias</span>
      <div className="row" style={{ gap: "var(--s3)" }}>
        <a className="lnk lnk-blanco" href="/experiencias">Ver todas <Ico.Flecha /></a>
        <button className="flecha" id="prev" type="button" aria-label="Anterior"><Ico.Izq /></button>
        <button className="flecha" id="next" type="button" aria-label="Siguiente"><Ico.Der /></button>
      </div>
    </div>
    <div className="carril" id="carril"><Tarjetas items={catalogo} /></div>
  </div>
</section>
</main>
      <Footer />

    </>
  );
}
