import { Ico } from "@/components/ui/Icons";
import { Footer } from "@/components/layout/Footer";
import { FilasCartelera, TarjetasFronton } from "@/components/ui/Hub";
import { Registro } from "@/components/ui/Registro";
import { SEDE } from "@/lib/sitio";
import { obtenerAliados, obtenerCartelera } from "@/server/contenido";

export const metadata = {
  title: "Cartelera · Frontón México",
  description: "La cartelera de Fortaleza Mexicana en el Frontón México: conferencias, conversaciones y encuentros en vivo en la Ciudad de México.",
};


// Lee de PostgreSQL (cache por etiqueta que invalida /admin).
export const dynamic = "force-dynamic";

export default async function Page() {
  const [cartelera, enElFronton] = await Promise.all([obtenerCartelera(), obtenerAliados()]);
  return (
    <>
<header className="cab-foto" id="top">
  <img src="/img/bb-17.webp" alt="Un hombre habla de pie ante un grupo sentado a una mesa, en un patio con faroles" />
  <div className="wrap">
    <div className="stack g5" style={{ maxWidth: "760px" }}>
      <nav className="migas" aria-label="Ruta"><a href="/">Inicio</a><span>/</span><span>Cartelera</span></nav>
      <span className="eyebrow e-coral">Cartelera · {SEDE.nombre}</span>
      <h1 className="h1">Fortaleza Mexicana, en vivo.</h1>
      <p className="lead" style={{ color: "rgba(230,217,200,.85)", maxWidth: "52ch" }}>
        Conferencias, conversaciones y encuentros con público en el {SEDE.nombre}, en el
        corazón de la Ciudad de México.
      </p>
    </div>
  </div>
</header>

<main id="contenido">
<section className="sec">
  <div className="wrap stack g8">
    <div className="between rv">
      <span className="eyebrow e-coral">Próximas funciones</span>
      <span className="aviso"><Ico.Pin /> {SEDE.nombre} · {SEDE.zona}</span>
    </div>
    <div className="funciones rv"><FilasCartelera items={cartelera} /></div>
  </div>
</section>

<section className="sec" style={{ paddingTop: "0" }}>
  <div className="wrap stack g8">
    <div className="between rv">
      <span className="eyebrow e-coral">También en el {SEDE.nombre}</span>
      <p className="lead" style={{ maxWidth: "44ch" }}>Una noche completa: la obra, la mesa y la conversación, en el mismo edificio.</p>
    </div>
    <div className="vecinos rv"><TarjetasFronton items={enElFronton} /></div>
  </div>
</section>

<section className="sec" style={{ paddingTop: "0" }}>
  <div className="wrap">
    <Registro
      modo="calendario"
      id="calendario"
      eyebrow="Lista de invitados"
      titulo={<>Regístrate y entra a la<br />lista de invitados.</>}
      texto="Lo que viene en el Frontón México se anuncia primero a quienes están en la lista. Cuando se abre al público, tú ya sabes la fecha."
    />
  </div>
</section>
</main>
      <Footer />
    </>
  );
}
