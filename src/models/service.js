const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  bannerData: {
    description: String,
    imageurl: String,
    title: String
  },
  benefitsData: {
    details: String,
    image: String
  },
  extraFields: {
    detail1: String,
    detail2: String
  },
  faq: [{
    question: String,
    length: Number
  }],
  metadata: {
    description: String,
    pageurl: String,
    title: String,
    overviewData: String
  },
  typesData: {
    details: String,
    images: [String]
  }
}, {
  timestamps: true
});

export default mongoose.models.Service || mongoose.model('Service', serviceSchema);

