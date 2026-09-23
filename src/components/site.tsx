"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { services, Lang } from "@/lib/content";

export function Header({ lang, alternate }: { lang: Lang; alternate: string }) {
  const [open, setOpen] = useState(false),
    [svc, setSvc] = useState(false);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSvc(false);
        setOpen(false);
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);
  const es = lang === "es",
    p = es ? "/es" : "";
  const nav = [
    [es ? "Inicio" : "Home", p || "/"],
    [es ? "Proyectos" : "Projects", `${p}/${es ? "proyectos" : "projects"}`],
    [es ? "Nosotros" : "About", `${p}/${es ? "nosotros" : "about"}`],
    [
      es ? "Áreas" : "Areas",
      es ? "/es/areas-de-servicio" : "/areas-we-serve",
    ],
    [es ? "Contacto" : "Contact", `${p}/${es ? "contacto" : "contact"}`],
  ];
  return (
    <header className="header">
      <Link className="brand" href={p || "/"}>
        <span>
          CREST <i>&</i> COAST
        </span>
        <small>CONSTRUCTION</small>
      </Link>
      <button
        className="menuBtn"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        aria-expanded={open}
        aria-controls="primary-navigation"
      >
        {open ? "×" : "☰"}
      </button>
      <nav id="primary-navigation" className={open ? "nav open" : "nav"}>
        <Link href={nav[0][1]}>{nav[0][0]}</Link>
        <div className="servicesNav">
          <button
            onClick={() => setSvc(!svc)}
            aria-expanded={svc}
            aria-controls="services-navigation"
          >
            {es ? "Servicios" : "Services"} <span>⌄</span>
          </button>
          <div
            id="services-navigation"
            className={svc ? "dropdown show" : "dropdown"}
          >
            <Link href={`${p}/${es ? "servicios" : "services"}`}>
              {es ? "Todos los Servicios" : "All Services"}
            </Link>
            {services.map((s) => (
              <Link
                key={s.key}
                href={`${p}/${es ? `servicios/${s.esSlug}` : `services/${s.enSlug}`}`}
              >
                {es ? s.es : s.en}
              </Link>
            ))}
          </div>
        </div>
        {nav.slice(1).map((n) => (
          <Link key={n[1]} href={n[1]}>
            {n[0]}
          </Link>
        ))}
        <Link className="lang" href={alternate}>
          EN | ES
        </Link>
        <Link className="navCta" href={`${p}/${es ? "contacto" : "contact"}`}>
          {es ? "Solicitar presupuesto" : "Request an Estimate"}
        </Link>
      </nav>
    </header>
  );
}
export function Footer({ lang }: { lang: Lang }) {
  const es = lang === "es",
    p = es ? "/es" : "";
  return (
    <footer>
      <div>
        <Link className="brand light" href={p || "/"}>
          <span>
            CREST <i>&</i> COAST
          </span>
          <small>CONSTRUCTION</small>
        </Link>
        <p>
          {es
            ? "Remodelación residencial cuidadosa en Santa Barbara y comunidades cercanas."
            : "Thoughtful residential remodeling in Santa Barbara and nearby communities."}
        </p>
      </div>
      <div>
        <h3>{es ? "Contacto" : "Contact"}</h3>
        <p className="pendingContact">
          {es
            ? "Teléfono y correo pendientes de verificación antes del lanzamiento."
            : "Phone and email pending verification before launch."}
        </p>
      </div>
      <div>
        <h3>{es ? "Explorar" : "Explore"}</h3>
        <Link href={`${p}/${es ? "servicios" : "services"}`}>
          {es ? "Servicios" : "Services"}
        </Link>
        <Link href={`${p}/${es ? "proyectos" : "projects"}`}>
          {es ? "Proyectos" : "Projects"}
        </Link>
        <Link href={`${p}/${es ? "contacto" : "contact"}`}>
          {es ? "Contacto" : "Contact"}
        </Link>
        <Link href={`${p}/${es ? "testimonios" : "reviews"}`}>
          {es ? "Testimonios" : "Reviews"}
        </Link>
        <Link href={`${p}/${es ? "preguntas-frecuentes" : "faq"}`}>FAQ</Link>
      </div>
      <div>
        <h3>Legal</h3>
        <Link href={`${p}/${es ? "politica-de-privacidad" : "privacy-policy"}`}>
          {es ? "Política de Privacidad" : "Privacy Policy"}
        </Link>
        <Link href={`${p}/${es ? "terminos-de-servicio" : "terms-of-service"}`}>
          {es ? "Términos de Servicio" : "Terms of Service"}
        </Link>
      </div>
      <div className="footerBottom">
        © {new Date().getFullYear()} Crest & Coast Construction ·{" "}
        {es
          ? "Sitio de demostración para un negocio ficticio."
          : "Demonstration website for a fictional business."}
      </div>
    </footer>
  );
}
