import express from 'express';
import NavbarConfig from '../models/NavbarConfig.js';
import { protect } from '../middleware/authMiddleware.js';

const publicRouter = express.Router();
const adminRouter = express.Router();

const populatePaths = [
  { path: 'productMenu.category', select: 'name slug isActive' },
  { path: 'productMenu.product', select: 'name slug isActive' },
  { path: 'productMenu.children.product', select: 'name slug isActive' },
];

const getOrCreateConfig = async () => {
  let config = await NavbarConfig.findOne();
  if (!config) config = await NavbarConfig.create({ productMenu: [] });
  return config;
};

const sortConfig = (config) => {
  config.productMenu.sort((a, b) => a.order - b.order);
  config.productMenu.forEach((item) => {
    if (item.children) item.children.sort((a, b) => a.order - b.order);
  });
  return config;
};

/* -------- PUBLIC -------- */

// GET /api/navbar/products-menu -> lean, populated, active-only, ready for the Header dropdown
publicRouter.get('/products-menu', async (req, res) => {
  try {
    const config = await NavbarConfig.findOne().populate(populatePaths);
    if (!config) return res.json([]);

    sortConfig(config);

    const menu = config.productMenu
      .filter((item) =>
        item.type === 'category'
          ? item.category && item.category.isActive !== false
          : item.product && item.product.isActive !== false
      )
      .map((item) => {
        if (item.type === 'category') {
          return {
            type: 'category',
            id: item.category._id,
            label: item.category.name,
            slug: item.category.slug,
            children: item.children
              .filter((c) => c.product && c.product.isActive !== false)
              .map((c) => ({ id: c.product._id, label: c.product.name, slug: c.product.slug })),
          };
        }
        return { type: 'product', id: item.product._id, label: item.product.name, slug: item.product.slug };
      });

    res.json(menu);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* -------- ADMIN -------- */

// GET /api/admin/navbar/products-menu -> full populated config for building the editor
adminRouter.get('/products-menu', protect, async (req, res) => {
  try {
    const config = await getOrCreateConfig();
    await config.populate(populatePaths);
    sortConfig(config);
    res.json(config);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/admin/navbar/products-menu -> replace the whole structure in one go
adminRouter.put('/products-menu', protect, async (req, res) => {
  try {
    const { productMenu } = req.body;
    const config = await getOrCreateConfig();
    config.productMenu = productMenu;
    await config.save();
    await config.populate(populatePaths);
    sortConfig(config);
    res.json(config);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export { publicRouter, adminRouter };