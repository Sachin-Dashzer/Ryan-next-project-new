// app/api/submitForm/route.js
export async function POST(req) {
  try {
    const body = await req.json();

    const url = "https://script.google.com/macros/s/AKfycbxPDBZ0k1PSw0GeqGkSLCTDn7-Eb4DxFCFn2aTNIj26p4-cw7VOkSAnuLGToXLzUJx6/exec"; // must be the /exec URL
    if (!url) {
      return Response.json({ message: "Missing GAS_WEB_APP_URL" }, { status: 500 });
    }

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const text = await res.text(); // read raw text
    let data = {};
    try { data = JSON.parse(text); } catch { /* leave as {} */ }

    // If GAS didn’t return ok:true, bubble up its message (or raw text)
    if (!data.ok) {
      const msg = data.message || text || "Sheet write failed (no details)";
      return Response.json({ message: msg }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
