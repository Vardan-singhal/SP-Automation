import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getPublicContactInfo,
  getAllContactInfo,
  createContactInfoItem,
  updateContactInfoItem,
  deleteContactInfoItem,
  reorderContactInfo,
} from '../controllers/contactInfoController.js';

const publicRouter = express.Router();
publicRouter.get('/', getPublicContactInfo); // GET /api/contact-info

const adminRouter = express.Router();
adminRouter.use(protect);
adminRouter.get('/', getAllContactInfo);                 
adminRouter.post('/', createContactInfoItem);             
adminRouter.put('/reorder', reorderContactInfo);          
adminRouter.put('/:id', updateContactInfoItem);           
adminRouter.delete('/:id', deleteContactInfoItem);        

export { publicRouter, adminRouter };