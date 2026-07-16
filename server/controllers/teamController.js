import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import TeamMember from '../models/TeamMember.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const deleteFileIfExists = (relativePath) => {
  if (!relativePath) return;
  const filePath = path.join(__dirname, '..', relativePath);
  fs.unlink(filePath, () => {}); // ignore errors (file may already be gone)
};

// GET /api/team  (public: active only, sorted)
export const getPublicTeam = async (req, res) => {
  const members = await TeamMember.find({ isActive: true }).sort({ order: 1 });
  res.json(members);
};

// GET /api/admin/team  (admin: all, sorted)
export const getAllTeam = async (req, res) => {
  const members = await TeamMember.find().sort({ order: 1 });
  res.json(members);
};

// POST /api/admin/team
export const createTeamMember = async (req, res) => {
  const { name, role, description, isActive } = req.body;

  if (!name || !role) {
    return res.status(400).json({ message: 'name and role are required' });
  }

  const count = await TeamMember.countDocuments();
  const member = await TeamMember.create({
    name,
    role,
    description,
    isActive: isActive === 'false' ? false : true,
    image: req.file ? `/uploads/team/${req.file.filename}` : '',
    order: count,
  });

  res.status(201).json(member);
};

// PUT /api/admin/team/:id
export const updateTeamMember = async (req, res) => {
  const member = await TeamMember.findById(req.params.id);
  if (!member) return res.status(404).json({ message: 'Team member not found' });

  const { name, role, description, isActive, order } = req.body;

  member.name = name ?? member.name;
  member.role = role ?? member.role;
  member.description = description ?? member.description;
  if (isActive !== undefined) member.isActive = isActive === 'true' || isActive === true;
  if (order !== undefined) member.order = order;

  if (req.file) {
    deleteFileIfExists(member.image);
    member.image = `/uploads/team/${req.file.filename}`;
  }

  const updated = await member.save();
  res.json(updated);
};

// DELETE /api/admin/team/:id
export const deleteTeamMember = async (req, res) => {
  const member = await TeamMember.findById(req.params.id);
  if (!member) return res.status(404).json({ message: 'Team member not found' });

  deleteFileIfExists(member.image);
  await member.deleteOne();
  res.json({ message: 'Team member deleted' });
};

// PUT /api/admin/team/reorder  (body: [{ id, order }, ...])
export const reorderTeam = async (req, res) => {
  const { items } = req.body;
  if (!Array.isArray(items)) {
    return res.status(400).json({ message: 'items array is required' });
  }

  await Promise.all(
    items.map(({ id, order }) => TeamMember.findByIdAndUpdate(id, { order }))
  );

  const updated = await TeamMember.find().sort({ order: 1 });
  res.json(updated);
};