import type { MetadataRoute } from "next";
import { allPaths } from "@/lib/content";
export default function sitemap():MetadataRoute.Sitemap{const base=process.env.NEXT_PUBLIC_SITE_URL||"https://crest-coast-construction.vercel.app";return allPaths.map((path)=>({url:`${base}${path}`,lastModified:new Date(),changeFrequency:path.includes("privacy")||path.includes("terms")||path.includes("politica")||path.includes("terminos")?"yearly":"monthly",priority:path==="/"||path==="/es"?1:((path.includes("services")||path.includes("servicios"))?0.8:0.6)}));}
