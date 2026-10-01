import { revalidatePath } from "next/cache";

/* Uso interno del calentamiento (src/instrumentation.ts): marca como
   vencidas las paginas ISR que salieron vacias del build, para que la
   siguiente visita las arme con datos. Solo responde a la ficha aleatoria
   que el propio proceso genero al arrancar (globalThis); desde fuera da 404. */

const g = globalThis as unknown as { __fmFichaCalentar?: string };

export async function POST(req: Request) {
  const ficha = g.__fmFichaCalentar;
  if (!ficha || req.headers.get("x-ficha") !== ficha) return new Response(null, { status: 404 });
  revalidatePath("/", "layout");
  return Response.json({ ok: true });
}
