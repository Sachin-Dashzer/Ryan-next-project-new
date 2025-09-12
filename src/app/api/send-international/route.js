export async function POST(req) {
  try {
    const body = await req.json();

    // ✅ If no country selected, fallback to auto-detect
    if (!body.country || body.country === "") {
      const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0] ||
        req.headers.get("x-real-ip") ||
        "8.8.8.8"; // fallback
      try {
        const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
        const geo = await geoRes.json();
        body.country = geo.country_name || "Unknown";
      } catch (geoErr) {
        console.error("Geo lookup failed:", geoErr);
        body.country = "Unknown";
      }
    }

    // ✅ Send to Google Sheets
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzJgOWx0GVIEK1JgHH2PpttaV262JgTj7sSef5v5XFlDRnJ4DFncNUPIYB2sWPa0Bq_5g/exec",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error("Google Script error");
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error sending to Google Sheet:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
