import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Admin from './models/Admin.js';

dotenv.config();
connectDB();

const seedAdmin = async () => {
  try {
    const exists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (exists) {
      console.log('Admin already exists:', exists.email);
      process.exit();
    }

    const admin = await Admin.create({
      name: 'Super Admin',
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: 'superadmin',
    });

    console.log('Admin created:', admin.email);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedAdmin();