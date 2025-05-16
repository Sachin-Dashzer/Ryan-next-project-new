import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URL;

if (!MONGO_URI) {
  throw new Error("MONGO_URL not found in environment variables");
}

let isConnected = false;

const dbConnect = async () => {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(MONGO_URI); 
    console.log(`Database connected: ${db.connection.host}`);
    isConnected = true;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1)
  }
};

export default dbConnect;
