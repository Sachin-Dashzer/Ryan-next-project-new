import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema({
  results: [
    {
      imageUrl: { type: String },
      alt: { type: String },
    },
  ],
  service: [
    {
      imageUrl: { type: String },
      alt: { type: String },
      title: { type: String },
      link: { type: String },
    },
  ],
  branch: [
    {
      imageUrl: { type: String },
      alt: { type: String },
      name: { type: String },
      link: { type: String },
    },
  ],
  testimonial: [
    {
      imageUrl: { type: String },
      alt: { type: String },
      discription: { type: String }, 
    },
  ],
});

export default mongoose.models.Sliders ||
  mongoose.model("Sliders", sliderSchema);