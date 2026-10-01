# Arquitectura — Fortaleza Mexicana (DEC-030)

Un solo servicio Next.js (sitio + panel + API) sobre una PostgreSQL. Pensado
para crecer por **módulos de contenido** sin reescribir: cada cosa que el
equipo administra es una tabla, una entrada de configuración del panel y una
lectura cacheada para el sitio.

```
 Navegador ──► Next.js (Railway, Root /web)
                ├─ (sitio)/*        páginas públicas ── src/server/contenido.ts ──┐
                ├─ admin/*          panel con sesión ─── src/admin/*  ────────────┤
                ├─ api/registro     formularios ─────────────────────────────────┤
                └─ scripts/migrar   al arrancar                                   │
                                                                                  ▼
                                                  PostgreSQL (Railway) · Drizzle ORM
```

## Capas

| Capa | Dónde | Regla |
|---|---|---|
| Esquema | `src/db/esquema.ts` | Única definición de tablas. Cambiarla = `db:generar` → migración versionada en `drizzle/`. |
| Conexión | `src/db/cliente.ts` | Un pool por proceso, creado al primer uso (el build no necesita base). `server-only`. |
| Lectura pública | `src/server/contenido.ts` | Cada lectura: `unstable_cache` con una etiqueta, formas de `src/lib/tipos.ts` ya formateadas, y vacío si la base falla (el sitio no se cae). |
| Tipos de vista | `src/lib/tipos.ts` | Lo único que conocen los componentes. Serializable (sin `Date`). |
| Panel | `src/admin/recursos.ts` (config) · `servidor.ts` (tablas, formularios, consultas) · `acciones.ts` (Server Actions) · `ui/` (formularios cliente) | CRUD genérico: la lista, el formulario y la validación salen de la config. |
| Sesiones | `src/server/auth.ts`, `clave.ts` | scrypt; cookie httpOnly con token aleatorio; la base guarda solo su sha256. Cada página y **cada acción** llama a `requerirUsuario()`. |
| Registros | `src/app/api/registro/route.ts` | Valida, normaliza (`+52…`, correo en minúsculas) y hace *upsert* por `(tipo, medio, contacto)`. |

## Frescura del contenido y tráfico alto (DEC-033)

Las páginas de contenido (home, cartelera, propiedades, canales,
experiencias, detalle de publicación) son **ISR**: se sirven ya armadas desde
caché y se rehacen a lo más cada 60 s (`revalidate = 60`). Sus lecturas usan
caché por etiqueta (`ETIQUETA.*`). Al guardar en el panel, `updateTag` invalida
la etiqueta y con ella las páginas que la usan: lo publicado sale en la
siguiente visita, sin desplegar. `/publicaciones` (filtro por URL) sigue
dinámica.

El build **no toca la base** (`hayBase()` es falso en `next build`: en Railway
no hay red privada durante el build), así que esas páginas salen vacías del
build. `src/instrumentation.ts` las **calienta al arrancar**: pide a
`/api/calentar` (protegido por una ficha aleatoria del propio proceso; desde
fuera da 404) que las marque vencidas y las visita para que se regeneren con
datos antes del primer visitante.

Prueba de carga (local, una instancia): home en caché ~1 240 visitas/s con 300
simultáneos y 0 errores (antes, sin caché, ~105/s); 350 registros simultáneos
guardados en < 1 s, sin duplicar. Pool de 20 conexiones con 20 s de espera.
Imágenes y fuentes de `public/` con caché de navegador (semana / año).

## Sumar un módulo nuevo (p. ej. «Episodios del podcast» o «Temas»)

1. Tabla en `src/db/esquema.ts` → `npm run db:generar` → revisar el SQL en
   `drizzle/` → `npm run db:migrar`.
2. Entrada en `RECURSOS` y `MENU` de `src/admin/recursos.ts` (campos,
   columnas, búsqueda, orden, dónde se ve).
3. Su tabla y etiqueta en `TABLAS` de `src/admin/servidor.ts` (y la etiqueta
   en `ETIQUETA` de `src/server/contenido.ts`).
4. Su lectura pública en `src/server/contenido.ts` y su forma en
   `src/lib/tipos.ts`; la página en `src/app/(sitio)/`.

El panel ya queda con lista, búsqueda, paginación, alta, edición y borrado.

## Escalar

- **Base**: índices en lo que se filtra y ordena (`estado + publicada_en`,
  `inicia_en`, `creado_en` de registros, unicidad por slug y por contacto).
  Paginación en servidor (25 por página) en todo el panel.
- **Conexiones**: `DB_POOL_MAX` × instancias debe quedar por debajo del
  máximo de la PostgreSQL de Railway.
- **Varias instancias** (réplicas de Railway): la app no guarda estado propio
  (sesiones en la base), **salvo dos cosas por instancia**: la caché de datos
  y de páginas de Next y el freno de intentos de login. Con una instancia
  sobra capacidad para el lanzamiento (ver prueba de carga). Con varias: un
  `cacheHandler` compartido (Redis) para que
  `updateTag` llegue a todas (si no, las demás tardan ≤ 10 min) y mover el
  freno a Redis o a la base.
- **Medios**: hoy las portadas son rutas (`/img/…`) o enlaces, y los videos
  viven en YouTube. Subir imágenes desde el panel requiere almacenamiento de
  objetos (Railway Bucket, Cloudflare R2 o S3): el disco del contenedor se
  borra en cada despliegue.

## Siguientes fases (propuestas, no hechas)

1. Subida de imágenes al panel (almacenamiento de objetos + campo `imagen`
   con carga).
2. Temas/etiquetas para publicaciones y página por canal con sus videos.
3. Envío de avisos: correo transaccional (Resend, SES) y, si el cliente lo
   contrata, la API de WhatsApp Business con plantillas aprobadas.
4. Bitácora de cambios del panel (quién editó qué) y roles más finos.
5. Búsqueda en el sitio (índice de texto completo de PostgreSQL).
