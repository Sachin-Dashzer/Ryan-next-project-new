import { NextResponse } from "next/server";
import { asyncHandler } from "@/lib/asyncHandler";
import { User } from "@/models/users.js";
import bcrypt from "bcryptjs";

export const POST = asyncHandler(async (req) => {
  const body = await req.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return NextResponse.json(
      { message: "Please fill all the fields" },
      { status: 400 }
    );
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    return NextResponse.json(
      { message: "Email already exists" },
      { status: 400 }
    );
  }

  const newPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: newPassword,
  });

  return NextResponse.json(
    {
      message: "User added successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    },
    { status: 201 }
  );
});
