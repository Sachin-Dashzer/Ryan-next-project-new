import mongoose from "mongoose";

const url = process.env.MONGO_URL;

if (!url) {
  throw new Error("Please provide a valid MongoDB URL!");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function DBConnection() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(url, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null; 
    throw err;
  }

  return cached.conn;
}
