/* INTERFAZ: revelado bidireccional, desplegable, filtros, carrusel. Corre en todas las paginas. */
export function initInterfaz() {
  "use strict";
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  /* ── revelado bidireccional ───────────────────────────────────────────
     Las piezas se marcan solas por selector; los contenedores .rv del
     marcado se quedan como agrupadores y no se animan si tienen piezas
     dentro (si no, la pieza se moveria dos veces). Cada pieza se observa
     por separado: entra al asomar y sale al irse, por arriba o por abajo,
     con --i = su orden entre hermanas para el escalonado. */
  var PIEZAS = ".eyebrow,.h2,.h3,.lead,.card,.curso,.destacado,.trio > *,.mov > figure," +
               ".ficha > div,.prog > li,.benef > li,.foot > div,.manifiesto-cita,.figura," +
               ".banda,.insc,.facil,.prosa > p,.cifra,.cita,.between,.legal,.migas,.cta-plano:not(.hero .cta-plano)";
  var piezas = [].slice.call(document.querySelectorAll(PIEZAS)).filter(function (el) {
    if (el.closest(".hero") || el.closest(".portada") || el.closest(".nav") || el.closest(".desplegable") || el.closest(".cab")) return false;
    /* solo la pieza mas externa: una tarjeta se mueve entera, no ella y
       ademas su titulo dentro */
    return !(el.parentElement && el.parentElement.closest(PIEZAS));
  });
  [].forEach.call(document.querySelectorAll(".rv"), function (g) {
    if (g.querySelector(PIEZAS)) g.classList.remove("rv"); else piezas.push(g);
  });
  piezas.forEach(function (el) {
    el.classList.add("rv");
    var i = 0, h = el.previousElementSibling;
    while (h) { if (h.classList.contains("rv")) i++; h = h.previousElementSibling; }
    el.style.setProperty("--i", i);
  });
  if (reduce || !("IntersectionObserver" in window)) {
    piezas.forEach(function (e) { e.classList.add("on"); });
  } else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var el = e.target;
        if (e.isIntersecting) { el.classList.add("on"); return; }
        el.classList.remove("on");
        /* por donde se fue: si su borde inferior esta por encima del centro,
           se fue por arriba y volvera desde arriba */
        el.classList.toggle("arriba", e.boundingClientRect.bottom < innerHeight * 0.5);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.04 });
    piezas.forEach(function (e) { io.observe(e); });
  }

  /* ── desplegable de la barra ──────────────────────────────────────────── */
  var vermas = document.getElementById("vermas"), panel = document.getElementById("panel");
  if (vermas && panel) {
    panel.hidden = false;          /* solo se muestra si hay JS para cerrarlo */
    var etiqueta = vermas.firstElementChild.textContent;

    function pon(on) {
      panel.classList.toggle("on", on);
      vermas.setAttribute("aria-expanded", String(on));
      vermas.firstElementChild.textContent = on ? "Cerrar" : etiqueta;
    }
    function abierto() { return panel.classList.contains("on"); }

    vermas.addEventListener("click", function (e) {
      e.stopPropagation();
      pon(!abierto());
    });

    /* Se cierra al elegir, al pulsar fuera y con Escape. Sin las tres, un
       panel a pantalla completa se queda atrapando los clics del sitio. */
    panel.addEventListener("click", function (e) {
      if (e.target.closest("a")) pon(false);
    });
    addEventListener("click", function (e) {
      if (abierto() && !panel.contains(e.target) && e.target !== vermas) pon(false);
    });
    addEventListener("keydown", function (e) {
      if (e.key === "Escape" && abierto()) { pon(false); vermas.focus(); }
    });
    addEventListener("scroll", function () { if (abierto()) pon(false); }, { passive: true });
  }

  /* filtros: filtran de verdad el carril */
  var chips = [].slice.call(document.querySelectorAll(".chip"));
  var carril = document.getElementById("carril");
  if (!carril) chips = [];
  chips.forEach(function (c) {
    c.addEventListener("click", function () {
      chips.forEach(function (o) { o.setAttribute("aria-pressed", String(o === c)); });
      var f = c.dataset.f;
      [].forEach.call(carril.children, function (el) {
        el.hidden = !(f === "todas" || el.dataset.tipo === f);
      });
    });
  });

  /* carrusel */
  var prev = document.getElementById("prev"), next = document.getElementById("next");
  if (!carril || !prev || !next) return;          /* paginas sin carrusel */
  function paso() { return carril.clientWidth * 0.6; }
  prev.addEventListener("click", function () { carril.scrollBy({ left: -paso(), behavior: reduce ? "auto" : "smooth" }); });
  next.addEventListener("click", function () { carril.scrollBy({ left: paso(), behavior: reduce ? "auto" : "smooth" }); });
  function estado() {
    prev.disabled = carril.scrollLeft < 8;
    next.disabled = carril.scrollLeft > carril.scrollWidth - carril.clientWidth - 8;
  }
  carril.addEventListener("scroll", estado, { passive: true });
  addEventListener("resize", estado, { passive: true });
  estado();
}
