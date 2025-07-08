import { NextResponse } from "next/server";
import { withDB } from "@/lib/withDB";
import Services from "@/models/services";



const handler = async (req) => {
  

    const fulldata = await Services.find({})

    

    return NextResponse.json(
      { success: true, data: fulldata },
      { status: 200 }
    );
  
}


export const GET = withDB(handler);
