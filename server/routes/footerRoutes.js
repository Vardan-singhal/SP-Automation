import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getPublicFooter, getAdminFooter, updateFooter } from '../controllers/footerController.js';

const publicRouter = express.Router();
publicRouter.get('/', getPublicFooter); // GET /api/footer

const adminRouter = express.Router();
adminRouter.use(protect);
adminRouter.get('/', getAdminFooter);   // GET /api/admin/footer
adminRouter.put('/', updateFooter);     // PUT /api/admin/footer

export { publicRouter, adminRouter };