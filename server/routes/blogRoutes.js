import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import Blog from '../models/Blog.js';
import { protect } from '../middleware/authMiddleware.js';

const publicRouter = express.Router();
const adminRouter = express.Router();

const uploadDir = 'uploads/blogs';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Build an absolute URL from the incoming request instead of an env var
const buildFileUrl = (req, filename) => `${req.protocol}://${req.get('host')}/uploads/blogs/${filename}`;

/* -------- PUBLIC -------- */

publicRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({ isPublished: true }).sort({ date: -1 });
  res.json(blogs);
});

publicRouter.get('/:slug', async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug, isPublished: true });
  if (!blog) return res.status(404).json({ message: 'Not found' });
  res.json(blog);
});

/* -------- ADMIN -------- */

adminRouter.post('/uploads/blog-image', protect, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No image uploaded' });
  res.json({ url: buildFileUrl(req, req.file.filename) });
});

adminRouter.get('/', protect, async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
});

adminRouter.post('/', protect, upload.single('mainImage'), async (req, res) => {
  try {
    const { title, slug, author, category, date, excerpt, contentHtml, isPublished } = req.body;
    const exists = await Blog.findOne({ slug });
    if (exists) return res.status(400).json({ message: 'A post with this slug already exists' });

    const blog = await Blog.create({
      title,
      slug,
      author,
      category,
      date,
      excerpt,
      contentHtml,
      isPublished: isPublished === 'true' || isPublished === true,
      mainImage: req.file ? buildFileUrl(req, req.file.filename) : undefined,
    });
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

adminRouter.put('/:id', protect, upload.single('mainImage'), async (req, res) => {
  try {
    const { title, slug, author, category, date, excerpt, contentHtml, isPublished } = req.body;

    if (slug) {
      const clash = await Blog.findOne({ slug, _id: { $ne: req.params.id } });
      if (clash) return res.status(400).json({ message: 'Another post already uses this slug' });
    }

    const update = {
      title, slug, author, category, date, excerpt, contentHtml,
      isPublished: isPublished === 'true' || isPublished === true,
    };
    if (req.file) update.mainImage = buildFileUrl(req, req.file.filename);

    const blog = await Blog.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

adminRouter.put('/:id/publish', protect, async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, { isPublished: req.body.isPublished }, { new: true });
  if (!blog) return res.status(404).json({ message: 'Blog not found' });
  res.json(blog);
});

adminRouter.delete('/:id', protect, async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  if (!blog) return res.status(404).json({ message: 'Blog not found' });
  res.json({ message: 'Deleted' });
});

export { publicRouter, adminRouter };