import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({ variable: "--font-display", subsets: ["latin"], weight: ["500", "600"] });
const sans = Manrope({ variable: "--font-sans", subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://crest-coast-construction.vercel.app"),
  title: { default: "Crest & Coast Construction | Santa Barbara Remodeling", template: "%s | Crest & Coast Construction" },
  description: "Thoughtful residential construction and remodeling for Santa Barbara, Goleta, Montecito, and Carpinteria.",
  openGraph: { type: "website", siteName: "Crest & Coast Construction", images: ["/images/hero.webp"] },
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="en" className={`${display.variable} ${sans.variable}`}><body>{children}</body></html>;
}
