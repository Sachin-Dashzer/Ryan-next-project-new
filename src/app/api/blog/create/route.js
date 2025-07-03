import { NextResponse } from "next/server";
import { withDB } from "@/lib/withDB";
import Services from "@/models/service";

const handler = async (req) => {
  const body = await req.json();
  const {
    metadata,
    bannerData,
    overviewData,
    typesData,
    benefitsData,
    faq,
    extraFields,
  } = body;

  if (
    !metadata?.title ||
    !metadata?.description ||
    !metadata?.pageurl ||
    !bannerData?.title ||
    !bannerData?.description ||
    !bannerData?.url ||
    !overviewData ||
    !benefitsData?.details ||
    !benefitsData?.image
  ) {
    return NextResponse.json(
      { message: "Please fill all the required fields", data: body },
      { status: 400 }
    );
  }

  const existedService = await Services.findOne({
    "metadata.pageurl": metadata.pageurl,
  });

  if (existedService) {
    return NextResponse.json(
      { message: "Service already exists", data: body },
      { status: 409 }
    );
  }

  const newService = new Services({
    metadata,
    bannerData,
    overviewData,
    typesData,
    benefitsData,
    faq,
    extraFields,
  });

  await newService.save();

  return NextResponse.json(
    { message: "Service registered successfully!", data: newService },
    { status: 201 }
  );
};

export const POST = withDB(handler);
