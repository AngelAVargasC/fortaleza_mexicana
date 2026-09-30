import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // version inmersiva respaldada en el baul: no se lintea
    "src/lib/motor/**",
  ]),
  {
    rules: {
      // imagenes estaticas en /public, servidas tal cual: no hace falta next/image
      "@next/next/no-img-element": "off",
      // enlaces <a> normales a proposito (web/CLAUDE.md): lib/interfaz.js
      // necesita una carga completa por pagina, next/link no la hace
      "@next/next/no-html-link-for-pages": "off",
    },
  },
]);

export default eslintConfig;
