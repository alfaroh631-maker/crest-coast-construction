import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { headers } from "next/headers";
import Script from "next/script";
import "./globals.css";

const display = Cormorant_Garamond({ variable: "--font-display", subsets: ["latin"], weight: ["500", "600"] });
const sans = Manrope({ variable: "--font-sans", subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://crest-coast-construction.vercel.app"),
  title: { default: "Crest & Coast Construction | Santa Barbara Construction & Remodeling", template: "%s | Crest & Coast Construction" },
  description: "Residential construction and remodeling for Santa Barbara, Goleta, Montecito, and Carpinteria.",
  openGraph: { type: "website", siteName: "Crest & Coast Construction", images: ["/images/hero-construction.webp"] },
};

export default async function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  const requestHeaders = await headers();
  const lang = requestHeaders.get("x-site-language") === "es" ? "es" : "en";
  const trackingId = process.env.NEXT_PUBLIC_GHL_TRACKING_ID || "tk_b85e85e85b134b6389c9f128a41d3749";
  const chatWidgetId = lang === "es"
    ? "6ab75fef08a179ce38abb4e6"
    : "6ab75f9d08a179ce38ababe4";

  return (
    <html lang={lang} className={`${display.variable} ${sans.variable}`}>
      <body>
        {children}
        <Script
          src="https://link.mganexusgo.com/js/external-tracking.js"
          data-tracking-id={trackingId}
          strategy="afterInteractive"
        />
        <Script
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id={chatWidgetId}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
