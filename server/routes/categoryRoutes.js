import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getPublicCategories,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  reorderCategories,
} from '../controllers/categoryController.js';

const publicRouter = express.Router();
publicRouter.get('/', getPublicCategories); // GET /api/categories

const adminRouter = express.Router();
adminRouter.use(protect);
adminRouter.get('/', getAllCategories);          // GET    /api/admin/categories
adminRouter.post('/', createCategory);           // POST   /api/admin/categories
adminRouter.put('/reorder', reorderCategories);  // PUT    /api/admin/categories/reorder
adminRouter.put('/:id', updateCategory);         // PUT    /api/admin/categories/:id
adminRouter.delete('/:id', deleteCategory);      // DELETE /api/admin/categories/:id

export { publicRouter, adminRouter };