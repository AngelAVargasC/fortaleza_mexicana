# Fortaleza Mexicana — web

El hub de Fortaleza Mexicana: el sitio público y el panel `/admin`, en
Next.js 16 (App Router, TypeScript) sobre PostgreSQL con Drizzle ORM. La
arquitectura completa está en **[ARQUITECTURA.md](ARQUITECTURA.md)**; el mapa
de carpetas y las reglas, en `CLAUDE.md`; el contexto, en `../BITACORA.md`.

## Arrancar en local

Hace falta Node ≥ 20.9 y una PostgreSQL. La más rápida es la de Docker:

```bash
docker run -d --name fm-postgres -e POSTGRES_USER=fm -e POSTGRES_PASSWORD=fm_local \
  -e POSTGRES_DB=fortaleza -p 5439:5432 postgres:17-alpine

cp .env.example .env.local      # ya apunta a esa base
npm install
npm run db:migrar               # crea las tablas
npm run db:semilla              # carga el contenido inicial (no pisa nada)
npm run admin:crear -- tu@correo.mx "Tu Nombre" "una-clave-larga" admin
npm run dev                     # http://localhost:3000 · panel en /admin
```

Otro día basta con `docker start fm-postgres` y `npm run dev`.

| Script | Qué hace |
|---|---|
| `npm run dev` / `build` / `start` | Desarrollo, build, producción. `start` aplica antes las migraciones pendientes. |
| `npm run db:generar` | Tras cambiar `src/db/esquema.ts`: escribe la migración en `drizzle/`. Se versiona. |
| `npm run db:migrar` | Aplica las migraciones pendientes a la base de `DATABASE_URL`. |
| `npm run db:semilla` | Inserta el contenido inicial (producciones, canales, Frontón, experiencias). Idempotente. |
| `npm run db:estudio` | Drizzle Studio: ver y editar la base en el navegador. |
| `npm run admin:crear -- correo "Nombre" "clave" [admin\|editor]` | Crea una cuenta del panel o restablece su contraseña. |

## El panel `/admin`

Entrar con una cuenta creada con `admin:crear` (o desde **Equipo**, si ya
eres administración). Todo lo que se guarda sale en el sitio al momento.

- **Publicaciones** — videos, artículos y episodios. Pega un enlace de
  YouTube: aparece la vista previa y el panel ofrece el título del video. Sin
  portada propia, se usa la miniatura de YouTube. Estado *Publicado* con fecha
  futura = programada.
- **Cartelera** — funciones en el Frontón México, con fecha y hora de CDMX.
  Las pasadas dejan de verse solas.
- **Canales**, **Producciones**, **En el Frontón**, **Experiencias** — el
  resto del contenido del hub. `Visible` las esconde sin borrarlas; `Orden`
  decide la posición.
- **Registros** — quién se suscribió al calendario o pidió ser parte, con
  filtros, baja/alta y **Exportar CSV** (para la lista de difusión de WhatsApp
  Business o el correo masivo).
- **Equipo** — solo administración: crear cuentas de edición y desactivarlas.

## Registro (calendario y miembros)

Los formularios de la home (`#calendario`), `/cartelera`, `/membresia` y
`/registro` envían a `/api/registro`, que guarda en la tabla `registros`.
Registrarse otra vez con el mismo contacto actualiza la fila (no duplica) y
reactiva a quien se había dado de baja. Si la base no responde, el formulario
no confirma nada y ofrece mandar los datos por correo.

El sitio **recoge** el permiso y el WhatsApp (normalizado a `+52…`); no manda
los mensajes. Se envían desde WhatsApp Business o la herramienta que se elija.

## Códigos QR

`/qr` (no enlazada, `noindex`) genera los dos códigos, a la página y a
`/registro`, con el dominio desde el que se abre. Ábrela **en el dominio
publicado** y descarga el SVG (imprenta) o el PNG de 2048 px. Para fijar otro
dominio: `NEXT_PUBLIC_SITIO_URL` en el build.

## Despliegue

Railway, con un servicio PostgreSQL en el mismo proyecto. **Root Directory**:
vacío si el repositorio de GitHub es esta carpeta `web/` (como
`fortaleza_mexicana` hoy); `/web` solo si se versiona la carpeta del proyecto
completa. Variables:

| Variable | Valor |
|---|---|
| `DATABASE_URL` | `${{Postgres.DATABASE_URL}}` (referencia al servicio de Railway) |
| `DB_POOL_MAX` | Opcional. Conexiones por instancia (10). |
| `NEXT_PUBLIC_SITIO_URL` | Opcional. Dominio fijo para los QR. |
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity: el ID del proyecto (clarity.microsoft.com → Settings → Overview). Se lee en el build: al ponerla, redeploy. Solo carga en el sitio público. |

Paso a paso:

1. Subir el repositorio a GitHub.
2. En Railway: **New Project → Deploy from GitHub repo**, elegir el repositorio.
3. En el servicio → **Settings → Source → Root Directory**: **vacío** si el
   repositorio es la carpeta `web/` (así está `fortaleza_mexicana` hoy);
   `/web` solo si el repositorio es la carpeta completa del proyecto.
   Railway detecta Node, corre `npm install`, `npm run build` y arranca con
   `npm start`, que **aplica las migraciones** y levanta `next start` en el
   `PORT` de Railway.
4. En el proyecto: **+ Create → Database → PostgreSQL**.
5. En el servicio web → **Variables → New Variable**: `DATABASE_URL` =
   `${{Postgres.DATABASE_URL}}` (la referencia; Railway la resuelve a la red
   privada). Guardar: vuelve a desplegar y crea las tablas.
6. **Una sola vez**, desde tu máquina, con la URL **pública** de la base
   (servicio Postgres → **Variables → `DATABASE_PUBLIC_URL`**), en PowerShell:

   ```powershell
   cd web
   $env:DATABASE_URL = "<DATABASE_PUBLIC_URL>"
   npm run db:semilla
   npm run admin:crear -- tu@correo.mx "Tu Nombre" "una-clave-larga" admin
   Remove-Item Env:DATABASE_URL
   ```

7. **Settings → Networking → Generate Domain** para la URL pública (o
   **Custom Domain** para el dominio propio). El panel queda en
   `https://<dominio>/admin`.
8. Cada push a `main` vuelve a desplegar (y migra si hay migraciones nuevas).
9. Con el dominio definitivo, abrir `https://<dominio>/qr` y descargar los
   dos códigos QR.

El build no toca la base (las páginas leen en cada petición); `npm start`
migra y arranca. Sin `DATABASE_URL` el sitio arranca igual, con sus estados
«Por anunciar».
