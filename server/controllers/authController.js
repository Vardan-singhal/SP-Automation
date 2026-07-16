import Admin from '../models/Admin.js';
import generateToken from '../utils/generateToken.js';

// POST /api/auth/login
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const admin = await Admin.findOne({ email: email.toLowerCase() });

  if (admin && (await admin.matchPassword(password))) {
    return res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      token: generateToken(admin._id),
    });
  }

  return res.status(401).json({ message: 'Invalid email or password' });
};

// GET /api/auth/me
export const getMe = async (req, res) => {
  res.json(req.admin);
};