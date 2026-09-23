"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();
  const es = pathname.startsWith("/es");
  return (
    <main className="section legal notFoundPage">
      <span className="eyebrow">404</span>
      <h1>{es ? "Página no encontrada" : "Page not found"}</h1>
      <p>
        {es
          ? "La página que buscas no existe o cambió de ubicación."
          : "The page you requested does not exist or has moved."}
      </p>
      <Link className="btn" href={es ? "/es" : "/"}>
        {es ? "Volver al inicio" : "Return home"}
      </Link>
    </main>
  );
}
