import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getPublicTopBar,
  getAllTopBar,
  createTopBarItem,
  updateTopBarItem,
  deleteTopBarItem,
  reorderTopBar,
} from '../controllers/topbarController.js';

const publicRouter = express.Router();
publicRouter.get('/', getPublicTopBar); // GET /api/topbar

const adminRouter = express.Router();
adminRouter.use(protect);
adminRouter.get('/', getAllTopBar);           // GET    /api/admin/topbar
adminRouter.post('/', createTopBarItem);      // POST   /api/admin/topbar
adminRouter.put('/reorder', reorderTopBar);   // PUT    /api/admin/topbar/reorder
adminRouter.put('/:id', updateTopBarItem);    // PUT    /api/admin/topbar/:id
adminRouter.delete('/:id', deleteTopBarItem); // DELETE /api/admin/topbar/:id

export { publicRouter, adminRouter };