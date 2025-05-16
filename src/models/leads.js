import mongoose, { Schema } from "mongoose";

const User = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


export default mongoose.models.User || mongoose.model("User", User);
