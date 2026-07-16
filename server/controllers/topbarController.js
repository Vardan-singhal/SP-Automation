import TopBarItem from '../models/TopBarItem.js';

// GET /api/topbar  (public: only active items, sorted)
export const getPublicTopBar = async (req, res) => {
  const items = await TopBarItem.find({ isActive: true }).sort({ order: 1 });
  res.json(items);
};

// GET /api/admin/topbar  (admin: all items, sorted)
export const getAllTopBar = async (req, res) => {
  const items = await TopBarItem.find().sort({ order: 1 });
  res.json(items);
};

// POST /api/admin/topbar
export const createTopBarItem = async (req, res) => {
  const { type, value, link, icon, isActive } = req.body;

  if (!type || !value) {
    return res.status(400).json({ message: 'type and value are required' });
  }

  const count = await TopBarItem.countDocuments();
  const item = await TopBarItem.create({
    type,
    value,
    link,
    icon,
    isActive: isActive ?? true,
    order: count,
  });

  res.status(201).json(item);
};

// PUT /api/admin/topbar/:id
export const updateTopBarItem = async (req, res) => {
  const item = await TopBarItem.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Item not found' });

  const { type, value, link, icon, isActive, order } = req.body;

  item.type = type ?? item.type;
  item.value = value ?? item.value;
  item.link = link ?? item.link;
  item.icon = icon ?? item.icon;
  item.isActive = isActive ?? item.isActive;
  item.order = order ?? item.order;

  const updated = await item.save();
  res.json(updated);
};

// DELETE /api/admin/topbar/:id
export const deleteTopBarItem = async (req, res) => {
  const item = await TopBarItem.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Item not found' });
  await item.deleteOne();
  res.json({ message: 'Item deleted' });
};

// PUT /api/admin/topbar/reorder  (body: [{ id, order }, ...])
export const reorderTopBar = async (req, res) => {
  const { items } = req.body; // [{ id, order }]
  if (!Array.isArray(items)) {
    return res.status(400).json({ message: 'items array is required' });
  }

  await Promise.all(
    items.map(({ id, order }) =>
      TopBarItem.findByIdAndUpdate(id, { order })
    )
  );

  const updated = await TopBarItem.find().sort({ order: 1 });
  res.json(updated);
};