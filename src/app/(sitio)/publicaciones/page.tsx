import { Ico } from "@/components/ui/Icons";
import { Footer } from "@/components/layout/Footer";
import { TarjetasPublicacion } from "@/components/ui/Publicaciones";
import { obtenerPublicaciones } from "@/server/contenido";
import type { TipoPublicacion } from "@/lib/tipos";

export const metadata = {
  title: "Publicaciones",
  description: "Videos, artículos y episodios de Fortaleza Mexicana y sus canales afines: historia, cultura e ideas de México.",
};

export const dynamic = "force-dynamic";

const FILTROS: { valor: TipoPublicacion | "todas"; txt: string }[] = [
  { valor: "todas", txt: "Todas" },
  { valor: "video", txt: "Videos" },
  { valor: "articulo", txt: "Artículos" },
  { valor: "episodio", txt: "Episodios" },
];

export default async function Page({ searchParams }: { searchParams: Promise<{ tipo?: string }> }) {
  const { tipo: pedido } = await searchParams;
  const tipo = FILTROS.find((f) => f.valor === pedido)?.valor ?? "todas";
  const items = await obtenerPublicaciones(tipo, 60);

  return (
    <>
<header className="cab-chica" id="top">
  <div className="wrap cab-chica-in">
    <div className="stack g5">
      <nav className="migas" aria-label="Ruta"><a href="/">Inicio</a><span>/</span><span>Publicaciones</span></nav>
      <span className="eyebrow e-coral">Hub de contenidos</span>
      <h1 className="h1">Publicaciones.</h1>
      <p className="lead">Videos, artículos y episodios de Fortaleza Mexicana y de las voces que piensan México.</p>
    </div>
  </div>
</header>

<main id="contenido">
<section className="sec" style={{ paddingTop: "0" }}>
  <div className="wrap stack g8">
    {/* Enlaces, no botones: el filtro vive en la URL y se puede compartir. */}
    <nav className="chips chips-fila" aria-label="Filtrar por tipo">
      {FILTROS.map((f) => (
        <a className="chip" key={f.valor} href={f.valor === "todas" ? "/publicaciones" : "/publicaciones?tipo=" + f.valor}
          aria-current={f.valor === tipo ? "page" : undefined}>{f.txt}</a>
      ))}
    </nav>
    {items.length > 0 ? (
      <div className="pubs"><TarjetasPublicacion items={items} /></div>
    ) : (
      <div className="funciones">
        <div className="funcion vacia">
          <span className="funcion-fecha">Próximamente</span>
          <div className="stack g2">
            <h3 className="h4">Las primeras publicaciones están en camino</h3>
            <p className="small mut">Aquí aparecen los videos, artículos y episodios en cuanto se publiquen.</p>
          </div>
        </div>
      </div>
    )}
    <a className="lnk lnk-coral" href="/#calendario" style={{ alignSelf: "flex-start" }}>Avísame de lo nuevo <Ico.Flecha /></a>
  </div>
</section>
</main>
      <Footer />
    </>
  );
}
