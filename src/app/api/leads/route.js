import Leads from "@/models/leads";
import { withDB } from "@/lib/withDB";

const handler = async (req) => {
  try {
    const body = await req.json();

    // 🔎 Check if phone already exists
    const existingLead = await Leads.findOne({ phone: body.phone });
    if (existingLead) {
      return new Response(
        JSON.stringify({ success: false, message: "Phone number already exists" }),
        { status: 400 }
      );
    }

    // ✅ Create new lead if not duplicate
    const newLead = await Leads.create(body);

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
