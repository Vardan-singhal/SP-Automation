import mongoose from 'mongoose';

const footerSettingsSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      default:
        "Future-ready solar, storage, and power solutions. Aligned with India's self-manufacturing vision. Committed to quality, innovation, and partnerships.",
    },
  },
  { timestamps: true }
);

export default mongoose.model('FooterSettings', footerSettingsSchema);