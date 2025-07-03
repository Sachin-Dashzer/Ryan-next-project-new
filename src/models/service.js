import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    metadata: {
      title: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        required: true,
        trim: true,
      },
      pageurl: {
        type: String,
        required: true,
        trim: true,
      },
    },

    bannerData: {
      title: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        required: true,
        trim: true,
      },
      url: {
        type: String,
        required: true,
        trim: true,
      },
    },

    overviewData: {
      type: String,
      required: true,
      trim: true,
    },

    typesData: {
      images: [
        {
          type: String,
          trim: true,
        },
      ],
      details: [
        {
          type: String,
          trim: true,
        },
      ],
    },

    benefitsData: {
      details: {
        type: String,
        required: true,
        trim: true,
      },
      image: {
        type: String,
        required: true,
        trim: true,
      },
    },

    faq: {
      details: [
        {
          type: String,
          trim: true,
        },
      ],
    },
    extraFields: {
      detail1: {
        type: String,
        required: true,
        trim: true,
      },
      detail2: {
        type: String,
        required: true,
        trim: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Service ||
  mongoose.model("Service", ServiceSchema);
