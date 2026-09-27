export function ContactForm({ es }: { es: boolean }) {
  return (
    <div className="form ghlFormEmbed">
      <iframe
        src="https://api.leadconnectorhq.com/widget/form/rf0ccrRjXUmn0jk7IAHv"
        id="inline-rf0ccrRjXUmn0jk7IAHv"
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="Crest & Coast Website Estimate Request"
        data-height="745"
        data-layout-iframe-id="inline-rf0ccrRjXUmn0jk7IAHv"
        data-form-id="rf0ccrRjXUmn0jk7IAHv"
        data-cookie-consent="true"
        data-cookie-consent-provider="auto"
        title={es ? "Solicitud de presupuesto de Crest & Coast" : "Crest & Coast Website Estimate Request"}
        loading="eager"
      />
    </div>
  );
}
