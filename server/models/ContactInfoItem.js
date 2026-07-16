import mongoose from 'mongoose';

const contactInfoItemSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['address', 'email', 'phone'],
      required: true,
    },
    value: { type: String, required: true, trim: true },
    link: { type: String, trim: true, default: '' }, // optional: mailto:, tel:, maps url
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('ContactInfoItem', contactInfoItemSchema);