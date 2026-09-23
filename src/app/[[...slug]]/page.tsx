import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer, Header } from "@/components/site";
import { allPaths, pathInfo, serviceDetails, services } from "@/lib/content";

const site = "https://crest-coast-construction.vercel.app";
type Props = { params: Promise<{ slug?: string[] }> };
const projects = [
  {
    image: "/images/project-kitchen.webp",
    en: "Modern Kitchen Remodel",
    es: "Remodelación de Cocina Moderna",
    enCat: "Kitchen",
    esCat: "Cocina",
    enD: "A warm, highly functional kitchen concept centered on custom storage and natural materials.",
    esD: "Una cocina cálida y funcional enfocada en almacenamiento a medida y materiales naturales.",
  },
  {
    image: "/images/project-bathroom.webp",
    en: "Primary Bathroom Renovation",
    es: "Renovación de Baño Principal",
    enCat: "Bathroom",
    esCat: "Baño",
    enD: "A quiet retreat concept balancing stone, oak, and soft natural light.",
    esD: "Un concepto sereno que equilibra piedra, roble y luz natural suave.",
  },
  {
    image: "/images/project-whole-home.webp",
    en: "Whole-Home Interior Remodel",
    es: "Remodelación Interior Integral",
    enCat: "Whole Home",
    esCat: "Casa Completa",
    enD: "Connected living spaces with a consistent architectural and material language.",
    esD: "Espacios conectados mediante un lenguaje arquitectónico y material consistente.",
  },
  {
    image: "/images/project-adu.webp",
    en: "Santa Barbara ADU",
    es: "ADU en Santa Barbara",
    enCat: "Addition",
    esCat: "Ampliación",
    enD: "An efficient guest space designed around daylight, storage, and garden access.",
    esD: "Un espacio eficiente para huéspedes, diseñado alrededor de la luz y el jardín.",
  },
  {
    image: "/images/project-exterior.webp",
    en: "Exterior Renovation",
    es: "Renovación Exterior",
    enCat: "Exterior",
    esCat: "Exterior",
    enD: "A refreshed rear elevation that strengthens indoor-outdoor living.",
    esD: "Una fachada posterior renovada que fortalece la conexión interior-exterior.",
  },
  {
    image: "/images/project-built-in.webp",
    en: "Custom Built-In Project",
    es: "Proyecto de Carpintería a Medida",
    enCat: "Carpentry",
    esCat: "Carpintería",
    enD: "Integrated dining storage and seating crafted as part of the architecture.",
    esD: "Almacenamiento y asientos integrados como parte de la arquitectura.",
  },
];
const serviceFaqs: Record<
  string,
  Array<{ enQ: string; enA: string; esQ: string; esA: string }>
