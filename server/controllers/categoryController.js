import Category from '../models/Category.js';

const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

// GET /api/categories  (public: active only, sorted)
export const getPublicCategories = async (req, res) => {
  const categories = await Category.find({ isActive: true }).sort({ order: 1 });
  res.json(categories);
};

// GET /api/admin/categories  (admin: all, sorted)
export const getAllCategories = async (req, res) => {
  const categories = await Category.find().sort({ order: 1 });
  res.json(categories);
};

// POST /api/admin/categories
export const createCategory = async (req, res) => {
  const { name, isActive } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ message: 'name is required' });
  }

  const slug = slugify(name);
  const existing = await Category.findOne({ $or: [{ name }, { slug }] });
  if (existing) {
    return res.status(400).json({ message: 'A category with this name already exists' });
  }

  const count = await Category.countDocuments();
  const category = await Category.create({
    name: name.trim(),
    slug,
    isActive: isActive ?? true,
    order: count,
  });

  res.status(201).json(category);
};

// PUT /api/admin/categories/:id
export const updateCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).json({ message: 'Category not found' });

  const { name, isActive, order } = req.body;

  if (name && name.trim() && name !== category.name) {
    const newSlug = slugify(name);
    const clash = await Category.findOne({ _id: { $ne: category._id }, $or: [{ name }, { slug: newSlug }] });
    if (clash) {
      return res.status(400).json({ message: 'A category with this name already exists' });
    }
    category.name = name.trim();
    category.slug = newSlug;
  }

  if (isActive !== undefined) category.isActive = isActive;
  if (order !== undefined) category.order = order;

  const updated = await category.save();
  res.json(updated);
};

// DELETE /api/admin/categories/:id
export const deleteCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).json({ message: 'Category not found' });

  // NOTE: once Product CRUD exists, add a check here to block deletion
  // (or reassign products) if products still reference this category.

  await category.deleteOne();
  res.json({ message: 'Category deleted' });
};

// PUT /api/admin/categories/reorder
export const reorderCategories = async (req, res) => {
  const { items } = req.body;
  if (!Array.isArray(items)) {
    return res.status(400).json({ message: 'items array is required' });
  }

  await Promise.all(
    items.map(({ id, order }) => Category.findByIdAndUpdate(id, { order }))
  );

  const updated = await Category.find().sort({ order: 1 });
  res.json(updated);
};