import mongoose from 'mongoose';

const specSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, trim: true },
    value: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true, lowercase: true },
    // null / not set = standalone product, not tied to any category
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
    excerpt: { type: String, trim: true, default: '' },
    description: { type: String, trim: true, default: '' },
    features: { type: [String], default: [] },
    specifications: { type: [specSchema], default: [] },
    images: { type: [String], default: [] }, // /uploads/products/... paths
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);