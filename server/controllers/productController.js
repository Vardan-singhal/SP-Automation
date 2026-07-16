import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from '../models/Product.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const slugify = (text) =>
  text.toString().toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const deleteFileIfExists = (relativePath) => {
  if (!relativePath) return;
  const filePath = path.join(__dirname, '..', relativePath);
  fs.unlink(filePath, () => {}); // ignore errors, file may already be gone
};

// features / specifications arrive as JSON strings inside multipart form-data
const parseArrayField = (value, fallback = []) => {
  if (value === undefined) return fallback;
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
};

// GET /api/products  (public: active only) — supports ?category=<id> and ?category=none for standalone
export const getPublicProducts = async (req, res) => {
  const { category } = req.query;
  const filter = { isActive: true };
  if (category === 'none') filter.category = null;
  else if (category) filter.category = category;

  const products = await Product.find(filter)
    .populate('category', 'name slug')
    .sort({ order: 1 });
  res.json(products);
};

// GET /api/products/:id  (public single product)
export const getPublicProductById = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id, isActive: true }).populate('category', 'name slug');
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};

// GET /api/admin/products  (admin: all, sorted)
export const getAllProducts = async (req, res) => {
  const products = await Product.find().populate('category', 'name slug').sort({ order: 1 });
  res.json(products);
};

// POST /api/admin/products
export const createProduct = async (req, res) => {
  const { name, category, excerpt, description, isActive } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ message: 'name is required' });
  }

  const slug = slugify(name);
  const existing = await Product.findOne({ slug });
  if (existing) {
    return res.status(400).json({ message: 'A product with this name already exists' });
  }

  const features = parseArrayField(req.body.features);
  const specifications = parseArrayField(req.body.specifications);
  const images = (req.files || []).map((f) => `/uploads/products/${f.filename}`);

  const count = await Product.countDocuments();
  const product = await Product.create({
    name: name.trim(),
    slug,
    category: category && category !== 'none' ? category : null,
    excerpt,
    description,
    features,
    specifications,
    images,
    isActive: isActive === 'false' ? false : true,
    order: count,
  });

  const populated = await product.populate('category', 'name slug');
  res.status(201).json(populated);
};

// PUT /api/admin/products/:id
export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  const { name, category, excerpt, description, isActive, order } = req.body;

  if (name && name.trim() && name !== product.name) {
    const newSlug = slugify(name);
    const clash = await Product.findOne({ _id: { $ne: product._id }, slug: newSlug });
    if (clash) return res.status(400).json({ message: 'A product with this name already exists' });
    product.name = name.trim();
    product.slug = newSlug;
  }

  if (category !== undefined) product.category = category && category !== 'none' ? category : null;
  if (excerpt !== undefined) product.excerpt = excerpt;
  if (description !== undefined) product.description = description;
  if (req.body.features !== undefined) product.features = parseArrayField(req.body.features, product.features);
  if (req.body.specifications !== undefined) {
    product.specifications = parseArrayField(req.body.specifications, product.specifications);
  }
  if (isActive !== undefined) product.isActive = isActive === 'true' || isActive === true;
  if (order !== undefined) product.order = order;

  // existingImages = JSON array of image paths the admin chose to KEEP; anything missing gets deleted from disk
  const keepImages = parseArrayField(req.body.existingImages, product.images);
  const removedImages = product.images.filter((img) => !keepImages.includes(img));
  removedImages.forEach(deleteFileIfExists);

  const newImages = (req.files || []).map((f) => `/uploads/products/${f.filename}`);
  product.images = [...keepImages, ...newImages];

  const updated = await product.save();
  const populated = await updated.populate('category', 'name slug');
  res.json(populated);
};

// DELETE /api/admin/products/:id
export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  product.images.forEach(deleteFileIfExists);
  await product.deleteOne();
  res.json({ message: 'Product deleted' });
};

// PUT /api/admin/products/reorder
export const reorderProducts = async (req, res) => {
  const { items } = req.body;
  if (!Array.isArray(items)) {
    return res.status(400).json({ message: 'items array is required' });
  }
  await Promise.all(items.map(({ id, order }) => Product.findByIdAndUpdate(id, { order })));
  const updated = await Product.find().populate('category', 'name slug').sort({ order: 1 });
  res.json(updated);
};