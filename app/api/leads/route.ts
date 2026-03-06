// app/api/leads/route.ts

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

/**
 * ✅ Prisma singleton (prevents "too many connections" in Next.js dev)
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

interface LeadData {
  name: string;
  phone: string;
  email?: string;
  treatment?: string;
  procedure?: string;
  message?: string;
  city?: string;
  age?: string;
  pincode?: string;
  test?: string;
  source?: string;
  formName?: string;
  consent?: boolean;
  status?: string;
  concern?: string; // For branch selection in bonitaa form
  pageUrl?: string | null;  // Allow null
  referrerUrl?: string | null; // Allow null
}

function logEnvironmentStatus() {
  console.log("🔍 Environment Check:", {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL ? "***SET***" : "❌ NOT SET",
    TELECRM_API_URL: process.env.TELECRM_API_URL ? "***SET***" : "❌ NOT SET",
    TELECRM_API_KEY: process.env.TELECRM_API_KEY ? "***SET***" : "❌ NOT SET",
  });
}

/**
 * ✅ Normalize phone for TeleCRM
 * - If 10 digits → assume India and prefix 91
 * - If already starts with 91 and 12 digits → keep
 */
function normalizePhoneForTeleCRM(phone: string) {
  const digits = (phone || "").replace(/\D/g, "");
  if (digits.length === 10) return `91${digits}`;
  return digits; // keep whatever format (e.g., already includes country code)
}

/**
 * ✅ Decide if TeleCRM truly created/updated a lead
 * We ONLY mark synced=true if TeleCRM returns strong evidence.
 */
function isTelecrmConfirmed(data: any) {
  if (!data) return false;

  // common patterns from CRMs
  if (Array.isArray(data.modifiedLeadIds) && data.modifiedLeadIds.length > 0) return true;
  if (Array.isArray(data.leadIds) && data.leadIds.length > 0) return true;
  if (data.leadId || data.id || data.LeadID) return true;

  const status = String(data.status || "").toLowerCase();
  if (status === "created" || status === "updated" || status === "success") return true;

  // "Accepted" is NOT confirmation (usually queued / async)
  if (String(data.result || "").toLowerCase() === "accepted") return false;

  return false;
}

/**
 * ✅ Save lead to DB
 */
async function saveLeadToDatabase(leadData: LeadData, telecrmResult?: any) {
  console.log("💾 Saving lead to database:", {
    name: leadData.name,
    phone: leadData.phone,
    email: leadData.email,
    treatment: leadData.treatment || leadData.test || leadData.concern,
    formName: leadData.formName,
    pageUrl: leadData.pageUrl, // Log URL tracking
  });

  // Map concern to treatment if it exists (for bonitaa form)
  const treatment = leadData.treatment || leadData.test || leadData.concern || null;

  const lead = await prisma.lead.create({
    data: {
      name: leadData.name,
      phone: leadData.phone,
      email: leadData.email || null,
      treatment: treatment,
      procedure: leadData.procedure || leadData.test || null,
      message: leadData.message || null,
      city: leadData.city || null,
      age: leadData.age || null,
      pincode: leadData.pincode || null,
      consent: !!leadData.consent,
      source: leadData.source || "Website",
      formName: leadData.formName || "Website Leads",
      status: leadData.status || "new",
      pageUrl: leadData.pageUrl ?? null, // Use nullish coalescing to handle undefined
      referrerUrl: leadData.referrerUrl ?? null, // Use nullish coalescing to handle undefined

      // ✅ Only true when TeleCRM confirmed
      telecrmSynced: !!telecrmResult?.synced,
      telecrmId: telecrmResult?.leadId || telecrmResult?.id || telecrmResult?.LeadID || null,
    },
  });

  console.log("✅ Lead saved to database:", { 
    id: lead.id, 
    name: lead.name, 
    phone: lead.phone,
    pageUrl: lead.pageUrl 
  });
  return lead;
}

/**
 * ✅ Send to TeleCRM
 */
