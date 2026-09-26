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
- `src/content/experiencias.ts` — workshops, cursos, eventos y encuentros.

## Despliegue

Railway, con **Root Directory = `/web`**. Build `npm run build`, arranque
`npm start` (`next start` toma el `PORT` de Railway). Node ≥ 20.9 fijado en
`engines`. Sin variables de entorno.
