import { Ico } from "@/components/ui/Icons";
import { Footer } from "@/components/layout/Footer";
import { Tarjetas } from "@/components/ui/Tarjetas";
import { proximas, catalogo } from "@/content/experiencias";

export const metadata = {
  title: "Pensar el presente para diseñar el futuro",
  description: "Workshop presencial de un día en Ciudad de México: analizar el mundo actual y construir escenarios de impacto. 24 de mayo de 2026.",
};

export default function Page() {
  return (
    <>
{/* ══════════ CABECERA ══════════ */}
<header className="cab" id="top">
  <img src="/img/bb-08.webp" alt="Equipo revisando documentos y mapas sobre una mesa, con un sol dorado al fondo" />
  <div className="wrap">
    <div className="cab-in">
      <div className="stack g5">
        <nav className="migas" aria-label="Ruta">
          <a href="/">Experiencias</a><span>/</span><span>Workshops</span>
        </nav>
        <span className="badge b-workshop" style={{ alignSelf: "flex-start" }}>Workshop</span>
        <h1 className="h1">Pensar el presente para diseñar el futuro</h1>
        <p className="lead" style={{ maxWidth: "52ch", color: "rgba(230,217,200,.85)" }}>
          Un día intensivo para leer el mundo actual con método y salir con un escenario
          propio, escrito y defendible.
        </p>
        <div className="meta" style={{ fontSize: ".875rem", color: "var(--blanco)" }}>
          <span><Ico.Cal /> 24 MAY 2026</span>
          <span><Ico.Pin /> Ciudad de México</span>
          <span><Ico.Mod /> Presencial</span>
          <span><Ico.Reloj /> 9:00 – 18:00</span>
        </div>
      </div>
      <div className="cab-acc">
        <a className="btn btn-lg" href="#inscripcion">Reservar lugar <Ico.Flecha /></a>
        <a className="cta-plano" href="#programa"><span>Ver programa</span> <Ico.Flecha /></a>
      </div>
    </div>
  </div>
</header>

<main id="contenido">

{/* ══════════ FICHA ══════════ */}
<section className="sec" style={{ paddingBlock: "var(--s10) var(--s16)" }}>
  <div className="wrap">
    <div className="ficha rv">
      <div><span className="k">Fecha</span><span className="v">Domingo 24 de mayo de 2026<small>Registro desde las 8:30</small></span></div>
      <div><span className="k">Duración</span><span className="v">Un día · 8 horas<small>Con dos pausas y comida incluida</small></span></div>
      <div><span className="k">Lugar</span><span className="v">Ciudad de México<small>Sede por confirmar a los inscritos</small></span></div>
      <div><span className="k">Cupo</span><span className="v">24 personas<small>Quedan 6 lugares</small></span></div>
    </div>
  </div>
</section>

{/* ══════════ QUÉ VAS A HACER ══════════ */}
<section className="sec" style={{ paddingTop: "0" }}>
  <div className="wrap dos">
    <div className="stack g5 pegado rv">
      <span className="eyebrow e-coral">Qué vas a hacer</span>
      <h2 className="h2">Leer el presente<br />con método, no con opinión.</h2>
    </div>
    <div className="prosa rv">
      <p>
        <strong>El taller parte de una premisa simple:</strong> nadie diseña un futuro que
        valga la pena sin haber leído bien su presente. Durante un día trabajamos con material
        real —datos, archivo, prensa, testimonios— sobre un problema concreto de México, y lo
        ordenamos hasta ver qué está pasando de verdad.
      </p>
      <p>
        A partir de ahí, cada participante construye <strong>un escenario propio a cinco
        años</strong>: qué cambia, qué se sostiene, qué decisión habría que tomar hoy. No se
        entregan conclusiones: se entregan herramientas para llegar a las tuyas y para
        defenderlas en voz alta.
      </p>
      <p>
        Es un workshop para personas que toman decisiones o quieren tomarlas mejor:
        emprendedores, directivos, docentes, periodistas, servidores públicos y creadores.
        No hace falta formación previa; hace falta disposición a discutir.
      </p>
    </div>
  </div>
</section>

{/* ══════════ TRES MOVIMIENTOS ══════════ */}
<section className="sec" style={{ paddingTop: "0" }}>
  <div className="wrap stack g10">
    <div className="between rv">
      <span className="eyebrow e-coral">Tres movimientos</span>
      <p className="lead" style={{ maxWidth: "44ch" }}>Los mismos que se repiten en cada experiencia de Fortaleza Mexicana.</p>
    </div>
    <div className="mov rv">
      <figure>
        <img src="/img/bb-12.webp" alt="Equipo analizando documentos extendidos sobre una mesa en una biblioteca" loading="lazy" />
        <span className="n">01</span>
        <h3>Leer el presente</h3>
        <p>Se parte de material real y se ordena entre todos hasta ver qué está pasando de verdad.</p>
      </figure>
      <figure>
        <img src="/img/bb-09.webp" alt="Tres personas discutiendo en una biblioteca" loading="lazy" />
        <span className="n">02</span>
        <h3>Discutirlo en voz alta</h3>
        <p>El criterio no se transmite, se ejercita. Cada sesión se sostiene sobre el desacuerdo argumentado.</p>
      </figure>
      <figure>
        <img src="/img/bb-10.webp" alt="Mano escribiendo con pluma sobre un cuaderno abierto" loading="lazy" />
        <span className="n">03</span>
        <h3>Salir con algo escrito</h3>
        <p>Nadie se va con apuntes: se va con una pieza propia que puede defender fuera del aula.</p>
      </figure>
    </div>
  </div>
</section>

{/* ══════════ PROGRAMA ══════════ */}
<section className="sec marfil" id="programa">
  <div className="wrap dos">
    <div className="stack g5 pegado rv">
      <span className="eyebrow">Programa del día</span>
      <h2 className="h2">Ocho horas,<br />cinco bloques.</h2>
      <p className="lead" style={{ maxWidth: "36ch" }}>El orden importa: primero se lee, después se discute, al final se escribe.</p>
    </div>
    <ol className="prog rv">
      <li><time>9:00</time><div><h3>Apertura · El problema sobre la mesa</h3><p>Presentación del caso de trabajo, las fuentes y las reglas de la discusión. Formación de mesas de cuatro.</p></div></li>
      <li><time>10:00</time><div><h3>Bloque 1 · Leer</h3><p>Lectura guiada del material: qué dicen los datos, qué dice la prensa, qué dice la gente. Separar hecho de relato.</p></div></li>
      <li><time>12:30</time><div><h3>Bloque 2 · Discutir</h3><p>Cada mesa defiende su lectura ante las demás. Se cambian mesas. Se vuelve a defender con lo que se aprendió.</p></div></li>
      <li><time>15:00</time><div><h3>Bloque 3 · Escribir</h3><p>Trabajo individual: un escenario a cinco años en una página. Qué cambia, qué se sostiene, qué decisión pide hoy.</p></div></li>
      <li><time>17:00</time><div><h3>Cierre · Lectura pública</h3><p>Se leen los escenarios en voz alta. Comentario final y entrega de la pieza escrita.</p></div></li>
    </ol>
  </div>
</section>

{/* ══════════ TE LLEVAS + FACILITACIÓN ══════════ */}
<section className="sec">
  <div className="wrap dos">
    <div className="stack g6 rv">
      <span className="eyebrow e-coral">Te llevas</span>
      <ul className="benef">
        <li><Ico.Check /><span>Un escenario propio a cinco años, escrito y comentado.</span></li>
        <li><Ico.Check /><span>El dossier de fuentes del caso, para seguir trabajándolo.</span></li>
        <li><Ico.Check /><span>Un método de lectura que se repite con cualquier problema.</span></li>
        <li><Ico.Check /><span>Comida y pausas incluidas en el precio.</span></li>
        <li><Ico.Check /><span>Acceso a la comunidad de participantes de Fortaleza Mexicana.</span></li>
      </ul>
    </div>
    <div className="stack g6 rv">
      <span className="eyebrow e-coral">Facilitación</span>
      <div className="facil">
        <div className="sello"><img src="/marca/monograma-blanco.webp" alt="" aria-hidden="true" /></div>
        <div className="stack g3">
          <h3 className="h3">Equipo de Fortaleza Mexicana</h3>
          <p className="small mut" style={{ maxWidth: "52ch" }}>
            Los nombres de quienes facilitan cada edición se publican al confirmar la sede.
            Ninguna experiencia de Fortaleza Mexicana se anuncia con facilitadores que no
            estén confirmados.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

{/* ══════════ INSCRIPCIÓN ══════════ */}
<section className="sec" id="inscripcion" style={{ paddingTop: "0" }}>
  <div className="wrap">
    <div className="insc rv">
      <span className="orn" aria-hidden="true"></span>
      <div className="stack g3">
        <span className="eyebrow" style={{ color: "#63151A" }}>Inscripción</span>
        <h2 className="h2">Quedan 6 lugares para el 24 de mayo.</h2>
        <p className="lead" style={{ maxWidth: "52ch" }}>
          El precio y la sede se comunican al reservar. Si la edición no se abre, se devuelve
          el importe completo.
        </p>
      </div>
      <a className="btn btn-lg" href="mailto:hola@fortalezamexicana.mx?subject=Reserva%20%C2%B7%20Pensar%20el%20presente%20%C2%B7%2024%20MAY%202026">Reservar por correo <Ico.Flecha /></a>
    </div>
  </div>
</section>

{/* ══════════ OTRAS EXPERIENCIAS ══════════ */}
<section className="sec otras" style={{ paddingTop: "0" }}>
  <div className="wrap stack g6">
    <div className="between rv">
      <span className="eyebrow e-coral">Otras experiencias</span>
      <div className="row" style={{ gap: "var(--s3)" }}>
        <a className="lnk lnk-blanco" href="/experiencias">Ver todas <Ico.Flecha /></a>
        <button className="flecha" id="prev" type="button" aria-label="Anterior"><Ico.Izq /></button>
        <button className="flecha" id="next" type="button" aria-label="Siguiente"><Ico.Der /></button>
      </div>
    </div>
    <div className="carril rv" id="carril"><Tarjetas items={proximas} /></div>
  </div>
</section>

</main>
      <Footer />
    </>
  );
}
