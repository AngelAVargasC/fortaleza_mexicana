import Script from "next/script";

/* Microsoft Clarity (mapas de calor y grabaciones de sesion) solo en el
   sitio publico, no en /admin. Se activa con NEXT_PUBLIC_CLARITY_ID (el ID
   del proyecto en clarity.microsoft.com); sin la variable no carga nada.
   Clarity enmascara por defecto lo que se escribe en los formularios. */
const ID = process.env.NEXT_PUBLIC_CLARITY_ID ?? "";

export function Clarity() {
  if (!/^[a-z0-9]{6,20}$/i.test(ID)) return null;
  return (
    <Script id="clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${ID}");`}
    </Script>
  );
}