async function sendToTeleCRM(leadData: LeadData) {
  if (!process.env.TELECRM_API_URL || !process.env.TELECRM_API_KEY) {
    console.log("ℹ️ TeleCRM not configured, skipping external sync");
    return null;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  const phone = normalizePhoneForTeleCRM(leadData.phone);
  
  // Get treatment value from various possible fields
  const treatment = leadData.treatment || leadData.test || leadData.concern || "Not specified";
  
  // Get branch/location from concern field (bonitaa form)
  const branch = leadData.concern || "Not specified";

  // Safely get URL strings
  const pageUrl = leadData.pageUrl || "Not specified";
  const referrerUrl = leadData.referrerUrl || "Not specified";

  // ✅ Start minimal (most stable). Add extra info as notes.
  const telecrmPayload = {
    fields: {
      phone,
      name: leadData.name,
      email: leadData.email || "",
    },
    actions: [
      { type: "SYSTEM_NOTE", text: `Form Name: ${leadData.formName || "Website Leads"}` },
      { type: "SYSTEM_NOTE", text: `Treatment/Concern: ${treatment}` },
      { type: "SYSTEM_NOTE", text: `Branch: ${branch}` },
      { type: "SYSTEM_NOTE", text: `Pincode: ${leadData.pincode || "Not specified"}` },
      { type: "SYSTEM_NOTE", text: `Message: ${leadData.message || "Not specified"}` },
      { type: "SYSTEM_NOTE", text: `Consent Given: ${leadData.consent ? "Yes" : "No"}` },
      { type: "SYSTEM_NOTE", text: `Source: ${leadData.source || "Website"}` },
      { type: "SYSTEM_NOTE", text: `Page URL: ${pageUrl}` }, // Use safe variable
      { type: "SYSTEM_NOTE", text: `Referrer: ${referrerUrl}` }, // Use safe variable
    ],
  };

  console.log("📤 Sending to TeleCRM:", {
    endpoint: process.env.TELECRM_API_URL,
    formName: leadData.formName,
    payloadPreview: { ...telecrmPayload, fields: { ...telecrmPayload.fields, phone: "***REDACTED***" } },
  });

  try {
    const res = await fetch(process.env.TELECRM_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TELECRM_API_KEY}`,
        Accept: "application/json",
        "X-Client-ID": "nextjs-website-integration",
      },
      body: JSON.stringify(telecrmPayload),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    // 204 means "no content" — but still not giving a lead id
    if (res.status === 204) {
      console.log("✅ TeleCRM: 204 No Content (cannot confirm lead id)");
      return {
        synced: false, // ❗ don't lie — we can't confirm lead exists in UI
        statusCode: 204,
        result: "NoContent",
        note: "TeleCRM returned 204, no body. Cannot confirm lead creation without a verify API.",
      };
    }

    const text = await res.text();

    if (!text.trim()) {
      console.warn("⚠️ TeleCRM empty response body");
      return { synced: false, statusCode: res.status, note: "Empty response from TeleCRM" };
    }

    // if HTML comes back, it's usually an error page / auth issue
    if (text.trim().startsWith("<!DOCTYPE") || text.trim().startsWith("<html")) {
      console.warn("⚠️ TeleCRM returned HTML (likely error page)");
      return {
        synced: false,
        statusCode: res.status,
        note: "TeleCRM returned HTML error page",
        preview: text.substring(0, 250),
      };
    }

    let data: any;
    try {
      data = JSON.parse(text);
    } catch {
      console.warn("⚠️ TeleCRM returned non-JSON response:", text.substring(0, 300));
      return {
        synced: false,
        statusCode: res.status,
        note: "Non-JSON response from TeleCRM",
        preview: text.substring(0, 300),
      };
    }

    const confirmed = res.ok && isTelecrmConfirmed(data);

    console.log("📊 TeleCRM response parsed:", {
      status: res.status,
      ok: res.ok,
      confirmed,
      sample: data,
    });

    return {
      ...data,
      synced: confirmed, // ✅ only true if confirmed
      statusCode: res.status,
      leadId: data?.leadId || data?.id || data?.LeadID || null,
      note:
        confirmed
          ? "TeleCRM lead confirmed"
          : "TeleCRM accepted request but did not confirm lead creation (may be queued / filtered / rejected).",
    };
  } catch (err: any) {
    clearTimeout(timeout);
    console.warn("⚠️ TeleCRM submission failed:", { message: err?.message || String(err) });
    return { synced: false, note: "TeleCRM fetch failed", error: err?.message || String(err) };
  }
}

/**
 * ✅ POST /api/leads
 */
export async function POST(request: NextRequest) {
  logEnvironmentStatus();

  let data: Partial<LeadData> = {};

  try {
    data = await request.json();

    // Get URL information from headers
    const headersList = request.headers;
    const referer = headersList.get('referer') || headersList.get('referrer');
    
    // Get the full URL of the request
    const url = new URL(request.url);
    const baseUrl = `${url.protocol}//${url.host}`;

    console.log("📨 Received lead submission:", {
      name: data.name,
      phoneMasked: data.phone ? data.phone.substring(0, 3) + "****" + data.phone.substring(Math.max(0, data.phone.length - 3)) : "N/A",
      formName: data.formName,
      pageUrl: data.pageUrl,
      referrerUrl: data.referrerUrl || referer,
    });

    if (!data.name || !data.phone) {
      return NextResponse.json(
        { success: false, error: "Missing required fields", details: "Please provide name and phone number" },
        { status: 400 }
      );
    }

    const validatedData: LeadData = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      treatment: data.treatment,
      procedure: data.procedure,
      message: data.message,
      city: data.city,
      age: data.age,
      pincode: data.pincode,
      test: data.test,
      source: data.source,
      formName: data.formName,
      consent: data.consent,
      status: data.status,
      concern: data.concern,
      pageUrl: data.pageUrl ?? null, // Ensure pageUrl is string | null
      referrerUrl: data.referrerUrl ?? null, // Ensure referrerUrl is string | null
    };

    // Ensure URL fields are set
    if (!validatedData.pageUrl) {
      // If pageUrl not provided in request, try to get from referer
      validatedData.pageUrl = referer || null;
    }
    
    if (!validatedData.referrerUrl && referer) {
      validatedData.referrerUrl = referer;
    }

    // ✅ TeleCRM sync (optional)
    let telecrmResponse: any = null;
    if (process.env.TELECRM_API_URL && process.env.TELECRM_API_KEY) {
      console.log("🚀 Attempting TeleCRM sync...");
      telecrmResponse = await sendToTeleCRM(validatedData);
    } else {
      console.log("⏭️ TeleCRM not configured, skipping sync");
    }

    // ✅ Save to DB (mandatory)
    const dbLead = await saveLeadToDatabase(validatedData, telecrmResponse);

    const responseData = {
      success: true,
      leadId: dbLead.id,
      databaseSaved: true,
      telecrmSynced: !!telecrmResponse?.synced,
      telecrmResponse,
      timestamp: new Date().toISOString(),
      formName: validatedData.formName || "Website Leads",
      message: "Thank you! We have received your request and will contact you soon.",
      pageUrl: dbLead.pageUrl, // Include in response for debugging
    };

    console.log("✅ Final response:", {
      leadId: dbLead.id,
      telecrmSynced: !!telecrmResponse?.synced,
      telecrmId: telecrmResponse?.leadId || telecrmResponse?.id || null,
      pageUrl: dbLead.pageUrl,
    });

    return NextResponse.json(responseData, { status: 200 });
  } catch (error: any) {
    console.error("❌ Lead submission error:", { message: error?.message || String(error) });
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process your request",
        details: "Please try again or contact support",
        referenceId: `ERR-${Date.now()}`,
        formName: data?.formName || "Website Leads",
      },
      { status: 500 }
    );
  }
}

