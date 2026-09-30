/* SEMILLA: videos reales del canal de Juan Miguel Zunzunegui
   (youtube.com/@JMZunzu), para que el hub arranque con contenido. Titulo,
   fecha y resumen salen de cada video en YouTube (el resumen es el primer
   parrafo de su descripcion). La portada es la miniatura del video. Se
   editan o se quitan en /admin > Publicaciones. */

export const CANAL_ZUNZUNEGUI = "juan-miguel-zunzunegui";

export interface VideoSemilla {
  youtubeId: string;
  titulo: string;
  resumen: string;
  /** ISO, tal como lo da YouTube. */
  publicadaEn: string;
}

export const videosZunzunegui: VideoSemilla[] = [
  {
    youtubeId: "9tXz4rHCyKo",
    titulo: "El fraude de la Independencia | Los héroes que nos inventaron",
    resumen: "Nos enseñaron que la Independencia de México fue una lucha entre héroes perfectos y villanos absolutos. Pero la historia real es mucho más complicada.",
    publicadaEn: "2026-09-11T17:30:06-07:00",
  },
  {
    youtubeId: "rtuVtIqDWNU",
    titulo: "El territorio que nos robaron: cómo México perdió el norte",
    resumen: "Nos enseñaron que Santa Anna vendió más de la mitad de México. Pero ¿realmente fue así?\nEn este video quiero platicarles cómo comenzó el conflicto por Texas, qué intereses tenía Estados Unidos, quiénes participaron en la guerra y cómo el Tratado de…",
    publicadaEn: "2026-09-18T18:00:06-07:00",
  },
  {
    youtubeId: "oXVUqw8lN0c",
    titulo: "Las Madres De La Patria",
    resumen: "La historia de México suele contarse a través de conquistadores, insurgentes, presidentes y revolucionarios. Pero ¿qué ocurrió con las mujeres que también construyeron este país?",
    publicadaEn: "2026-09-16T23:31:51-07:00",
  },
  {
    youtubeId: "H9LewIvmxC0",
    titulo: "Las Mentiras Que Te Contaron Sobre México",
    resumen: "Durante generaciones nos han repetido mentiras sobre México hasta convertirlas en verdades.",
    publicadaEn: "2026-09-23T15:00:09-07:00",
  },
  {
    youtubeId: "dXA1gFc7jTU",
    titulo: "Toltecas: el origen de una antigua grandeza mexicana",
    resumen: "Hoy quiero platicarles sobre el linaje tolteca y la herencia que continúa viva en México. Ser tolteca no solamente significaba pertenecer a un pueblo: representaba conocimiento, disciplina, arte y sabiduría. Pero ¿somos realmente sus descendientes o…",
    publicadaEn: "2026-09-04T21:00:06-07:00",
  },
  {
    youtubeId: "hvrZSy_SI3k",
    titulo: "Así nació la Nueva España | El México que no te contaron",
    resumen: "¿Qué fue realmente la Nueva España? Después de la caída de Tenochtitlan no simplemente desapareció un mundo para ser sustituido por otro. Comenzó un proceso mucho más complejo: la transformación y mezcla de pueblos, culturas, lenguas, creencias y…",
    publicadaEn: "2026-08-14T19:30:06-07:00",
  },
  {
    youtubeId: "zn1WGF5HybE",
    titulo: "La traición de Texcoco | El principio del fin del Imperio mexica",
    resumen: "Cuando hablamos de la Conquista de México, solemos pensar únicamente en el enfrentamiento entre españoles y mexicas. Sin embargo, la historia fue mucho más compleja.",
    publicadaEn: "2026-08-05T21:12:21-07:00",
  },
  {
    youtubeId: "ySYF63Q5YgI",
    titulo: "La Guerra Cristera | La guerra que dividió a México",
    resumen: "La Guerra Cristera fue uno de los conflictos más intensos y menos comprendidos de la historia de México. Entre 1926 y 1929, miles de mexicanos tomaron las armas en un enfrentamiento que tuvo como origen las tensiones entre el Estado y la Iglesia, pero que…",
    publicadaEn: "2026-07-31T19:30:07-07:00",
  },
  {
    youtubeId: "-dPjI4mobsM",
    titulo: "El platillo que cuenta la historia de México",
    resumen: "Hay platillos que simplemente se comen… y otros que cuentan la historia de un país. En este video nos sentamos a probar uno de los grandes símbolos de la gastronomía mexicana: el Chile en Nogada.",
    publicadaEn: "2026-08-19T16:00:06-07:00",
  },
  {
    youtubeId: "QoRuaXjaboU",
    titulo: "¿QUÉ ES EL ESTOICISMO? | La filosofía para tiempos difíciles",
    resumen: "¿Qué es realmente el estoicismo? ¿Una filosofía para soportar el sufrimiento, una forma de controlar las emociones o una guía para vivir mejor?",
    publicadaEn: "2026-09-25T17:00:06-07:00",
  },
];
