"use client";

import { FormEvent, useState } from "react";
import { services } from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({ es }: { es: boolean }) {
  const [status, setStatus] = useState<Status>("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("submitting");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Submission failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="form" id="crest-coast-estimate-form" onSubmit={submit}>
      <div className="field">
        <label htmlFor="full-name">{es ? "Nombre completo" : "Full Name"}</label>
        <input id="full-name" name="fullName" type="text" required autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="phone">{es ? "Teléfono" : "Phone"}</label>
        <input id="phone" name="phone" type="tel" required autoComplete="tel" />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="city">{es ? "Ciudad" : "City"}</label>
        <input id="city" name="city" type="text" required autoComplete="address-level2" />
      </div>
      <div className="field">
        <label htmlFor="project-type">{es ? "Tipo de proyecto" : "Project Type"}</label>
        <select id="project-type" name="projectType" required defaultValue="">
          <option value="" disabled>{es ? "Selecciona una opción" : "Select one"}</option>
          {services.map((service) => (
            <option value={service.key} key={service.key}>
              {es ? service.es : service.en}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="timeline">
          {es ? "Tiempo deseado (opcional)" : "Desired Timeline (optional)"}
        </label>
        <input id="timeline" name="timeline" type="text" />
      </div>
      <div className="field full">
        <label htmlFor="project-details">{es ? "Detalles del proyecto" : "Project Details"}</label>
        <textarea id="project-details" name="projectDetails" required />
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="company-website">Company website</label>
        <input id="company-website" name="companyWebsite" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="preferredLanguage" value={es ? "Spanish" : "English"} />
      <input type="hidden" name="sourcePage" value={es ? "/es/contacto" : "/contact"} />
      <button className="btn" type="submit" disabled={status === "submitting"}>
        {status === "submitting"
          ? es ? "Enviando…" : "Sending…"
          : es ? "Enviar solicitud" : "Send Request"}
      </button>
      <p className={`formStatus ${status}`} aria-live="polite" role="status">
        {status === "success"
          ? es ? "Gracias por su solicitud." : "Thank you for your request."
          : status === "error"
            ? es
              ? "No pudimos enviar la solicitud. Tus datos permanecen en el formulario; inténtalo de nuevo."
              : "We could not send the request. Your information remains in the form; please try again."
            : ""}
      </p>
    </form>
  );
}
