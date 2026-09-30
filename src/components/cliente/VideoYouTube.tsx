"use client";

import { useState } from "react";
import { Ico } from "@/components/ui/Icons";
import { embedYouTube, miniaturaYouTube } from "@/lib/youtube";

/* Fachada de YouTube: se ve la miniatura con un boton; el iframe (y las
   cookies y los scripts de YouTube) solo cargan al dar play. */
export function VideoYouTube({ id, titulo }: { id: string; titulo: string }) {
  const [activo, setActivo] = useState(false);
  return (
    <div className="video">
      {activo ? (
        <iframe
          src={embedYouTube(id, true)}
          title={titulo}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button type="button" className="video-portada" onClick={() => setActivo(true)} aria-label={"Reproducir: " + titulo}>
          <img src={miniaturaYouTube(id)} alt="" />
          <span className="video-boton"><Ico.Reproducir /></span>
        </button>
      )}
    </div>
  );
}
