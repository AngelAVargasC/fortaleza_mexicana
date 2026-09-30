import { redirect } from "next/navigation";
import { usuarioActual } from "@/server/auth";
import { FormEntrar } from "@/admin/ui/FormEntrar";

export const metadata = { title: "Entrar" };

export default async function Page() {
  if (await usuarioActual()) redirect("/admin");
  return (
    <main className="adm-entrar">
      <div className="adm-entrar-caja">
        <img src="/marca/logo-blanco.webp" alt="Fortaleza Mexicana" className="adm-logo" />
        <h1 className="adm-h1">Panel</h1>
        <FormEntrar />
      </div>
    </main>
  );
}
