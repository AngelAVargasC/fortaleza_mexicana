# Fortaleza Mexicana — web

Sitio de Fortaleza Mexicana en Next.js 16 (App Router, TypeScript), todo
estático. El mapa de carpetas y las reglas están en `CLAUDE.md`; el contexto
del proyecto, en `../README.md` y `../BITACORA.md`.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # comprobar antes de entregar
npm start       # servir la build
```

## Llenar contenido

- `src/content/hub.ts` — funciones de la cartelera (Frontón México),
  producciones propias y canales afines. Una lista vacía se muestra como
  «Por anunciar» / «En integración»; al llenarla aparece sola en la home y
  en su página.
- `src/content/hub.ts` también tiene `enElFronton` (Malinche, Pelota
  Mestiza: lo que ya ocurre en la sede y se enlaza a su sitio).
- `src/content/experiencias.ts` — workshops, cursos, eventos y encuentros.

## Registro (calendario y miembros)

Los formularios de la home (`#calendario`), `/cartelera`, `/membresia` y
`/registro` envían a `/api/registro`. El sitio **no guarda datos**: valida y
reenvía cada registro como JSON al webhook de `REGISTRO_WEBHOOK_URL`. Sin esa
variable, el formulario no confirma nada y ofrece mandar los datos por
correo.

Campos que llegan: `fecha, tipo (calendario|miembro), nombre, medio
(whatsapp|correo), contacto, oficio, intereses, calendario (si|no), ref,
clave`. El WhatsApp llega normalizado (`+5255…`), listo para una lista de
difusión de WhatsApp Business. `ref=qr` marca a quien entró por un impreso.

**Opción gratis: una hoja de Google.**

1. Crea una hoja de cálculo y, en la fila 1, estos encabezados: `fecha tipo
   nombre medio contacto oficio intereses calendario ref`.
2. **Extensiones → Apps Script**, pega esto y cambia la clave:

   ```js
   const CLAVE = "cambia-esta-clave";
   function doPost(e) {
     const d = JSON.parse(e.postData.contents);
     if (d.clave !== CLAVE) return ContentService.createTextOutput("no");
     const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
     hoja.appendRow([d.fecha, d.tipo, d.nombre, d.medio, d.contacto, d.oficio, d.intereses, d.calendario, d.ref]);
     return ContentService.createTextOutput("ok");
   }
   ```

3. **Implementar → Nueva implementación → Aplicación web**, ejecutar como
   *yo*, acceso *cualquier usuario*. Copia la URL `…/exec`.
4. En Railway → **Variables**: `REGISTRO_WEBHOOK_URL` = esa URL y
   `REGISTRO_WEBHOOK_CLAVE` = la misma clave. Railway vuelve a desplegar solo.

Sirve igual cualquier webhook que acepte un POST con JSON (Make, Zapier,
un CRM).

## Códigos QR

`/qr` (no enlazada, `noindex`) genera los dos códigos, uno a la página y otro
a `/registro`, con el dominio desde el que se abre. Ábrela **en el dominio
publicado** y descarga el SVG (imprenta) o el PNG de 2048 px. Para fijar
otro dominio: `NEXT_PUBLIC_SITIO_URL` en el build.

## Despliegue

Railway, con **Root Directory = `/web`**. Build `npm run build`, arranque
`npm start` (`next start` toma el `PORT` de Railway). Node ≥ 20.9 fijado en
`engines`. Variables: `REGISTRO_WEBHOOK_URL` y `REGISTRO_WEBHOOK_CLAVE` para
el registro (ver arriba); el resto funciona sin ellas.
