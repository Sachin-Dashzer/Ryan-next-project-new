import { NextResponse } from "next/server";

const GAS_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbyBdQ9psGJUNxNpNVndoCpHAwcbvhbiGX38_LuQN-i-oRdhq4hsB9CXPUyLxcr_o2IiGQ/exec"; // add to .env.local

export async function POST(req) {
  try {
    const body = await req.json();

    // Optional metadata
    const userAgent = req.headers.get("user-agent") || "";
    const clientIp =
      (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "";

    // Relay to Google Apps Script Web App
    const res = await fetch(GAS_WEBAPP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, userAgent, clientIp }),
      cache: "no-store",
    });

    let data = {};
    try {
      data = await res.json();
    } catch (_) {
      // If GAS returns non-JSON, keep it graceful
      data = {};
    }

    if (!res.ok || data.ok === false) {
      return NextResponse.json(
        { ok: false, message: data.message || "Sheet write failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, message: "Saved to sheet" });
  } catch (err) {
    return NextResponse.json(
      { ok: false, message: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, route: "offline-form" });
}
