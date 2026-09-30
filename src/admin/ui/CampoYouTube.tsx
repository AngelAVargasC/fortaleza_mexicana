"use client";

import { useEffect, useState, useTransition } from "react";
import { datosYouTube } from "@/admin/acciones";
import { embedYouTube, idYouTube, miniaturaYouTube } from "@/lib/youtube";

/* Enlace de YouTube con vista previa: al pegarlo aparece la miniatura (la
   que usara la tarjeta si no hay portada) y el video embebido para
   comprobar que es el correcto. Trae titulo y canal via oEmbed y ofrece
   usar el titulo. */
export function CampoYouTube({
  valorInicial, alTitulo, ...input
}: {
  valorInicial: string;
  alTitulo: (t: string) => void;
  id: string;
  name: string;
  "aria-describedby": string;
  "aria-invalid"?: boolean;
}) {
  const [url, setUrl] = useState(valorInicial);
  // undefined = buscando; null = YouTube no dio datos (privado, borrado, sin red).
  const [datos, setDatos] = useState<{ titulo: string; autor: string } | null | undefined>(undefined);
  const [verVideo, setVerVideo] = useState(false);
  const [, empezar] = useTransition();
  const id = idYouTube(url);

  useEffect(() => {
    if (!id) return;
    let vigente = true;
    empezar(async () => {
      const d = await datosYouTube("https://youtu.be/" + id);
      if (vigente) setDatos(d);
    });
    return () => { vigente = false; };
  }, [id]);

  return (
    <div className="adm-yt">
      <input {...input} type="url" inputMode="url" placeholder="https://www.youtube.com/watch?v=…"
        value={url} onChange={(e) => { setUrl(e.target.value.trim()); setVerVideo(false); setDatos(undefined); }} />
      {url && !id && <small className="adm-error">No reconozco ese enlace de YouTube.</small>}
      {id && (
        <div className="adm-yt-vista">
          <div className="adm-yt-medio">
            {verVideo
              ? <iframe src={embedYouTube(id)} title="Vista previa" allow="encrypted-media; picture-in-picture" allowFullScreen />
              : (
                <button type="button" onClick={() => setVerVideo(true)} aria-label="Reproducir la vista previa">
                  <img src={miniaturaYouTube(id)} alt="" />
                  <span>▶</span>
                </button>
              )}
          </div>
          <div className="adm-yt-datos">
            <span className="adm-yt-ok">Video reconocido · {id}</span>
            {datos ? (
              <>
                <b>{datos.titulo}</b>
                <span>{datos.autor}</span>
                <button type="button" className="btn btn-borde" onClick={() => alTitulo(datos.titulo)}>Usar este título</button>
              </>
            ) : datos === null
              ? <span>No se pudo traer el título: revisa que el video sea público.</span>
              : <span>Buscando título…</span>}
          </div>
        </div>
      )}
    </div>
  );
}
