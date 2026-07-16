import mongoose from 'mongoose';

const topBarItemSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['hours', 'address', 'email', 'phone'],
      required: true,
    },
    value: { type: String, required: true, trim: true }, // text shown to visitors
    link: { type: String, trim: true, default: '' },      // e.g. mailto:, tel:, maps url
    icon: { type: String, trim: true, default: '' },       // bootstrap-icon class override
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('TopBarItem', topBarItemSchema);