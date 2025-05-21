

import { NextResponse } from "next/server";
import { asyncHandler } from "@/lib/asyncHandler";
import { registerUser } from "@/controllers/authController";



export const POST = asyncHandler(async(req) =>{


    const body = await req.json();
    const data = await registerUser(body);

    return NextResponse.json(data , {status : 201});
})