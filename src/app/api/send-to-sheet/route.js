export async function POST(req) {
  const body = await req.json();

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbw1mOLFAA4yuuI2zo2AKmB9GiFuViU7-BdQ2kZsODmUGCCB722sTNQ8MsWpQALgK4577A/exec", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Google Script error");
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error sending to Google Sheet:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
