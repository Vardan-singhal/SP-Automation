import mongoose from 'mongoose';

const childSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    order: { type: Number, default: 0 },
  },
  { _id: true }
);

const itemSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['category', 'product'], required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', default: null },
    order: { type: Number, default: 0 },
    children: { type: [childSchema], default: [] },
  },
  { _id: true }
);

const navbarConfigSchema = new mongoose.Schema(
  {
    productMenu: { type: [itemSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model('NavbarConfig', navbarConfigSchema);