import { Footer } from "@/components/layout/Footer";
import { Registro } from "@/components/ui/Registro";

/* Destino del QR de registro: una sola cosa que hacer, sin distracciones. */
export const metadata = {
  title: "Regístrate",
  description: "Regístrate como parte de Fortaleza Mexicana y recibe el calendario de actividades por WhatsApp o correo.",
};

export default function Page() {
  return (
    <>
<main id="contenido" className="pag-registro">
<section className="sec">
  <div className="wrap">
    <Registro
      modo="miembro"
      h1
      eyebrow="Regístrate"
      titulo={<>Sé parte de<br />Fortaleza Mexicana</>}
      texto="Déjanos tus datos y sé de los primeros: te escribimos con las fechas en el Frontón México, los estrenos de las propiedades y los primeros cursos y workshops."
    />
  </div>
</section>
</main>
      <Footer />
    </>
  );
}
