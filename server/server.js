import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import { publicRouter as topbarPublicRoutes, adminRouter as topbarAdminRoutes } from './routes/topbarRoutes.js';
import { publicRouter as teamPublicRoutes, adminRouter as teamAdminRoutes } from './routes/teamRoutes.js';
import { publicRouter as footerPublicRoutes, adminRouter as footerAdminRoutes } from './routes/footerRoutes.js';
import { publicRouter as contactInfoPublicRoutes, adminRouter as contactInfoAdminRoutes } from './routes/contactInfoRoutes.js';
import { publicRouter as enquiryPublicRoutes, adminRouter as enquiryAdminRoutes } from './routes/enquiryRoutes.js';
import { publicRouter as testimonialPublicRoutes, adminRouter as testimonialAdminRoutes } from './routes/testimonialRoutes.js';
import { publicRouter as categoryPublicRoutes, adminRouter as categoryAdminRoutes } from './routes/categoryRoutes.js';
import { publicRouter as productPublicRoutes, adminRouter as productAdminRoutes } from './routes/productRoutes.js';
import { publicRouter as blogPublicRoutes, adminRouter as blogAdminRoutes } from './routes/blogRoutes.js';
import { publicRouter as navbarPublicRoutes, adminRouter as navbarAdminRoutes } from './routes/navbarRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use('/api/topbar', topbarPublicRoutes);
app.use('/api/admin/topbar', topbarAdminRoutes);

app.use('/api/team', teamPublicRoutes);
app.use('/api/admin/team', teamAdminRoutes);

app.use('/api/footer', footerPublicRoutes);
app.use('/api/admin/footer', footerAdminRoutes);

app.use('/api/contact-info', contactInfoPublicRoutes);
app.use('/api/admin/contact-info', contactInfoAdminRoutes);

app.use('/api/enquiries', enquiryPublicRoutes);
app.use('/api/admin/enquiries', enquiryAdminRoutes);

app.use('/api/testimonials', testimonialPublicRoutes);
app.use('/api/admin/testimonials', testimonialAdminRoutes);

app.use('/api/categories', categoryPublicRoutes);
app.use('/api/admin/categories', categoryAdminRoutes);

app.use('/api/products', productPublicRoutes);
app.use('/api/admin/products', productAdminRoutes);


app.use('/api/blogs', blogPublicRoutes);
app.use('/api/admin/blogs', blogAdminRoutes);

app.use('/api/navbar', navbarPublicRoutes);
app.use('/api/admin/navbar', navbarAdminRoutes);

app.get('/', (req, res) => res.send('SP Automation API running'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));