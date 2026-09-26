import { NextResponse } from "next/server";

const required = ["fullName", "phone", "email", "city", "projectType", "projectDetails"] as const;

function text(value: unknown, max = 3000) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (text(body.companyWebsite)) {
    return NextResponse.json({ ok: true });
  }

  const lead = {
    fullName: text(body.fullName, 160),
    phone: text(body.phone, 60),
    email: text(body.email, 254),
    city: text(body.city, 120),
    projectType: text(body.projectType, 120),
    projectDetails: text(body.projectDetails),
    desiredTimeline: text(body.timeline, 300),
    preferredLanguage: body.preferredLanguage === "Spanish" ? "Spanish" : "English",
    sourcePage: body.sourcePage === "/es/contacto" ? "/es/contacto" : "/contact",
    source: "Crest & Coast Construction Website",
  };

  if (required.some((field) => !lead[field])) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!/^\S+@\S+\.\S+$/.test(lead.email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const webhook = process.env.GHL_WEBSITE_LEAD_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ error: "Lead integration is not configured" }, { status: 503 });
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      cache: "no-store",
    });
    if (!response.ok) {
      return NextResponse.json({ error: "CRM rejected the request" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "CRM unavailable" }, { status: 502 });
  }
}
