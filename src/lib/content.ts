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

export const serviceDetails: Record<
  string,
  {
    enScope: string;
    esScope: string;
    enWork: string[];
    esWork: string[];
    enProcess: string[];
    esProcess: string[];
  }
> = {
  kitchen: {
    enScope:
      "Kitchen remodeling can include selective demolition, layout changes, cabinet and appliance coordination, lighting, plumbing adjustments, surfaces, flooring, and finish installation. The exact scope is defined after existing conditions and project priorities are reviewed.",
    esScope:
      "La remodelación de cocina puede incluir demolición selectiva, cambios de distribución, coordinación de gabinetes y electrodomésticos, iluminación, ajustes de plomería, superficies, pisos e instalación de acabados. El alcance se define después de revisar las condiciones existentes y las prioridades.",
    enWork: ["Selective demolition and site protection", "Cabinet, appliance, and utility coordination", "Countertops, tile, lighting, and finish installation"],
    esWork: ["Demolición selectiva y protección del sitio", "Coordinación de gabinetes, aparatos e instalaciones", "Instalación de cubiertas, azulejo, iluminación y acabados"],
    enProcess: ["Document how the current kitchen works", "Confirm layout, selections, and construction scope", "Coordinate trades and install in sequence", "Complete finish review and closeout"],
    esProcess: ["Documentar cómo funciona la cocina actual", "Confirmar distribución, selecciones y alcance de obra", "Coordinar oficios e instalar en secuencia", "Realizar revisión final y cierre"],
  },
  bathroom: {
    enScope:
      "Bathroom work centers on wet-area construction, waterproofing, ventilation, plumbing fixtures, electrical and lighting, tile, storage, and durable finish details. Existing moisture conditions and access are evaluated before the build plan is finalized.",
    esScope:
      "El trabajo de baño se enfoca en áreas húmedas, impermeabilización, ventilación, plomería, electricidad e iluminación, azulejo, almacenamiento y acabados duraderos. Las condiciones de humedad y acceso se evalúan antes de cerrar el plan de obra.",
    enWork: ["Demolition and substrate assessment", "Plumbing, electrical, ventilation, and waterproofing", "Tile, vanity, fixture, glass, and finish installation"],
    esWork: ["Demolición y evaluación de superficies", "Plomería, electricidad, ventilación e impermeabilización", "Instalación de azulejo, tocador, accesorios, vidrio y acabados"],
    enProcess: ["Assess layout and wet-area conditions", "Confirm fixture locations and finish details", "Build and inspect concealed work", "Install finishes and test fixtures"],
    esProcess: ["Evaluar distribución y áreas húmedas", "Confirmar ubicaciones y acabados", "Construir y revisar trabajos ocultos", "Instalar acabados y probar accesorios"],
  },
  "whole-home": {
    enScope:
      "A whole-home remodel coordinates multiple rooms, circulation, structural changes, building systems, flooring, millwork, and finishes as one construction program. Sequencing and protection of occupied or retained areas are central to planning.",
    esScope:
      "Una remodelación integral coordina varias habitaciones, circulación, cambios estructurales, sistemas, pisos, carpintería y acabados como un solo programa de construcción. La secuencia y protección de áreas conservadas son esenciales.",
    enWork: ["Coordinated demolition and structural modifications", "Mechanical, electrical, and plumbing integration", "Room-to-room finish and millwork installation"],
    esWork: ["Demolición coordinada y modificaciones estructurales", "Integración mecánica, eléctrica y de plomería", "Instalación continua de acabados y carpintería"],
    enProcess: ["Document the home and define priorities", "Develop a coordinated scope and sequence", "Manage phased construction and trade work", "Review systems, finishes, and completion items"],
    esProcess: ["Documentar la vivienda y definir prioridades", "Desarrollar alcance y secuencia coordinados", "Administrar fases de obra y oficios", "Revisar sistemas, acabados y pendientes"],
  },
  adu: {
    enScope:
      "Additions and ADUs involve feasibility, site access, connections to the existing home or utilities, structure, weatherproofing, interior build-out, and coordination with applicable local review and permitting requirements.",
    esScope:
      "Las ampliaciones y ADUs implican factibilidad, acceso al sitio, conexiones con la vivienda o servicios existentes, estructura, protección climática, construcción interior y coordinación con revisiones y permisos locales aplicables.",
    enWork: ["Site and existing-condition evaluation", "Foundation, framing, enclosure, and utility coordination", "Interior build-out and exterior connections"],
    esWork: ["Evaluación del sitio y condiciones existentes", "Coordinación de cimentación, estructura, envolvente y servicios", "Construcción interior y conexiones exteriores"],
    enProcess: ["Review goals, site constraints, and feasibility", "Confirm scope and required project documentation", "Build structure, enclosure, and systems", "Complete interiors, site work, and final review"],
    esProcess: ["Revisar objetivos, limitaciones y factibilidad", "Confirmar alcance y documentación requerida", "Construir estructura, envolvente y sistemas", "Completar interiores, sitio y revisión final"],
  },
  flooring: {
    enScope:
      "Flooring and finish carpentry work includes substrate preparation, transitions, hardwood or engineered flooring, doors, casing, baseboards, paneling, stairs, and the precise visible details that complete a remodel.",
    esScope:
      "Los pisos y la carpintería de acabados incluyen preparación de superficies, transiciones, madera natural o de ingeniería, puertas, marcos, zoclos, paneles, escaleras y los detalles visibles que completan la remodelación.",
    enWork: ["Subfloor and existing-condition preparation", "Flooring layout, installation, and transitions", "Trim, doors, paneling, stairs, and final detailing"],
    esWork: ["Preparación del subsuelo y condiciones existentes", "Distribución, instalación y transiciones de piso", "Molduras, puertas, paneles, escaleras y detalle final"],
    enProcess: ["Measure and assess substrates", "Plan transitions, profiles, and material quantities", "Install flooring and architectural woodwork", "Complete fitting, finishing, and touch-ups"],
    esProcess: ["Medir y evaluar superficies", "Planear transiciones, perfiles y cantidades", "Instalar pisos y carpintería arquitectónica", "Completar ajustes, acabados y retoques"],
  },
  exterior: {
    enScope:
      "Exterior renovation may address siding, openings, entries, trim, weather-resistive layers, exterior finishes, and connections to patios or outdoor living areas. Existing envelope conditions determine the appropriate repair and construction sequence.",
    esScope:
      "La renovación exterior puede abarcar revestimientos, vanos, accesos, molduras, barreras contra clima, acabados y conexiones con patios. Las condiciones de la envolvente determinan la secuencia de reparación y construcción.",
    enWork: ["Exterior condition and water-management review", "Selective removal, repair, and opening modifications", "Siding, trim, entry, coating, and detail installation"],
    esWork: ["Revisión de condiciones y manejo de agua", "Retiro selectivo, reparación y modificación de vanos", "Instalación de revestimientos, molduras, acceso y acabados"],
    enProcess: ["Inspect the existing exterior assembly", "Define repairs, materials, and sequencing", "Complete enclosure work and exterior finishes", "Review weather protection and final details"],
    esProcess: ["Inspeccionar la envolvente existente", "Definir reparaciones, materiales y secuencia", "Completar cerramientos y acabados exteriores", "Revisar protección climática y detalles finales"],
  },
  carpentry: {
    enScope:
      "Custom carpentry and built-ins move from field measurements to shop-ready details, material and hardware selection, fabrication, site fitting, installation, and finishing. Coordination with walls, flooring, lighting, and technology is planned in advance.",
    esScope:
      "La carpintería a medida pasa de medidas en sitio a detalles de fabricación, selección de materiales y herrajes, fabricación, ajuste, instalación y acabado. Se coordina con muros, pisos, iluminación y tecnología desde el inicio.",
    enWork: ["Field measurement and detailed layout", "Material, hardware, and fabrication coordination", "Site fitting, installation, and finish work"],
    esWork: ["Medición en sitio y trazado detallado", "Coordinación de materiales, herrajes y fabricación", "Ajuste, instalación y acabado en sitio"],
    enProcess: ["Measure the space and define functional needs", "Resolve dimensions, materials, and hardware", "Fabricate and prepare site conditions", "Install, align, finish, and review"],
    esProcess: ["Medir el espacio y definir necesidades", "Resolver dimensiones, materiales y herrajes", "Fabricar y preparar condiciones del sitio", "Instalar, alinear, terminar y revisar"],
  },
};
export function pathInfo(path: string) {
  const clean = path === "/" ? "/" : path.replace(/\/$/, "");
  const lang: Lang = clean.startsWith("/es") ? "es" : "en";
  const equivalent = lang === "en" ? routePairs[clean] : reversePairs[clean];
  const service = services.find((s) =>
    clean.endsWith(lang === "en" ? s.enSlug : s.esSlug),
  );
  return { lang, equivalent, service, clean };
}