> = {
  kitchen: [
    {
      enQ: "Can the existing kitchen layout be changed?",
      enA: "Often, yes. The right approach depends on circulation goals, existing conditions, and how the kitchen connects to nearby rooms.",
      esQ: "¿Se puede cambiar la distribución actual?",
      esA: "Con frecuencia sí. El enfoque depende de la circulación, las condiciones existentes y la conexión con espacios cercanos.",
    },
    {
      enQ: "Can cabinetry and finish selections be coordinated together?",
      enA: "Yes. Cabinetry, counters, tile, fixtures, and lighting are considered as one material composition.",
      esQ: "¿Se pueden coordinar gabinetes y acabados?",
      esA: "Sí. Gabinetes, cubiertas, azulejo, accesorios e iluminación se consideran como una sola composición.",
    },
    {
      enQ: "What should we identify before a kitchen consultation?",
      enA: "Note the daily problems to solve, essential storage or appliances, and how you want the room to support gathering.",
      esQ: "¿Qué conviene definir antes de la consulta?",
      esA: "Identifica los problemas diarios, el almacenamiento o equipo indispensable y cómo deseas convivir en el espacio.",
    },
  ],
  bathroom: [
    {
      enQ: "Can a bathroom feel larger without an addition?",
      enA: "A clearer layout, continuous materials, improved lighting, and efficient storage can make the existing footprint feel more open.",
      esQ: "¿Un baño puede sentirse más amplio sin una ampliación?",
      esA: "Una mejor distribución, materiales continuos, iluminación y almacenamiento eficiente pueden abrir el espacio.",
    },
    {
      enQ: "Can the scope include a custom vanity?",
      enA: "Yes. Vanity storage can be planned alongside fixtures, lighting, tile transitions, and wet-area details.",
      esQ: "¿El proyecto puede incluir un tocador a medida?",
      esA: "Sí. El almacenamiento puede planearse junto con accesorios, iluminación, azulejo y áreas húmedas.",
    },
    {
      enQ: "Do you present guest bath and powder-room concepts?",
      enA: "Yes. The approach is adjusted to the room’s scale, use, privacy needs, and architectural context.",
      esQ: "¿Trabajan baños de visitas y medios baños?",
      esA: "Sí. El enfoque se adapta a la escala, el uso, la privacidad y el contexto arquitectónico.",
    },
  ],
  "whole-home": [
    {
      enQ: "What makes a whole-home remodel different?",
      enA: "It coordinates circulation, room relationships, building systems, and material continuity instead of treating rooms in isolation.",
      esQ: "¿Qué distingue una remodelación integral?",
      esA: "Coordina circulación, relación entre habitaciones, sistemas y continuidad de materiales, no espacios aislados.",
    },
    {
      enQ: "Can the work be planned in phases?",
      enA: "Depending on the scope, logical phases can be considered while protecting a consistent long-term direction.",
      esQ: "¿La obra puede planearse por etapas?",
      esA: "Según el alcance, pueden considerarse fases lógicas sin perder una dirección común a largo plazo.",
    },
    {
      enQ: "Can original character be preserved?",
      enA: "Yes. Valuable architectural qualities can guide new layouts, details, and compatible material choices.",
      esQ: "¿Se puede conservar el carácter original?",
      esA: "Sí. Las cualidades valiosas pueden guiar la nueva distribución, los detalles y los materiales compatibles.",
    },
  ],
  adu: [
    {
      enQ: "How is an addition different from an ADU?",
      enA: "An addition expands the main home; an ADU is an independent living unit. Use, site, and local requirements shape the choice.",
      esQ: "¿Cuál es la diferencia entre una ampliación y un ADU?",
      esA: "La ampliación extiende la casa principal; un ADU es una vivienda independiente. El uso, terreno y requisitos locales orientan la decisión.",
    },
    {
      enQ: "Can new space feel connected to the existing home?",
      enA: "Yes. Proportion, access, roof form, openings, and materials can create a deliberate relationship between old and new.",
      esQ: "¿El espacio nuevo puede integrarse con la casa?",
      esA: "Sí. Proporción, acceso, cubierta, vanos y materiales pueden crear una relación intencional.",
    },
    {
      enQ: "What site factors influence an ADU concept?",
      enA: "Access, privacy, daylight, landscape, existing structures, and applicable local requirements all matter.",
      esQ: "¿Qué condiciones influyen en un ADU?",
      esA: "Importan el acceso, la privacidad, la luz, el paisaje, las estructuras existentes y los requisitos locales.",
    },
  ],
  flooring: [
    {
      enQ: "Can new flooring meet existing flooring cleanly?",
      enA: "Often. Transitions, board direction, thickness, species, and selective refinishing are evaluated together.",
      esQ: "¿El piso nuevo puede unirse bien con el existente?",
      esA: "Con frecuencia sí. Se evalúan transiciones, dirección, espesor, especie y renovación selectiva.",
    },
    {
      enQ: "What is included in finish carpentry?",
      enA: "It can include baseboards, casings, doors, paneling, stair details, and other visible architectural woodwork.",
      esQ: "¿Qué incluye la carpintería de acabados?",
      esA: "Puede incluir zoclos, marcos, puertas, paneles, escaleras y otros elementos visibles de madera.",
    },
    {
      enQ: "Can this be coordinated with a larger remodel?",
      enA: "Yes. Flooring and trim are most cohesive when planned with adjacent rooms and other construction work.",
      esQ: "¿Puede coordinarse con una remodelación mayor?",
      esA: "Sí. Pisos y molduras logran mayor coherencia al planearse con espacios contiguos y otras obras.",
    },
  ],
  exterior: [
    {
      enQ: "Can an exterior be modernized without losing its character?",
      enA: "Yes. Selective changes to openings, color, materials, and details can clarify the architecture while respecting the home.",
      esQ: "¿Se puede modernizar sin perder carácter?",
      esA: "Sí. Cambios selectivos de vanos, color, materiales y detalles pueden aclarar la arquitectura sin perder su esencia.",
    },
    {
      enQ: "Can the entry be part of the renovation?",
      enA: "Yes. Doors, lighting, steps, and adjacent materials can be coordinated to create a stronger arrival.",
      esQ: "¿La entrada puede formar parte del proyecto?",
      esA: "Sí. Puertas, iluminación, escalones y materiales pueden coordinarse para crear una mejor llegada.",
    },
    {
      enQ: "Do exterior concepts consider indoor-outdoor flow?",
      enA: "Yes. Openings, patios, and material transitions can strengthen visual and physical connections to outdoor living areas.",
      esQ: "¿Consideran la conexión interior-exterior?",
      esA: "Sí. Vanos, patios y transiciones pueden fortalecer la conexión visual y física con las áreas exteriores.",
    },
  ],
  carpentry: [
    {
      enQ: "Can built-ins match existing woodwork?",
      enA: "The design can echo existing species, profiles, or finishes, or introduce a complementary material with clear intent.",
      esQ: "¿Los empotrados pueden combinar con la madera existente?",
      esA: "El diseño puede retomar especies, perfiles o acabados existentes, o introducir un material complementario.",
    },
    {
      enQ: "Can a built-in conceal technology?",
      enA: "Yes. Cable paths, ventilation, equipment access, and closed storage can be incorporated into the design.",
      esQ: "¿Un empotrado puede ocultar tecnología?",
      esA: "Sí. El diseño puede integrar cableado, ventilación, acceso a equipos y almacenamiento cerrado.",
    },
    {
      enQ: "Where can custom built-ins be useful?",
      enA: "Living rooms, offices, entries, bedrooms, dining areas, and overlooked transition spaces can all benefit.",
      esQ: "¿Dónde pueden funcionar los empotrados?",
      esA: "Pueden aprovecharse en salas, oficinas, entradas, recámaras, comedores y espacios de transición.",
    },
  ],
};
const relatedServices: Record<string, string[]> = {
  kitchen: ["bathroom", "whole-home", "carpentry"],
  bathroom: ["kitchen", "whole-home", "flooring"],
  "whole-home": ["kitchen", "bathroom", "flooring"],
  adu: ["exterior", "whole-home", "carpentry"],
  flooring: ["carpentry", "whole-home", "kitchen"],
  exterior: ["adu", "whole-home", "flooring"],
  carpentry: ["flooring", "kitchen", "whole-home"],
};
function getPath(slug?: string[]) {
  return slug?.length ? `/${slug.join("/")}` : "/";
}
export function generateStaticParams() {
  return allPaths.map((p) => ({
    slug: p === "/" ? [] : p.slice(1).split("/"),
  }));
}
function typeFromPath(clean: string) {
  if (clean.includes("privacy") || clean.includes("politica")) return "privacy";
  if (clean.includes("terms") || clean.includes("terminos")) return "terms";
  if (clean === "/contact" || clean === "/es/contacto") return "contact";
  if (clean === "/book" || clean === "/es/agendar") return "book";
  if (clean === "/services" || clean === "/es/servicios") return "services";
  if (clean.includes("projects") || clean.includes("proyectos"))
    return "projects";
  if (clean.includes("about") || clean.includes("nosotros")) return "about";
  if (clean.includes("areas-we-serve") || clean.includes("areas-de-servicio"))
    return "areas";
  if (clean.includes("reviews") || clean.includes("testimonios"))
    return "reviews";
  if (clean.includes("faq") || clean.includes("preguntas-frecuentes"))
    return "faq";
  return "home";
}
const pageMeta = {
  home: {
    en: [
      "Residential Construction & Remodeling in Santa Barbara",
      "Kitchen and bathroom remodeling, additions, ADUs, and whole-home renovations in Santa Barbara, Goleta, Montecito, and Carpinteria.",
    ],
    es: [
      "Construcción y Remodelación Residencial en Santa Barbara",
      "Remodelación de cocinas y baños, ampliaciones, ADUs y renovaciones integrales en Santa Barbara, Goleta, Montecito y Carpinteria.",
    ],
  },
  services: {
    en: [
      "Residential Remodeling Services",
      "Explore kitchen, bathroom, whole-home, addition, exterior, flooring, and custom carpentry services.",
    ],
    es: [
      "Servicios de Remodelación Residencial",
      "Explora servicios de cocinas, baños, remodelación integral, ampliaciones, exteriores, pisos y carpintería.",
    ],
  },
  projects: {
    en: [
      "Residential Remodeling Projects",
      "View six fictional residential project studies created for the Crest & Coast demonstration website.",
    ],
    es: [
      "Proyectos de Remodelación Residencial",
      "Conoce seis proyectos residenciales ficticios creados para demostrar el website de Crest & Coast.",
    ],
  },
  about: {
    en: [
      "About Crest & Coast",
      "Learn about the thoughtful, architectural approach behind this fictional Santa Barbara remodeling brand.",
    ],
    es: [
      "Sobre Crest & Coast",
      "Conoce el enfoque cuidadoso y arquitectónico de esta marca ficticia de remodelación en Santa Barbara.",
    ],
  },
  areas: {
    en: [
      "Areas We Serve",
      "Residential remodeling services presented for Santa Barbara, Goleta, Montecito, and Carpinteria.",
    ],
    es: [
      "Áreas de Servicio",
      "Servicios de remodelación residencial presentados para Santa Barbara, Goleta, Montecito y Carpinteria.",
    ],
  },
  reviews: {
    en: [
      "Reviews",
      "Sample testimonials used only to demonstrate the future client reviews experience.",
    ],
    es: [
      "Testimonios",
      "Testimonios de ejemplo utilizados únicamente para demostrar la futura experiencia de opiniones.",
    ],
  },
  faq: {
    en: [
      "Frequently Asked Questions",
      "Answers about Crest & Coast services, service areas, consultation, and demonstration website features.",
    ],
    es: [
      "Preguntas Frecuentes",
      "Respuestas sobre servicios, áreas, consultas y las funciones de demostración del website.",
    ],
  },
  contact: {
    en: [
      "Request a Project Estimate",
      "Share the basic details of a Santa Barbara-area residential remodeling project in this demo form.",
    ],
    es: [
      "Solicita un Estimado de Proyecto",
      "Comparte los datos básicos de una remodelación residencial mediante este formulario de demostración.",
    ],
  },
  book: {
    en: [
      "Book a Free Consultation",
      "A demonstration consultation page prepared for a future GoHighLevel calendar integration.",
    ],
    es: [
      "Agenda una Consulta Gratis",
      "Página de consulta preparada para una futura integración del calendario de GoHighLevel.",
    ],
  },
  privacy: {
    en: [
      "Privacy Policy",
      "Privacy information for the fictional Crest & Coast Construction demonstration website.",
    ],
    es: [
      "Política de Privacidad",
      "Información de privacidad para el website ficticio de demostración de Crest & Coast Construction.",
    ],
  },
  terms: {
    en: [
      "Terms of Service",
      "Terms for the fictional Crest & Coast Construction demonstration website.",
    ],
    es: [
      "Términos de Servicio",
      "Términos para el website ficticio de demostración de Crest & Coast Construction.",
    ],
  },
} as const;
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const path = getPath((await params).slug);
  if (!allPaths.includes(path)) return {};
  const { lang, equivalent, service, clean } = pathInfo(path);
  const es = lang === "es";
  const fallback = pageMeta[typeFromPath(clean) as keyof typeof pageMeta][lang];
  const title = service ? (es ? service.es : service.en) : fallback[0];
  const description = service
    ? es
      ? service.esIntro
      : service.enIntro
    : fallback[1];
  const enPath = lang === "en" ? clean : equivalent;
  const esPath = lang === "es" ? clean : equivalent;
  return {
    title,
    description,
    alternates: {
      canonical: clean,
      languages: { "en-US": enPath, "es-US": esPath, "x-default": enPath },
    },
    openGraph: {
      title,
      description,
      url: `${site}${clean}`,
      locale: es ? "es_US" : "en_US",
      alternateLocale: es ? ["en_US"] : ["es_US"],
      type: "website",
      siteName: "Crest & Coast Construction",
    },
  };
}
function Shell({
  path,
  children,
}: {
  path: string;
  children: React.ReactNode;
}) {
  const i = pathInfo(path);
  return (
    <>
      <Header lang={i.lang} alternate={i.equivalent} />
      <main>{children}</main>
      <Footer lang={i.lang} />
    </>
  );
}
function Cta({ es }: { es: boolean }) {
  return (
    <section className="section finalCta">
      <span className="eyebrow">
        {es ? "Conversemos sobre tu espacio" : "Let’s talk about your space"}
      </span>
      <h2>
        {es
          ? "Construyamos una casa que funcione mejor para tu vida."
          : "Let’s build a home that works better for your life."}
      </h2>
      <Link className="btn light" href={es ? "/es/contacto" : "/contact"}>
        {es ? "Solicitar presupuesto" : "Request an Estimate"} ↗
      </Link>
    </section>
  );
}
function ServiceCards({ es }: { es: boolean }) {
  return (
    <div className="cardGrid">
      {services.map((s) => (
        <article className="serviceCard" key={s.key}>
          <Image
            src={s.image}
            alt={es ? `${s.es} en Santa Barbara` : `${s.en} in Santa Barbara`}
            width={900}
            height={600}
          />
          <div>
            <h3>{es ? s.es : s.en}</h3>
            <p>{es ? s.esIntro : s.enIntro}</p>
            <Link
              className="textLink"
              href={es ? `/es/servicios/${s.esSlug}` : `/services/${s.enSlug}`}
            >
              {es ? "Explorar servicio" : "Explore service"} ↗
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
function ProjectCards({ es }: { es: boolean }) {
  return (
    <div className="projectGrid">
      {projects.map((x) => (
        <article className="projectCard" key={x.en}>
          <Image
            src={x.image}
            alt={es ? x.es : x.en}
            width={1200}
            height={800}
          />
          <div>
            <span className="eyebrow">
              {es ? "Estudio visual de muestra" : "Sample visual study"} · {es ? x.esCat : x.enCat}
            </span>
            <h3>{es ? x.es : x.en}</h3>
            <p>{es ? x.esD : x.enD}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
function Home({ es }: { es: boolean }) {
  return (
    <>
      <section className="hero">
        <div className="heroContent">
          <span className="eyebrow">
            {es
              ? "Santa Barbara · Goleta · Montecito · Carpinteria"
              : "Santa Barbara · Goleta · Montecito · Carpinteria"}
          </span>
          <h1>
            {es
              ? "Construcción y remodelación residencial en Santa Barbara"
              : "Residential Construction & Remodeling in Santa Barbara"}
          </h1>
          <p>
            {es
              ? "Cocinas y baños, ampliaciones, ADUs y renovaciones integrales construidas con planeación clara y atención al detalle."
              : "Kitchen and bathroom remodels, additions, ADUs, and whole-home renovations built with clear planning and careful execution."}
          </p>
          <div className="heroActions">
            <Link className="btn" href={es ? "/es/contacto" : "/contact"}>
              {es ? "Solicitar presupuesto" : "Request an Estimate"}
            </Link>
            <Link
              className="btn ghost"
              href={es ? "/es/proyectos" : "/projects"}
            >
              {es ? "Ver proyectos" : "View Projects"}
            </Link>
          </div>
        </div>
        <p className="demoFlag">
          {es
            ? "Sitio demo · fotografía y contenido visual de muestra"
            : "Demo website · sample photography and visual content"}
        </p>
      </section>
      <section className="credentialBar" aria-label={es ? "Credenciales" : "Credentials"}>
        <strong>{es ? "Antes del lanzamiento" : "Before launch"}</strong>
        <span>{es ? "Licencia: pendiente de verificación" : "License: pending verification"}</span>
        <span>{es ? "Seguro: pendiente de verificación" : "Insurance: pending verification"}</span>
        <span>{es ? "Experiencia: pendiente de verificación" : "Experience: pending verification"}</span>
      </section>
      <section className="section dark">
        <div className="sectionHead">
          <div>
            <span className="eyebrow">
              {es ? "Nuestros servicios" : "Our services"}
            </span>
            <h2>
              {es
                ? "Trabajo residencial, de la estructura al acabado."
                : "Residential work, from structure to finish."}
            </h2>
          </div>
          <p>
            {es
              ? "Cada servicio explica el alcance de construcción, los oficios involucrados y la secuencia prevista."
              : "Each service explains the construction scope, trades involved, and the expected sequence of work."}
          </p>
        </div>
        <ServiceCards es={es} />
      </section>
      <section className="section">
        <div className="sectionHead">
          <div>
            <span className="eyebrow">{es ? "Portafolio demo" : "Demo portfolio"}</span>
            <h2>
              {es ? "La construcción también debe verse." : "Show the build, not only the finish."}
            </h2>
          </div>
          <Link className="textLink" href={es ? "/es/proyectos" : "/projects"}>
            {es ? "Ver todos los proyectos" : "View all projects"} ↗
          </Link>
        </div>
        <ProjectCards es={es} />
        <p className="notice">
          {es
            ? "Estos son estudios visuales de demostración, no proyectos realizados por Crest & Coast. Antes de publicar un caso real deberán agregarse ubicación general, alcance, trabajos realizados y fotografías verificadas de antes, durante y después."
            : "These are demonstration visual studies, not projects completed by Crest & Coast. Before publishing a real case study, add a general location, scope, work performed, and verified before, during, and after photography."}
        </p>
      </section>
      <section className="teamProcess">
        <Image
          src="/images/team-process.webp"
          alt={es ? "Equipo de construcción revisando planos en una obra residencial de muestra" : "Construction team reviewing plans at a sample residential jobsite"}
          width={1600}
          height={1067}
        />
        <div className="teamProcessText">
          <span className="eyebrow">{es ? "Equipo y proceso" : "Team and process"}</span>
          <h2>{es ? "Un proyecto se construye con decisiones claras." : "A project is built through clear decisions."}</h2>
          <p>{es ? "La fotografía muestra una escena generada para esta demostración. Sustituir con el equipo real y su forma de trabajar antes del lanzamiento." : "This photograph is a generated demonstration scene. Replace it with the real team and their actual way of working before launch."}</p>
          <div className="process processFive">
            {[es ? "Evaluación" : "Evaluation", es ? "Presupuesto" : "Estimate", es ? "Planificación" : "Planning", es ? "Construcción" : "Construction", es ? "Entrega" : "Handover"].map((step) => <div className="step" key={step}><h3>{step}</h3></div>)}
          </div>
          <Link className="textLink" href={es ? "/es/nosotros" : "/about"}>{es ? "Conocer el enfoque" : "Explore the approach"} ↗</Link>
        </div>
      </section>
      <section className="section reviewsPreview dark">
        <div className="sectionHead">
          <div>
            <span className="eyebrow">
              {es ? "Testimonios de ejemplo" : "Sample testimonials"}
            </span>
            <h2>
              {es
                ? "Cómo debe sentirse un proceso bien cuidado."
                : "How a considered process should feel."}
            </h2>
          </div>
        </div>
        <div className="reviewGrid">
          {(es
            ? [
                [
                  "El concepto respetó el carácter de nuestra casa y mejoró la manera en que la usamos todos los días.",
                  "Propietario de ejemplo · Santa Barbara",
                ],
                [
                  "Los materiales y la carpintería hicieron que los espacios nuevos se sintieran completamente integrados.",
                  "Propietario de ejemplo · Montecito",
                ],
                [
                  "Agradecimos tener un camino claro desde las primeras ideas hasta la revisión final.",
                  "Propietario de ejemplo · Goleta",
                ],
              ]
            : [
                [
                  "The concept respected the character of our home and improved how we use it every day.",
                  "Sample homeowner · Santa Barbara",
                ],
                [
                  "The materials and millwork made the new spaces feel completely integrated.",
                  "Sample homeowner · Montecito",
                ],
                [
                  "We appreciated having a clear path from the first ideas through the final review.",
                  "Sample homeowner · Goleta",
                ],
              ]
          ).map(([quote, source]) => (
            <blockquote key={source}>
              <p>“{quote}”</p>
              <cite>{source}</cite>
            </blockquote>
          ))}
        </div>
        <p className="sampleNote">
          {es
            ? "Testimonios de ejemplo utilizados únicamente para demostración."
            : "Sample testimonials for demonstration purposes."}
        </p>
      </section>
      <section className="section estimateSection">
        <div>
          <span className="eyebrow">{es ? "Siguiente paso" : "Next step"}</span>
          <h2>{es ? "Cuéntanos qué quieres construir." : "Tell us what you want to build."}</h2>
          <p>{es ? "El formulario continúa como demostración y no transmite información todavía." : "The form remains a demonstration and does not transmit information yet."}</p>
        </div>
        <Link className="btn" href={es ? "/es/contacto" : "/contact"}>{es ? "Solicitar presupuesto" : "Request an Estimate"}</Link>
      </section>
    </>
  );
}
function Faq({ es }: { es: boolean }) {
  const qs = es
    ? [
        [
          "¿Qué tipos de proyectos realizan?",
          "Trabajamos remodelaciones de cocinas y baños, remodelaciones integrales, ampliaciones, ADUs, exteriores y carpintería a medida.",
        ],
        [
          "¿Qué sucede en la consulta inicial?",
          "Conversamos sobre el espacio, tus prioridades, el alcance general y los próximos pasos apropiados.",
        ],
        [
          "¿En qué áreas trabajan?",
          "Atendemos Santa Barbara, Goleta, Montecito y Carpinteria.",
        ],
        [
          "¿El formulario ya envía mi información?",
          "No. Mientras este sitio sea de demostración, el formulario y la agenda no transmiten información.",
        ],
      ]
    : [
        [
          "What types of projects do you take on?",
          "We focus on kitchens, bathrooms, whole-home remodels, additions, ADUs, exteriors, and custom carpentry.",
        ],
        [
          "What happens during the initial consultation?",
          "We discuss your space, priorities, general scope, and the most appropriate next steps.",
        ],
        [
          "Where do you work?",
          "We serve Santa Barbara, Goleta, Montecito, and Carpinteria.",
        ],
        [
          "Does the form send my information yet?",
          "No. While this remains a demonstration website, the form and booking page do not transmit information.",
        ],
      ];
  return (
    <section className="section">
      <div className="faq">
        <span className="eyebrow">FAQ</span>
        <h2>{es ? "Preguntas frecuentes" : "Frequently asked questions"}</h2>
        {qs.map((q) => (
          <details key={q[0]}>
            <summary>{q[0]}</summary>
            <p>{q[1]}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
function ServicePage({
  es,
  service,
}: {
  es: boolean;
  service: (typeof services)[number];
}) {
  const name = es ? service.es : service.en,
    intro = es ? service.esIntro : service.enIntro,
    focus = es ? service.esFocus : service.enFocus,
    details = serviceDetails[service.key],
    work = es ? details.esWork : details.enWork,
    process = es ? details.esProcess : details.enProcess,
    faqs = serviceFaqs[service.key],
    related = relatedServices[service.key]
      .map((key) => services.find((item) => item.key === key))
      .filter((item): item is (typeof services)[number] => Boolean(item));
  return (
    <>
      <section className="pageHero">
        <Image
          src={service.image}
          alt={`${name} Santa Barbara`}
          fill
          priority
          sizes="100vw"
        />
        <div>
          <span className="eyebrow">
            {es ? "Construcción y remodelación residencial" : "Residential construction and remodeling"}
          </span>
          <h1>{name}</h1>
          <p>{intro}</p>
        </div>
      </section>
      <section className="section contentGrid">
        <div>
          <span className="eyebrow">{es ? "Alcance del trabajo" : "Scope of work"}</span>
          <h2>
            {es
              ? `Qué implica ${name.toLowerCase()}.`
              : `What ${name.toLowerCase()} involves.`}
          </h2>
          <p>{es ? details.esScope : details.enScope}</p>
          <p className="sampleNote darkText">{es ? "El alcance final depende de una evaluación real del sitio y de información verificada del negocio." : "Final scope depends on an actual site evaluation and verified business information."}</p>
        </div>
        <div>
          <h3>{es ? "Trabajo habitual" : "Typical work"}</h3>
          <ul className="checkList">
            {work.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <Link className="btn" href={es ? "/es/contacto" : "/contact"}>
            {es
              ? `Solicita un estimado para ${name}`
              : `Request an estimate for ${name}`}
          </Link>
        </div>
      </section>
      <section className="section serviceProcess">
        <div className="sectionHead">
          <div>
            <span className="eyebrow">{es ? "Proceso del servicio" : "Service process"}</span>
            <h2>{es ? "Del sitio a la entrega." : "From site review to handover."}</h2>
          </div>
          <p>{intro}</p>
        </div>
        <div className="process">
          {process.map((step) => <div className="step" key={step}><h3>{step}</h3></div>)}
        </div>
        <div className="focusLine">{focus.map((item) => <span key={item}>{item}</span>)}</div>
      </section>
      <section className="section dark">
        <div className="faq">
          <span className="eyebrow">FAQ</span>
          <h2>{es ? `Preguntas sobre ${name}` : `${name} questions`}</h2>
          {faqs.map((faq) => (
            <details key={faq.enQ}>
              <summary>{es ? faq.esQ : faq.enQ}</summary>
              <p>{es ? faq.esA : faq.enA}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="section relatedSection">
        <div className="sectionHead">
          <div>
            <span className="eyebrow">
              {es ? "Servicios relacionados" : "Related services"}
            </span>
            <h2>{es ? "Continúa explorando." : "Continue exploring."}</h2>
          </div>
        </div>
        <div className="relatedGrid">
          {related.map((item) => (
            <Link
              key={item.key}
              href={
                es
                  ? `/es/servicios/${item.esSlug}`
                  : `/services/${item.enSlug}`
              }
            >
              <span>{es ? item.es : item.en}</span>
              <b aria-hidden="true">↗</b>
            </Link>
          ))}
        </div>
      </section>
      <Cta es={es} />
    </>
  );
}
function StandardPage({ es, type }: { es: boolean; type: string }) {
  if (type === "services")
    return (
      <>
        <section className="pageHero">
          <Image
            src="/images/whole-home.webp"
            alt="Residential remodeling"
            fill
            sizes="100vw"
          />
          <div>
            <span className="eyebrow">
              {es ? "Remodelación residencial" : "Residential remodeling"}
            </span>
            <h1>{es ? "Servicios" : "Services"}</h1>
            <p>
              {es
                ? "Servicios enfocados en mejorar cómo se siente, funciona y perdura tu hogar."
                : "Services focused on improving how your home feels, functions, and lasts."}
            </p>
          </div>
        </section>
        <section className="section">
          <ServiceCards es={es} />
        </section>
        <Cta es={es} />
      </>
    );
  if (type === "projects")
    return (
      <>
        <section className="pageHero">
          <Image
            src="/images/projects.webp"
            alt="Projects"
            fill
            sizes="100vw"
          />
          <div>
            <span className="eyebrow">
              {es ? "Portafolio de demostración" : "Demonstration portfolio"}
            </span>
            <h1>{es ? "Proyectos" : "Projects"}</h1>
            <p>
              {es
                ? "Seis conceptos residenciales creados para demostrar la presentación visual del sitio."
                : "Six residential concepts created to demonstrate the visual presentation of the website."}
            </p>
          </div>
        </section>
        <section className="section">
          <ProjectCards es={es} />
          <p className="notice">
            {es
              ? "Proyectos ficticios de demostración; no representan trabajos realizados por un negocio real."
              : "Fictional demonstration projects; they do not represent work completed by a real business."}
          </p>
        </section>
        <section className="split dark projectProof">
          <Image src="/images/craft-in-progress.webp" alt={es ? "Carpintería en proceso en una escena de construcción de muestra" : "Carpentry in progress in a sample construction scene"} width={1600} height={1067} />
          <div className="splitText">
            <span className="eyebrow">{es ? "Capacidad de construcción" : "Construction capability"}</span>
            <h2>{es ? "Mostrar el trabajo detrás del resultado." : "Show the work behind the result."}</h2>
            <p>{es ? "Un caso real deberá documentar condiciones iniciales, protección del sitio, trabajos ocultos, coordinación de oficios y terminación. Esta imagen es material generado de demostración." : "A real case study should document initial conditions, site protection, concealed work, trade coordination, and completion. This image is generated demonstration material."}</p>
          </div>
        </section>
        <Cta es={es} />
      </>
    );
  if (type === "about")
    return (
      <>
        <section className="pageHero">
          <Image
            src="/images/team-process.webp"
            alt={es ? "Equipo de construcción revisando planos en una obra de muestra" : "Construction team reviewing plans at a sample jobsite"}
            fill
            sizes="100vw"
          />
          <div>
            <span className="eyebrow">
              {es ? "Acerca de Crest & Coast" : "About Crest & Coast"}
            </span>
            <h1>
              {es
                ? "La construcción es un trabajo de equipo."
                : "Construction is a team effort."}
            </h1>
          </div>
        </section>
        <section className="section contentGrid">
          <div>
            <h2>
              {es
                ? "Planeación clara, supervisión en sitio y ejecución coordinada."
                : "Clear planning, site supervision, and coordinated execution."}
            </h2>
          </div>
          <div>
            <p>
              {es
                ? "Crest & Coast Construction continúa siendo un negocio ficticio de demostración. La fotografía del equipo fue generada para definir la dirección visual y debe sustituirse por fotografías reales antes del lanzamiento."
                : "Crest & Coast Construction remains a fictional demonstration business. The team photograph was generated to establish the visual direction and must be replaced with real photography before launch."}
            </p>
            <p>
              {es
                ? "No se atribuyen licencia, seguro, años de experiencia, premios, garantías, certificaciones ni asociaciones. Todos esos datos están pendientes de verificación."
                : "No license, insurance, years of experience, awards, warranties, certifications, or associations are claimed. All remain pending verification."}
            </p>
          </div>
        </section>
        <section className="section dark">
          <div className="sectionHead"><div><span className="eyebrow">{es ? "Proceso propuesto" : "Proposed process"}</span><h2>{es ? "Cinco etapas para mantener claridad." : "Five stages to keep the work clear."}</h2></div></div>
          <div className="process processFive">{[es ? "Evaluación" : "Evaluation", es ? "Presupuesto" : "Estimate", es ? "Planificación" : "Planning", es ? "Construcción" : "Construction", es ? "Entrega" : "Handover"].map((step) => <div className="step" key={step}><h3>{step}</h3><p>{es ? "Descripción pendiente de confirmar con la operación real." : "Details pending confirmation against actual operations."}</p></div>)}</div>
        </section>
        <Cta es={es} />
      </>
    );
  if (type === "areas")
    return (
      <>
        <section className="pageHero">
          <Image
            src="/images/exterior.webp"
            alt="Santa Barbara home"
            fill
            sizes="100vw"
          />
          <div>
            <span className="eyebrow">
              {es ? "Costa central" : "Central coast"}
            </span>
            <h1>{es ? "Áreas que Atendemos" : "Areas We Serve"}</h1>
          </div>
        </section>
        <section className="section">
          <div className="cardGrid">
            {["Santa Barbara", "Goleta", "Montecito", "Carpinteria"].map(
              (x) => (
                <article className="serviceCard" key={x}>
                  <div>
                    <span className="eyebrow">California</span>
                    <h3>{x}</h3>
                    <p>
                      {es
                        ? "Servicios de construcción y remodelación residencial para propietarios en esta comunidad."
                        : "Residential construction and remodeling services for homeowners in this community."}
                    </p>
                  </div>
                </article>
              ),
            )}
          </div>
        </section>
        <Cta es={es} />
      </>
    );
  if (type === "reviews")
    return (
      <>
        <section className="pageHero">
          <Image
            src="/images/carpentry.webp"
            alt="Custom craftsmanship"
            fill
            sizes="100vw"
          />
          <div>
            <span className="eyebrow">
              {es ? "Comentarios de muestra" : "Sample feedback"}
            </span>
            <h1>{es ? "Testimonios" : "Reviews"}</h1>
          </div>
        </section>
        <section className="section">
          <p className="notice">
            {es
              ? "Testimonios de ejemplo utilizados únicamente para demostración."
              : "Sample testimonials for demonstration purposes."}
          </p>
          <div className="cardGrid">
            {(es
              ? [
                  "“El proceso se sintió claro y el concepto respetó el carácter de nuestra casa.”",
                  "“La atención a la distribución y los materiales hizo que el espacio se sintiera completamente integrado.”",
                  "“Nos gustó la comunicación directa y la forma cuidadosa de presentar cada decisión.”",
                ]
              : [
                  "“The process felt clear, and the concept respected the character of our home.”",
                  "“The attention to layout and materials made the space feel completely integrated.”",
                  "“We appreciated the direct communication and thoughtful presentation of each decision.”",
                ]
            ).map((x, i) => (
              <article className="serviceCard" key={x}>
                <div>
                  <span className="eyebrow">
                    {es ? "Testimonio de muestra" : "Sample testimonial"}
                  </span>
                  <p className="lead">{x}</p>
                  <p>
                    —{" "}
                    {es
                      ? "Propietario de demostración"
                      : "Demonstration homeowner"}{" "}
                    {i + 1}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <Cta es={es} />
      </>
    );
  if (type === "faq")
    return (
      <>
        <section className="pageHero">
          <Image
            src="/images/flooring.webp"
            alt="Remodeling details"
            fill
            sizes="100vw"
          />
          <div>
            <span className="eyebrow">
              {es ? "Antes de comenzar" : "Before we begin"}
            </span>
            <h1>
              {es ? "Preguntas Frecuentes" : "Frequently Asked Questions"}
            </h1>
          </div>
        </section>
        <Faq es={es} />
        <Cta es={es} />
      </>
    );
  return null;
}
function Contact({ es }: { es: boolean }) {
  return (
    <>
      <section className="pageHero">
        <Image
          src="/images/about.webp"
          alt="Project consultation"
          fill
          sizes="100vw"
        />
        <div>
          <span className="eyebrow">
            {es ? "Cuéntanos sobre tu proyecto" : "Tell us about your project"}
          </span>
          <h1>{es ? "Solicita un Estimado" : "Request a Project Estimate"}</h1>
        </div>
      </section>
      <section className="section contentGrid">
        <div>
          <h2>
            {es
              ? "Comencemos con los detalles."
              : "Let’s begin with the details."}
          </h2>
          <p>
            {es
              ? "Comparte información básica sobre tu proyecto. Esta versión del formulario es solo una demostración y no envía datos."
              : "Share a few basics about your project. This version of the form is a demonstration and does not submit data."}
          </p>
          <div className="notice" id="demo-form-note">
            {es
              ? "Formulario demo — no se enviará ni almacenará información."
              : "Demo form — no information will be sent or stored."}
          </div>
          <p className="pendingContact">{es ? "Teléfono y correo pendientes de sustitución y verificación. Los enlaces de llamada y correo permanecerán inactivos hasta entonces." : "Phone and email are pending replacement and verification. Call and email links remain inactive until then."}</p>
        </div>
        <form className="form" aria-describedby="demo-form-note">
          <div className="field">
            <label htmlFor="full-name">{es ? "Nombre completo" : "Full Name"}</label>
            <input id="full-name" name="fullName" type="text" required autoComplete="name" />
          </div>
          <div className="field">
            <label htmlFor="phone">{es ? "Teléfono" : "Phone"}</label>
            <input id="phone" name="phone" type="tel" required autoComplete="tel" />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required autoComplete="email" />
          </div>
          <div className="field">
            <label htmlFor="city">{es ? "Ciudad" : "City"}</label>
            <input id="city" name="city" type="text" required autoComplete="address-level2" />
          </div>
          <div className="field">
            <label htmlFor="project-type">{es ? "Tipo de proyecto" : "Project Type"}</label>
            <select id="project-type" name="projectType" required defaultValue="">
              <option value="" disabled>{es ? "Selecciona una opción" : "Select one"}</option>
              {services.map((s) => (
                <option value={s.key} key={s.key}>{es ? s.es : s.en}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="timeline">
              {es ? "Tiempo deseado (opcional)" : "Desired Timeline (optional)"}
            </label>
            <input id="timeline" name="timeline" type="text" />
          </div>
          <div className="field full">
            <label htmlFor="project-details">{es ? "Detalles del proyecto" : "Project Details"}</label>
            <textarea id="project-details" name="projectDetails" required />
          </div>
          <input
            type="hidden"
            name="preferredLanguage"
            value={es ? "Spanish" : "English"}
            readOnly
          />
          <button className="btn" type="button">
            {es ? "Vista previa — no enviar" : "Preview — do not submit"}
          </button>
          <p className="formStatus">{es ? "Formulario demo: el botón no envía ni almacena información." : "Demo form: the button does not send or store information."}</p>
        </form>
      </section>
    </>
  );
}
function Book({ es }: { es: boolean }) {
  return (
    <>
      <section className="pageHero">
        <Image
          src="/images/hero.webp"
          alt="Santa Barbara remodeling consultation"
          fill
          sizes="100vw"
        />
        <div>
          <span className="eyebrow">{es ? "Primer paso" : "First step"}</span>
          <h1>
            {es ? "Agenda una Consulta Gratis" : "Book a Free Consultation"}
          </h1>
        </div>
      </section>
      <section className="section">
        <div className="bookingBox">
          <span className="eyebrow">
            {es ? "Calendario demo" : "Demo calendar"}
          </span>
          <h2>
            {es
              ? "La agenda estará disponible próximamente."
              : "Scheduling will be available soon."}
          </h2>
          <p>
            {es
              ? "Esta página está preparada para recibir el calendario de GoHighLevel después de la aprobación del sitio. No se ha creado ni conectado otro sistema de citas."
              : "This page is prepared for the GoHighLevel calendar after the website is approved. No separate booking system has been created or connected."}
          </p>
          <Link className="btn" href={es ? "/es/contacto" : "/contact"}>
            {es ? "Ver formulario de proyecto" : "View project form"}
          </Link>
        </div>
      </section>
    </>
  );
}
function Legal({ es, terms }: { es: boolean; terms: boolean }) {
  return (
    <section className="section legal">
      <span className="eyebrow">
        {es ? "Información del sitio" : "Website information"}
      </span>
      <h1>
        {terms
          ? es
            ? "Términos de Servicio"
            : "Terms of Service"
          : es
            ? "Política de Privacidad"
            : "Privacy Policy"}
      </h1>
      <div className="notice">
        {es
          ? "Este sitio representa un negocio ficticio con fines de demostración."
          : "This website represents a fictional business for demonstration purposes."}
      </div>
      <h2>{es ? "Alcance" : "Scope"}</h2>
      <p>
        {terms
          ? es
            ? "El contenido se ofrece únicamente como demostración y no constituye una oferta contractual, cotización ni compromiso de servicio."
            : "Content is provided only as a demonstration and does not constitute a contractual offer, quote, or service commitment."
          : es
            ? "El formulario y la agenda son demostraciones y actualmente no transmiten ni almacenan información personal."
            : "The form and booking interface are demonstrations and do not currently transmit or store personal information."}
      </p>
      <h2>{es ? "Información de contacto" : "Contact information"}</h2>
      <p>{es ? "Teléfono, correo, domicilio y razón social pendientes de verificación. No se activan enlaces de contacto en esta vista previa." : "Phone, email, street address, and legal entity are pending verification. Contact links are not active in this preview."}</p>
      <p>
        {es
          ? "No se presenta domicilio, razón social, licencia ni otra información legal no proporcionada."
          : "No street address, legal entity, license, or other unprovided legal information is represented."}
      </p>
    </section>
  );
}
export default async function Page({ params }: Props) {
  const path = getPath((await params).slug);
  if (!allPaths.includes(path)) notFound();
  const { lang, service, clean } = pathInfo(path);
  const es = lang === "es";
  let type = "home";
  if (clean.includes("privacy") || clean.includes("politica")) type = "privacy";
  else if (clean.includes("terms") || clean.includes("terminos"))
    type = "terms";
  else if (clean === "/contact" || clean === "/es/contacto") type = "contact";
  else if (clean === "/book" || clean === "/es/agendar") type = "book";
  else if (clean === "/services" || clean === "/es/servicios")
    type = "services";
  else if (clean.includes("projects") || clean.includes("proyectos"))
    type = "projects";
  else if (clean.includes("about") || clean.includes("nosotros"))
    type = "about";
  else if (
    clean.includes("areas-we-serve") ||
    clean.includes("areas-de-servicio")
  )
    type = "areas";
  else if (clean.includes("reviews") || clean.includes("testimonios"))
    type = "reviews";
  else if (clean.includes("faq") || clean.includes("preguntas-frecuentes"))
    type = "faq";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "Crest & Coast Construction",
    description: es
      ? "Negocio ficticio de construcción y remodelación residencial."
      : "Fictional residential construction and remodeling business.",
    areaServed: ["Santa Barbara", "Goleta", "Montecito", "Carpinteria"],
    url: `${site}${clean}`,
  };
  return (
    <Shell path={path}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {service ? (
        <ServicePage es={es} service={service} />
      ) : type === "home" ? (
        <Home es={es} />
      ) : type === "contact" ? (
        <Contact es={es} />
      ) : type === "book" ? (
        <Book es={es} />
      ) : type === "privacy" || type === "terms" ? (
        <Legal es={es} terms={type === "terms"} />
      ) : (
        <StandardPage es={es} type={type} />
      )}
    </Shell>
  );
}
