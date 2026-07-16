import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';
import {
  getPublicTeam,
  getAllTeam,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  reorderTeam,
} from '../controllers/teamController.js';

const publicRouter = express.Router();
publicRouter.get('/', getPublicTeam); // GET /api/team

const adminRouter = express.Router();
adminRouter.use(protect);
adminRouter.get('/', getAllTeam);                              // GET    /api/admin/team
adminRouter.post('/', upload.single('image'), createTeamMember);          // POST   /api/admin/team
adminRouter.put('/reorder', reorderTeam);                       // PUT    /api/admin/team/reorder
adminRouter.put('/:id', upload.single('image'), updateTeamMember);        // PUT    /api/admin/team/:id
adminRouter.delete('/:id', deleteTeamMember);                   // DELETE /api/admin/team/:id

export { publicRouter, adminRouter };