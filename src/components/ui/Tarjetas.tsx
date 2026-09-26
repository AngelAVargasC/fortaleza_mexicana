import { Fragment } from "react";
import { Ico } from "@/components/ui/Icons";
import { BADGE_CLASE, ESTADO_CLASE, type Experiencia } from "@/content/experiencias";

function conSaltos(t: string) {
  const partes = t.split("\n");
  return partes.map((p, i) => (
    <Fragment key={i}>{p}{i < partes.length - 1 && <br />}</Fragment>
  ));
}

/* Tarjeta vertical: la del carril de la home y la de la rejilla del catalogo.
   Mismo marcado que generaba sitio2/_build.py. */
export function Tarjetas({ items }: { items: Experiencia[] }) {
  return (
    <>
      {items.map((p) => (
        <article className="card" data-tipo={p.tipo} key={p.slug}>
          <div className="card-img">
            <img src={p.img} alt={p.alt} loading="lazy" />
            <span className={"badge " + BADGE_CLASE[p.tipo]}>{p.badge}</span>
          </div>
          <div className="card-body">
            <h3 className="h4">{conSaltos(p.titulo)}</h3>
            <div className="meta">
              <span><Ico.Cal /> {p.fecha}</span>
              <span>{p.modalidad === "presencial" ? <Ico.Pin /> : <Ico.Mod />} {p.lugar}</span>
            </div>
            <div className="card-foot">
              <span className={"estado " + ESTADO_CLASE[p.estado]}>{p.estadoTexto}</span>
              <span className="lnk lnk-blanco" aria-hidden="true"><Ico.Flecha /></span>
            </div>
          </div>
        </article>
      ))}
    </>
  );
}

