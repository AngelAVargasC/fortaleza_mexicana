import { Ico } from "@/components/ui/Icons";
import { Footer } from "@/components/layout/Footer";
import { Tarjetas } from "@/components/ui/Tarjetas";
import { PortadasProduccion } from "@/components/ui/Hub";
import { catalogo } from "@/content/experiencias";
import { SEDE, cartelera, producciones, canales, CORREO_HUB, CORREO_CARTELERA } from "@/content/hub";

const proxima = cartelera[0];

/* Home clasica de hub (DEC-028), sobre la estructura de MasterClass:
   portada de una pantalla con "que buscas hoy", que incluye, destacado en
   banda, rieles de tarjetas, membresia, preguntas y pie. Sin motor 3D: la
   version inmersiva esta respaldada en baul/v3-web-inmersiva.
   Nada inventado: lo que no existe aun se anuncia como "por anunciar". */

const INTENCIONES = [
  { href: "/cartelera", ico: <Ico.Ticket />, txt: "Ver la cartelera en Frontón México" },
  { href: "/producciones#podcast", ico: <Ico.Micro />, txt: "Escuchar el podcast" },
  { href: "/producciones#animacion", ico: <Ico.Play />, txt: "Ver a los personajes históricos" },
  { href: "/canales", ico: <Ico.Red />, txt: "Descubrir canales afines" },
  { href: "/experiencias", ico: <Ico.Libro />, txt: "Tomar un workshop o un curso" },
];

const INCLUYE = [
  { ico: <Ico.Ticket />, txt: "Cartelera en vivo en Frontón México" },
  { ico: <Ico.Micro />, txt: "Podcast Fortaleza Mexicana" },
  { ico: <Ico.Play />, txt: "Animación de personajes históricos" },
  { ico: <Ico.Check />, txt: "Programas De pequeño a Gigante y Creo en ti" },
  { ico: <Ico.Red />, txt: "Canales de creadores y medios afines" },
  { ico: <Ico.Libro />, txt: "Workshops, cursos y encuentros" },
];

const PREGUNTAS = [
  {
    grupo: "General",
    items: [
      ["¿Qué es Fortaleza Mexicana?",
        "Una plataforma mexicana de pensamiento, cultura e ideas: reúne en un solo lugar eventos en vivo, producciones propias, canales afines y experiencias de formación."],
      ["¿Qué voy a encontrar aquí?",
        "La cartelera en Frontón México, el podcast, la animación de personajes históricos, los programas De pequeño a Gigante y Creo en ti, los canales de nuestros creadores y el calendario de workshops y cursos."],
      ["¿Cómo sumo mi canal al hub?",
        "Escríbenos a hola@fortalezamexicana.mx con el enlace a tu canal y de qué trata. Te respondemos con cómo sumarte."],
    ],
  },
  {
    grupo: "Eventos y membresía",
    items: [
      ["¿Dónde son los eventos en vivo?",
        "En el Frontón México, en la Plaza de la República de la Ciudad de México. Las fechas se publican en la cartelera en cuanto se confirman."],
      ["¿Cuánto cuesta la membresía?",
        "La cuota y la fecha de apertura están por confirmar. Si pides tu lugar ahora, te escribimos en cuanto se abran las primeras plazas."],
      ["¿Las experiencias son presenciales o en línea?",
        "Las dos. Cada workshop, curso o evento indica su modalidad y su ciudad en la ficha."],
    ],
  },
];

