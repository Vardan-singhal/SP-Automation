import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const fileFilter = (req, file, cb) => {
  const allowed = ['.jpg', '.jpeg', '.png', '.webp'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.includes(ext)) return cb(null, true);
  cb(new Error('Only .jpg, .jpeg, .png and .webp images are allowed'));
};

export const createUploader = (subfolder) => {
  const uploadDir = path.join(__dirname, '..', 'uploads', subfolder);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${subfolder}-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
    },
  });

  return multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });
};

// Backward-compatible: existing `import upload from '.../uploadMiddleware.js'` (teamRoutes.js) keeps working
export default createUploader('team');