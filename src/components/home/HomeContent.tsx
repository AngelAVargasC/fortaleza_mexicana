import type { ReactNode } from "react";
import { Ico } from "@/components/ui/Icons";
import { Footer } from "@/components/layout/Footer";
import { Tarjetas } from "@/components/ui/Tarjetas";
import { PortadasProduccion, TarjetasFronton } from "@/components/ui/Hub";
import { Registro } from "@/components/ui/Registro";
import { TarjetasPublicacion } from "@/components/ui/Publicaciones";
import { FormCorreo } from "@/components/cliente/FormCorreo";
import { SEDE, CORREO_HUB } from "@/lib/sitio";
import type { Canal, Experiencia, Funcion, Produccion, Publicacion, Vecino } from "@/lib/tipos";

/* Home del lanzamiento (DEC-032, 2026-10-01). Pensada para quien llega por
   primera vez: que es Fortaleza Mexicana, que va a encontrar, que puede
   explorar ya y por que volver. Solo lo que existe: sin eventos ni
   beneficios inventados. Las experiencias reales salen en carrusel cuando
   las haya (visibles en /admin); mientras tanto, captura de correo. La voz
   de "que es" sale de la narrativa del cliente (project/assets). */

const INTENCIONES = [
  { href: "/publicaciones", ico: <Ico.Play />, txt: "Ver los videos más recientes" },
  { href: "/propiedades#podcast", ico: <Ico.Micro />, txt: "Conocer el Podcast Fortaleza Mexicana" },
  { href: "/propiedades#conversarian", ico: <Ico.Libro />, txt: "Descubrir Conversarian" },
  { href: "/cartelera", ico: <Ico.Ticket />, txt: "Ver lo que viene en el Frontón México" },
  { href: "#cursos", ico: <Ico.Cal />, txt: "Recibir aviso de cursos y workshops" },
];

/* "Un lugar para…": las seis razones de la narrativa del cliente. */
const PILARES = [
  "Proteger la memoria",
  "Defender la belleza",
  "Discutir la verdad",
  "Recuperar la virtud",
  "Comprender nuestro linaje",
  "Volver a imaginar nuestro destino",
];

const ENCUENTRAS: { href: string; ico: ReactNode; tit: string; txt: string }[] = [
  { href: "/publicaciones", ico: <Ico.Play />, tit: "Contenido",
    txt: "Videos, episodios y artículos sobre historia, cultura e ideas de México." },
  { href: "/propiedades", ico: <Ico.Micro />, tit: "Propiedades",
    txt: "Podcast Fortaleza Mexicana, Conversarian, PequeñoAGigante y CreoEnTi." },
  { href: "/cartelera", ico: <Ico.Ticket />, tit: "En vivo",
    txt: "Conferencias y encuentros en el Frontón México, en el centro de la ciudad." },
  { href: "/canales", ico: <Ico.Red />, tit: "Canales",
    txt: "Las voces que piensan México, empezando por Juan Miguel Zunzunegui." },
  { href: "/cartelera#fronton", ico: <Ico.Pin />, tit: "El Frontón",
    txt: "Malinche, el musical y Pelota Mestiza, en la misma sede." },
  { href: "#cursos", ico: <Ico.Cal />, tit: "Cursos y workshops",
    txt: "En preparación. Déjanos tu correo y te avisamos al abrir." },
];

const PREGUNTAS = [
  {
    grupo: "Fortaleza Mexicana",
    items: [
      ["¿Qué es Fortaleza Mexicana?",
        "Una plataforma mexicana de pensamiento, cultura e ideas. Aquí encuentras el Podcast Fortaleza Mexicana, Conversarian y nuestras demás propiedades, los canales de creadores afines y encuentros en vivo en el Frontón México."],
      ["¿Qué puedo ver hoy?",
        "Los videos más recientes del hub, las propiedades de Fortaleza Mexicana y los canales afines. La cartelera del Frontón México se publica aquí en cuanto haya fechas."],
      ["¿Cómo sumo mi canal al hub?",
        "Escríbenos a hola@fortalezamexicana.mx con el enlace a tu canal y de qué trata. Te respondemos con cómo sumarte."],
    ],
  },
  {
    grupo: "Eventos, cursos y registro",
    items: [
      ["¿Dónde son los eventos en vivo?",
        "En el Frontón México, en la Plaza de la República de la Ciudad de México. Las fechas se publican en la cartelera en cuanto se confirman."],
      ["¿Cómo me entero de las fechas?",
        "Regístrate en la lista de invitados: los próximos eventos se anuncian primero ahí, por WhatsApp o por correo, como prefieras."],
      ["¿Hay cursos y workshops?",
        "Estamos preparando los primeros. Déjanos tu correo en esta página y te escribimos en cuanto abran."],
      ["¿Registrarme tiene costo?",
        "No. Entrar a la lista de invitados es gratis y te das de baja cuando quieras."],
    ],
  },
];

export interface DatosHome {
  cartelera: Funcion[];
  producciones: Produccion[];
  canales: Canal[];
  enElFronton: Vecino[];
  catalogo: Experiencia[];
  publicaciones: Publicacion[];
}

