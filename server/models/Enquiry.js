import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, trim: true, default: '' },
    subject: { type: String, trim: true, default: '' },
    message: { type: String, trim: true, default: '' },
    company: { type: String, trim: true, default: '' },
    product: { type: String, trim: true, default: '' },
    source: { type: String, enum: ['contact', 'quote', 'product'], required: true },
    status: { type: String, enum: ['new', 'read', 'responded'], default: 'new' },
  },
  { timestamps: true }
);

export default mongoose.model('Enquiry', enquirySchema);