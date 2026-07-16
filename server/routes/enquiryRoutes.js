import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createEnquiry,
  getAllEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} from '../controllers/enquiryController.js';

const publicRouter = express.Router();
publicRouter.post('/', createEnquiry); // POST /api/enquiries

const adminRouter = express.Router();
adminRouter.use(protect);
adminRouter.get('/', getAllEnquiries);          // GET    /api/admin/enquiries
adminRouter.put('/:id', updateEnquiryStatus);   // PUT    /api/admin/enquiries/:id
adminRouter.delete('/:id', deleteEnquiry);      // DELETE /api/admin/enquiries/:id

export { publicRouter, adminRouter };