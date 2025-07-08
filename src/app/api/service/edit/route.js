import { NextResponse } from "next/server";
import { withDB } from "@/lib/withDB";
import Services from "@/models/services";



const handler = async (req) => {   
  

    const body = await req.json();
    const {
      id,
      bannerData,
      benefitsData,
      extraFields,
      faq,
      metadata,
      overviewData,
      typesData,
    } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    const updatedClinic = await Services.findByIdAndUpdate(
      id,
      {
        bannerData,
        benefitsData,
        extraFields,
        faq,
        metadata,
        overviewData,
        typesData,
      },
      { new: true } 
    );

    if (!updatedClinic) {
      return NextResponse.json(
        { success: false, message: "Clinic not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedClinic },
      { status: 200 }
    );
  
}


export const PUT = withDB(handler);
