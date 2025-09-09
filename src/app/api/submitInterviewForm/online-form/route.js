// app/api/submitForm/route.js
export async function POST(req) {
  try {
    const body = await req.json();

    // ✅ Separate Google Sheet endpoints
    const directUrl = "https://script.google.com/macros/s/AKfycbxPzMolRCpjM9BzcUeasbkgQoK-FgynFrQ_ddQgvNMiYncR2UB_0gdS4zcBtOoKboNj/exec";
    const qrUrl     = "https://script.google.com/macros/s/AKfycbz0_2bv5qlEdx_dqgCFNCT1PuTFgepm2NQjHe2rVUG9iXRVQ7KkRJk_iH4nZY6OuHOP/exec";

    // ✅ Pick URL based on source
    const url = body.source === "qr" ? qrUrl : directUrl;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const text = await res.text();
    let data = {};
    try { data = JSON.parse(text); } catch { /* ignore */ }

    if (!data.ok) {
      const msg = data.message || text || "Sheet write failed (no details)";
      return Response.json({ message: msg }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
