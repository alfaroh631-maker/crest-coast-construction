import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer, Header } from "@/components/site";
import { ContactForm } from "@/components/contact-form";
import { allPaths, pathInfo, serviceDetails, services } from "@/lib/content";

const site = process.env.NEXT_PUBLIC_SITE_URL || "https://crest-coast-construction.vercel.app";
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
    enScope: "Contemplated scope: layout, cabinetry, lighting, surfaces, and finish coordination.",
    esScope: "Alcance contemplado: distribución, gabinetes, iluminación, superficies y acabados.",
  },
  {
    image: "/images/project-bathroom.webp",
    en: "Primary Bathroom Renovation",
    es: "Renovación de Baño Principal",
    enCat: "Bathroom",
    esCat: "Baño",
    enD: "A quiet retreat concept balancing stone, oak, and soft natural light.",
    esD: "Un concepto sereno que equilibra piedra, roble y luz natural suave.",
    enScope: "Contemplated work: selective demolition, waterproofing, plumbing, tile, fixtures, and vanity installation.",
    esScope: "Trabajos contemplados: demolición selectiva, impermeabilización, plomería, azulejo, accesorios y tocador.",
  },
  {
    image: "/images/project-whole-home.webp",
    en: "Whole-Home Interior Remodel",
    es: "Remodelación Interior Integral",
    enCat: "Whole Home",
    esCat: "Casa Completa",
    enD: "Connected living spaces with a consistent architectural and material language.",
    esD: "Espacios conectados mediante un lenguaje arquitectónico y material consistente.",
    enScope: "Contemplated scope: coordinated room layouts, building systems, flooring, carpentry, and finishes.",
    esScope: "Alcance contemplado: distribución, instalaciones, pisos, carpintería y acabados coordinados.",
  },
  {
    image: "/images/project-adu.webp",
    en: "Santa Barbara ADU",
    es: "ADU en Santa Barbara",
    enCat: "Addition",
    esCat: "Ampliación",
    enD: "An efficient guest space designed around daylight, storage, and garden access.",
    esD: "Un espacio eficiente para huéspedes, diseñado alrededor de la luz y el jardín.",
    enScope: "Contemplated work: site review, foundation, framing, enclosure, utilities, and interior completion.",
    esScope: "Trabajos contemplados: evaluación, cimentación, estructura, cerramientos, servicios y acabados interiores.",
  },
  {
    image: "/images/project-exterior.webp",
    en: "Exterior Renovation",
    es: "Renovación Exterior",
    enCat: "Exterior",
    esCat: "Exterior",
    enD: "A refreshed rear elevation that strengthens indoor-outdoor living.",
    esD: "Una fachada posterior renovada que fortalece la conexión interior-exterior.",
    enScope: "Contemplated scope: openings, siding, trim, weather protection, exterior finishes, and transitions.",
    esScope: "Alcance contemplado: aperturas, revestimiento, molduras, protección climática y transiciones exteriores.",
  },
  {
    image: "/images/project-built-in.webp",
    en: "Custom Built-In Project",
    es: "Proyecto de Carpintería a Medida",
    enCat: "Carpentry",
    esCat: "Carpintería",
    enD: "Integrated dining storage and seating crafted as part of the architecture.",
    esD: "Almacenamiento y asientos integrados como parte de la arquitectura.",
    enScope: "Contemplated work: field measurements, material and hardware selection, fabrication, fitting, and finish.",
    esScope: "Trabajos contemplados: medidas, selección de materiales y herrajes, fabricación, ajuste y acabado.",
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
      "Explore six illustrative residential concepts with project type, contemplated scope, and construction work.",
    ],
    es: [
      "Proyectos de Remodelación Residencial",
      "Explora seis conceptos residenciales ilustrativos con tipo de proyecto, alcance y trabajos contemplados.",
    ],
  },
  about: {
    en: [
      "About Crest & Coast",
      "Learn about the five-stage approach to residential construction and remodeling in Santa Barbara.",
    ],
    es: [
      "Sobre Crest & Coast",
      "Conoce el proceso de cinco etapas para construcción y remodelación residencial en Santa Barbara.",
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
      "Construction Process",
      "Learn how evaluation, planning, construction, and handover support a clear residential project.",
    ],
    es: [
      "Proceso de Construcción",
      "Conoce cómo la evaluación, planificación, construcción y entrega organizan un proyecto residencial.",
    ],
  },
  faq: {
    en: [
      "Frequently Asked Questions",
      "Answers about Crest & Coast services, service areas, estimates, and consultations.",
    ],
    es: [
      "Preguntas Frecuentes",
      "Respuestas sobre servicios, áreas de cobertura, presupuestos y consultas.",
    ],
  },
  contact: {
    en: [
      "Request an Estimate",
      "Share the details of a residential construction or remodeling project in the Santa Barbara area.",
    ],
    es: [
      "Solicitar Presupuesto",
      "Comparte los detalles de un proyecto de construcción o remodelación residencial en el área de Santa Barbara.",
    ],
  },
  book: {
    en: [
      "Book a Free Consultation",
      "Choose an available time for a free residential remodeling consultation.",
    ],
    es: [
      "Agenda una Consulta Gratis",
      "Elige un horario disponible para una consulta gratis de remodelación residencial.",
    ],
  },
  privacy: {
    en: [
      "Privacy Policy",
      "Privacy information for Crest & Coast Construction website forms, chat, and consultation scheduling.",
    ],
    es: [
      "Política de Privacidad",
      "Información de privacidad para formularios, chat y agenda de Crest & Coast Construction.",
    ],
  },
  terms: {
    en: [
      "Terms of Service",
      "Terms for using the Crest & Coast Construction website and inquiry tools.",
    ],
    es: [
      "Términos de Servicio",
      "Términos de uso del sitio y sus herramientas de consulta.",
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
              {es ? "Concepto ilustrativo" : "Illustrative concept"} · {es ? x.esCat : x.enCat}
            </span>
            <h3>{es ? x.es : x.en}</h3>
            <p>{es ? x.esD : x.enD}</p>
            <p className="projectScope">{es ? x.esScope : x.enScope}</p>
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
            <Link className="btn" href={es ? "/es/agendar" : "/book"}>
              {es ? "Agendar consulta gratis" : "Book a Free Consultation"}
            </Link>
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
            <span className="eyebrow">{es ? "Conceptos de proyectos" : "Project concepts"}</span>
            <h2>
              {es ? "De la estructura al acabado." : "From Structure to Finish."}
            </h2>
          </div>
          <Link className="textLink" href={es ? "/es/proyectos" : "/projects"}>
            {es ? "Ver todos los proyectos" : "View all projects"} ↗
          </Link>
        </div>
        <ProjectCards es={es} />
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
          <p>{es ? "Desde la evaluación inicial hasta la entrega, cada etapa organiza decisiones, alcance, coordinación y control de calidad." : "From the initial evaluation through handover, each stage organizes decisions, scope, coordination, and quality control."}</p>
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
              {es ? "Cómo trabajamos" : "How we work"}
            </span>
            <h2>
              {es
                ? "Claridad en cada etapa del proyecto."
                : "Clarity through every project stage."}
            </h2>
          </div>
        </div>
        <div className="reviewGrid">
          {(es
            ? [["Evaluación y alcance", "Revisamos la vivienda, las prioridades y las condiciones que pueden influir en el trabajo."], ["Planificación coordinada", "Organizamos materiales, decisiones y secuencia antes de comenzar la construcción."], ["Construcción y entrega", "Coordinamos los oficios, revisamos los detalles y cerramos el proyecto con una entrega ordenada."]]
            : [["Evaluation and scope", "We review the home, priorities, and conditions that may influence the work."], ["Coordinated planning", "We organize materials, decisions, and sequencing before construction begins."], ["Construction and handover", "We coordinate trades, review details, and close the project with an organized handover."]]
          ).map(([title, text]) => (
            <article key={title}><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>
      <section className="section estimateSection">
        <div>
          <span className="eyebrow">{es ? "Siguiente paso" : "Next step"}</span>
          <h2>{es ? "Cuéntanos qué quieres construir." : "Tell us what you want to build."}</h2>
          <p>{es ? "Comparte los datos principales de tu proyecto o elige un horario para conversar." : "Share the essentials of your project or choose a time to talk."}</p>
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
          "¿Debo solicitar presupuesto o agendar una consulta?",
          "Use Solicitar presupuesto para enviar los detalles del proyecto. Use Agendar consulta gratis si prefiere seleccionar un horario.",
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
          "Should I request an estimate or book a consultation?",
          "Use Request an Estimate to send project details. Use Book a Free Consultation if you prefer to select a time.",
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
              ? service.key === "adu" ? "Qué incluye una ampliación o un ADU." : `Qué incluye ${name.toLowerCase()}.`
              : `What ${name.toLowerCase()} involves.`}
          </h2>
          <p>{es ? details.esScope : details.enScope}</p>
          <p className="sampleNote darkText">{es ? "El alcance final depende de las condiciones de la vivienda y de la evaluación del proyecto." : "Final scope depends on the property conditions and project evaluation."}</p>
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
              ? `Solicitar presupuesto para ${name}`
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
            alt={es ? "Remodelación residencial" : "Residential remodeling"}
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
            alt={es ? "Conceptos de proyectos residenciales" : "Residential project concepts"}
            fill
            sizes="100vw"
          />
          <div>
            <span className="eyebrow">
              {es ? "Conceptos de proyectos" : "Project concepts"}
            </span>
            <h1>{es ? "Proyectos" : "Projects"}</h1>
            <p>
              {es
                ? "Seis conceptos residenciales que presentan tipo de proyecto, alcance y trabajos contemplados."
                : "Six residential concepts presenting project type, contemplated scope, and construction work."}
            </p>
          </div>
        </section>
        <section className="section">
          <ProjectCards es={es} />
        </section>
        <section className="split dark projectProof">
          <Image src="/images/craft-in-progress.webp" alt={es ? "Carpintería en proceso en una escena de construcción de muestra" : "Carpentry in progress in a sample construction scene"} width={1600} height={1067} />
          <div className="splitText">
            <span className="eyebrow">{es ? "Capacidad de construcción" : "Construction capability"}</span>
            <h2>{es ? "Mostrar el trabajo detrás del resultado." : "Show the work behind the result."}</h2>
            <p>{es ? "Cada concepto contempla condiciones iniciales, protección del sitio, trabajos ocultos, coordinación de oficios y terminación dentro de un alcance definido." : "Each concept considers initial conditions, site protection, concealed work, trade coordination, and completion within a defined scope."}</p>
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
                ? "Nuestro enfoque organiza el proyecto desde la primera conversación hasta la revisión final, manteniendo claros el alcance, las decisiones y la secuencia de construcción."
                : "Our approach organizes the project from the first conversation through final review, keeping scope, decisions, and construction sequencing clear."}
            </p>
            <p>
              {es
                ? "La evaluación define las condiciones existentes; el presupuesto establece el alcance; la planificación coordina decisiones; la construcción ejecuta el trabajo; y la entrega cierra los detalles acordados."
                : "Evaluation identifies existing conditions; the estimate defines scope; planning coordinates decisions; construction executes the work; and handover closes the agreed details."}
            </p>
          </div>
        </section>
        <section className="section dark">
          <div className="sectionHead"><div><span className="eyebrow">{es ? "Nuestro proceso" : "Our process"}</span><h2>{es ? "Cinco etapas para mantener claridad." : "Five stages to keep the work clear."}</h2></div></div>
          <div className="process processFive">{(es ? [["Evaluación","Revisamos objetivos, espacios y condiciones existentes."],["Presupuesto","Definimos el alcance contemplado y las decisiones necesarias."],["Planificación","Coordinamos secuencia, materiales y preparación del proyecto."],["Construcción","Organizamos los trabajos y revisamos su avance."],["Entrega","Revisamos detalles y cerramos el alcance acordado."]] : [["Evaluation","We review goals, spaces, and existing conditions."],["Estimate","We define the contemplated scope and required decisions."],["Planning","We coordinate sequencing, materials, and project preparation."],["Construction","We organize the work and review its progress."],["Handover","We review details and close the agreed scope."]]).map(([step,desc]) => <div className="step" key={step}><h3>{step}</h3><p>{desc}</p></div>)}</div>
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
            alt={es ? "Vivienda en Santa Barbara" : "Santa Barbara home"}
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
            {(es ? [["Santa Barbara","Remodelaciones residenciales, ampliaciones y trabajo de acabado dentro de la ciudad de Santa Barbara."],["Goleta","Servicios para viviendas de Goleta, desde cocinas y baños hasta remodelaciones integrales."],["Montecito","Proyectos residenciales que requieren planificación cuidadosa, coordinación de materiales y atención arquitectónica."],["Carpinteria","Construcción y remodelación para viviendas de Carpinteria y sus espacios interiores y exteriores."]] : [["Santa Barbara","Residential remodels, additions, and finish work within the city of Santa Barbara."],["Goleta","Services for Goleta homes, from kitchens and baths to whole-home remodeling."],["Montecito","Residential projects requiring careful planning, material coordination, and architectural attention."],["Carpinteria","Construction and remodeling for Carpinteria homes and their interior and exterior spaces."]]).map(
              ([x, description]) => (
                <article className="serviceCard" key={x}>
                  <div>
                    <span className="eyebrow">California</span>
                    <h3>{x}</h3>
                    <p>{description}</p>
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
            alt={es ? "Carpintería residencial a medida" : "Custom residential craftsmanship"}
            fill
            sizes="100vw"
          />
          <div>
            <span className="eyebrow">
              {es ? "Servicios y proceso" : "Services and process"}
            </span>
            <h1>{es ? "Cómo se desarrolla un proyecto" : "How a project comes together"}</h1>
          </div>
        </section>
        <section className="section">
          <div className="cardGrid">
            {(es
              ? [
                  ["Definir el alcance","La evaluación inicial ayuda a identificar prioridades, condiciones existentes y el tipo de trabajo requerido."],
                  ["Coordinar decisiones","La planificación conecta distribución, materiales, sistemas y secuencia antes de construir."],
                  ["Ejecutar y revisar","Durante la construcción se coordinan oficios y se revisan los detalles contemplados en el alcance."],
                ]
              : [
                  ["Define the scope","The initial evaluation identifies priorities, existing conditions, and the work required."],
                  ["Coordinate decisions","Planning connects layout, materials, systems, and sequencing before construction."],
                  ["Build and review","During construction, trades are coordinated and details within the scope are reviewed."],
                ]
            ).map(([title, text]) => (
              <article className="serviceCard" key={title}>
                <div>
                  <span className="eyebrow">{es ? "Etapa del proyecto" : "Project stage"}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
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
            alt={es ? "Detalles de remodelación residencial" : "Residential remodeling details"}
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
          alt={es ? "Consulta sobre un proyecto residencial" : "Residential project consultation"}
          fill
          sizes="100vw"
        />
        <div>
          <span className="eyebrow">
            {es ? "Cuéntanos sobre tu proyecto" : "Tell us about your project"}
          </span>
          <h1>{es ? "Solicitar presupuesto" : "Request an Estimate"}</h1>
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
              ? "Comparte la información principal para que tu solicitud quede registrada con el proyecto correcto."
              : "Share the essential information so your request can be recorded with the correct project details."}
          </p>
        </div>
        <ContactForm es={es} />
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
          alt={es ? "Consulta de remodelación en Santa Barbara" : "Santa Barbara remodeling consultation"}
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
        <div className="bookingIntro">
          <span className="eyebrow">
            {es ? "Consulta inicial" : "Initial consultation"}
          </span>
          <h2>
            {es
              ? "Selecciona un horario disponible."
              : "Choose an available time."}
          </h2>
          <p>
            {es
              ? "La disponibilidad se muestra en la zona horaria seleccionada dentro del calendario."
              : "Availability is shown in the time zone selected inside the calendar."}
          </p>
        </div>
        <div className="calendarEmbed">
          <iframe
            src={process.env.NEXT_PUBLIC_GHL_CALENDAR_URL || "https://api.leadconnectorhq.com/widget/booking/83nIdfrbQXfufUHkUNZq"}
            title={es ? "Calendario para agendar una consulta" : "Consultation booking calendar"}
            loading="eager"
          />
        </div>
        <p className="calendarFallback">
          {es ? "¿Prefieres compartir los detalles primero?" : "Would you rather share the project details first?"}{" "}
          <Link href={es ? "/es/contacto" : "/contact"}>
            {es ? "Solicitar presupuesto" : "Request an Estimate"}
          </Link>
        </p>
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
      <h2>{es ? "Alcance" : "Scope"}</h2>
      <p>
        {terms
          ? es
            ? "La información del sitio es general y no constituye una cotización, contrato, garantía de disponibilidad ni compromiso de ejecutar un proyecto. El alcance se confirma mediante documentación separada."
            : "Website information is general and does not constitute a quote, contract, availability guarantee, or commitment to perform a project. Scope is confirmed through separate documentation."
          : es
            ? "El formulario, chat y calendario pueden recopilar nombre, teléfono, correo, ciudad, información del proyecto, idioma y datos de la cita para gestionar solicitudes y seguimiento en el CRM."
            : "The form, chat, and calendar may collect name, phone, email, city, project information, language, and appointment details to manage inquiries and follow-up in the CRM."}
      </p>
      <h2>{es ? "Uso de la información" : "Use of information"}</h2>
      <p>{terms ? (es ? "El envío de una solicitud o la reserva de una consulta no garantiza aceptación del proyecto, precio, fecha de inicio ni plazo de terminación." : "Submitting a request or booking a consultation does not guarantee project acceptance, pricing, a start date, or a completion timeline.") : (es ? "La información puede procesarse mediante proveedores de website, CRM, chat y calendario únicamente para gestionar la consulta, la cita y el seguimiento relacionado." : "Information may be processed through website, CRM, chat, and calendar providers only to manage the inquiry, appointment, and related follow-up.")}</p>
      <h2>{es ? "Información del negocio" : "Business information"}</h2>
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
      ? "Construcción y remodelación residencial en Santa Barbara y comunidades cercanas."
      : "Residential construction and remodeling in Santa Barbara and nearby communities.",
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
