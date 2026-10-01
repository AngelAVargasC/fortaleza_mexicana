-- Lanzamiento publico (2026-10-01): las experiencias de la semilla eran
-- ilustrativas (fechas pasadas, cupos inventados). Se ocultan, no se borran:
-- siguen en /admin como referencia. Las reales se crean en /admin visibles.
UPDATE "experiencias" SET "visible" = false WHERE "slug" IN (
  'economia-de-creadores', 'inteligencia-artificial', 'escribir-para-ser-leido',
  'geopolitica-en-tiempo-real', 'encuentro-de-miembros',
  'geopolitica-para-entender-el-siglo-xxi', 'narrativas-que-cambian-realidades'
);
