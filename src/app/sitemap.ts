import type { MetadataRoute } from "next";
import { allPaths, pathInfo } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://crest-coast-construction.vercel.app";

  return allPaths.map((path) => {
    const { lang, equivalent } = pathInfo(path);
    const enPath = lang === "en" ? path : equivalent;
    const esPath = lang === "es" ? path : equivalent;
    return {
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency:
        path.includes("privacy") ||
        path.includes("terms") ||
        path.includes("politica") ||
        path.includes("terminos")
          ? "yearly"
          : "monthly",
      priority:
        path === "/" || path === "/es"
          ? 1
          : path.includes("services") || path.includes("servicios")
            ? 0.8
            : 0.6,
      alternates: {
        languages: {
          en: `${base}${enPath}`,
          es: `${base}${esPath}`,
        },
      },
    };
  });
}
