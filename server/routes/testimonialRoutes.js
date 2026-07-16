import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getPublicTestimonials,
  createClientTestimonial,
  getAllTestimonials,
  createAdminTestimonial,
  updateTestimonial,
  deleteTestimonial,
  reorderTestimonials,
} from '../controllers/testimonialController.js';

const publicRouter = express.Router();
publicRouter.get('/', getPublicTestimonials);   // GET  /api/testimonials
publicRouter.post('/', createClientTestimonial); // POST /api/testimonials

const adminRouter = express.Router();
adminRouter.use(protect);
adminRouter.get('/', getAllTestimonials);                 // GET    /api/admin/testimonials
adminRouter.post('/', createAdminTestimonial);             // POST   /api/admin/testimonials
adminRouter.put('/reorder', reorderTestimonials);          // PUT    /api/admin/testimonials/reorder
adminRouter.put('/:id', updateTestimonial);                // PUT    /api/admin/testimonials/:id
adminRouter.delete('/:id', deleteTestimonial);             // DELETE /api/admin/testimonials/:id

export { publicRouter, adminRouter };