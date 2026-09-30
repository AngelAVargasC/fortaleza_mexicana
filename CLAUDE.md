# web/ — Fortaleza Mexicana en Next.js

Lee primero `../CLAUDE.md` y `../BITACORA.md`. Next.js 16, App Router,
TypeScript, `src/`, todo estático. **Hub clásico con MasterClass de
referencia** (DEC-028): barra fija, home por secciones, sin motor 3D. La
versión inmersiva (cerebro 3D, placas) está en `../baul/v3-web-inmersiva/`.

## Mapa

```
src/
├── app/                      una carpeta por ruta, cada page.tsx con su metadata
│   ├── page.tsx              /            (monta components/home/HomeContent)
│   ├── cartelera/            /cartelera   (Frontón México)
│   ├── producciones/         /producciones (#podcast #animacion #de-pequeno-a-gigante #creo-en-ti)
│   ├── canales/              /canales
│   ├── experiencias/         /experiencias y pensar-el-presente/ (detalle)
│   ├── membresia/ institucion/ contacto/
│   ├── registro/             /registro    (destino del QR de registro)
│   ├── qr/                   /qr          (genera los QR; noindex, sin enlace)
│   ├── api/registro/         POST: valida y reenvía a REGISTRO_WEBHOOK_URL
│   └── layout.tsx            CSS global, <Nav />, <Interfaz />
├── components/
│   ├── layout/               Nav (barra + desplegable «Explorar»), Footer
│   ├── home/HomeContent.tsx  la home, secciones en orden
│   ├── ui/                   Icons, Tarjetas (tarjeta de experiencia), Hub
│   │                         (portadas de producción, cartelera, canales,
│   │                         También en el Frontón), Registro (bloque)
│   └── cliente/              Client Components: Interfaz (arranca
│                             lib/interfaz.js), FiltroDesdeHash,
│                             FormRegistro, CodigosQR
├── content/                  DATOS. Única fuente:
│   ├── hub.ts                cartelera, producciones, canales, enElFronton
│   └── experiencias.ts       workshops, cursos, eventos
├── lib/interfaz.js           revelado, desplegable, filtros y carrusel
│                             (#vermas #panel .chip[data-f] #carril #prev #next)
└── styles/                   global.css (tokens, tipografía, botones, tarjetas,
                              carril, revelado) · subpaginas · detalle ·
                              institucion · hub · clasico.css (maqueta del hub,
                              se carga la última)
public/  img/ (bb-NN.webp del brandbook, hero-fondo, hero-figura) · marca/ · fonts/
```

Listas vacías en `content/hub.ts` = estado «por anunciar» / «en integración»;
al llenarlas, la home y su página se actualizan solas.

## Reglas

- Enlaces entre páginas con `<a href>` normales, **no** `next/link`:
  `interfaz.js` no gestiona ciclo de vida y necesita carga completa por página.
- Las clases CSS son globales a propósito. Antes de renombrar una, buscarla en
  `src/lib/interfaz.js`.
- `npm run dev` para trabajar, `npm run build` antes de entregar.
- Despliegue: Railway, Root Directory = `/web`, `npm run build` + `npm start`.
- El registro (DEC-029) nunca confirma un alta que no llegó al webhook.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
