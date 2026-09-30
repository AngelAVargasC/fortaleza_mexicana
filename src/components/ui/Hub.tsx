import { Ico } from "@/components/ui/Icons";
import { SEDE, type Canal, type Funcion, type Produccion, type Vecino } from "@/content/hub";

/* Piezas del hub (DEC-027). Reutilizan el marcado de las tarjetas de
   experiencias (.card, .badge, .meta, .estado) para heredar su estilo y el
   revelado de lib/interfaz.js sin CSS nuevo de mas. */

/* Portada vertical de produccion (home, DEC-028): foto alta, titulo en
   Cinzel sobre la foto, raya y formato debajo, como las tarjetas de la
   referencia. Toda la tarjeta es el enlace. */
export function PortadasProduccion({ items }: { items: Produccion[] }) {
  return (
    <>
      {items.map((p) => (
        <a className="portada-card" href={p.enlace ?? "/producciones#" + p.id} key={p.id}>
          <img src={p.img} alt={p.alt} loading="lazy" />
          <span className="pildora">{p.estadoTexto}</span>
          <div className="portada-card-txt">
            <h3>{p.titulo}</h3>
            <span className="raya" aria-hidden="true"></span>
            <p>{p.formato}{p.red ? " · con Mexicanos Fuertes y Somos Grandes" : ""}</p>
          </div>
        </a>
      ))}
    </>
  );
}

/* Filas de la cartelera. Sin funciones, un unico aviso honesto. */
export function FilasCartelera({ items }: { items: Funcion[] }) {
  if (!items.length) {
    return (
      <div className="funcion vacia">
        <span className="funcion-fecha">Por anunciar</span>
        <div className="stack g2">
          <h3 className="h4">Primeras fechas en preparación</h3>
          <p className="small mut">Las funciones se publican aquí en cuanto estén confirmadas, con horario y venta de boletos.</p>
        </div>
      </div>
    );
  }
  return (
    <>
      {items.map((f) => (
        <article className="funcion" key={f.titulo + f.fecha}>
          <span className="funcion-fecha">{f.fecha}</span>
          <div className="stack g2">
            <h3 className="h4">{f.titulo}</h3>
            <div className="meta">
              <span><Ico.Reloj /> {f.hora}</span>
              <span><Ico.Pin /> {SEDE.nombre}</span>
            </div>
            {f.nota && <p className="small mut">{f.nota}</p>}
          </div>
          {f.boletos
            ? <a className="btn" href={f.boletos} target="_blank" rel="noopener">Boletos <Ico.Flecha /></a>
            : <span className="estado est-pronto">Boletos pronto</span>}
        </article>
      ))}
    </>
  );
}

/* Rejilla de canales afines. Sin canales, no se pinta nada: la pagina
   muestra su propio aviso. */
export function RejillaCanales({ items }: { items: Canal[] }) {
  return (
    <>
      {items.map((c) => (
        <a className="card canal" href={c.url} target="_blank" rel="noopener" key={c.url}>
          {c.img && <div className="card-img"><img src={c.img} alt="" loading="lazy" /></div>}
          <div className="card-body">
            <span className="badge b-curso" style={{ alignSelf: "flex-start" }}>{c.plataforma}</span>
            <h3 className="h4">{c.nombre}</h3>
            <p className="small">{c.tema}</p>
            <div className="card-foot">
              <span className="estado est-abierto">Ver canal</span>
              <span className="lnk lnk-blanco" aria-hidden="true"><Ico.Flecha /></span>
            </div>
          </div>
        </a>
      ))}
    </>
  );
}


/* Tambien en el Fronton: proyectos de terceros en la misma sede. Sin foto
   (no tenemos derechos sobre la suya): rotulo, nombre, una linea y salida
   a su sitio en pestana nueva. */
export function TarjetasFronton({ items }: { items: Vecino[] }) {
  return (
    <>
      {items.map((v) => (
        <a className="vecino" href={v.url} target="_blank" rel="noopener" key={v.id}>
          <span className="vecino-tipo">{v.tipo}{v.donde ? " · " + v.donde : ""}</span>
          <h3 className="vecino-nom">{v.nombre}</h3>
          <p className="small">{v.desc}</p>
          <span className="vecino-cta">{v.cta} <Ico.Externo /></span>
        </a>
      ))}
    </>
  );
}
