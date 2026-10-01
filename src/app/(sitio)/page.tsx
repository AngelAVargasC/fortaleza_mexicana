import { HomeContent } from "@/components/home/HomeContent";
import {
  obtenerAliados, obtenerCanales, obtenerCartelera, obtenerExperiencias, obtenerProducciones, obtenerPublicaciones,
} from "@/server/contenido";

export const metadata = {
  title: { absolute: "Fortaleza Mexicana — México nos reúne, las ideas nos mueven" },
};

// Pagina estatica que se regenera (ISR, DEC-033): se sirve ya armada y se
// rehace a lo mas cada 60 s, o al momento cuando /admin guarda (updateTag).
export const revalidate = 60;

export default async function Page() {
  const [cartelera, producciones, canales, enElFronton, catalogo, publicaciones] = await Promise.all([
    obtenerCartelera(), obtenerProducciones(), obtenerCanales(), obtenerAliados(), obtenerExperiencias(),
    obtenerPublicaciones("todas", 8),
  ]);
  return <HomeContent {...{ cartelera, producciones, canales, enElFronton, catalogo, publicaciones }} />;
}
