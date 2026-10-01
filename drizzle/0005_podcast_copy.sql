-- Copy del Podcast Fortaleza Mexicana (cliente, 2026-10-01). Solo si siguen
-- los textos anteriores: no pisa lo que ya se haya editado en /admin.
UPDATE "producciones" SET "lema" = 'México tiene mucho que contarnos'
  WHERE "slug" = 'podcast' AND ("lema" IS NULL OR "lema" = 'México, conversado sin prisa');--> statement-breakpoint
UPDATE "producciones" SET "descripcion" = 'Un podcast para descubrir México, escuchar otras miradas y hacernos nuevas preguntas. Historias e ideas que nos emocionan y nos invitan a pensar por nosotros mismos.'
  WHERE "slug" = 'podcast' AND "descripcion" = 'Conversaciones largas sobre México: su historia, su cultura y las ideas que lo están moviendo.';