/**
 * ✅ GET /api/leads (with filtering support)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status");
    const formName = searchParams.get("formName");
    const pageUrl = searchParams.get("pageUrl"); // Add URL filtering
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "100", 10);
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { treatment: { contains: search, mode: "insensitive" } },
        { message: { contains: search, mode: "insensitive" } },
        { pincode: { contains: search, mode: "insensitive" } },
        { formName: { contains: search, mode: "insensitive" } },
        { pageUrl: { contains: search, mode: "insensitive" } }, // Search in URLs
      ];
    }

    if (status && status !== "all") where.status = status;
    if (formName && formName !== "all") where.formName = formName;
    if (pageUrl && pageUrl !== "all") where.pageUrl = { contains: pageUrl, mode: "insensitive" };

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({ where, orderBy: { createdAt: "desc" }, skip, take: limit }),
      prisma.lead.count({ where }),
    ]);

    return NextResponse.json(
      {
        success: true,
        leads: leads.map((lead: any) => ({
          id: lead.id,
          name: lead.name,
          phone: lead.phone,
          email: lead.email,
          treatment: lead.treatment,
          procedure: lead.procedure,
          message: lead.message,
          city: lead.city,
          age: lead.age,
          pincode: lead.pincode,
          consent: lead.consent,
          source: lead.source,
          formName: lead.formName,
          status: lead.status,
          telecrmSynced: lead.telecrmSynced,
          telecrmId: lead.telecrmId,
          pageUrl: lead.pageUrl, // Include in response (can be null)
          referrerUrl: lead.referrerUrl, // Include in response (can be null)
          createdAt: lead.createdAt.toISOString(),
          updatedAt: lead.updatedAt.toISOString(),
        })),
        pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch leads", details: error?.message || "Unknown error" },
      { status: 500 }
    );
  }
}