import { NextResponse } from "next/server";
import { asyncHandler } from "@/lib/asyncHandler";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "@/models/users";

export const POST = asyncHandler(async (req) => {
  const body = await req.json();

  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json(
      { message: "Please fill all the fields" },
      { status: 400 }
    );
  }

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const token = jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    process.env.JSON_WEBTOKEN,
    { expiresIn: "2h" }
  );

  const response = NextResponse.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    message: "Logged in successfully!",
  });

  response.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 2 * 60 * 60,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
});
