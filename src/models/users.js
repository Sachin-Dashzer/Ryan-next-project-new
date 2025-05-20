import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      Select: false
    },
  },
  {
    timestamps: true,
  }
);


export const User = mongoose.models.User || mongoose.model("User", userSchema);
