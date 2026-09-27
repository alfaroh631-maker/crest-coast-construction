import Script from "next/script";

export function ContactForm({ es }: { es: boolean }) {
  return (
    <div className="form ghlFormEmbed">
      <iframe
        src="https://link.mganexusgo.com/widget/form/rf0ccrRjXUmn0jk7IAHv"
        title={es ? "Solicitud de presupuesto" : "Estimate request"}
        loading="eager"
      />
      <Script src="https://link.mganexusgo.com/js/form_embed.js" strategy="afterInteractive" />
    </div>
  );
}
