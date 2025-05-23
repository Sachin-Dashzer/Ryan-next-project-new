import { NextResponse } from "next/server";
import { asyncHandler } from "@/lib/asyncHandler";
import { User } from "@/models/users.js";


export const GET = asyncHandler(async (req) => {

    const allusers = await User.find();

    return NextResponse.json(allusers , {successs : true , status : 201})

});
