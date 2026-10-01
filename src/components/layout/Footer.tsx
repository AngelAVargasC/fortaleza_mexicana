/* Pie comun. En la home vive DENTRO de la ultima placa (sticky); en las
   demas paginas va al final del contenido. */
export function Footer() {
  return (
<footer id="contacto">
  <div className="wrap">
    <div className="foot">
      <div>
        <a className="marca" href="#top" style={{ marginBottom: "var(--s4)" }}><img src="/marca/logo-blanco.webp" alt="Fortaleza Mexicana" /></a>
        <p className="small mut" style={{ maxWidth: "32ch" }}>
          Una plataforma mexicana de pensamiento, cultura e ideas.
          Herramientas para el criterio propio.
        </p>
      </div>
      <div>
        <h5>Institución</h5>
        <ul>
          <li><a href="/institucion#manifiesto">Manifiesto</a></li>
          <li><a href="/institucion">Quiénes somos</a></li>
          <li><a href="/institucion#principios">Principios editoriales</a></li>
        </ul>
      </div>
      <div>
        <h5>Contenidos</h5>
        <ul>
          <li><a href="/cartelera">Cartelera</a></li>
          <li><a href="/publicaciones">Publicaciones</a></li>
          <li><a href="/propiedades">Propiedades</a></li>
          <li><a href="/canales">Canales afines</a></li>
          <li><a href="/#calendario">Lista de invitados</a></li>
        </ul>
      </div>
      <div>
        <h5>Experiencias</h5>
        <ul>
          <li><a href="/experiencias#workshop">Workshops</a></li>
          <li><a href="/experiencias#curso">Cursos</a></li>
          <li><a href="/experiencias#evento">Eventos</a></li>
          <li><a href="/membresia">Membresía</a></li>
          <li><a href="/registro">Regístrate</a></li>
        </ul>
      </div>
      <div>
        <h5>Contacto</h5>
        <ul>
          <li><a href="mailto:hola@fortalezamexicana.mx">hola@fortalezamexicana.mx</a></li>
          <li><a href="/contacto#prensa">Prensa</a></li>
          <li><a href="/contacto#patrocinios">Patrocinios</a></li>
        </ul>
      </div>
    </div>
    <div className="legal">
      <span>© 2026 Fortaleza Mexicana · Ciudad de México</span>
      <span>Aviso de privacidad · Términos</span>
    </div>
  </div>
</footer>
  );
}
