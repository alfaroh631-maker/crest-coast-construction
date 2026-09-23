export type Lang = "en" | "es";
export const services = [
  {
    key: "kitchen",
    enSlug: "kitchen-remodeling",
    esSlug: "remodelacion-de-cocinas",
    image: "/images/kitchen.webp",
    en: "Kitchen Remodeling",
    es: "Remodelación de Cocinas",
    enIntro:
      "A kitchen planned around movement, storage, light, and the way your household gathers.",
    esIntro:
      "Una cocina planeada alrededor del movimiento, el almacenamiento, la luz y la forma en que convive tu familia.",
    enFocus: [
      "Layout and workflow planning",
      "Cabinetry and island integration",
      "Lighting, surfaces, and finish coordination",
    ],
    esFocus: [
      "Planeación de distribución y flujo",
      "Integración de gabinetes e isla",
      "Coordinación de iluminación, superficies y acabados",
    ],
  },
  {
    key: "bathroom",
    enSlug: "bathroom-remodeling",
    esSlug: "remodelacion-de-banos",
    image: "/images/bathroom.webp",
    en: "Bathroom Remodeling",
    es: "Remodelación de Baños",
    enIntro:
      "Calm, durable bathrooms shaped by careful space planning and material choices.",
    esIntro:
      "Baños serenos y duraderos, definidos por una distribución cuidadosa y materiales bien elegidos.",
    enFocus: [
      "Shower and wet-area planning",
      "Vanity and storage design",
      "Tile, fixtures, and lighting",
    ],
    esFocus: [
      "Planeación de regadera y áreas húmedas",
      "Diseño de tocador y almacenamiento",
      "Azulejo, accesorios e iluminación",
    ],
  },
  {
    key: "whole-home",
    enSlug: "whole-home-remodeling",
    esSlug: "remodelacion-integral",
    image: "/images/whole-home.webp",
    en: "Whole-Home Remodeling",
    es: "Remodelación Integral",
    enIntro:
      "A coordinated approach to rethinking flow, finishes, and function across the entire home.",
    esIntro:
      "Un enfoque coordinado para replantear el flujo, los acabados y la función de toda la casa.",
    enFocus: [
      "Unified design direction",
      "Room-to-room sequencing",
      "Consistent material transitions",
    ],
    esFocus: [
      "Dirección de diseño unificada",
      "Secuencia entre espacios",
      "Transiciones consistentes de materiales",
    ],
  },
  {
    key: "adu",
    enSlug: "room-additions-adus",
    esSlug: "ampliaciones-y-adus",
    image: "/images/adu.webp",
    en: "Room Additions & ADUs",
    es: "Ampliaciones y ADUs",
    enIntro:
      "Purposeful new space designed to feel connected to the existing home and site.",
    esIntro:
      "Espacios nuevos y funcionales, diseñados para integrarse con la casa y el terreno existentes.",
    enFocus: [
      "Addition and ADU planning",
      "Indoor-outdoor connections",
      "Material continuity with the main home",
    ],
    esFocus: [
      "Planeación de ampliaciones y ADUs",
      "Conexiones entre interior y exterior",
      "Continuidad de materiales con la casa principal",
    ],
  },
  {
    key: "flooring",
    enSlug: "flooring-finish-carpentry",
    esSlug: "pisos-y-carpinteria-de-acabados",
    image: "/images/flooring.webp",
    en: "Flooring & Finish Carpentry",
    es: "Pisos y Carpintería de Acabados",
    enIntro:
      "Precise finish work that gives rooms rhythm, warmth, and a resolved architectural character.",
    esIntro:
      "Acabados precisos que aportan ritmo, calidez y carácter arquitectónico a cada espacio.",
    enFocus: [
      "Hardwood and engineered flooring",
      "Trim, paneling, and stair details",
      "Transitions and final detailing",
    ],
    esFocus: [
      "Pisos de madera natural e ingeniería",
      "Molduras, paneles y detalles de escalera",
      "Transiciones y detalles finales",
    ],
  },
  {
    key: "exterior",
    enSlug: "exterior-renovations",
    esSlug: "renovaciones-exteriores",
    image: "/images/exterior.webp",
    en: "Exterior Renovations",
    es: "Renovaciones Exteriores",
    enIntro:
      "Exterior improvements that strengthen curb appeal while respecting the home’s architecture.",
    esIntro:
      "Mejoras exteriores que realzan la fachada respetando la arquitectura original de la vivienda.",
    enFocus: [
      "Facade and entry updates",
      "Exterior material coordination",
      "Architectural detail refinement",
    ],
    esFocus: [
      "Actualización de fachada y acceso",
      "Coordinación de materiales exteriores",
      "Refinamiento de detalles arquitectónicos",
    ],
  },
  {
    key: "carpentry",
    enSlug: "custom-carpentry-built-ins",
    esSlug: "carpinteria-a-medida-y-empotrados",
    image: "/images/carpentry.webp",
    en: "Custom Carpentry & Built-Ins",
    es: "Carpintería a Medida y Muebles Empotrados",
    enIntro:
      "Tailored millwork that turns overlooked walls and corners into useful, lasting features.",
    esIntro:
      "Carpintería personalizada que convierte muros y rincones en elementos útiles y duraderos.",
    enFocus: [
      "Built-in storage and shelving",
      "Window seats and media walls",
      "Material and hardware detailing",
    ],
    esFocus: [
      "Almacenamiento y libreros empotrados",
      "Bancas de ventana y muros de entretenimiento",
      "Detalles de materiales y herrajes",
    ],
  },
] as const;
export const routePairs: Record<string, string> = {
  "/": "/es",
  "/services": "/es/servicios",
  "/projects": "/es/proyectos",
  "/about": "/es/nosotros",
  "/areas-we-serve": "/es/areas-de-servicio",
  "/reviews": "/es/testimonios",
  "/faq": "/es/preguntas-frecuentes",
  "/contact": "/es/contacto",
  "/book": "/es/agendar",
  "/privacy-policy": "/es/politica-de-privacidad",
  "/terms-of-service": "/es/terminos-de-servicio",
};
services.forEach(
  (s) => (routePairs[`/services/${s.enSlug}`] = `/es/servicios/${s.esSlug}`),
);
export const reversePairs = Object.fromEntries(
  Object.entries(routePairs).map(([a, b]) => [b, a]),
);
export const allPaths = [
  ...Object.keys(routePairs),
  ...Object.values(routePairs),
];
export function pathInfo(path: string) {
  const clean = path === "/" ? "/" : path.replace(/\/$/, "");
  const lang: Lang = clean.startsWith("/es") ? "es" : "en";
  const equivalent = lang === "en" ? routePairs[clean] : reversePairs[clean];
  const service = services.find((s) =>
    clean.endsWith(lang === "en" ? s.enSlug : s.esSlug),
  );
  return { lang, equivalent, service, clean };
}
