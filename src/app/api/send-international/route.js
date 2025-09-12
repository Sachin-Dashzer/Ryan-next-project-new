export async function POST(req) {
  try {
    const body = await req.json();

   
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

    console.log(data);

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
