import { Ico } from "@/components/ui/Icons";

/* Barra clasica de hub (DEC-028, referencia MasterClass): fija, con fondo,
   las secciones a la vista y "Explorar" para el mapa completo. Sustituye a
   la marca flotante en diferencia y a la banderola de la version inmersiva.
   El desplegable lo abre/cierra lib/interfaz.js (#vermas, #panel). */
export function Nav() {
  return (
    <>
<header className="barra">
  <div className="barra-in">
    <a className="marca" href="/"><img src="/marca/logo-blanco.webp" alt="Fortaleza Mexicana" /></a>
    <button className="explorar" id="vermas" type="button" aria-expanded="false" aria-controls="panel">
      <span>Explorar</span><Ico.Chev />
    </button>
    <nav className="barra-links" aria-label="Secciones">
      <a href="/cartelera">Cartelera</a>
      <a href="/publicaciones">Publicaciones</a>
      <a href="/propiedades">Propiedades</a>
      <a href="/canales">Canales</a>
      <a href="/experiencias">Experiencias</a>
      <a href="/institucion">Nosotros</a>
    </nav>
    <a className="btn barra-cta" href="/membresia">Únete<span className="sr-only"> a Fortaleza Mexicana</span></a>
  </div>
</header>

{/* Mapa completo. Nace con [hidden] para que sin JS no quede una lista suelta. */}
<div className="desplegable" id="panel" hidden>
  <div className="desp-in">
    <div className="desp-col">
      <span className="desp-tit">Contenidos</span>
      <a href="/cartelera">Cartelera · Frontón México</a>
      <a href="/publicaciones">Publicaciones y videos</a>
      <a href="/propiedades">Propiedades</a>
      <a href="/canales">Canales afines</a>
      <a href="/#calendario">Lista de invitados</a>
    </div>
    <div className="desp-col">
      <span className="desp-tit">Propiedades</span>
      <a href="/propiedades#podcast">Podcast Fortaleza Mexicana</a>
      <a href="/propiedades#conversarian">Conversarian</a>
      <a href="/propiedades#pequeno-a-gigante">PequeñoAGigante</a>
      <a href="/propiedades#creo-en-ti">CreoEnTi</a>
    </div>
    <div className="desp-col">
      <span className="desp-tit">Experiencias</span>
      <a href="/experiencias#workshop">Workshops</a>
      <a href="/experiencias#curso">Cursos</a>
      <a href="/experiencias#evento">Eventos</a>
      <a href="/membresia">Membresía</a>
      <a href="/registro">Regístrate</a>
    </div>
    <div className="desp-col">
      <span className="desp-tit">Fortaleza Mexicana</span>
      <a href="/institucion">Quiénes somos</a>
      <a href="/institucion#manifiesto">Manifiesto</a>
      <a href="/contacto">Contacto</a>
      <a href="/contacto#alianzas">Alianzas</a>
    </div>
  </div>
</div>
    </>
  );
}
