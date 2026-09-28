export function ContactForm({ es }: { es: boolean }) {
  const formId = es
    ? "ZBwkHnqoSDsdPc94hTMb"
    : "rf0ccrRjXUmn0jk7IAHv";
  const formName = es
    ? "Crest & Coast Solicitud de Presupuesto – ES"
    : "Crest & Coast Website Estimate Request";

  return (
    <div className="form ghlFormEmbed">
      <iframe
        src={`https://api.leadconnectorhq.com/widget/form/${formId}`}
        id={`inline-${formId}`}
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name={formName}
        data-height={es ? "980" : "745"}
        data-layout-iframe-id={`inline-${formId}`}
        data-form-id={formId}
        data-cookie-consent="true"
        data-cookie-consent-provider="auto"
        title={es ? "Solicitud de presupuesto de Crest & Coast" : formName}
        loading="eager"
      />
    </div>
  );
}
