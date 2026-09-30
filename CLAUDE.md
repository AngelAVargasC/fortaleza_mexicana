# web/ — Fortaleza Mexicana en Next.js

Lee primero `../CLAUDE.md`, `../BITACORA.md` y **`ARQUITECTURA.md`**.
Next.js 16, App Router, TypeScript, `src/`, sobre **PostgreSQL + Drizzle**
(DEC-030). **Hub clásico con MasterClass de referencia** (DEC-028). La
versión inmersiva (cerebro 3D, placas) está en `../baul/v3-web-inmersiva/`.

## Mapa

```
drizzle/                      migraciones SQL versionadas (las genera db:generar)
scripts/                      migrar.mjs (al arrancar) · crear-admin.ts
src/
├── app/
│   ├── layout.tsx            raiz: <html>, global.css
│   ├── (sitio)/              sitio publico: layout con Nav + Interfaz + CSS
│   │   ├── page.tsx          /  (lee de la base y monta HomeContent)
│   │   ├── publicaciones/    /publicaciones y /publicaciones/[slug]
│   │   ├── cartelera/ producciones/ canales/ experiencias/ membresia/
│   │   ├── registro/         destino del QR de registro
│   │   ├── qr/               genera los QR (noindex, sin enlace)
│   │   └── institucion/ contacto/  (estaticas)
│   ├── admin/                panel: layout propio (admin.css, noindex)
│   │   ├── entrar/           login
│   │   └── (panel)/          con sesion: tablero, [recurso], [recurso]/[id],
│   │                         registros (+ exportar CSV), equipo
│   └── api/registro/         POST de los formularios -> tabla registros
├── db/                       esquema.ts (tablas) · cliente.ts (pool) · semilla/
├── server/                   solo servidor: contenido.ts (lecturas publicas con
│                             cache por etiqueta) · auth.ts (sesiones) · clave.ts
├── admin/                    recursos.ts (config del panel) · servidor.ts ·
│                             acciones.ts (Server Actions) · ui/ (formularios)
├── lib/                      tipos.ts (formas de vista) · sitio.ts (constantes)
│                             · youtube.ts · interfaz.js (revelado, carrusel...)
├── components/               layout/ (Nav, Footer) · home/HomeContent · ui/
│                             (Tarjetas, Hub, Publicaciones, Registro, Icons) ·
│                             cliente/ (Interfaz, FormRegistro, CodigosQR,
│                             VideoYouTube, FiltroDesdeHash)
└── styles/                   global · subpaginas · detalle · institucion · hub
                              · clasico (sitio) · admin (panel)
public/  img/ (bb-NN.webp del brandbook, hero-fondo, hero-figura) · marca/ · fonts/
```

Tabla vacía = estado «por anunciar» / «en integración» en el sitio; al
publicar desde `/admin`, la home y su página se actualizan solas.

## Reglas

- Enlaces entre páginas con `<a href>` normales, **no** `next/link`:
  `interfaz.js` no gestiona ciclo de vida y necesita carga completa por página.
- Las clases CSS son globales a propósito. Antes de renombrar una, buscarla en
  `src/lib/interfaz.js`.
- `npm run dev` para trabajar, `npm run build` antes de entregar.
- Despliegue: Railway (este repo es `web/`: Root Directory vacío), `npm run build` + `npm start`
  (migra y arranca), `DATABASE_URL` = `${{Postgres.DATABASE_URL}}`.
- El registro nunca confirma un alta que no quedó guardada.
- Los componentes solo conocen `src/lib/tipos.ts`; las tablas, solo
  `src/server/` y `src/admin/`. Nada del cliente importa `src/db/`.
- Toda Server Action del panel empieza por `requerirUsuario()`.
- Módulo nuevo: ver «Sumar un módulo nuevo» en `ARQUITECTURA.md`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
