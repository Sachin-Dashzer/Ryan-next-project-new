import mongoose from "mongoose";

const LeadsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String, required: true }, // ✅ duplicates allowed now
    serviceType: { type: String },
    message: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Leads || mongoose.model("Leads", LeadsSchema);
