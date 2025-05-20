import {User} from "@/models/users.js";
import bcrypt from "bcryptjs";


export const registerUser = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new Error("Please fill all the fields");
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    throw new Error("Email already exists");
  }


  const newPassword = await bcrypt.hash(password, 10);



  const user = await User.create({
    name,
    email,
    password : newPassword,
  });






  return {
    message: "user added succesfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};
