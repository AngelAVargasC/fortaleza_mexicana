/* Calentamiento al arrancar (DEC-033). Las paginas ISR salen del build sin
   datos (el build no toca la base). Al arrancar, el servidor:
   1. pide a /api/calentar (con una ficha aleatoria que solo este proceso
      conoce) que marque esas paginas como vencidas;
   2. las visita para que se regeneren con datos reales.
   Asi el primer visitante despues de un despliegue no ve la pagina vacia.
   No bloquea el arranque. */

const RUTAS = ["/", "/cartelera", "/propiedades", "/canales", "/experiencias"];

export function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs" || process.env.NEXT_PHASE === "phase-production-build") return;
  if (process.env.NODE_ENV !== "production") return;
  const bytes = crypto.getRandomValues(new Uint8Array(24));
  const ficha = Array.from(bytes, (x) => x.toString(16).padStart(2, "0")).join("");
  (globalThis as unknown as { __fmFichaCalentar?: string }).__fmFichaCalentar = ficha;

  const base = "http://127.0.0.1:" + (process.env.PORT || "3000");
  const visitar = () => Promise.allSettled(RUTAS.map((r) => fetch(base + r)));
  const t = setTimeout(async () => {
    try {
      const r = await fetch(base + "/api/calentar", { method: "POST", headers: { "x-ficha": ficha } });
      await visitar();
      await new Promise((ok) => setTimeout(ok, 1500));
      await visitar();
      console.log("[calentamiento] " + (r.ok ? "paginas regeneradas con datos" : "no se pudo invalidar (" + r.status + ")"));
    } catch (e) {
      console.error("[calentamiento] fallo:", e);
    }
  }, 1500);
  t.unref?.();
}
