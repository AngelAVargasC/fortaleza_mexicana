import { Ico } from "@/components/ui/Icons";
import { TIPO_PUBLICACION, type Publicacion } from "@/lib/tipos";

/* Tarjeta de publicacion: portada 16:9 (la del video si no hay propia),
   tipo, titulo, canal o produccion y fecha. Toda la tarjeta es el enlace. */
export function TarjetasPublicacion({ items }: { items: Publicacion[] }) {
  return (
    <>
      {items.map((p) => (
        <a className="pub" href={"/publicaciones/" + p.slug} key={p.slug}>
          <div className="pub-img">
            {p.portada
              ? <img src={p.portada} alt={p.portadaAlt} loading="lazy" />
              : <span className="pub-sin" aria-hidden="true"><Ico.Libro /></span>}
            {p.youtubeId && <span className="pub-play" aria-hidden="true"><Ico.Reproducir /></span>}
          </div>
          <div className="pub-txt">
            <span className="pub-tipo">{TIPO_PUBLICACION[p.tipo]}{p.produccion ? " · " + p.produccion.titulo : ""}</span>
            <h3 className="pub-tit">{p.titulo}</h3>
            <p className="pub-meta">{p.canal ? p.canal.nombre + " · " : ""}<time dateTime={p.fechaIso}>{p.fecha}</time></p>
          </div>
        </a>
      ))}
    </>
  );
}
