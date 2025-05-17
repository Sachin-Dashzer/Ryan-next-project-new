
import { NextResponse } from "next/server";
import { asyncHandler } from "@/lib/asyncHandler";

export const Get = asyncHandler(async()=>{


    const result = await loginUser();

    return NextResponse.json(result, { status: 200 });

})