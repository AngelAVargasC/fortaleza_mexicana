import type { SVGProps } from "react";

/* Iconografia del kit: lineal, 2 px, esquinas redondeadas. */
function Base({ children, ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const Ico = {
  Chev: () => <Base><path d="M6 9l6 6 6-6" /></Base>,
  Flecha: () => <Base><path d="M5 12h14M13 6l6 6-6 6" /></Base>,
  Izq: () => <Base><path d="M15 6l-6 6 6 6" /></Base>,
  Der: () => <Base><path d="M9 6l6 6-6 6" /></Base>,
  Lupa: () => <Base><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></Base>,
  Cal: () => <Base><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 11h18" /></Base>,
  Pin: () => <Base><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></Base>,
  Mod: () => <Base><rect x="2" y="4" width="20" height="13" rx="2" /><path d="M8 21h8" /></Base>,
  Check: () => <Base><path d="M20 6L9 17l-5-5" /></Base>,
  Sobre: () => <Base><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></Base>,
  Chat: () => <Base><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" /></Base>,
  Externo: () => <Base><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></Base>,
  Reloj: () => <Base><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Base>,
  Micro: () => <Base><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></Base>,
  Play: () => <Base><circle cx="12" cy="12" r="9" /><path d="M10 8.5v7l6-3.5z" /></Base>,
  Red: () => <Base><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M15 14.5c3 0 6 1.9 6 5" /></Base>,
  Ticket: () => <Base><path d="M3 8a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2v-2a2 2 0 0 0 0-4z" /><path d="M14 6v12" /></Base>,
  Libro: () => <Base><path d="M4 5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0-2 2z" /><path d="M4 19V5" /></Base>,
  Comilla: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M9.6 6C6.5 7.6 4.8 10.2 4.8 13.4c0 2.7 1.6 4.6 3.9 4.6 2 0 3.5-1.5 3.5-3.4 0-1.9-1.3-3.3-3.1-3.3-.3 0-.6 0-.8.1.4-1.5 1.6-2.9 3.2-3.8L9.6 6zm8.5 0c-3.1 1.6-4.8 4.2-4.8 7.4 0 2.7 1.6 4.6 3.9 4.6 2 0 3.5-1.5 3.5-3.4 0-1.9-1.3-3.3-3.1-3.3-.3 0-.6 0-.8.1.4-1.5 1.6-2.9 3.2-3.8L18.1 6z" />
    </svg>
  ),
};
