"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Ico } from "@/components/ui/Icons";

/* Genera los QR en el navegador con el dominio desde el que se abre la
   pagina (o NEXT_PUBLIC_SITIO_URL si se fija en el build): abierta en el
   dominio publicado, apuntan a el sin tocar codigo. ?ref=qr marca en el
   registro que la persona llego por un impreso. */

const CODIGOS = [
  { id: "sitio", titulo: "Entrar a la página", ruta: "/?ref=qr", uso: "Carteles, programas de mano, pantallas del Frontón." },
  { id: "registro", titulo: "Registrarse en Fortaleza Mexicana", ruta: "/registro?ref=qr", uso: "Mesas de registro, invitaciones, final de cada función." },
];

// Piedra sobre Marfil: contraste alto, se lee con cualquier camara.
const OPCIONES = { errorCorrectionLevel: "M" as const, margin: 2, color: { dark: "#171512", light: "#E6D9C8" } };

export function CodigosQR() {
  const [base, setBase] = useState("");
  const [svgs, setSvgs] = useState<Record<string, string>>({});

  useEffect(() => {
    const b = (process.env.NEXT_PUBLIC_SITIO_URL || window.location.origin).replace(/\/$/, "");
    Promise.all(CODIGOS.map((c) => QRCode.toString(b + c.ruta, { ...OPCIONES, type: "svg" })))
      .then((r) => {
        setBase(b);
        setSvgs(Object.fromEntries(CODIGOS.map((c, i) => [c.id, r[i]])));
      });
  }, []);

  function bajar(nombre: string, href: string) {
    const a = document.createElement("a");
    a.href = href;
    a.download = nombre;
    a.click();
  }

  async function bajarPng(id: string, url: string) {
    // 2048 px: suficiente para imprimir a 17 cm a 300 ppp.
    bajar("qr-fortaleza-mexicana-" + id + ".png", await QRCode.toDataURL(url, { ...OPCIONES, width: 2048 }));
  }

  function bajarSvg(id: string) {
    const blob = new Blob([svgs[id]], { type: "image/svg+xml" });
    const href = URL.createObjectURL(blob);
    bajar("qr-fortaleza-mexicana-" + id + ".svg", href);
    setTimeout(() => URL.revokeObjectURL(href), 1000);
  }

  const local = /localhost|127\.0\.0\.1/.test(base);

  return (
    <div className="stack g6">
      {local && (
        <span className="aviso"><Ico.Reloj /> Estás en local: estos códigos apuntan a {base}. Ábrela en el dominio publicado para los definitivos.</span>
      )}
      <div className="qrs">
        {CODIGOS.map((c) => {
          const url = base + c.ruta;
          return (
            <article className="qr" key={c.id}>
              <div className="qr-lienzo" dangerouslySetInnerHTML={{ __html: svgs[c.id] ?? "" }} />
              <h2 className="h4">{c.titulo}</h2>
              <code>{url}</code>
              <p className="small mut">{c.uso}</p>
              <div className="row" style={{ gap: "var(--s3)" }}>
                <button className="btn" type="button" onClick={() => bajarSvg(c.id)} disabled={!svgs[c.id]}>SVG para imprenta</button>
                <button className="btn btn-borde" type="button" onClick={() => bajarPng(c.id, url)} disabled={!base}>PNG</button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
