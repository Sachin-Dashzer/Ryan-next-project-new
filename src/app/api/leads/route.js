import Leads from "@/models/leads";
import { withDB } from "@/lib/withDB";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbySTrYSm42Pz8tglWfDWoLTeAp5dLnWosdarSTTs-qAyPxRDHaXbgGkrubjiXlNB34X/exec"; // replace with your Google Apps Script URL

const handler = async (req) => {
  try {
    const body = await req.json();

    // ✅ Validate phone number (10 digits only)
    if (!/^\d{10}$/.test(body.phone)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Phone number must be exactly 10 digits",
        }),
        { status: 400 }
      );
    }

    // ✅ Check if phone already exists
    // const existingLead = await Leads.findOne({ phone: body.phone });
    // if (existingLead) {
    //   return new Response(
    //     JSON.stringify({
    //       success: false,
    //       message: "Phone number already exists",
    //     }),
    //     { status: 400 }
    //   );
    // }

    // ✅ Save in MongoDB
    const newLead = await Leads.create(body);

    // ✅ Send data to Google Sheets (parallel request)
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: body.full_name || body.name || "",
          phone: body.phone,
          location: body.location || "",
        }),
      });
    } catch (err) {
      console.error("Error sending data to Google Sheets:", err.message);
      // ⚠ Don’t stop execution – continue even if Sheets fails
    }

    return new Response(
      JSON.stringify({ success: true, data: newLead }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
};

export const POST = withDB(handler);
