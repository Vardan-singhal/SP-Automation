import ContactInfoItem from '../models/ContactInfoItem.js';

// GET /api/contact-info  (public: active only, sorted)
export const getPublicContactInfo = async (req, res) => {
  const items = await ContactInfoItem.find({ isActive: true }).sort({ order: 1 });
  res.json(items);
};

// GET /api/admin/contact-info  (admin: all, sorted)
export const getAllContactInfo = async (req, res) => {
  const items = await ContactInfoItem.find().sort({ order: 1 });
  res.json(items);
};

// POST /api/admin/contact-info
export const createContactInfoItem = async (req, res) => {
  const { type, value, link, isActive } = req.body;

  if (!type || !value) {
    return res.status(400).json({ message: 'type and value are required' });
  }

  const count = await ContactInfoItem.countDocuments({ type });
  const item = await ContactInfoItem.create({
    type,
    value,
    link,
    isActive: isActive ?? true,
    order: count,
  });

  res.status(201).json(item);
};

// PUT /api/admin/contact-info/:id
export const updateContactInfoItem = async (req, res) => {
  const item = await ContactInfoItem.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Item not found' });

  const { type, value, link, isActive, order } = req.body;

  item.type = type ?? item.type;
  item.value = value ?? item.value;
  item.link = link ?? item.link;
  item.isActive = isActive ?? item.isActive;
  item.order = order ?? item.order;

  const updated = await item.save();
  res.json(updated);
};

// DELETE /api/admin/contact-info/:id
export const deleteContactInfoItem = async (req, res) => {
  const item = await ContactInfoItem.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Item not found' });
  await item.deleteOne();
  res.json({ message: 'Item deleted' });
};

// PUT /api/admin/contact-info/reorder  (body: [{ id, order }, ...])
export const reorderContactInfo = async (req, res) => {
  const { items } = req.body;
  if (!Array.isArray(items)) {
    return res.status(400).json({ message: 'items array is required' });
  }

  await Promise.all(
    items.map(({ id, order }) => ContactInfoItem.findByIdAndUpdate(id, { order }))
  );

  const updated = await ContactInfoItem.find().sort({ order: 1 });
  res.json(updated);
};