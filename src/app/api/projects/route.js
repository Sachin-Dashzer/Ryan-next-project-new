import { dbConnect } from "@/lib/dbConnect";
// import User from "@/models/User";

export async function GET(req) {
  await dbConnect();

  // const users = await User.find();
  return Response.json({});
}
