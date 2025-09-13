import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    bannerData: {
      title: String,
      description: String,
      imageurl: String,
      imagealt: String, // ✅ banner alt tag
    },
    benefitsData: {
      title: String,
      description: String,
      component: [
        {
          title: String,
          description: String,
          icon: String,
        },
      ],
    },
    extraFields: {
      detail1: String,
      detail2: String,
    },
    faq: [
      {
        question: String,
        answer: String,
      },
    ],
    metadata: {
      pageName: String,
      pageType: {
        type: String,
        default: "transplant",
        enum: ["transplant", "surgery", "treatment"],
      },
      description: String,
      pageurl: {
        type: String,
        required: true,
        unique: true,
      },
      title: String,
      overviewData: String,
      keywords: [String], // ✅ multiple keywords
    },
    typesData: {
      details: String,
      images: [String],
      alt: [String],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Services ||
  mongoose.model("Services", serviceSchema);
