import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createUploader } from '../middleware/uploadMiddleware.js';
import {
  getPublicProducts,
  getPublicProductById,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  reorderProducts,
} from '../controllers/productController.js';

const upload = createUploader('products');

const publicRouter = express.Router();
publicRouter.get('/', getPublicProducts);       // GET /api/products?category=<id|none>
publicRouter.get('/:id', getPublicProductById); // GET /api/products/:id

const adminRouter = express.Router();
adminRouter.use(protect);
adminRouter.get('/', getAllProducts);                               // GET    /api/admin/products
adminRouter.post('/', upload.array('images', 8), createProduct);    // POST   /api/admin/products
adminRouter.put('/reorder', reorderProducts);                        // PUT    /api/admin/products/reorder
adminRouter.put('/:id', upload.array('images', 8), updateProduct);   // PUT    /api/admin/products/:id
adminRouter.delete('/:id', deleteProduct);                           // DELETE /api/admin/products/:id

export { publicRouter, adminRouter };