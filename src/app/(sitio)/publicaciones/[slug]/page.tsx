import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Ico } from "@/components/ui/Icons";
import { Footer } from "@/components/layout/Footer";
import { TarjetasPublicacion } from "@/components/ui/Publicaciones";
import { VideoYouTube } from "@/components/cliente/VideoYouTube";
import { obtenerPublicacion, obtenerPublicaciones } from "@/server/contenido";
import { TIPO_PUBLICACION } from "@/lib/tipos";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await obtenerPublicacion((await params).slug);
  if (!p) return { title: "Publicación no encontrada" };
  const desc = p.resumen || undefined;
  return {
    title: p.titulo,
    description: desc,
    openGraph: { title: p.titulo, description: desc, images: p.portada ? [p.portada] : undefined, type: "article" },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const p = await obtenerPublicacion(slug);
  if (!p) notFound();
  const otras = (await obtenerPublicaciones("todas", 7)).filter((o) => o.slug !== p.slug).slice(0, 6);
  const parrafos = p.cuerpo.split(/\n\s*\n/).map((x) => x.trim()).filter(Boolean);

  return (
    <>
<main id="contenido" className="pag-pub">
<article className="sec">
  <div className="wrap pub-detalle">
    <nav className="migas" aria-label="Ruta"><a href="/">Inicio</a><span>/</span><a href="/publicaciones">Publicaciones</a></nav>
    <span className="eyebrow e-coral">{TIPO_PUBLICACION[p.tipo]}{p.produccion ? " · " + p.produccion.titulo : ""}</span>
    <h1 className="h1 pub-h1">{p.titulo}</h1>
    <p className="pub-meta">
      {p.canal && <><a href={p.canal.url} target="_blank" rel="noopener">{p.canal.nombre}</a> · </>}
      <time dateTime={p.fechaIso}>{p.fecha}</time>
    </p>

    {p.youtubeId
      ? <VideoYouTube id={p.youtubeId} titulo={p.titulo} />
      : p.portada && <div className="figura pub-portada"><img src={p.portada} alt={p.portadaAlt} /></div>}

    {p.resumen && <p className="lead pub-resumen">{p.resumen}</p>}
    {parrafos.length > 0 && <div className="prosa pub-cuerpo">{parrafos.map((x, i) => <p key={i}>{x}</p>)}</div>}

    <div className="row" style={{ gap: "var(--s3)" }}>
      {p.videoUrl && <a className="btn btn-borde" href={p.videoUrl} target="_blank" rel="noopener">Ver en YouTube <Ico.Externo /></a>}
      {p.produccion && <a className="btn btn-borde" href={"/propiedades#" + p.produccion.slug}>{p.produccion.titulo} <Ico.Flecha /></a>}
    </div>
  </div>
</article>

{otras.length > 0 && (
<section className="sec" style={{ paddingTop: "0" }}>
  <div className="wrap stack g8">
    <p className="riel-tit">Más publicaciones <a href="/publicaciones">Ver todas</a></p>
    <div className="pubs riel-movil"><TarjetasPublicacion items={otras} /></div>
  </div>
</section>
)}
</main>
      <Footer />
    </>
  );
}
