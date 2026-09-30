import { HomeContent } from "@/components/home/HomeContent";
import {
  obtenerAliados, obtenerCanales, obtenerCartelera, obtenerExperiencias, obtenerProducciones, obtenerPublicaciones,
} from "@/server/contenido";

export const metadata = {
  title: { absolute: "Fortaleza Mexicana — Ideas que se viven" },
};

// Lee de PostgreSQL en cada peticion (con cache por etiqueta): lo que se
// guarda en /admin sale sin volver a desplegar, y el build no necesita base.
export const dynamic = "force-dynamic";

export default async function Page() {
  const [cartelera, producciones, canales, enElFronton, catalogo, publicaciones] = await Promise.all([
    obtenerCartelera(), obtenerProducciones(), obtenerCanales(), obtenerAliados(), obtenerExperiencias(),
    obtenerPublicaciones("todas", 8),
  ]);
  return <HomeContent {...{ cartelera, producciones, canales, enElFronton, catalogo, publicaciones }} />;
}
