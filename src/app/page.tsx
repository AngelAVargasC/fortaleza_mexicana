import { HomeContent } from "@/components/home/HomeContent";

export const metadata = {
  /* la plantilla de titulo del layout no aplica a su propio segmento */
  title: "Fortaleza Mexicana — Ideas que se viven",
  description:
    "Contenidos, programas y eventos para desarrollar tu criterio, ampliar tu visión y conectar con una comunidad que construye el futuro.",
};

/* Home clasica (DEC-028). La version con motor 3D vive en baul/v3-web-inmersiva. */
export default function Home() {
  return <HomeContent />;
}
