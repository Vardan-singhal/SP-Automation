import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    author: { type: String, trim: true },
    category: { type: String, trim: true },
    date: { type: Date, default: Date.now },
    mainImage: { type: String },
    excerpt: { type: String },
    contentHtml: { type: String, required: true },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Blog', blogSchema);