export function HomeContent() {
  return (
    <>
{/* ══════════ PORTADA ══════════ */}
<section className="portada" id="top">
  <img className="portada-img" src="/img/hero-fondo.webp" alt="" aria-hidden="true" />
  <img className="portada-img" src="/img/hero-figura.webp" alt="Mujer mayor con rebozo, de pie en una calle patrimonial bajo un cielo dorado" />
  <div className="wrap portada-in">
    <div className="portada-txt">
      <h1 className="portada-tit">Ideas que se viven.<br /><em>Experiencias que transforman.</em></h1>
      <p className="lead">
        Contenidos, programas y eventos para desarrollar tu criterio, ampliar tu visión
        y conectar con una comunidad que construye el futuro.
      </p>
      <span className="portada-raya" aria-hidden="true"></span>
      <p className="portada-preg">¿Qué te trae hoy a Fortaleza Mexicana?</p>
      <ul className="intenciones">
        {INTENCIONES.map((i) => (
          <li key={i.href}><a href={i.href}>{i.ico}<span>{i.txt}</span><Ico.Flecha /></a></li>
        ))}
      </ul>
    </div>
  </div>
</section>

<main id="contenido">

{/* ══════════ QUÉ INCLUYE ══════════ */}
<section className="sec incluye">
  <div className="wrap incluye-in">
    <div className="stack g6">
      <h2 className="h2 grande">Todo Fortaleza Mexicana,<br />en un solo lugar.</h2>
      <div className="row" style={{ gap: "var(--s3)" }}>
        <a className="btn btn-lg" href="/membresia">Únete <Ico.Flecha /></a>
        <a className="btn btn-lg btn-borde" href="/cartelera"><Ico.Ticket /> Ver cartelera</a>
      </div>
    </div>
    <ul className="incluye-lista">
      {INCLUYE.map((i) => <li key={i.txt}>{i.ico}<span>{i.txt}</span></li>)}
    </ul>
  </div>
</section>

{/* ══════════ CARTELERA · DESTACADO EN BANDA ══════════ */}
<section className="sec" id="cartelera">
  <div className="wrap stack g10">
    <h2 className="titular">En vivo en {SEDE.nombre}.<br /><span>La cartelera de Fortaleza Mexicana.</span></h2>
    <article className="banda-dest">
      <img src="/img/bb-17.webp" alt="Un hombre habla de pie ante un grupo sentado a una mesa, en un patio con faroles" loading="lazy" />
      <div className="banda-dest-txt">
        <span className="pildora">{proxima ? "Próxima función" : "Próximamente"}</span>
        <h3 className="banda-dest-tit">{proxima ? proxima.titulo : <>Fortaleza Mexicana<br />en {SEDE.nombre}</>}</h3>
        <span className="banda-dest-raya" aria-hidden="true"></span>
        <p className="small">{proxima ? proxima.fecha + " · " + proxima.hora : "Conferencias, conversaciones y encuentros en vivo. Fechas por anunciar."}</p>
        <p className="tiny mut"><Ico.Pin /> {SEDE.zona}</p>
        <a className="btn btn-borde" href="/cartelera"><Ico.Ticket /> Ver cartelera</a>
      </div>
    </article>
  </div>
</section>

{/* ══════════ PRODUCCIONES PROPIAS ══════════ */}
<section className="sec" id="producciones">
  <div className="wrap stack g10">
    <h2 className="titular">Producciones propias.<br /><span>Historias de México, contadas por nosotros.</span></h2>
    <div className="portadas"><PortadasProduccion items={producciones} /></div>
    <a className="btn btn-gris" href="/producciones" style={{ alignSelf: "center" }}>Ver todas las producciones</a>
  </div>
</section>

{/* ══════════ EXPERIENCIAS · CHIPS + RIEL ══════════ */}
<section className="sec" id="experiencias">
  <div className="wrap stack g8">
    <h2 className="titular">Una dosis de criterio,<br /><span>cuando la necesites.</span></h2>
    <div className="chips chips-cat" role="group" aria-label="Filtrar por tipo">
      <button className="chip" type="button" data-f="todas" aria-pressed="true">Todas</button>
      <button className="chip" type="button" data-f="workshop" aria-pressed="false">Workshops</button>
      <button className="chip" type="button" data-f="curso" aria-pressed="false">Cursos</button>
      <button className="chip" type="button" data-f="evento" aria-pressed="false">Eventos</button>
      <button className="chip" type="button" data-f="comunidad" aria-pressed="false">Comunidad</button>
    </div>
    <div className="stack g5">
      <div className="between">
        <p className="riel-tit">Próximas experiencias <a href="/experiencias">Ver todas</a></p>
        <div className="row" style={{ gap: "var(--s2)" }}>
          <button className="flecha" id="prev" type="button" aria-label="Anterior"><Ico.Izq /></button>
          <button className="flecha" id="next" type="button" aria-label="Siguiente"><Ico.Der /></button>
        </div>
      </div>
      <div className="carril" id="carril"><Tarjetas items={catalogo} /></div>
    </div>
    <a className="btn btn-gris" href="/experiencias" style={{ alignSelf: "center" }}>Explorar experiencias</a>
  </div>
</section>

{/* ══════════ HUB DE CANALES ══════════ */}
<section className="sec" id="canales">
  <div className="wrap">
    <div className="hub-banda">
      <div className="stack g5">
        <span className="pildora">Hub de contenidos</span>
        <h2 className="h2 grande">Las voces que piensan México, en un solo lugar.</h2>
        <p className="lead" style={{ maxWidth: "50ch" }}>
          Canales de nuestros creadores y medios afines: historia, cultura e ideas,
          reunidos para que encuentres a quien seguir.
        </p>
        {canales.length > 0 ? (
          <div className="canales-mini">
            {canales.slice(0, 6).map((c) => (
              <a key={c.url} href={c.url} target="_blank" rel="noopener"><b>{c.nombre}</b><span>{c.tema}</span></a>
            ))}
          </div>
        ) : (
          <span className="aviso"><Ico.Reloj /> Primeros canales en integración.</span>
        )}
        <div className="row" style={{ gap: "var(--s3)" }}>
          <a className="btn" href="/canales">Explorar el hub <Ico.Flecha /></a>
          <a className="btn btn-borde" href={CORREO_HUB}>Suma tu canal</a>
        </div>
      </div>
      <div className="hub-banda-fig"><img src="/img/bb-03.webp" alt="Cerebro iluminado en dorado frente a un disco de oro" loading="lazy" /></div>
    </div>
  </div>
</section>

{/* ══════════ MEMBRESÍA ══════════ */}
<section className="sec empieza">
  <div className="wrap stack g5" style={{ alignItems: "center", textAlign: "center" }}>
    <h2 className="h2 grande">Empieza hoy.</h2>
    <p className="lead" style={{ maxWidth: "52ch" }}>
      Pide tu lugar en la primera generación de miembros: acceso a contenidos, encuentros
      privados y prioridad en cada experiencia. Cuota y apertura por confirmar.
    </p>
    <div className="row" style={{ gap: "var(--s3)", justifyContent: "center" }}>
      <a className="btn btn-lg" href="/membresia">Únete <Ico.Flecha /></a>
      <a className="btn btn-lg btn-borde" href="/experiencias">Explorar experiencias</a>
    </div>
  </div>
</section>

{/* ══════════ MANIFIESTO ══════════ */}
<section className="sec marfil" id="manifiesto">
  <div className="wrap manifiesto-in">
    <div className="stack g5">
      <span className="eyebrow">Manifiesto</span>
      <blockquote className="manifiesto-cita">
        Un pueblo que recuerda quién es,<br />recuerda de lo que es capaz.
      </blockquote>
      <p className="lead" style={{ maxWidth: "46ch" }}>
        Fortaleza Mexicana es una plataforma mexicana de pensamiento, cultura e
        ideas. No repartimos conclusiones: entregamos herramientas para el
        criterio propio.
      </p>
      <a className="lnk" href="/institucion">Conoce quiénes somos <Ico.Flecha /></a>
    </div>
    <div className="figura figura-alta">
      <img src="/img/bb-18.webp" alt="Busto de piedra de una figura mexica sobre un escritorio, frente a un sol dorado" loading="lazy" />
    </div>
  </div>
</section>

{/* ══════════ AVÍSAME ══════════ */}
<section className="sec">
  <div className="wrap">
    <div className="insc">
      <span className="orn" aria-hidden="true"></span>
      <div className="stack g3">
        <span className="eyebrow">Avísame</span>
        <h2 className="h2">Recibe la cartelera y los estrenos.</h2>
        <p className="lead" style={{ maxWidth: "52ch" }}>Escríbenos y te avisamos por correo de cada función, episodio y programa nuevo.</p>
      </div>
      <a className="btn btn-lg" href={CORREO_CARTELERA}>Quiero enterarme <Ico.Flecha /></a>
    </div>
  </div>
</section>

{/* ══════════ PREGUNTAS FRECUENTES ══════════ */}
<section className="sec" id="preguntas">
  <div className="wrap faq">
    <h2 className="h2 grande">Preguntas frecuentes</h2>
    <div className="faq-grupos">
      {PREGUNTAS.map((g) => (
        <div className="faq-grupo" key={g.grupo}>
          <p className="faq-tit">{g.grupo}</p>
          {g.items.map(([q, a]) => (
            <details key={q}>
              <summary>{q}<Ico.Chev /></summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      ))}
    </div>
  </div>
</section>

</main>

<Footer />
    </>
  );
}
