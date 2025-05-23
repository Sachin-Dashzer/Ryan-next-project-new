import { NextResponse } from "next/server";
import { asyncHandler } from "@/lib/asyncHandler";

export const GET = asyncHandler(async (req) => {
  const response = NextResponse.json({
    success: true,
    message: "User logout successfully",
  });

  response.cookies.set("token", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0), 
  });

  return response;
});
