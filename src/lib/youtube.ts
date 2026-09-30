/* Utilidades de YouTube, sin dependencias: sirven en servidor y cliente. */

const ID = /^[A-Za-z0-9_-]{11}$/;

/** Saca el id de 11 caracteres de cualquier enlace de YouTube conocido:
    watch?v=, youtu.be/, /shorts/, /embed/, /live/, o el id suelto. */
export function idYouTube(entrada: string | null | undefined): string | null {
  const t = (entrada ?? "").trim();
  if (!t) return null;
  if (ID.test(t)) return t;
  let u: URL;
  try {
    u = new URL(t.startsWith("http") ? t : "https://" + t);
  } catch {
    return null;
  }
  const host = u.hostname.replace(/^(www\.|m\.|music\.)/, "");
  let id: string | null = null;
  if (host === "youtu.be") id = u.pathname.slice(1).split("/")[0];
  else if (host === "youtube.com" || host === "youtube-nocookie.com") {
    id = u.searchParams.get("v");
    const m = u.pathname.match(/^\/(shorts|embed|live|v)\/([^/?#]+)/);
    if (!id && m) id = m[2];
  }
  return id && ID.test(id) ? id : null;
}

/** hqdefault existe para todos los videos (maxresdefault no siempre). */
export function miniaturaYouTube(id: string) {
  return "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg";
}

/** Dominio sin cookies de seguimiento hasta que la persona da play. */
export function embedYouTube(id: string, autoplay = false) {
  return "https://www.youtube-nocookie.com/embed/" + id + "?rel=0" + (autoplay ? "&autoplay=1" : "");
}