export function HomeContent({ cartelera, producciones, canales, enElFronton, catalogo, publicaciones }: DatosHome) {
  const proxima = cartelera[0];
  return (
    <>
{/* ══════════ PORTADA ══════════ */}
<section className="portada" id="top">
  <img className="portada-img" src="/img/hero-fondo.webp" alt="" aria-hidden="true" />
  <img className="portada-img" src="/img/hero-figura.webp" alt="Mujer mayor con rebozo, de pie en una calle patrimonial bajo un cielo dorado" />
  <div className="wrap portada-in">
    <div className="portada-txt">
      <h1 className="portada-tit">México nos reúne<br /><em>Las ideas nos mueven</em></h1>
      <p className="lead">
        Fortaleza Mexicana es un espacio donde la historia, el arte y la cultura se viven y
        se conversan. Creamos contenidos y encuentros que despiertan el pensamiento crítico,
        nos invitan a mirar a México con otros ojos y a imaginar lo que podemos construir juntos.
      </p>
      <span className="portada-raya" aria-hidden="true"></span>
      <p className="portada-preg">¿Por dónde quieres empezar?</p>
      <ul className="intenciones">
        {INTENCIONES.map((i) => (
          <li key={i.href}><a href={i.href}>{i.ico}<span>{i.txt}</span><Ico.Flecha /></a></li>
        ))}
      </ul>
    </div>
  </div>
</section>

<main id="contenido">

{/* ══════════ QUÉ ES ══════════ */}
<section className="sec" id="que-es">
  <div className="wrap que-es">
    <div className="stack g5">
      <span className="eyebrow e-coral">Qué es Fortaleza Mexicana</span>
      <h2 className="h2 grande">Una fortaleza para pensar México</h2>
      <p className="lead" style={{ maxWidth: "54ch" }}>
        Las historias que nos cuentan deciden cómo entendemos el pasado, cómo leemos el
        presente y lo que creemos posible. Fortaleza Mexicana es una plataforma de
        pensamiento, cultura e ideas para mirar nuestra historia sin miedo y hacernos
        nuevas preguntas.
      </p>
      <p className="que-es-cierre">Las puertas están abiertas. Entra.</p>
    </div>
    <div className="que-es-pilares">
      <p className="faq-tit">Un lugar para</p>
      <ul>{PILARES.map((p) => <li key={p}>{p}</li>)}</ul>
    </div>
  </div>
</section>

{/* ══════════ QUÉ VAS A ENCONTRAR ══════════ */}
<section className="sec" id="encuentras" style={{ paddingTop: "0" }}>
  <div className="wrap stack g8">
    <h2 className="titular">Qué vas a encontrar:<br /><span>todo Fortaleza Mexicana en un solo lugar</span></h2>
    <div className="encuentras">
      {ENCUENTRAS.map((e) => (
        <a className="encuentra" href={e.href} key={e.tit}>
          <span className="encuentra-ico">{e.ico}</span>
          <span className="encuentra-tit">{e.tit}</span>
          <span className="encuentra-txt">{e.txt}</span>
          <span className="encuentra-ir" aria-hidden="true"><Ico.Flecha /></span>
        </a>
      ))}
    </div>
  </div>
</section>

{/* ══════════ CONTENIDO MÁS RECIENTE ══════════ */}
{publicaciones.length > 0 && (
<section className="sec" id="recientes">
  <div className="wrap stack g8">
    <h2 className="titular">Contenido más reciente<br /><span>de Fortaleza Mexicana</span></h2>
    <div className="pubs riel-movil"><TarjetasPublicacion items={publicaciones} /></div>
    <a className="btn btn-gris" href="/publicaciones" style={{ alignSelf: "center" }}>Ver todas las publicaciones</a>
  </div>
</section>
)}

{/* ══════════ PROPIEDADES ══════════ */}
<section className="sec" id="propiedades">
  <div className="wrap stack g10">
    <h2 className="titular">Propiedades:<br /><span>historias de México, contadas por nosotros</span></h2>
    <div className="portadas"><PortadasProduccion items={producciones} /></div>
    <a className="btn btn-gris" href="/propiedades" style={{ alignSelf: "center" }}>Ver todas las propiedades</a>
  </div>
</section>

{/* ══════════ EN VIVO · FRONTÓN MÉXICO ══════════ */}
<section className="sec" id="cartelera">
  <div className="wrap stack g10">
    <h2 className="titular">En vivo en {SEDE.nombre}:<br /><span>la cartelera de Fortaleza Mexicana</span></h2>
    <article className="banda-dest">
      <img src="/img/bb-17.webp" alt="Un hombre habla de pie ante un grupo sentado a una mesa, en un patio con faroles" loading="lazy" />
      <div className="banda-dest-txt">
        <span className="pildora">{proxima ? "Próxima función" : "Próximamente"}</span>
        <h3 className="banda-dest-tit">{proxima ? proxima.titulo : <>Fortaleza Mexicana<br />en {SEDE.nombre}</>}</h3>
        <span className="banda-dest-raya" aria-hidden="true"></span>
        <p className="small">{proxima
          ? proxima.fecha + " · " + proxima.hora
          : "Aquí se graba el Podcast Fortaleza Mexicana y aquí serán los encuentros en vivo. Las fechas se anuncian primero a la lista de invitados."}</p>
        <p className="tiny mut"><Ico.Pin /> {SEDE.zona}</p>
        <div className="row" style={{ gap: "var(--s3)" }}>
          <a className="btn btn-borde" href="/cartelera"><Ico.Ticket /> Ver cartelera</a>
          <a className="btn btn-borde" href="#calendario"><Ico.Cal /> Lista de invitados</a>
        </div>
      </div>
    </article>
    <div className="stack g5">
      <p className="riel-tit">También en el {SEDE.nombre}</p>
      <div className="vecinos riel-movil"><TarjetasFronton items={enElFronton} /></div>
    </div>
  </div>
</section>

{/* ══════════ HUB DE CANALES ══════════ */}
<section className="sec" id="canales">
  <div className="wrap">
    <div className="hub-banda">
      <div className="stack g5">
        <span className="pildora">Hub de contenidos</span>
        <h2 className="h2 grande">Las voces que piensan México</h2>
        <p className="lead" style={{ maxWidth: "50ch" }}>
          Canales de nuestros creadores y medios afines: historia, cultura e ideas,
          reunidos para que encuentres a quien seguir.
        </p>
        {canales.length > 0 ? (
          <div className="canales-mini">
            {canales.slice(0, 6).map((c) => (
              <a key={c.url} href={c.url} target="_blank" rel="noopener">
                {c.img && <img src={c.img} alt="" loading="lazy" />}
                <span className="canal-mini-txt"><b>{c.nombre}</b><span>{c.tema}</span><small>{"Ver canal en " + c.plataforma}</small></span>
              </a>
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

{/* ══════════ CURSOS Y WORKSHOPS ══════════
    Con experiencias reales (visibles en /admin): carrusel con filtros.
    Sin ellas: captura de correo, sin fichas inventadas. */}
<section className="sec" id="cursos">
  <div className="wrap stack g8" id="experiencias">
    {catalogo.length > 0 ? (
      <>
        <h2 className="titular">Cursos, workshops y eventos<br /><span>para formar criterio propio</span></h2>
        <div className="chips chips-cat" role="group" aria-label="Filtrar por tipo">
          <button className="chip" type="button" data-f="todas" aria-pressed="true">Todas</button>
          <button className="chip" type="button" data-f="workshop" aria-pressed="false">Workshops</button>
          <button className="chip" type="button" data-f="curso" aria-pressed="false">Cursos</button>
          <button className="chip" type="button" data-f="evento" aria-pressed="false">Eventos</button>
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
      </>
    ) : (
      <div className="capta">
        <div className="stack g4">
          <span className="eyebrow e-coral">Cursos, workshops y eventos</span>
          <h2 className="h2 grande">Los primeros están en preparación</h2>
          <p className="lead" style={{ maxWidth: "50ch" }}>
            Déjanos tu correo para recibir información sobre próximos cursos, workshops y eventos.
          </p>
        </div>
        <FormCorreo />
      </div>
    )}
  </div>
</section>

{/* ══════════ POR QUÉ VOLVER ══════════ */}
<section className="sec" id="volver" style={{ paddingBottom: "0" }}>
  <div className="wrap stack g8">
    <h2 className="titular">Por qué volver:<br /><span>lo nuevo se publica aquí primero</span></h2>
    <div className="volver">
      <div className="volver-item">
        <Ico.Play />
        <h3>Contenido nuevo</h3>
        <p>Los videos de los creadores del hub y los estrenos de las propiedades llegan a esta página.</p>
      </div>
      <div className="volver-item">
        <Ico.Ticket />
        <h3>Fechas en el Frontón</h3>
        <p>La cartelera de los encuentros en vivo se publica aquí en cuanto hay fecha confirmada.</p>
      </div>
      <div className="volver-item">
        <Ico.Check />
        <h3>Primero, la lista</h3>
        <p>Quien está en la lista de invitados se entera antes que nadie de lo que viene.</p>
      </div>
    </div>
  </div>
</section>

{/* ══════════ LISTA DE INVITADOS ══════════ */}
<section className="sec">
  <div className="wrap">
    <Registro
      modo="calendario"
      id="calendario"
      eyebrow="Lista de invitados"
      titulo={<>Regístrate para acceder a nuestra<br />lista de invitados de próximos eventos</>}
      texto="Los próximos eventos, estrenos y experiencias de Fortaleza Mexicana se anuncian primero a la lista. No te enteres después."
    />
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
        No repartimos conclusiones: entregamos herramientas para el criterio propio.
      </p>
      <a className="lnk" href="/institucion">Conoce quiénes somos <Ico.Flecha /></a>
    </div>
    <div className="figura figura-alta">
      <img src="/img/bb-18.webp" alt="Busto de piedra de una figura mexica sobre un escritorio, frente a un sol dorado" loading="lazy" />
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
