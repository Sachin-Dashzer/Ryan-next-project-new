import mongoose from "mongoose";

const LeadsSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: { type: String, unique: true }, // 👈 prevent duplicates
  serviceType: String,
  message: String,
}, { timestamps: true });

export default mongoose.models.Leads || mongoose.model("Leads", LeadsSchema);
